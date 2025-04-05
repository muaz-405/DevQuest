# DevQuest - Programming Forum Platform

A collaborative programming forum platform designed to facilitate code sharing, learning, and community interaction.

## Features

- User authentication and profile management
- Thread creation and browsing by categories
- Code snippet sharing with syntax highlighting
- Reputation system with badges
- Responsive design for all devices

## Deployment Instructions

### Render Deployment (Recommended)

This project is configured for easy deployment on Render with a free PostgreSQL database.

#### Prerequisites

1. Create a [Render account](https://render.com) (free tier is sufficient)
2. Push your DevQuest project code to a Git repository (GitHub, GitLab, etc.)

#### Option 1: Blueprint Deployment (Recommended)

This is the easiest method as it automatically configures both the web service and the PostgreSQL database.

1. **Login to Render**: Go to [dashboard.render.com](https://dashboard.render.com) and log in

2. **Create a New Blueprint**: 
   - Click "New" in the top right corner
   - Select "Blueprint"
   - Connect your Git provider if not already connected
   - Choose the repository containing your DevQuest code
   - Click "Apply Blueprint"

Render will automatically detect the `render.yaml` file and create all required services.

#### Option 2: Manual Deployment

If the blueprint method doesn't work, you can set up services manually:

1. **Create a PostgreSQL Database**:
   - Click "New" in the Render dashboard
   - Select "PostgreSQL"
   - Provide a name (e.g., "devquest-db")
   - Choose the Free plan
   - Click "Create Database"
   - Take note of the "Internal Database URL" for the next step

2. **Create a Web Service**:
   - Click "New" again and select "Web Service"
   - Connect your repository
   - Name your service (e.g., "devquest")
   - Set the Environment to "Node"
   - Set the Build Command to `./render-build.sh`
   - Set the Start Command to `npm start`
   - Add the following environment variables:
     - `DATABASE_URL`: Use the Internal Database URL from the previous step
     - `SESSION_SECRET`: Generate a random string
     - `NODE_ENV`: production
   - Choose the Free plan
   - Click "Create Web Service"

### Troubleshooting

- Check the Render dashboard logs for any build or runtime errors
- For more detailed troubleshooting, please refer to the [RENDER-DEPLOYMENT-GUIDE.md](RENDER-DEPLOYMENT-GUIDE.md) file.

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

4. Run in production mode:
   ```
   npm start
   ```

## Technology Stack

- Frontend: React, TailwindCSS, shadcn/ui components
- Backend: Node.js, Express
- Database: PostgreSQL (optional)
- Authentication: Passport.js