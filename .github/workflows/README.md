# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automating various tasks in the umaki repository.

## Version Management Workflows

### Auto Version Label (`auto-version-label.yaml`)

This workflow automatically analyzes commits in pull requests targeting the `main` branch and applies the appropriate version label based on semantic versioning principles:

- **version: Major** - For breaking changes (commits with "BREAKING CHANGE:" or "!")
- **version: Minor** - For new features (commits starting with "feat:")
- **version: Patch** - For all other types of changes (fixes, documentation, etc.)

The workflow runs when a PR is opened, reopened, or synchronized (new commits pushed).

### Bump Package Version (`bump-version.yaml`)

This workflow automatically bumps the package version in `package.json` based on the version label applied to the PR:

- **Major** - Increments the major version and resets minor and patch to 0 (e.g., 1.2.3 → 2.0.0)
- **Minor** - Increments the minor version and resets patch to 0 (e.g., 1.2.3 → 1.3.0)
- **Patch** - Increments the patch version (e.g., 1.2.3 → 1.2.4)

The workflow is triggered:
- When a version label is added to a PR
- After the Auto Version Label workflow completes successfully

## NPM Publish (`npm-publish.yaml`)

This workflow publishes the package to npm when a new release is created.

## Workflow Integration

The workflows are designed to work together in sequence:

1. When a PR is created or updated, `auto-version-label.yaml` analyzes the commits and applies the appropriate version label
2. Once the label is applied, `bump-version.yaml` updates the package version in `package.json`
3. When the PR is merged and a release is created, `npm-publish.yaml` publishes the package to npm