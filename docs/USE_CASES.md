# DevQuest Use Cases

This document outlines the primary use cases for the DevQuest programming forum platform, organized by functional area.

## User Management Use Cases

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

### UC-1: Register Account
- **Actor**: Visitor
- **Description**: User creates a new account on the forum
- **Preconditions**: User is not logged in
- **Steps**:
  1. User navigates to the registration page
  2. User provides name, email, and password
  3. User submits the form
  4. System validates the input
  5. System creates a new user account
  6. System logs the user in
- **Postconditions**: User has a new account and is logged in
- **Exceptions**:
  - Email is already registered
  - Password doesn't meet complexity requirements

### UC-2: Login
- **Actor**: Registered User
- **Description**: User authenticates with the system
- **Preconditions**: User has a registered account but is not logged in
- **Steps**:
  1. User navigates to the login page
  2. User enters email and password
  3. User submits the form
  4. System validates credentials
  5. System creates a session
- **Postconditions**: User is logged in
- **Exceptions**:
  - Invalid credentials
  - Account locked (after multiple failed attempts)

### UC-3: Logout
- **Actor**: Logged-in User
- **Description**: User terminates their active session
- **Preconditions**: User is logged in
- **Steps**:
  1. User clicks on the logout button
  2. System terminates the user's session
- **Postconditions**: User is logged out

### UC-4: Manage Profile
- **Actor**: Logged-in User
- **Description**: User updates their profile information
- **Preconditions**: User is logged in
- **Steps**:
  1. User navigates to profile settings
  2. User updates bio, avatar, programming languages, and other information
  3. User submits changes
  4. System updates the user's profile
- **Postconditions**: User's profile is updated
- **Exceptions**:
  - Invalid input
  - File size too large (for avatar uploads)

### UC-5: Reset Password
- **Actor**: Registered User
- **Description**: User resets forgotten password
- **Preconditions**: User has a registered account
- **Steps**:
  1. User navigates to password reset page
  2. User enters email address
  3. System sends password reset link
  4. User clicks link and enters new password
  5. System updates the password
- **Postconditions**: User's password is reset
- **Exceptions**:
  - Email not found in system
  - Reset link expired

### UC-6: View Achievements
- **Actor**: Logged-in User
- **Description**: User views earned badges and reputation
- **Preconditions**: User is logged in
- **Steps**:
  1. User navigates to profile or achievements page
  2. System displays badges, reputation points, and achievements
- **Postconditions**: None
- **Exceptions**: None

## Content Management Use Cases

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

### UC-7: Browse Categories
- **Actor**: Any User
- **Description**: User browses forum categories
- **Preconditions**: None
- **Steps**:
  1. User navigates to categories page
  2. System displays all categories
  3. User selects a category
  4. System displays threads in the selected category
- **Postconditions**: None
- **Exceptions**: None

### UC-8: Create Thread
- **Actor**: Logged-in User
- **Description**: User creates a new discussion thread
- **Preconditions**: User is logged in
- **Steps**:
  1. User navigates to new thread page
  2. User selects a category
  3. User enters thread title and initial post content
  4. User submits the form
  5. System creates the thread and initial post
- **Postconditions**: New thread is created
- **Exceptions**:
  - Missing required fields
  - Content violates forum rules

### UC-9: Reply to Thread
- **Actor**: Logged-in User
- **Description**: User adds a post to an existing thread
- **Preconditions**: User is logged in, thread exists and is not closed
- **Steps**:
  1. User navigates to thread
  2. User enters post content
  3. User submits the post
  4. System adds the post to the thread
- **Postconditions**: New post is added to thread
- **Exceptions**:
  - Thread is closed
  - Content violates forum rules

### UC-10: Vote on Post
- **Actor**: Logged-in User
- **Description**: User votes on a post (upvote/downvote)
- **Preconditions**: User is logged in, post exists
- **Steps**:
  1. User clicks upvote or downvote button on a post
  2. System records the vote
  3. System updates post score and user reputation
