# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automating various tasks in the umaki repository.

## Version Management Workflow

### Version Management (`version-management.yaml`)

This integrated workflow handles version labeling and package version bumping in pull requests targeting the `main` branch.

The workflow consists of two sequential jobs:

1. **Auto Version Label**: Analyzes commits in pull requests and applies the appropriate version label based on semantic versioning principles:
   - **version: Major** - For breaking changes (commits with "BREAKING CHANGE:" or "!")
   - **version: Minor** - For new features (commits starting with "feat:")
   - **version: Patch** - For all other types of changes (fixes, documentation, etc.)

2. **Bump Package Version**: Automatically bumps the package version in `package.json` based on the version label applied:
   - **Major** - Increments the major version and resets minor and patch to 0 (e.g., 1.2.3 → 2.0.0)
   - **Minor** - Increments the minor version and resets patch to 0 (e.g., 1.2.3 → 1.3.0)
   - **Patch** - Increments the patch version (e.g., 1.2.3 → 1.2.4)

The workflow runs when a PR is opened, reopened, synchronized, labeled, or unlabeled.

## NPM Publish (`npm-publish.yaml`)

This workflow publishes the package to npm when a new release is created.

## Bundle Size Comment (`bundle-size-comment.yml`)

This workflow comments bundle size information on pull requests that are merged to the main branch.

- Runs when a PR is merged to the `main` branch
- Builds the project and analyzes the bundle sizes
- Posts a comment to the merged PR with detailed information about:
  - Main bundle file sizes (ES and CJS formats)
  - Top 5 largest library files 
  - Total bundle size (raw and gzipped)

## Workflow Integration

The workflows are designed to work together in sequence:

1. When a PR is created or updated, the `version-management.yaml` workflow:
   - First analyzes the commits and applies the appropriate version label
   - Then updates the package version in `package.json` based on the applied label
2. When the PR is merged, the `bundle-size-comment.yml` workflow comments with bundle size information
3. When a release is created, `npm-publish.yaml` publishes the package to npm