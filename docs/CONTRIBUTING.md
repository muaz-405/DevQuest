# Contributing to DevQuest

Thank you for your interest in contributing to DevQuest! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before submitting a bug report:

1. Check if the issue has already been reported
2. Ensure you're using the latest version
3. Check the documentation and FAQ

When submitting a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (browser, OS, device)

### Suggesting Features

Feature suggestions are welcome. To suggest a feature:

1. Provide a clear and descriptive title
2. Explain why this feature would be useful
3. Provide as much detail as possible
4. Include mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Add or update tests as necessary
5. Ensure the test suite passes
6. Make sure your code follows the style guidelines
7. Submit a pull request

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure environment variables
4. Start the development server: `npm run dev`

## Coding Guidelines

### JavaScript/TypeScript

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for type safety
- Use async/await for asynchronous code
- Write self-documenting code with clear variable and function names

### React

- Use functional components with hooks
- Keep components small and focused
- Use appropriate component composition
- Follow React best practices

### CSS/Tailwind

- Use Tailwind CSS utility classes
- For custom CSS, follow the [BEM methodology](http://getbem.com/)
- Keep specificity low
- Organize CSS logically

### Testing

- Write unit tests for utilities and hooks
- Write component tests for UI components
- Write integration tests for critical user flows
- Ensure tests are maintainable and not brittle

## Commit Guidelines

- Use [Conventional Commits](https://www.conventionalcommits.org/) format
- Keep commits focused and atomic
- Write clear commit messages
- Reference issues in commit messages when applicable

Example commit messages:

```
feat: add user badge display on profile page
fix: resolve issue with comment sorting
docs: update API documentation
style: format code according to style guide
refactor: simplify thread subscription logic
test: add tests for vote functionality
chore: update dependencies
```

## Pull Request Process

1. Update documentation if necessary
2. Add tests for new functionality
3. Ensure all tests pass
4. Get review from at least one team member
5. Address review feedback
6. Squash commits before merging

## License

By contributing to DevQuest, you agree that your contributions will be licensed under the project's license.

## Questions?

If you have any questions about contributing, please open an issue or contact one of the project maintainers.

---

Thank you for contributing to DevQuest! Your efforts help make this project better for everyone.