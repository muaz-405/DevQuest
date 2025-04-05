#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Building application for Render..."

# Install dependencies
npm ci

# Build the frontend
echo "Building frontend..."
npm run build

# Initialize database
echo "Initializing database..."
node render-init-db.js

echo "Build completed successfully"