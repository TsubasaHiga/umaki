# About Versioning

We apply the following rules based on [Semantic Versioning](https://semver.org/).
When tagging, please follow these rules.

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

## Automated Version Labeling

Pull requests targeting the `main` branch are automatically labeled with the appropriate version bump level:

- **version: Major** - Applied when commits include breaking changes (indicated by "BREAKING CHANGE:" or "!" in the commit message)
- **version: Minor** - Applied when commits include new features (indicated by "feat:" commit type) without breaking changes
- **version: Patch** - Applied for all other types of changes (fixes, documentation, etc.)

The package version will be automatically bumped according to the applied label.
