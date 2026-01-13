# Linting and Code Quality Setup

This project uses modern linting and code quality tools to maintain consistency and catch errors early.

## Tools

### ESLint (Flat Config)

- **Version**: ESLint 9+ with flat config (`eslint.config.js`)
- **Supported Languages**: JavaScript, TypeScript, Vue, React
- **Configuration**: `eslint.config.js`

### Stylelint

- **Purpose**: Linting CSS, SCSS, and Vue styles
- **Tailwind Support**: Configured to work with Tailwind CSS utilities
- **Configuration**: `stylelint.config.js`

### Commitlint

- **Purpose**: Enforce conventional commit messages
- **Configuration**: `commitlint.config.js`
- **Format**: `type(scope?): subject`

### Husky

- **Purpose**: Git hooks for automated checks
- **Hooks**:
  - `pre-commit`: Runs linting and formatting before commits
  - `commit-msg`: Validates commit messages

## Available Scripts

```bash
# Linting
npm run lint              # Run ESLint
npm run lint:fix          # Run ESLint with auto-fix
npm run lint:style        # Run Stylelint
npm run lint:style:fix    # Run Stylelint with auto-fix

# Formatting
npm run format            # Format code with Prettier
npm run format:check      # Check formatting without modifying

# Type checking
npm run type-check        # Run TypeScript type checking
```

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope?): subject

body?

footer?
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependencies
- `ci`: CI/CD changes
- `chore`: Other changes
- `revert`: Revert a previous commit

### Examples

```bash
feat: add breadcrumb component
fix(button): resolve hover state issue
docs: update README with installation steps
style: format code with prettier
refactor(icons): migrate to auto-generated components
```

## Git Hooks

### Pre-commit Hook

Automatically runs before each commit:

1. ESLint with auto-fix
2. Stylelint with auto-fix
3. Prettier formatting

### Commit-msg Hook

Validates commit messages against conventional commit format.

## Setup

After cloning the repository, install dependencies:

```bash
npm install
```

Husky will be automatically initialized via the `prepare` script.

## IDE Integration

### VS Code

Install the following extensions:

- ESLint
- Stylelint
- Prettier

Recommended settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "eslint.experimental.useFlatConfig": true
}
```

## Troubleshooting

### ESLint not working

- Ensure you're using ESLint 9+
- Check that `eslint.config.js` exists
- Restart your IDE

### Stylelint errors with Tailwind

- Tailwind utilities are configured to be ignored
- Check `stylelint.config.js` for at-rule exceptions

### Commit message rejected

- Follow the conventional commit format
- Use one of the allowed types
- Keep subject line under 100 characters
