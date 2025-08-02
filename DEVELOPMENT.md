# Development Guide

This guide provides detailed information for developers working on the Fintava JavaScript SDK.

## Project Architecture

### Core Structure

```
src/
├── client/           # Browser-side SDK
│   └── index.ts      # Payment widget, checkout flow
├── server/           # Node.js server SDK
│   ├── index.ts      # Main server entry point
│   └── modules/      # Individual service modules
│       ├── customer.ts
│       ├── wallet.ts
│       ├── transfer.ts
│       ├── card.ts
│       ├── virtual-account.ts
│       ├── utilities.ts
│       └── webhook.ts
├── types/            # Shared TypeScript definitions
│   └── index.ts
├── utils/            # Shared utilities
│   └── http.ts       # HTTP client
└── index.ts          # Main SDK entry point
```

### Design Principles

1. **Dual Environment Support**: Works in both Node.js and browser environments
2. **TypeScript First**: Strong typing throughout the codebase
3. **Modular Design**: Each service is a separate module
4. **Tree Shakeable**: Consumers can import only what they need
5. **Consistent API**: Similar patterns across all modules

## Development Workflow

### Setting Up

```bash
# Clone and setup
git clone <your-fork>
cd fintava-pay
pnpm install

# Verify setup
pnpm build
pnpm test
pnpm lint
```

### Daily Development

```bash
# Start development
git checkout -b feat/your-feature

# Make changes and test
pnpm test --watch
pnpm build

# Before committing
pnpm lint
pnpm format
pnpm test
```

### Adding New Features

1. **Plan the API**: Design the interface first
2. **Add types**: Define TypeScript interfaces
3. **Implement**: Write the core functionality
4. **Test**: Add comprehensive tests
5. **Document**: Update README and add examples
6. **Changeset**: Add a changeset for versioning

## Code Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Strong typing
interface CustomerData {
  id: string;
  email: string;
  name: string;
}

function createCustomer(data: CustomerData): Promise<Customer> {
  // Implementation
}

// ❌ Bad: Using any
function createCustomer(data: any): any {
  // Implementation
}
```

### Error Handling

```typescript
// ✅ Good: Proper error handling
try {
  const result = await api.call();
  return result;
} catch (error) {
  if (error instanceof ApiError) {
    throw new SDKError(`API call failed: ${error.message}`, error.code);
  }
  throw error;
}

// ❌ Bad: Silent failures
try {
  const result = await api.call();
  return result;
} catch {
  return null;
}
```

### Module Structure

```typescript
// Each module should follow this pattern:

// 1. Imports
import { HttpClient } from '../utils/http';
import { ModuleConfig, ModuleResponse } from '../types';

// 2. Types specific to this module
interface ModuleSpecificType {
  // ...
}

// 3. Main class
export class ModuleName {
  constructor(private http: HttpClient, private config: ModuleConfig) {}

  async method(params: ModuleSpecificType): Promise<ModuleResponse> {
    // Implementation
  }
}

// 4. Setup function
export function setup(config: ModuleConfig) {
  const http = new HttpClient(config);
  return new ModuleName(http, config);
}
```

## Testing Strategy

### Test Structure

```typescript
describe('ModuleName', () => {
  let module: ModuleName;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    module = new ModuleName(mockHttp, testConfig);
  });

  describe('methodName', () => {
    it('should handle success case', async () => {
      // Arrange
      const input = { /* test data */ };
      const expectedOutput = { /* expected result */ };
      mockHttp.post.mockResolvedValue(expectedOutput);

      // Act
      const result = await module.methodName(input);

      // Assert
      expect(result).toEqual(expectedOutput);
      expect(mockHttp.post).toHaveBeenCalledWith('/endpoint', input);
    });

    it('should handle error case', async () => {
      // Test error scenarios
    });
  });
});
```

### Test Categories

1. **Unit Tests**: Test individual functions/methods
2. **Integration Tests**: Test module interactions
3. **End-to-End Tests**: Test complete workflows

## Build System

### TypeScript Configuration

- **Target**: ES2020 for broad compatibility
- **Module**: CommonJS for Node.js compatibility
- **Declaration**: Generate .d.ts files
- **Source Maps**: For debugging

### Output Structure

```
dist/
├── index.js          # Main entry point
├── index.d.ts        # Type definitions
├── client/           # Client-side code
├── server/           # Server-side code
├── types/            # Type definitions
└── utils/            # Utilities
```

## Release Process

### Changesets

We use [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Add a changeset
pnpm changeset

# Select packages (usually just the main package)
# Choose version bump (patch/minor/major)
# Write a description of changes
```

### Version Types

- **Patch** (1.0.0 → 1.0.1): Bug fixes, documentation
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

## Debugging

### Common Issues

1. **Build Failures**: Check TypeScript errors
2. **Test Failures**: Verify mocks and test data
3. **Lint Errors**: Run `pnpm format` and fix manually
4. **Type Errors**: Ensure all types are properly exported

### Debug Tools

```bash
# Type checking
pnpm tsc --noEmit

# Verbose test output
pnpm test --verbose

# Build analysis
pnpm build --listFiles
```

## Performance Considerations

### Bundle Size

- Keep dependencies minimal
- Use tree-shaking friendly exports
- Avoid large utility libraries

### Runtime Performance

- Cache HTTP clients when possible
- Use appropriate data structures
- Minimize API calls

## Security Guidelines

### Sensitive Data

- Never log sensitive information
- Use environment variables for secrets
- Validate all inputs
- Sanitize error messages

### Dependencies

- Regularly audit dependencies
- Keep dependencies updated
- Review new dependencies carefully

## Documentation

### Code Documentation

```typescript
/**
 * Creates a new customer in the system
 * @param data - Customer information
 * @returns Promise resolving to created customer
 * @throws {ValidationError} When customer data is invalid
 * @throws {ApiError} When API request fails
 * @example
 * ```typescript
 * const customer = await sdk.customer.create({
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * });
 * ```
 */
async createCustomer(data: CustomerData): Promise<Customer> {
  // Implementation
}
```

### README Updates

- Add examples for new features
- Update API documentation
- Include migration guides for breaking changes

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Code Review**: For implementation feedback
- **Documentation**: Check existing docs first

---

*This guide is living documentation. Please update it as the project evolves.*