# Contributing to Fintava Pay SDK

Thanks for your interest in contributing to the **Fintava Pay JavaScript SDK**!

We welcome issues, feature requests, bug fixes, and documentation improvements. This guide outlines how to set up your environment, contribute code, and follow our standards.

---

## 🧱 Project Structure

```
fintava-pay/
├── src/               # SDK source code
├── tests/             # Unit tests
├── dist/              # Build output (auto-generated)
├── .changeset/        # Versioning with Changesets
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Local Setup

1. **Fork and clone** the repo

```bash
git clone https://github.com/<your-username>/fintava-pay.git
cd fintava-pay
pnpm install
```

2. **Run the dev compiler**

```bash
pnpm dev
```

This will watch the `src/` folder and output compiled files into `dist/`.

---

## 📄 Code Guidelines

### ✅ Code Style

We use **Prettier** and **ESLint** to enforce consistent formatting and code quality.

Before committing, format and lint your code:

```bash
pnpm format
pnpm lint
```

### ✅ TypeScript Rules

- Use strong types wherever possible
- Prefer `zod` schemas for validating request/response bodies
- Avoid using `any` unless necessary (and document why)

---

## 🔀 Branching

Use the following naming conventions:

- `feat/<feature-name>` – for new features
- `fix/<bug-name>` – for bug fixes
- `chore/<task-name>` – for non-code changes (e.g., config)

Then push your branch and create a Pull Request to the `main` branch.

---

## 🧪 Testing

We use **Jest** for testing.

To run tests:

```bash
pnpm test
```

To run in watch mode:

```bash
pnpm test --watch
```

Make sure your PR passes all tests before submission.

---

## 📝 Creating a Changeset

We use [Changesets](https://github.com/changesets/changesets) to manage semantic versioning.

After making a change, run:

```bash
pnpm changeset
```

Follow the CLI prompts to:

- Select the packages you changed
- Choose the version bump (`patch`, `minor`, or `major`)
- Describe your change

This creates a markdown file in `.changeset/` — it will be used later to publish a new version.

---

## 🚀 Publishing (Maintainers Only)

Only maintainers can publish the package to npm.

To publish a release:

```bash
pnpm build
pnpm release
```

This will:

- Apply the version bump from Changesets
- Publish the SDK to [npm](https://npmjs.com/package/fintava-pay)

---

## 💬 Questions or Issues?

Open an issue or start a discussion in [GitHub Discussions](https://github.com/a-short-dev/fintava/discussions) if enabled.

You can also submit bugs, feature ideas, or suggestions as [GitHub Issues](https://github.com/a-short-dev/fintava/issues).

---

## 🤝 Thank You!

Your contributions help improve the SDK for developers building with Fintava. We appreciate your support!

—
*Fintava Team*
