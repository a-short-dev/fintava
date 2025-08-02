# Contributing to Fintava Pay SDK

Thanks for your interest in contributing to the **Fintava Pay JavaScript SDK**! This is a community-driven project authorized by the FintavaPay team.

We welcome issues, feature requests, bug fixes, documentation improvements, and new features. This guide outlines how to set up your environment, contribute code, and follow our standards.

---

## 🧱 Project Structure

```
fintava-pay/
├── .changeset/           # Versioning with Changesets
├── .github/              # GitHub workflows and templates
│   ├── workflows/        # CI/CD workflows
│   └── PULL_REQUEST_TEMPLATE.md
├── examples/             # Usage examples
│   ├── basic-usage.js    # Server-side example
│   └── client-payment.html # Client-side example
├── src/                  # SDK source code
│   ├── client/           # Client-side SDK
│   ├── server/           # Server-side SDK
│   │   └── modules/      # Individual service modules
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Shared utilities
│   └── index.ts          # Main entry point
├── test/                 # Unit and integration tests
├── dist/                 # Build output (auto-generated)
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
├── jest.config.js        # Jest testing configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .editorconfig         # Editor configuration
├── .gitignore            # Git ignore rules
├── LICENSE               # MIT License
├── README.md             # Project documentation
├── CONTRIBUTING.md       # This file
└── CHANGELOG.md          # Version history
```

---

## 🛠️ Local Setup

### Prerequisites

- **Node.js** 16+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **pnpm** 9+ (install with `npm install -g pnpm`)
- **Git** for version control

### Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork**

```bash
git clone https://github.com/<your-username>/fintava-pay.git
cd fintava-pay
```

3. **Install dependencies**

```bash
pnpm install
```

4. **Build the project**

```bash
pnpm build
```

5. **Run tests to ensure everything works**

```bash
pnpm test
```

## 📋 Essential Commands for Newcomers

### Package Management
```bash
# Install all dependencies for the workspace
pnpm install

# Add a dependency to a specific package
pnpm add <package-name> --filter fintava

# Add a development dependency to a specific package
pnpm add -D <package-name> --filter fintava

# Remove a dependency from a specific package
pnpm remove <package-name> --filter fintava

# Update dependencies across all packages
pnpm update
```

### Development Workflow
```bash
# Start development mode for all packages
pnpm dev

# Start development mode for JavaScript SDK only
pnpm js:dev

# Build all packages
pnpm build

# Build JavaScript SDK only
pnpm js:build

# Run tests for all packages
pnpm test

# Run tests for JavaScript SDK only
pnpm js:test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Clean build artifacts
pnpm clean

# Clean all node_modules and build directories
pnpm clean:all

# Lint code
pnpm lint

# Format code
pnpm format

# Check types
pnpm type-check
```

### Git & Versioning
```bash
# Create a new feature branch
git checkout -b feat/your-feature-name

# Stage and commit changes
git add .
git commit -m "feat: add new feature"

# Create a changeset for your changes
pnpm changeset

# Push your branch
git push origin feat/your-feature-name
```

### Common Troubleshooting
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear build cache
rm -rf dist
pnpm build

# Reset to clean state
git clean -fdx
pnpm install
```

### Development Workflow

1. **Create a new branch** for your feature/fix

```bash
git checkout -b feat/your-feature-name
```

2. **Make your changes** and test them

3. **Run the full test suite**

```bash
pnpm test
pnpm lint
pnpm format
```

4. **Build the project** to ensure it compiles

```bash
pnpm build
```

5. **Commit your changes** with a descriptive message

6. **Push to your fork** and create a Pull Request

---

## 📄 Code Guidelines

### ✅ Code Style

We use **Prettier** and **ESLint** to enforce consistent formatting and code quality.

Before committing, format and lint your code:

```bash
pnpm format
pnpm lint
```

### ✅ TypeScript Standards

- **Use strong types** wherever possible
- **Avoid `any`** unless absolutely necessary (and document why)
- **Export types** from appropriate modules
- **Use interfaces** for object shapes
- **Use enums** for constants with multiple values
- **Document complex types** with JSDoc comments

### ✅ Code Organization

- **Server modules** go in `src/server/modules/`
- **Client code** goes in `src/client/`
- **Shared types** go in `src/types/`
- **Utilities** go in `src/utils/`
- **Tests** mirror the `src/` structure in `test/`

### ✅ Naming Conventions

- **Files**: Use kebab-case (`customer-management.ts`)
- **Classes**: Use PascalCase (`CustomerManager`)
- **Functions/Variables**: Use camelCase (`createCustomer`)
- **Constants**: Use SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: Use PascalCase (`CustomerData`)

### ✅ Documentation

- **Add JSDoc comments** for public APIs
- **Update README.md** if adding new features
- **Include examples** for new functionality
- **Document breaking changes** in changeset descriptions

---

## 🔀 Git Workflow

### Branch Naming

Use the following naming conventions:

- `feat/<feature-name>` – for new features
- `fix/<bug-name>` – for bug fixes
- `docs/<documentation-update>` – for documentation changes
- `test/<test-improvement>` – for test additions/improvements
- `refactor/<refactor-description>` – for code refactoring
- `chore/<task-name>` – for maintenance tasks

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Examples:**

```bash
feat(server): add customer management module
fix(client): resolve payment widget initialization issue
docs(readme): update installation instructions
test(utilities): add unit tests for HTTP client
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Guidelines

