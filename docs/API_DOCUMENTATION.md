# DevQuest API Documentation

This document provides detailed specifications for the DevQuest API endpoints, including request/response formats, authentication requirements, and example usage.

## Base URL

All API endpoints are relative to the base URL of the application.

## Authentication

Most endpoints require authentication. To authenticate:

1. Send a POST request to `/api/login` with credentials
2. Session cookie will be set automatically
3. Include this cookie in subsequent requests

Protected endpoints will return a 401 Unauthorized status if the user is not authenticated.

## Common Response Formats

All responses are in JSON format.

### Success Response

```json
{
  "data": { ... },  // Response data object or array
  "meta": { ... }   // Optional metadata (pagination, etc.)
}
```

### Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { ... }  // Optional additional error details
  }
}
```

## API Endpoints

### Authentication Endpoints

#### POST /api/register

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "bio": null,
  "websiteUrl": null,
  "portfolioUrl": null,
  "programmingLanguages": null,
  "expertise": null,
  "avatar": null,
  "reputation": 0,
  "createdAt": "2025-04-03T12:00:00Z"
}
```

**Status Codes:**
- 201 Created: User successfully registered
- 400 Bad Request: Invalid input data
- 409 Conflict: Email already exists

#### POST /api/login

Authenticate a user and create a session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Software developer",
  "websiteUrl": "https://example.com",
  "portfolioUrl": "https://github.com/johndoe",
  "programmingLanguages": ["JavaScript", "Python"],
  "expertise": ["Web Development", "Data Science"],
  "avatar": "https://example.com/avatar.jpg",
  "reputation": 150,
  "createdAt": "2025-04-03T12:00:00Z"
}
```

**Status Codes:**
- 200 OK: Successfully authenticated
- 401 Unauthorized: Invalid credentials

#### POST /api/logout

End the user's session.

**Request Body:** None

**Response:** Empty with status 200 OK

**Status Codes:**
- 200 OK: Successfully logged out
- 401 Unauthorized: Not logged in

#### GET /api/user

Get the currently authenticated user's data.

**Request Body:** None

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Software developer",
  "websiteUrl": "https://example.com",
  "portfolioUrl": "https://github.com/johndoe",
  "programmingLanguages": ["JavaScript", "Python"],
  "expertise": ["Web Development", "Data Science"],
  "avatar": "https://example.com/avatar.jpg",
  "reputation": 150,
  "createdAt": "2025-04-03T12:00:00Z"
}
```

**Status Codes:**
- 200 OK: User data returned
- 401 Unauthorized: Not logged in

### User Endpoints

#### GET /api/users/:id

Get a specific user's profile.

**Parameters:**
- `id`: User ID

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "bio": "Software developer",
  "websiteUrl": "https://example.com",
  "portfolioUrl": "https://github.com/johndoe",
  "programmingLanguages": ["JavaScript", "Python"],
  "expertise": ["Web Development", "Data Science"],
  "avatar": "https://example.com/avatar.jpg",
  "reputation": 150,
  "createdAt": "2025-04-03T12:00:00Z"
}
```

**Status Codes:**
- 200 OK: User found
- 404 Not Found: User not found

#### PATCH /api/users/:id

Update a user's profile. Authentication required with ownership of the profile.

**Parameters:**
- `id`: User ID

**Request Body:** (all fields optional)
```json
{
  "name": "John Smith",
  "bio": "Senior software developer",
  "websiteUrl": "https://johnsmith.com",
  "portfolioUrl": "https://github.com/johnsmith",
  "programmingLanguages": ["JavaScript", "Python", "Go"],
  "expertise": ["Web Development", "Data Science", "Cloud Computing"],
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john@example.com",
  "bio": "Senior software developer",
  "websiteUrl": "https://johnsmith.com",
  "portfolioUrl": "https://github.com/johnsmith",
  "programmingLanguages": ["JavaScript", "Python", "Go"],
  "expertise": ["Web Development", "Data Science", "Cloud Computing"],
  "avatar": "https://example.com/new-avatar.jpg",
  "reputation": 150,
  "createdAt": "2025-04-03T12:00:00Z"
}
```

**Status Codes:**
- 200 OK: Profile updated
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not authorized to update this profile
- 404 Not Found: User not found

#### GET /api/users/:id/threads

Get threads created by a user.

**Parameters:**
- `id`: User ID
- `limit` (optional): Number of threads to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "How to optimize React performance",
      "userId": 1,
      "categoryId": 3,
      "createdAt": "2025-04-03T12:00:00Z",
      "updatedAt": "2025-04-03T12:30:00Z",
      "viewCount": 120,
      "isPinned": false,
      "isClosed": false
    },
    // More threads...
  ],
  "meta": {
    "total": 45,
    "limit": 20,
    "offset": 0
  }
}
```

