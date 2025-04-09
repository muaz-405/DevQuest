# DevQuest Database ERD (Entity Relationship Diagram)

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

## Table Relationships

### One-to-Many Relationships
- User → Threads: A user can create many threads
- User → Posts: A user can create many posts
- Category → Threads: A category can contain many threads
- Thread → Posts: A thread can contain many posts
- Post → Posts: A post can have many child posts (replies)

### Many-to-Many Relationships
- Users ↔ Posts (via votes): Users can vote on many posts, posts can be voted on by many users
- Users ↔ Badges (via userBadges): Users can earn many badges, badges can be earned by many users

### Primary Key / Foreign Key Relationships
- threads.userId → users.id
- threads.categoryId → categories.id
- posts.userId → users.id
- posts.threadId → threads.id
- posts.parentId → posts.id
- votes.userId → users.id
- votes.postId → posts.id
- subscriptions.userId → users.id
- subscriptions.threadId → threads.id
- subscriptions.categoryId → categories.id
- notifications.userId → users.id
- flags.userId → users.id
- flags.postId → posts.id
- userBadges.userId → users.id
- userBadges.badgeId → badges.id

## Schema Details

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  bio TEXT,
  website_url TEXT,
  portfolio_url TEXT,
  programming_languages JSONB,
  expertise JSONB,
  avatar TEXT,
  reputation INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Threads Table
```sql
CREATE TABLE threads (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_closed BOOLEAN DEFAULT FALSE
);
```

### Posts Table
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  thread_id INTEGER NOT NULL REFERENCES threads(id),
  parent_id INTEGER REFERENCES posts(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);
```

### Votes Table
```sql
CREATE TABLE votes (
  user_id INTEGER NOT NULL REFERENCES users(id),
  post_id INTEGER NOT NULL REFERENCES posts(id),
  value INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  thread_id INTEGER REFERENCES threads(id),
  category_id INTEGER REFERENCES categories(id),
  notify_by_email BOOLEAN DEFAULT TRUE,
  notify_in_platform BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  related_id INTEGER,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Flags Table
```sql
CREATE TABLE flags (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  post_id INTEGER NOT NULL REFERENCES posts(id),
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Badges Table
```sql
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  reputation_points INTEGER NOT NULL DEFAULT 0,
  criteria JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### User Badges Table
```sql
CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  badge_id INTEGER NOT NULL REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT NOW(),
  display_on_profile BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (user_id, badge_id)
);
```