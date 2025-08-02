# Security Policy

## Supported Versions

We actively support the following versions of the Fintava JavaScript SDK:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in this SDK, please report it responsibly:

### For SDK-specific vulnerabilities:

1. **Email**: Send details to the project maintainers (create a private issue or contact through GitHub)
2. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### For Fintava platform vulnerabilities:

1. **Contact Fintava directly** through their official security channels
2. **Do not report platform vulnerabilities** to this community repository

## Security Best Practices

When using this SDK:

### Server-side
- **Never expose your secret keys** in client-side code
- **Use environment variables** for sensitive configuration
- **Validate all inputs** before processing
- **Use HTTPS** for all API communications
- **Implement proper error handling** to avoid information leakage

### Client-side
- **Only use public keys** in browser environments
- **Validate data** received from the server
- **Implement CSP headers** to prevent XSS attacks
- **Use secure communication channels**

### General
- **Keep the SDK updated** to the latest version
- **Review dependencies** regularly for vulnerabilities
- **Follow Fintava's security guidelines** for your integration
- **Implement proper logging** without exposing sensitive data

## Vulnerability Response

1. **Acknowledgment**: We will acknowledge receipt of vulnerability reports within 48 hours
2. **Assessment**: We will assess the vulnerability and determine its severity
3. **Fix**: We will work on a fix and coordinate disclosure timing
4. **Release**: We will release a patched version as soon as possible
5. **Disclosure**: We will publicly disclose the vulnerability after a fix is available

## Security Updates

Security updates will be:
- **Released as patch versions** (e.g., 1.0.1 → 1.0.2)
- **Documented in the changelog** with appropriate severity indicators
- **Announced through GitHub releases** and security advisories

## Dependencies

We regularly audit our dependencies for security vulnerabilities using:
- `npm audit`
- Automated dependency scanning
- Manual security reviews

## Contact

For security-related questions or concerns:
- **Create a private issue** on GitHub
- **Contact project maintainers** directly
- **For platform issues**: Use official Fintava security channels

---

**Note**: This is a community-maintained SDK. For official Fintava platform security issues, please contact Fintava directly through their official channels.