**Status Codes:**
- 200 OK: Threads returned
- 404 Not Found: User not found

#### GET /api/users/:id/posts

Get posts created by a user.

**Parameters:**
- `id`: User ID
- `limit` (optional): Number of posts to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "content": "This is my solution to the problem...",
      "userId": 1,
      "threadId": 5,
      "parentId": null,
      "createdAt": "2025-04-03T12:00:00Z",
      "updatedAt": "2025-04-03T12:00:00Z",
      "isDeleted": false
    },
    // More posts...
  ],
  "meta": {
    "total": 67,
    "limit": 20,
    "offset": 0
  }
}
```

**Status Codes:**
- 200 OK: Posts returned
- 404 Not Found: User not found

#### GET /api/users/:id/badges

Get badges earned by a user.

**Parameters:**
- `id`: User ID

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "badgeId": 3,
      "earnedAt": "2025-04-01T10:30:00Z",
      "displayOnProfile": true,
      "badge": {
        "id": 3,
        "name": "Helpful Answer",
        "description": "Provided 10 answers with 5+ upvotes",
        "icon": "award",
        "color": "#FFD700",
        "category": "contribution",
        "level": 2,
        "reputationPoints": 50
      }
    },
    // More badges...
  ]
}
```

**Status Codes:**
- 200 OK: Badges returned
- 404 Not Found: User not found

### Category Endpoints

#### GET /api/categories

Get all categories.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "JavaScript",
      "description": "Discussions about JavaScript programming language",
      "color": "#F7DF1E",
      "createdAt": "2025-01-01T00:00:00Z"
    },
    // More categories...
  ]
}
```

**Status Codes:**
- 200 OK: Categories returned

#### GET /api/categories/:id

Get a specific category.

**Parameters:**
- `id`: Category ID

**Response:**
```json
{
  "id": 1,
  "name": "JavaScript",
  "description": "Discussions about JavaScript programming language",
  "color": "#F7DF1E",
  "createdAt": "2025-01-01T00:00:00Z"
}
```

**Status Codes:**
- 200 OK: Category found
- 404 Not Found: Category not found

#### GET /api/categories/:id/threads

Get threads in a category.

**Parameters:**
- `id`: Category ID
- `limit` (optional): Number of threads to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Understanding JavaScript Closures",
      "userId": 3,
      "categoryId": 1,
      "createdAt": "2025-04-02T08:15:00Z",
      "updatedAt": "2025-04-03T10:30:00Z",
      "viewCount": 87,
      "isPinned": true,
      "isClosed": false
    },
    // More threads...
  ],
  "meta": {
    "total": 142,
    "limit": 20,
    "offset": 0
  }
}
```

**Status Codes:**
- 200 OK: Threads returned
- 404 Not Found: Category not found

#### POST /api/categories

Create a new category. Administrator authentication required.

**Request Body:**
```json
{
  "name": "Blockchain",
  "description": "Discussions about blockchain technology and development",
  "color": "#3C3C3D"
}
```

**Response:**
```json
{
  "id": 8,
  "name": "Blockchain",
  "description": "Discussions about blockchain technology and development",
  "color": "#3C3C3D",
  "createdAt": "2025-04-03T14:45:00Z"
}
```

**Status Codes:**
- 201 Created: Category created
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not an administrator

### Thread Endpoints

#### GET /api/threads

Get all threads with pagination.