1. **Target the `main` branch** for all PRs
2. **Fill out the PR template** completely
3. **Link related issues** using keywords (e.g., "Closes #123")
4. **Ensure CI passes** before requesting review
5. **Keep PRs focused** - one feature/fix per PR
6. **Update documentation** if needed
7. **Add tests** for new functionality

---

## 🧪 Testing

We use **Jest** with **jsdom** environment for comprehensive testing.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage

# Run specific test file
pnpm test basic.test.ts
```

### Testing Guidelines

- **Write tests** for all new features and bug fixes
- **Test both success and error cases**
- **Use descriptive test names** that explain what is being tested
- **Group related tests** using `describe` blocks
- **Mock external dependencies** appropriately
- **Aim for high test coverage** (>80%)

### Test Structure

```typescript
describe("FeatureName", () => {
    describe("methodName", () => {
        it("should handle success case", () => {
            // Test implementation
        });

        it("should handle error case", () => {
            // Test implementation
        });
    });
});
```

### Test Requirements

- **All PRs must include tests** for new functionality
- **Bug fixes must include regression tests**
- **Tests must pass** before merging
- **No decrease in test coverage** without justification

---

## 📝 Version Management & Release Process

We use [Changesets](https://github.com/changesets/changesets) for semantic versioning and automated releases.

### Understanding Version Types

- **Patch** (1.0.0 → 1.0.1): Bug fixes, documentation updates, internal refactoring
- **Minor** (1.0.0 → 1.1.0): New features, backwards-compatible changes
- **Major** (1.0.0 → 2.0.0): Breaking changes, API modifications

### Creating a Changeset

When you make changes that affect users, create a changeset:

```bash
# Create a new changeset
pnpm changeset

# Follow the prompts:
# 1. Select packages to include (usually just the main package)
# 2. Choose version bump type (patch/minor/major)
# 3. Write a clear description of your changes
```

This creates a markdown file in `.changeset/` — it will be used later to publish a new version.

---

## 🚀 Publishing (Maintainers Only)

Only maintainers can publish the package to npm.

### Quick Release Commands

```bash
# For maintainers - quick release workflows
pnpm release:patch    # Bug fixes and patches
pnpm release:minor    # New features
pnpm release:major    # Breaking changes

# Manual process
pnpm changeset version  # Apply changesets to package.json
pnpm build             # Build the project
pnpm release          # Publish to npm
```

### Automated Releases

Releases are automated via GitHub Actions when changesets are merged to main branch.

This will:

- Apply the version bump from Changesets
- Publish the SDK to [npm](https://npmjs.com/package/fintava-pay)

---

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (Node.js version, OS, etc.)
- **Code samples** or minimal reproduction
- **Error messages** and stack traces

### Feature Requests

For new features, please provide:

- **Use case description** and motivation
- **Proposed API** or implementation approach
- **Examples** of how it would be used
- **Alternatives considered**

---

## 🤝 Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Help others** learn and grow
- **Give constructive feedback**
- **Focus on the code**, not the person
- **Assume good intentions**

### Getting Help

- **Check existing issues** before creating new ones
- **Use GitHub Discussions** for questions
- **Provide context** when asking for help
- **Search documentation** first

### Review Process

- **Reviews are learning opportunities** for everyone
- **Be patient** - maintainers are volunteers
- **Address feedback** constructively
- **Ask questions** if feedback is unclear

---

## 🚀 Release Process

### For Contributors

After your PR is merged, the maintainers will handle releases using our automated process. You don't need to worry about publishing - just ensure you've created appropriate changesets for your changes.

### For Maintainers

Releases are managed through Changesets and automated workflows:

1. **Review and merge** PRs with changesets
2. **Automated workflow** publishes new versions when changesets are merged
3. **Monitor releases** and update documentation as needed
4. **Use quick commands** for manual releases when needed

---

## 💬 Questions or Support?

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community chat
- **Official Fintava Support**: For platform-specific questions

---

## 🤝 Thank You!

Your contributions help improve the SDK for developers building with Fintava. This community-driven project thrives because of contributors like you!

**Special thanks to all our contributors** 🎉

---

_This project is authorized by the FintavaPay team and maintained by the community._
