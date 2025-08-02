# Shared Tools

This directory contains shared development tools and utilities used across all Fintava Pay SDKs.

## Purpose

The `tools/shared` package serves as a central location for:

- Common build scripts and configurations
- Shared development utilities
- Cross-platform testing helpers
- Documentation generation tools
- Release automation scripts

## Structure

```
tools/shared/
├── package.json          # Package configuration
├── README.md            # This file
├── scripts/             # Shared build and utility scripts
├── configs/             # Shared configuration files
└── templates/           # Code generation templates
```

## Usage

This package is intended to be used internally by other packages in the monorepo. It's marked as private and won't be published to npm.

## Development

To add new shared tools:

1. Create the appropriate directory structure
2. Add your tools/scripts
3. Update this README with documentation
4. Reference the tools from other packages as needed

## Contributing

When adding shared tools, ensure they:

- Are truly reusable across multiple SDKs
- Follow the existing code style
- Include appropriate documentation
- Don't introduce unnecessary dependencies