**Parameters:**
- `limit` (optional): Number of threads to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "How to optimize React performance",
      "userId": 1,
      "categoryId": 3,
      "createdAt": "2025-04-03T12:00:00Z",
      "updatedAt": "2025-04-03T12:30:00Z",
      "viewCount": 120,
      "isPinned": false,
      "isClosed": false,
      "user": {
        "id": 1,
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "category": {
        "id": 3,
        "name": "React",
        "color": "#61DAFB"
      },
      "postCount": 8
    },
    // More threads...
  ],
  "meta": {
    "total": 278,
    "limit": 20,
    "offset": 0
  }
}
```

**Status Codes:**
- 200 OK: Threads returned

#### GET /api/threads/popular

Get popular threads.

**Parameters:**
- `limit` (optional): Number of threads to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:** Same as GET /api/threads but sorted by popularity (view count, post count)

**Status Codes:**
- 200 OK: Threads returned

#### GET /api/threads/recent

Get recent threads.

**Parameters:**
- `limit` (optional): Number of threads to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:** Same as GET /api/threads but sorted by recency (createdAt)

**Status Codes:**
- 200 OK: Threads returned

#### GET /api/threads/:id

Get a specific thread with its posts.

**Parameters:**
- `id`: Thread ID
- `limit` (optional): Number of posts to return (default: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "thread": {
    "id": 1,
    "title": "How to optimize React performance",
    "userId": 1,
    "categoryId": 3,
    "createdAt": "2025-04-03T12:00:00Z",
    "updatedAt": "2025-04-03T12:30:00Z",
    "viewCount": 121,
    "isPinned": false,
    "isClosed": false,
    "user": {
      "id": 1,
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "reputation": 150
    },
    "category": {
      "id": 3,
      "name": "React",
      "color": "#61DAFB"
    }
  },
  "posts": {
    "data": [
      {
        "id": 1,
        "content": "I've been working on optimizing my React application...",
        "userId": 1,
        "threadId": 1,
        "parentId": null,
        "createdAt": "2025-04-03T12:00:00Z",
        "updatedAt": "2025-04-03T12:00:00Z",
        "isDeleted": false,
        "user": {
          "id": 1,
          "name": "John Doe",
          "avatar": "https://example.com/avatar.jpg",
          "reputation": 150
        },
        "voteCount": 12,
        "userVote": 1
      },
      // More posts...
    ],
    "meta": {
      "total": 8,
      "limit": 100,
      "offset": 0
    }
  }
}
```

**Status Codes:**
- 200 OK: Thread found
- 404 Not Found: Thread not found

#### POST /api/threads

Create a new thread. Authentication required.

**Request Body:**
```json
{
  "title": "How to implement JWT authentication",
  "categoryId": 2,
  "content": "I'm trying to implement JWT authentication in my Express application..."
}
```

**Response:**
```json
{
  "id": 10,
  "title": "How to implement JWT authentication",
  "userId": 1,
  "categoryId": 2,
  "createdAt": "2025-04-03T15:30:00Z",
  "updatedAt": "2025-04-03T15:30:00Z",
  "viewCount": 1,
  "isPinned": false,
  "isClosed": false,
  "initialPost": {
    "id": 45,
    "content": "I'm trying to implement JWT authentication in my Express application...",
    "userId": 1,
    "threadId": 10,
    "parentId": null,
    "createdAt": "2025-04-03T15:30:00Z",
    "updatedAt": "2025-04-03T15:30:00Z",
    "isDeleted": false
  }
}
```

**Status Codes:**
- 201 Created: Thread created
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in

#### PATCH /api/threads/:id

Update a thread. Authentication required with ownership or moderator status.

**Parameters:**
- `id`: Thread ID

**Request Body:** (all fields optional)
```json
{
  "title": "How to implement JWT authentication in Express",
  "categoryId": 5,
  "isPinned": true,
  "isClosed": false
}
```

**Response:**
```json
{
  "id": 10,
  "title": "How to implement JWT authentication in Express",
  "userId": 1,
  "categoryId": 5,
  "createdAt": "2025-04-03T15:30:00Z",
  "updatedAt": "2025-04-03T16:00:00Z",
  "viewCount": 5,
  "isPinned": true,
  "isClosed": false
}
```

**Status Codes:**
- 200 OK: Thread updated
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not authorized to update this thread
- 404 Not Found: Thread not found

### Post Endpoints

#### GET /api/posts/:id

Get a specific post.

**Parameters:**
- `id`: Post ID

