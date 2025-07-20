import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import type { Task } from '@/lib/types';


// Helper to shape Supabase task data into the client-side Task type
const shapeTaskData = (
  task: any, // À remplacer par le type correct si disponible
): Task => {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? undefined,
      status: task.status,
      priority: task.priority,
    assignees: task.task_assignees?.map((a: { profiles: { id: string; name: string; avatar?: string } }) => ({
          id: a.profiles.id,
          name: a.profiles.name,
          email: `user-${a.profiles.id}@example.com`,
          avatar: a.profiles.avatar ?? `https://i.pravatar.cc/150?u=${a.profiles.id}`
    })).filter((a: any) => a.id) || [],
      projectId: task.project_id,
      dueDate: task.due_date ?? undefined,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    comments:
      task.comments?.map((c: { id: string; content: string; created_at: string; profiles?: { id: string; name: string; avatar?: string } }) => ({
          id: c.id,
          content: c.content,
          createdAt: c.created_at,
        author: c.profiles
          ? {
              id: c.profiles.id,
              name: c.profiles.name,
              email: `user-${c.profiles.id}@example.com`,
              avatar: c.profiles.avatar ?? `https://i.pravatar.cc/150?u=${c.profiles.id}`
            }
          : null
      })).filter((c: any) => c.author) || []
    };
};


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const taskId = id;
    const body = await request.json();
    const { title, description, priority, dueDate, assignees: assigneeIds = [], status } = body;

    // For drag-and-drop, title and priority might not be present.
    // We only validate them if they are being changed.
    if (title !== undefined && !title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }
     if (priority !== undefined && !priority) {
      return NextResponse.json({ message: 'Priority is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description || null;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.due_date = dueDate;
    if (status) updateData.status = status;

    const { data, error: updateError } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', taskId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    if (assigneeIds !== undefined) {
        // Update assignees by first deleting old ones, then inserting new ones.
        const { error: deleteAssigneesError } = await supabase
            .from('task_assignees')
            .delete()
            .eq('task_id', taskId);

        if (deleteAssigneesError) throw deleteAssigneesError;

        if (assigneeIds && assigneeIds.length > 0) {
            const newAssignees = assigneeIds.map((userId: string) => ({ task_id: taskId, user_id: userId }));
            const { error: insertAssigneesError } = await supabase.from('task_assignees').insert(newAssignees);
            if (insertAssigneesError) throw insertAssigneesError;
        }
    }
    
    // Re-fetch the task with all relations to send back to the client
    const { data: finalTaskData, error: finalTaskError } = await supabase
        .from('tasks')
        .select('*, task_assignees(*, profiles(*)), comments(*, profiles(*))')
        .eq('id', taskId)
        .single();
    
    if (finalTaskError) throw finalTaskError;

    return NextResponse.json(shapeTaskData(finalTaskData));
  } catch (error) {
    console.error(`Failed to update task:`, error);
    return NextResponse.json({ message: 'An error occurred while updating the task' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const taskId = id;
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
        // RLS might prevent deletion, or the task might not exist.
        if (error.code === '23503') { // foreign key violation
             return NextResponse.json({ message: 'Cannot delete task as it is referenced by other items.' }, { status: 409 });
        }
        throw error;
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Failed to delete task:`, error);
    return NextResponse.json({ message: 'An error occurred while deleting the task' }, { status: 500 });
  }
}
