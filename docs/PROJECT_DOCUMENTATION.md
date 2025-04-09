# DevQuest - Programming Forum Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema and ERD](#database-schema-and-erd)
4. [Use Cases](#use-cases)
5. [API Endpoints](#api-endpoints)
6. [Authentication Flow](#authentication-flow)
7. [Component Structure](#component-structure)
8. [Deployment Instructions](#deployment-instructions)

## Project Overview

DevQuest is a modern programming forum designed for developers to connect, share knowledge, and grow together in a collaborative environment. The platform features user management, content organization, code sharing capabilities, and a reputation system.

### Key Features
- User registration and authentication
- Thread creation and management
- Category-based organization
- Code sharing with syntax highlighting
- Reputation system with badges
- Voting on posts
- Notifications
- Content moderation via flagging system

## Technology Stack

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Shadcn UI components

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **API**: RESTful API endpoints
- **Authentication**: Passport.js with session-based auth

### DevOps
- **Hosting**: Render.com
- **Version Control**: Git
- **Build Tool**: Vite

## Database Schema and ERD

The DevQuest database consists of 9 main tables that capture the core functionality of the forum.

### Entity Relationship Diagram (ERD)

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│    users      │       │   categories   │       │    badges     │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ name          │       │ name          │       │ name          │
│ email         │       │ description   │       │ description   │
│ password      │       │ color         │       │ icon          │
│ bio           │       │ createdAt     │       │ color         │
│ websiteUrl    │       └───────┬───────┘       │ category      │
│ portfolioUrl  │               │               │ level         │
│ programming   │               │               │ reputation    │
│ Languages     │               │               │ Points        │
│ expertise     │               │               │ criteria      │
│ avatar        │      ┌────────┴──────────┐    │ createdAt     │
│ reputation    │      │                   │    └───────┬───────┘
│ createdAt     │      │                   │            │
└───────┬───────┘      ▼                   │            │
        │        ┌───────────────┐         │    ┌───────┴───────┐
        │        │    threads    │         │    │  userBadges   │
        │        ├───────────────┤         │    ├───────────────┤
        │───────>│ id            │         │    │ id            │
        │        │ title         │         │    │ userId        │<───┐
        │        │ userId        │<────────┘    │ badgeId       │    │
        │        │ categoryId    │<──────┐      │ earnedAt      │    │
        │        │ createdAt     │       │      │ displayOn     │    │
        │        │ updatedAt     │       │      │ Profile       │    │
        │        │ viewCount     │       │      └───────────────┘    │
        │        │ isPinned      │       │                           │
        │        │ isClosed      │       │                           │
        │        └───────┬───────┘       │                           │
        │                │               │                           │
        │                │               │                           │
        │                ▼               │                           │
        │        ┌───────────────┐       │                           │
        │        │     posts     │       │                           │
        │───────>│ id            │       │                           │
        │        │ content       │       │                           │
        │        │ userId        │       │                           │
        │        │ threadId      │       │                           │
        │        │ parentId      │       │                           │
        │        │ createdAt     │       │                           │
        │        │ updatedAt     │       │                           │
        │        │ isDeleted     │       │                           │
        │        └───────┬───────┘       │                           │
        │                │               │                           │
┌───────┴────────┐      │         ┌─────┴───────────┐               │
│ subscriptions  │      │         │  notifications  │               │
├────────────────┤      │         ├─────────────────┤               │
│ id             │      │         │ id              │               │
│ userId         │<─────┘         │ userId          │<──────────────┘
│ threadId       │<─────┐         │ type            │
│ categoryId     │<─┐   │         │ content         │
│ notifyByEmail  │  │   │         │ relatedId       │
│ notifyIn       │  │   │         │ isRead          │
│ Platform       │  │   │         │ createdAt       │
│ createdAt      │  │   │         └─────────────────┘
└────────────────┘  │   │
                    │   │         ┌─────────────────┐
                    │   │         │     votes       │
                    │   │         ├─────────────────┤
                    │   └────────>│ userId          │
                    │             │ postId          │
                    │             │ value           │
                    │             │ createdAt       │
                    │             └─────────────────┘
                    │
                    │             ┌─────────────────┐
                    │             │     flags       │
                    │             ├─────────────────┤
                    └────────────>│ id              │
                                  │ userId          │
                                  │ postId          │
                                  │ reason          │
                                  │ status          │
                                  │ createdAt       │
                                  └─────────────────┘
```

### Table Descriptions

1. **Users**
   - Stores user account information and profiles
   - Primary functions: authentication, reputation tracking, profile personalization

2. **Categories**
   - Organizes threads into topic areas
   - Allows users to browse content by subject matter

3. **Threads**
   - Represents discussion topics created by users
   - Contains metadata about the discussion

4. **Posts**
   - Contains the actual content of discussions
   - Supports hierarchical replies (parentId for nested comments)

5. **Votes**
   - Tracks user votes on posts (upvotes/downvotes)
   - Used for calculating post ranking and user reputation

6. **Subscriptions**
   - Manages user subscriptions to threads or categories
   - Controls notification preferences

7. **Notifications**
   - Stores user notifications for various events
   - Types include replies, mentions, badges earned, etc.

8. **Badges**
   - Defines achievement badges users can earn
   - Includes criteria for badge awarding

9. **UserBadges**
   - Junction table tracking which users have earned which badges
   - Records when badges were earned

10. **Flags**
    - Used for content moderation
    - Allows users to report inappropriate content

## Use Cases

### User Management Use Cases

```
┌───────────────────────────────────────────────────────┐
│                        User                           │
└───────────────┬───────────────────────┬───────────────┘
                │                       │
                ▼                       ▼
┌───────────────────────┐   ┌───────────────────────────┐
│   Register Account    │   │       Login/Logout        │
└───────────────────────┘   └───────────────────────────┘
                │                       │
                ▼                       ▼
┌───────────────────────┐   ┌───────────────────────────┐
│   Manage Profile      │   │  Reset/Change Password    │
└───────────────────────┘   └───────────────────────────┘
                │                       
                ▼                       
┌───────────────────────┐   
│   View Achievements   │   
└───────────────────────┘   
```

### Content Management Use Cases

```
┌───────────────────────────────────────────────────────┐
│                        User                           │
└─┬─────────────┬─────────────┬─────────────┬───────────┘
  │             │             │             │
  ▼             ▼             ▼             ▼
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│  Browse   │ │  Create   │ │  Search   │ │   Flag    │
│Categories │ │  Thread   │ │  Content  │ │  Content  │
└───────────┘ └───────────┘ └───────────┘ └───────────┘
                  │
                  ▼
              ┌───────────┐
              │   Reply   │
              │ to Thread │
              └───────────┘
                  │
                  ▼
              ┌───────────┐
              │   Vote    │
              │  on Post  │
              └───────────┘
```

### Reputation and Badges Use Cases

```
┌───────────────────────────────────────────────────────┐
│                        User                           │
└─────────────┬─────────────────────────┬───────────────┘
              │                         │
              ▼                         ▼
    ┌───────────────────────┐ ┌───────────────────────┐
    │  Earn Reputation      │ │     Earn Badges       │
    └───────────────────────┘ └───────────────────────┘
              │                         │
              ▼                         ▼
    ┌───────────────────────┐ ┌───────────────────────┐
    │ Gain Special          │ │  Display Badges on    │
    │ Privileges            │ │  Profile              │
    └───────────────────────┘ └───────────────────────┘
```

### Notification Use Cases

```
┌───────────────────────────────────────────────────────┐
│                        User                           │
└────────┬──────────────────┬───────────────────────────┘
         │                  │                          
         ▼                  ▼                          
┌──────────────────┐ ┌─────────────────────────────────┐
│  Subscribe to    │ │      Receive Notifications      │
│Thread/Category   │ │                                 │
└──────────────────┘ └─────────────────┬───────────────┘
                                       │               
                                       ▼               
                              ┌──────────────────────┐ 
                              │  Mark Notification   │ 
                              │  as Read            │ 
                              └──────────────────────┘ 
```

## API Endpoints

### Authentication
- `POST /api/register` - Create a new user account
- `POST /api/login` - Authenticate a user and create a session
- `POST /api/logout` - End the user's session
- `GET /api/user` - Get the currently authenticated user's data

### Users
- `GET /api/users/:id` - Get a specific user's profile
- `PATCH /api/users/:id` - Update a user's profile
- `GET /api/users/:id/threads` - Get threads created by a user
- `GET /api/users/:id/posts` - Get posts created by a user
- `GET /api/users/:id/badges` - Get badges earned by a user

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
- `GET /api/categories/:id/threads` - Get threads in a category
- `POST /api/categories` - Create a new category (admin only)

### Threads
- `GET /api/threads` - Get all threads (with pagination)
- `GET /api/threads/popular` - Get popular threads
- `GET /api/threads/recent` - Get recent threads
- `GET /api/threads/:id` - Get a specific thread with its posts
- `POST /api/threads` - Create a new thread
- `PATCH /api/threads/:id` - Update a thread

### Posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/threads/:id/posts` - Create a new post in a thread
- `PATCH /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Mark a post as deleted

### Votes
- `POST /api/posts/:id/votes` - Vote on a post
- `GET /api/posts/:id/votes` - Get votes for a post

### Subscriptions
- `GET /api/subscriptions` - Get current user's subscriptions
- `POST /api/subscriptions` - Create a new subscription
- `DELETE /api/subscriptions/:id` - Delete a subscription

### Notifications
- `GET /api/notifications` - Get current user's notifications
- `PATCH /api/notifications/:id` - Mark a notification as read
- `PATCH /api/notifications/read-all` - Mark all notifications as read

### Flags
- `POST /api/flags` - Flag a post for moderation
- `GET /api/flags` - Get all flags (moderators only)
- `PATCH /api/flags/:id` - Update flag status (moderators only)

## Authentication Flow

DevQuest uses a session-based authentication system with Passport.js.

1. **Registration Process**
   - User submits registration form with email and password
   - Password is hashed using scrypt algorithm with salt
   - User record is created in the database
   - User is automatically logged in after registration

2. **Login Process**
   - User provides credentials (email/password)
   - System verifies credentials and creates a session
   - Session ID is stored in a cookie on the client side

3. **Authentication Verification**
   - Protected routes check for valid session
   - If no valid session exists, user is redirected to login

4. **Logout Process**
   - User session is terminated
   - Session cookie is cleared

## Component Structure

The application follows a structured component hierarchy:

### Page Components
- `home-page.tsx` - Landing page with featured content
- `auth-page.tsx` - Authentication page with register/login forms
- `categories-page.tsx` - Browse all categories
- `category-page.tsx` - View threads in a specific category
- `thread-page.tsx` - View a thread and its posts
- `new-thread-page.tsx` - Create a new thread
- `profile-page.tsx` - View and edit user profiles
- `search-page.tsx` - Search for content

### UI Components
- `Header.tsx` - Navigation and user menu
- `Footer.tsx` - Site information and links
- `Hero.tsx` - Landing page hero section
- `ThreadList.tsx` - Reusable thread listing component
- `Post.tsx` - Post display with voting and replies
- `CategoryCard.tsx` - Category display component
- `Editor.tsx` - Rich text editor for posts

### Hook Components
- `use-auth.tsx` - Authentication state and methods
- `use-toast.tsx` - Toast notification system

## Deployment Instructions

DevQuest is configured for deployment on Render.com.

### Prerequisites
- A Render.com account
- A PostgreSQL database instance

### Deployment Steps

1. **Database Setup**
   - Create a PostgreSQL database on Render.com
   - Note the database connection string

2. **Environment Variables**
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Secret key for session encryption
   - `NODE_ENV` - Set to "production" for production deployment

3. **Build Configuration**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Deploy to Render**
   - Connect your GitHub repository to Render
   - Configure environment variables
   - Deploy the application

5. **Verify Deployment**
   - Ensure the application is running correctly
   - Check database connections

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure environment variables
4. Start the development server: `npm run dev`
5. Access the application at `http://localhost:5000`

---

This documentation is a living document and will be updated as the application evolves.

Last updated: April 3, 2025