**Response:**
```json
{
  "id": 1,
  "content": "I've been working on optimizing my React application...",
  "userId": 1,
  "threadId": 1,
  "parentId": null,
  "createdAt": "2025-04-03T12:00:00Z",
  "updatedAt": "2025-04-03T12:00:00Z",
  "isDeleted": false,
  "user": {
    "id": 1,
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "reputation": 150
  },
  "voteCount": 12,
  "userVote": 1
}
```

**Status Codes:**
- 200 OK: Post found
- 404 Not Found: Post not found

#### POST /api/threads/:id/posts

Create a new post in a thread. Authentication required.

**Parameters:**
- `id`: Thread ID

**Request Body:**
```json
{
  "content": "This is my reply to the thread...",
  "parentId": 5
}
```

**Response:**
```json
{
  "id": 46,
  "content": "This is my reply to the thread...",
  "userId": 1,
  "threadId": 10,
  "parentId": 5,
  "createdAt": "2025-04-03T16:15:00Z",
  "updatedAt": "2025-04-03T16:15:00Z",
  "isDeleted": false
}
```

**Status Codes:**
- 201 Created: Post created
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 404 Not Found: Thread not found
- 422 Unprocessable Entity: Thread is closed

#### PATCH /api/posts/:id

Update a post. Authentication required with ownership or moderator status.

**Parameters:**
- `id`: Post ID

**Request Body:**
```json
{
  "content": "Updated content with more details..."
}
```

**Response:**
```json
{
  "id": 46,
  "content": "Updated content with more details...",
  "userId": 1,
  "threadId": 10,
  "parentId": 5,
  "createdAt": "2025-04-03T16:15:00Z",
  "updatedAt": "2025-04-03T16:30:00Z",
  "isDeleted": false
}
```

**Status Codes:**
- 200 OK: Post updated
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not authorized to update this post
- 404 Not Found: Post not found

#### DELETE /api/posts/:id

Mark a post as deleted. Authentication required with ownership or moderator status.

**Parameters:**
- `id`: Post ID

**Response:** Empty with status 204 No Content

**Status Codes:**
- 204 No Content: Post marked as deleted
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not authorized to delete this post
- 404 Not Found: Post not found

### Vote Endpoints

#### POST /api/posts/:id/votes

Vote on a post. Authentication required.

**Parameters:**
- `id`: Post ID

**Request Body:**
```json
{
  "value": 1  // 1 for upvote, -1 for downvote
}
```

**Response:**
```json
{
  "userId": 1,
  "postId": 46,
  "value": 1,
  "createdAt": "2025-04-03T16:45:00Z"
}
```

**Status Codes:**
- 200 OK: Vote recorded
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 404 Not Found: Post not found

#### GET /api/posts/:id/votes

Get votes for a post.

**Parameters:**
- `id`: Post ID

**Response:**
```json
{
  "data": [
    {
      "userId": 1,
      "postId": 46,
      "value": 1,
      "createdAt": "2025-04-03T16:45:00Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg"
      }
    },
    // More votes...
  ],
  "summary": {
    "upvotes": 8,
    "downvotes": 2,
    "total": 6
  }
}
```

**Status Codes:**
- 200 OK: Votes returned
- 404 Not Found: Post not found

### Subscription Endpoints

#### GET /api/subscriptions

Get current user's subscriptions. Authentication required.

**Response:**
```json
{
  "data": [
    {
      "id": 3,
      "userId": 1,
      "threadId": 5,
      "categoryId": null,
      "notifyByEmail": true,
      "notifyInPlatform": true,
      "createdAt": "2025-04-01T09:00:00Z",
      "thread": {
        "id": 5,
        "title": "Best practices for API design"
      }
    },
    {
      "id": 7,
      "userId": 1,
      "threadId": null,
      "categoryId": 3,
      "notifyByEmail": true,
      "notifyInPlatform": true,
      "createdAt": "2025-04-02T14:30:00Z",
      "category": {
        "id": 3,
        "name": "React"
      }
    },
    // More subscriptions...
  ]
}
```

**Status Codes:**
- 200 OK: Subscriptions returned
- 401 Unauthorized: Not logged in

#### POST /api/subscriptions

Create a new subscription. Authentication required.

