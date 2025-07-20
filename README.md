# TaskZenith

TaskZenith est une application de gestion de projet et de tâches full-stack conçue pour aider les équipes à organiser leur travail efficacement. Elle intègre des fonctionnalités d'IA pour automatiser et simplifier le flux de travail.

## 🚀 Fonctionnalités Principales

-   **Gestion de Projets et Tâches** : Créez, suivez et gérez vos projets et les tâches associées.
-   **Tableau Kanban interactif** : Visualisez l'avancement des tâches d'un projet grâce à un tableau Kanban simple et intuitif.
-   **Authentification des utilisateurs** : Système complet d'inscription et de connexion sécurisé avec Supabase.
-   **Tableau de bord** : Obtenez un aperçu rapide des statistiques importantes sur vos projets et vos tâches.
-   **Assistance par IA (propulsée par Genkit)** :
    -   **Génération automatique de tâches** : Créez des listes de tâches pertinentes à partir d'une simple description de projet.
    -   **Suggestion d'assignations** : Obtenez des recommandations sur le meilleur membre de l'équipe pour une tâche donnée.
    -   **Résumé de projet** : Générez un résumé concis de l'état d'avancement d'un projet.

## 🛠️ Stack Technique

-   **Framework** : [Next.js](https://nextjs.org/)
-   **Langage** : [TypeScript](https://www.typescriptlang.org/)
-   **Backend & Base de données** : [Supabase](https://supabase.io/)
-   **IA** : [Google Genkit](https://firebase.google.com/docs/genkit)
-   **Styling** : [Tailwind CSS](https://tailwindcss.com/)
-   **Composants UI** : [shadcn/ui](https://ui.shadcn.com/)

## ⚙️ Démarrage Rapide

Suivez ces étapes pour lancer le projet en local.

### Prérequis

-   [Node.js](https://nodejs.org/en/) (version 18 ou supérieure)
-   [npm](https://www.npmjs.com/)
-   [Supabase CLI](https://supabase.com/docs/guides/cli)

### Installation

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/votre-utilisateur/taskzenith.git
    cd taskzenith
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    ```

3.  **Configuration de l'environnement :**

    -   Créez un projet sur [Supabase](https://supabase.com).
    -   Créez un fichier `.env.local` à la racine du projet en copiant le contenu de `.env.example` (s'il existe) ou en partant de zéro.
    -   Ajoutez les clés de votre projet Supabase dans le fichier `.env.local` :

    ```env
    NEXT_PUBLIC_SUPABASE_URL=VOTRE_URL_SUPABASE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=VOTRE_CLE_ANON_SUPABASE
    ```

4.  **Appliquez les migrations de la base de données :**

    -   Liez votre projet local à votre projet Supabase :
        ```bash
        npx supabase link --project-ref VOTRE_ID_PROJET
        ```
    -   Poussez les migrations pour créer le schéma de la base de données :
        ```bash
        npx supabase db push
        ```

5.  **Lancez le serveur de développement :**
    ```bash
    npm run dev
    ```

6.  Ouvrez votre navigateur et accédez à [http://localhost:3000](http://localhost:3000).

## 📂 Structure du Projet

```
/
├── src/
│   ├── app/                # Pages et routes (App Router)
│   ├── ai/                 # Logique et flows Genkit
│   ├── components/         # Composants React (UI, Layout, etc.)
│   ├── lib/                # Utilitaires, types, client Supabase
│   └── ...
├── supabase/
│   └── migrations/         # Schéma et migrations de la base de données
├── .env.local              # Fichier pour les variables d'environnement (non versionné)
├── next.config.ts          # Configuration de Next.js
└── package.json            # Dépendances et scripts
```
