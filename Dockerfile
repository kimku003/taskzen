# Dockerfile

# Stage 1: Builder
# -----------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build


# Stage 2: Runner
# ---------------
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
# The default port for Next.js is 3000
ENV PORT=3000

# Copy production dependencies from the builder stage
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Copy the built Next.js application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