**Request Body:**
```json
{
  "threadId": 10,        // Optional if categoryId is provided
  "categoryId": null,    // Optional if threadId is provided
  "notifyByEmail": true,
  "notifyInPlatform": true
}
```

**Response:**
```json
{
  "id": 12,
  "userId": 1,
  "threadId": 10,
  "categoryId": null,
  "notifyByEmail": true,
  "notifyInPlatform": true,
  "createdAt": "2025-04-03T17:00:00Z"
}
```

**Status Codes:**
- 201 Created: Subscription created
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 409 Conflict: Subscription already exists

#### DELETE /api/subscriptions/:id

Delete a subscription. Authentication required with ownership.

**Parameters:**
- `id`: Subscription ID

**Response:** Empty with status 204 No Content

**Status Codes:**
- 204 No Content: Subscription deleted
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not authorized to delete this subscription
- 404 Not Found: Subscription not found

### Notification Endpoints

#### GET /api/notifications

Get current user's notifications. Authentication required.

**Parameters:**
- `limit` (optional): Number of notifications to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": 5,
      "userId": 1,
      "type": "thread_reply",
      "content": "Someone replied to your thread 'How to optimize React performance'",
      "relatedId": 46,
      "isRead": false,
      "createdAt": "2025-04-03T16:15:00Z"
    },
    // More notifications...
  ],
  "meta": {
    "total": 12,
    "unread": 3,
    "limit": 20,
    "offset": 0
  }
}
```

**Status Codes:**
- 200 OK: Notifications returned
- 401 Unauthorized: Not logged in

#### PATCH /api/notifications/:id

Mark a notification as read. Authentication required with ownership.

**Parameters:**
- `id`: Notification ID

**Response:**
```json
{
  "id": 5,
  "userId": 1,
  "type": "thread_reply",
  "content": "Someone replied to your thread 'How to optimize React performance'",
  "relatedId": 46,
  "isRead": true,
  "createdAt": "2025-04-03T16:15:00Z"
}
```

**Status Codes:**
- 200 OK: Notification updated
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not authorized to update this notification
- 404 Not Found: Notification not found

#### PATCH /api/notifications/read-all

Mark all notifications as read. Authentication required.

**Response:** Empty with status 204 No Content

**Status Codes:**
- 204 No Content: All notifications marked as read
- 401 Unauthorized: Not logged in

### Flag Endpoints

#### POST /api/flags

Flag a post for moderation. Authentication required.

**Request Body:**
```json
{
  "postId": 46,
  "reason": "This post contains offensive content"
}
```

**Response:**
```json
{
  "id": 8,
  "userId": 1,
  "postId": 46,
  "reason": "This post contains offensive content",
  "status": "pending",
  "createdAt": "2025-04-03T17:30:00Z"
}
```

**Status Codes:**
- 201 Created: Flag created
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 404 Not Found: Post not found
- 409 Conflict: User has already flagged this post

#### GET /api/flags

Get all flags. Moderator authentication required.

**Parameters:**
- `limit` (optional): Number of flags to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)
- `status` (optional): Filter by status ('pending', 'resolved', 'dismissed')

**Response:**
```json
{
  "data": [
    {
      "id": 8,
      "userId": 1,
      "postId": 46,
      "reason": "This post contains offensive content",
      "status": "pending",
      "createdAt": "2025-04-03T17:30:00Z",
      "user": {
        "id": 1,
        "name": "John Doe"
      },
      "post": {
        "id": 46,
        "content": "...",
        "threadId": 10
      }
    },
    // More flags...
  ],
  "meta": {
    "total": 15,
    "pending": 8,
    "limit": 20,
    "offset": 0
  }
}
```

**Status Codes:**
- 200 OK: Flags returned
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not a moderator

#### PATCH /api/flags/:id

Update flag status. Moderator authentication required.

**Parameters:**
- `id`: Flag ID

**Request Body:**
```json
{
  "status": "resolved"  // 'resolved' or 'dismissed'
}
```

**Response:**
```json
{
  "id": 8,
  "userId": 1,
  "postId": 46,
  "reason": "This post contains offensive content",
  "status": "resolved",
  "createdAt": "2025-04-03T17:30:00Z"
}
```

**Status Codes:**
- 200 OK: Flag updated
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Not logged in
- 403 Forbidden: Not a moderator
- 404 Not Found: Flag not found