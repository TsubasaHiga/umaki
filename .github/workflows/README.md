# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automating various tasks in the umaki repository.

## Release Please (`release-please.yml`)

This workflow manages versioning, changelog, GitHub Releases, and npm publishing with [release-please](https://github.com/googleapis/release-please-action).

1. On every push to `main`, release-please creates or updates a **release PR** when there are releasable commits (`feat`, `fix`, `deps`) since the last release. `docs` / `chore` / `ci` commits alone do not create a release PR.
   - The release PR bumps the version in `package.json` and `.release-please-manifest.json`, and updates `CHANGELOG.md`.
   - The version bump follows Conventional Commits: `feat!:` or `BREAKING CHANGE:` → major, `feat:` → minor, others → patch.
2. When the release PR is merged, release-please creates the `vX.Y.Z` tag and the GitHub Release.
3. In the same workflow, the `publish` job builds and publishes the package to npm using Trusted Publishing (OIDC) with provenance.
   - Publishing runs in the same workflow because releases created with `GITHUB_TOKEN` do not trigger other workflows.

Configuration: [`release-please-config.json`](../../release-please-config.json) and [`.release-please-manifest.json`](../../.release-please-manifest.json).

## Build and Unit Tests (`test.yml`)

This workflow runs build and unit tests on pushes and pull requests to `main` and `develop`.

## Bundle Size Comment (`bundle-size-comment.yml`)

This workflow comments bundle size information on pull requests that are merged to the main branch.

- Runs when a PR is merged to the `main` branch
- Builds the project and analyzes the bundle sizes
- Posts a comment to the merged PR with detailed information about:
  - Main bundle file sizes (ES and CJS formats)
  - Top 5 largest library files
  - Total bundle size (raw and gzipped)
