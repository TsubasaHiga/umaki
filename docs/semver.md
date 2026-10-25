# About Versioning

We apply the following rules based on [Semantic Versioning](https://semver.org/).
Versions and tags are not set by hand; release-please decides them from commit messages (see below).

## Major Version Update

When there are incompatible API changes.

```txt
Ver1.x.x
```

## Minor Version Update

When functionality is added in a backwards compatible manner.

```txt
Ver1.x.0
```

## Patch Version Update

When backwards compatible bug fixes are made.

```txt
Ver1.0.x
```

## Beta Version

When it's not yet ready for a release version.

*Note: x is replaced with an arbitrary sequential number.

```txt
Ver1.0.0-beta.x
```

## How the Version Is Decided

[release-please](https://github.com/googleapis/release-please) reads the [Conventional Commits](https://www.conventionalcommits.org/) messages merged into `main` and opens a release PR with the next version. Merging the release PR creates the tag and the GitHub Release, and publishes the package to npm.

| Commits since the last release | Version bump |
| --- | --- |
| `BREAKING CHANGE:` in the body, or `!` after the type (e.g. `feat!:`) | Major (minor while the version is `0.x`) |
| `feat:` | Minor |
| `fix:`, `perf:`, `deps:` | Patch |
| Only `docs:`, `chore:`, `ci:`, `test:` and so on | No release |

While the version is `0.x`, `bump-minor-pre-major` in `release-please-config.json` turns breaking changes into a minor bump. To release `1.0.0`, add `Release-As: 1.0.0` to a commit body or remove that setting.
