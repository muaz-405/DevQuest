
# DevQuest - Programming Forum Platform

A collaborative programming forum platform designed to facilitate code sharing, learning, and community interaction.

## Features

- User authentication and profile management
- Thread creation and browsing by categories
- Code snippet sharing with syntax highlighting
- Reputation system with badges
- Responsive design for all devices
- Real-time notifications
- User profile customization
- Code discussion threads
- Advanced search capabilities
- Community moderation tools

## Technology Stack

- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL 
- **Authentication**: Passport.js
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at the Replit-provided URL.

## Project Structure

```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── pages/      # Page components
├── server/           # Backend Express server
│   ├── lib/         # Server utilities
│   ├── auth.ts      # Authentication logic
│   └── routes.ts    # API routes
├── shared/          # Shared types and schemas
└── docs/            # Project documentation
```

## Features Implementation

1. **User Management**
   - Registration and authentication
   - Profile customization
   - Reputation tracking
   - Badge system

2. **Content Management**
   - Thread creation and management
   - Category organization
   - Code snippet sharing
   - Syntax highlighting

3. **Community Features**
   - Voting system
   - User reputation
   - Achievement badges
   - Notifications

4. **Code Sharing**
   - Syntax highlighting
   - Code formatting
   - Multiple language support
   - Copy functionality

## Documentation

For more detailed information, please refer to:
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_ERD.md)
- [Use Cases](docs/USE_CASES.md)
- [Project Documentation](docs/PROJECT_DOCUMENTATION.md)

## Contributing

Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
# DevQuest
