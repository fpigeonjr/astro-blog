# GitHub Actions CI Setup

This repository includes a GitHub Actions workflow to ensure code quality and successful builds, working alongside your existing Cloudflare Pages deployment.

## Workflow

### CI Pipeline (`.github/workflows/ci.yml`)

**Triggers:** Push to `main` branch, Pull Requests to `main`

**Jobs:**

- **Test**: Runs on Node.js 18 & 20
  - Install dependencies
  - Check code formatting
  - Lint code
  - Run tests

- **Code Quality**:
  - Check formatting
  - Lint code
  - Run tests with coverage

## Current Repository Protection

Your repository already has these protections configured:

- ✅ Deletion protection
- ✅ Non-fast-forward protection
- ✅ Required status checks (Cloudflare Pages)
- ✅ Strict branch policy

## Integration with Cloudflare Pages

The CI pipeline focuses purely on code quality while Cloudflare Pages handles building and deployment:

1. **CI checks** ensure code quality (tests, formatting)
2. **Cloudflare Pages** handles building and deployment
3. **Repository rulesets** enforce both checks before merge

This separation of concerns makes the pipeline faster and avoids redundant work.

## Local Development Commands

```bash
# Run tests before pushing
npm test

# Check formatting
npm run format:check

# Fix formatting
npm run format

# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Test locally
npm test
```

## Troubleshooting

### Common CI Failures:

1. **Formatting Issues**: Run `npm run format`
2. **Linting Issues**: Run `npm run lint:fix`
3. **Test Failures**: Run `npm test` locally
4. **Node Version Issues**: Ensure compatibility with Node 18+

If Cloudflare Pages build fails, check the build logs in your Cloudflare dashboard.

The combination of CI checks + Cloudflare Pages + Repository rulesets ensures high code quality and successful deployments.