- **Postconditions**: Vote is recorded, post score and user reputation updated
- **Exceptions**:
  - User already voted on this post
  - User tries to vote on own post

### UC-11: Search Content
- **Actor**: Any User
- **Description**: User searches for content
- **Preconditions**: None
- **Steps**:
  1. User enters search terms
  2. System searches threads and posts
  3. System displays results
- **Postconditions**: None
- **Exceptions**: None

### UC-12: Flag Content
- **Actor**: Logged-in User
- **Description**: User flags inappropriate content for moderation
- **Preconditions**: User is logged in, content exists
- **Steps**:
  1. User clicks flag button on a post
  2. User selects reason for flagging
  3. User submits the flag
  4. System creates a flag record
- **Postconditions**: Content is flagged for moderation
- **Exceptions**: None

## Reputation and Badges Use Cases

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

### UC-13: Earn Reputation
- **Actor**: Logged-in User
- **Description**: User earns reputation points for positive contributions
- **Preconditions**: User is logged in
- **Steps**:
  1. User performs actions that earn reputation (receive upvotes, accepted answers, etc.)
  2. System calculates and awards reputation points
- **Postconditions**: User's reputation increases
- **Exceptions**: None

### UC-14: Earn Badges
- **Actor**: Logged-in User
- **Description**: User earns achievement badges
- **Preconditions**: User is logged in
- **Steps**:
  1. User meets criteria for a badge (e.g., post count, reputation threshold)
  2. System awards badge to user
  3. System notifies user of new badge
- **Postconditions**: User earns a badge
- **Exceptions**: None

### UC-15: Gain Special Privileges
- **Actor**: Logged-in User
- **Description**: User unlocks new site capabilities based on reputation
- **Preconditions**: User has sufficient reputation
- **Steps**:
  1. User reaches a reputation threshold
  2. System enables new privileges for the user
- **Postconditions**: User has new capabilities
- **Exceptions**: None

### UC-16: Display Badges on Profile
- **Actor**: Logged-in User
- **Description**: User selects which badges to display prominently
- **Preconditions**: User is logged in and has earned badges
- **Steps**:
  1. User navigates to badge settings
  2. User selects badges to display
  3. System updates badge display settings
- **Postconditions**: Selected badges are displayed on profile
- **Exceptions**: None

## Notification Use Cases

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

### UC-17: Subscribe to Thread/Category
- **Actor**: Logged-in User
- **Description**: User subscribes to receive notifications
- **Preconditions**: User is logged in
- **Steps**:
  1. User navigates to thread or category
  2. User clicks subscribe button
  3. System creates subscription record
- **Postconditions**: User is subscribed
- **Exceptions**: None

### UC-18: Receive Notifications
- **Actor**: Logged-in User
- **Description**: User receives notifications for relevant events
- **Preconditions**: User is logged in and has subscriptions
- **Steps**:
  1. An event occurs that triggers notification (reply to thread, mention, etc.)
  2. System creates notification record
  3. User views notification in the UI
- **Postconditions**: User is notified of event
- **Exceptions**: None

### UC-19: Mark Notification as Read
- **Actor**: Logged-in User
- **Description**: User marks notifications as read
- **Preconditions**: User is logged in and has notifications
- **Steps**:
  1. User clicks on notification or mark-as-read button
  2. System updates notification status
- **Postconditions**: Notification is marked as read
- **Exceptions**: None

## Moderation Use Cases

```
┌───────────────────────────────────────────────────────┐
│                     Moderator                         │
└────────┬──────────────────┬───────────────────────────┘
         │                  │                          
         ▼                  ▼                          
┌──────────────────┐ ┌─────────────────────────────────┐
│  Review Flagged  │ │     Close/Reopen Thread         │
│   Content        │ │                                 │
└───────┬──────────┘ └─────────────────────────────────┘
        │                                              
        ▼                                              
┌──────────────────┐ ┌─────────────────────────────────┐
│  Delete/Edit     │ │       Pin/Unpin Thread          │
│  Content         │ │                                 │
└──────────────────┘ └─────────────────────────────────┘
```

