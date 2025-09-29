# Contributing to onCare

Thank you for your interest in contributing to onCare! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/Oncure.git
   cd Oncure
   ```

2. **Set Up Development Environment**
   - Follow the [Development Instructions](documentation/instructions.md)
   - Read the [Project Structure](documentation/PROJECT_STRUCTURE.md)
   - Review the [Style Guide](documentation/style-guide.md)

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

### Development Workflow

#### 1. **Before Starting Work**
- Check existing issues and pull requests
- Discuss major changes in team meetings
- Assign yourself to issues
- Update project board/tracking system

#### 2. **During Development**
- Follow the [Style Guide](documentation/style-guide.md)
- Write clear, self-documenting code
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

#### 3. **Before Submitting**
- Run tests: `npm test` (frontend) and `go test` (backend)
- Check code formatting: `npm run lint`
- Update relevant documentation
- Test deployment locally

## 📋 Pull Request Process

### Creating a Pull Request

1. **Ensure your branch is up to date**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Push your changes**
   ```bash
   git push origin your-branch
   ```

3. **Create Pull Request**
   - Use the provided PR template
   - Include clear description of changes
   - Reference related issues
   - Add screenshots for UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #issue-number
```

## 🎯 Code Standards

### Frontend (Next.js/React)
- Use functional components with hooks
- Follow the [Style Guide](documentation/style-guide.md)
- Use TypeScript where possible
- Implement responsive design
- Add proper error handling

### Backend (Go)
- Follow Go naming conventions
- Add proper error handling
- Write unit tests for new functions
- Document public functions
- Use consistent database patterns

### Database
- Create migrations for schema changes
- Test migrations on both SQLite and PostgreSQL
- Document any breaking changes
- Follow naming conventions

## 🧪 Testing Requirements

### Frontend Testing
```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Backend Testing
```bash
# Run tests
go test ./...

# Run with coverage
go test -cover ./...
```

## 📝 Documentation Requirements

### Code Documentation
- Document all public functions
- Add inline comments for complex logic
- Update README if needed
- Create/update technical documentation

### Commit Messages
Use conventional commit format:
```
type(scope): description

Examples:
feat(auth): add user registration
fix(chat): resolve websocket connection issue
docs(readme): update installation instructions
```

## 🚫 What NOT to Do

- Don't commit directly to main branch
- Don't submit PRs without testing
- Don't ignore code review feedback
- Don't merge your own PRs
- Don't commit sensitive information (API keys, passwords)

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority issue
- `priority: medium`: Medium priority issue
- `priority: low`: Low priority issue

## 📞 Getting Help

- **Technical Questions**: Ask in team meetings or Slack
- **Code Review**: Tag relevant team members
- **Urgent Issues**: Contact project maintainers directly
- **General Questions**: Use GitHub Discussions

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Team meetings

## 📋 Checklist for Contributors

Before submitting your first PR, make sure you have:

- [ ] Read this contributing guide
- [ ] Set up development environment
- [ ] Joined team communication channels
- [ ] Understood the project structure
- [ ] Reviewed the style guide
- [ ] Attended a team meeting
- [ ] Assigned yourself to an issue

## 🔄 Review Process

1. **Automated Checks**: CI/CD pipeline runs tests
2. **Code Review**: At least one team member reviews
3. **Testing**: Reviewer tests the changes
4. **Approval**: Maintainer approves and merges
5. **Deployment**: Changes deployed to staging/production

## 📈 Contribution Guidelines

- **Small, Focused Changes**: Keep PRs small and focused
- **Regular Communication**: Update team on progress
- **Ask Questions**: Don't hesitate to ask for help
- **Be Respectful**: Follow team code of conduct
- **Learn and Share**: Share knowledge with team

---

**Thank you for contributing to onCare! Together, we're building something meaningful for cancer patients and their families.**