### UC-20: Review Flagged Content
- **Actor**: Moderator
- **Description**: Moderator reviews content flagged by users
- **Preconditions**: User has moderator role, content has been flagged
- **Steps**:
  1. Moderator navigates to moderation queue
  2. System displays flagged content
  3. Moderator reviews the content
  4. Moderator takes appropriate action
- **Postconditions**: Flag is resolved
- **Exceptions**: None

### UC-21: Delete/Edit Content
- **Actor**: Moderator
- **Description**: Moderator removes or edits inappropriate content
- **Preconditions**: User has moderator role
- **Steps**:
  1. Moderator navigates to the content
  2. Moderator clicks edit or delete button
  3. Moderator confirms action
  4. System updates or removes content
- **Postconditions**: Content is modified or removed
- **Exceptions**: None

### UC-22: Close/Reopen Thread
- **Actor**: Moderator
- **Description**: Moderator closes or reopens a thread
- **Preconditions**: User has moderator role, thread exists
- **Steps**:
  1. Moderator navigates to thread
  2. Moderator clicks close or reopen button
  3. System updates thread status
- **Postconditions**: Thread is closed or reopened
- **Exceptions**: None

### UC-23: Pin/Unpin Thread
- **Actor**: Moderator
- **Description**: Moderator pins or unpins a thread
- **Preconditions**: User has moderator role, thread exists
- **Steps**:
  1. Moderator navigates to thread
  2. Moderator clicks pin or unpin button
  3. System updates thread pin status
- **Postconditions**: Thread is pinned or unpinned
- **Exceptions**: None

## Administrator Use Cases

```
┌───────────────────────────────────────────────────────┐
│                    Administrator                      │
└────────┬──────────────────┬───────────────────────────┘
         │                  │                          
         ▼                  ▼                          
┌──────────────────┐ ┌─────────────────────────────────┐
│  Manage Users    │ │     Create/Edit Categories      │
│                  │ │                                 │
└───────┬──────────┘ └─────────────────────────────────┘
        │                                              
        ▼                                              
┌──────────────────┐ ┌─────────────────────────────────┐
│  Assign Roles    │ │       System Configuration      │
│                  │ │                                 │
└──────────────────┘ └─────────────────────────────────┘
```

### UC-24: Manage Users
- **Actor**: Administrator
- **Description**: Administrator manages user accounts
- **Preconditions**: User has administrator role
- **Steps**:
  1. Administrator navigates to user management
  2. System displays user list
  3. Administrator selects a user
  4. Administrator takes action (suspend, reset password, etc.)
- **Postconditions**: User account is modified
- **Exceptions**: None

### UC-25: Create/Edit Categories
- **Actor**: Administrator
- **Description**: Administrator creates or modifies forum categories
- **Preconditions**: User has administrator role
- **Steps**:
  1. Administrator navigates to category management
  2. Administrator creates or edits a category
  3. System updates categories
- **Postconditions**: Categories are updated
- **Exceptions**: None

### UC-26: Assign Roles
- **Actor**: Administrator
- **Description**: Administrator assigns roles to users
- **Preconditions**: User has administrator role
- **Steps**:
  1. Administrator navigates to user management
  2. Administrator selects a user
  3. Administrator assigns or removes roles
  4. System updates user roles
- **Postconditions**: User roles are updated
- **Exceptions**: None

### UC-27: System Configuration
- **Actor**: Administrator
- **Description**: Administrator configures system settings
- **Preconditions**: User has administrator role
- **Steps**:
  1. Administrator navigates to system settings
  2. Administrator modifies settings
  3. System applies new configuration
- **Postconditions**: System settings are updated
- **Exceptions**: None