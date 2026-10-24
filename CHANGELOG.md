# Changelog

## 0.13.2 (2026-10-24)

<!-- Release notes generated using configuration in .github/release.yml at main -->

## What's Changed
### 🐛 Bug Fixes
* fix: 🐛 CommonJS から getQueryParams を呼ぶと失敗する問題を修正 (#202) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/203
### 📦 Dependencies
* build: ⬆️ 開発ツールチェーンのメジャー更新（Vite 8 / Vitest 5 / Biome 2.5 等）(#181) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/201
### 🔧 Maintenance
* ci: 📝 release-please の CHANGELOG を PR 単位で生成し重複を解消 (#198) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/199
* chore: 🔧 dependabot 導入・package-lock.json 削除・lint を biome check に統一 (#177) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/200


**Full Changelog**: https://github.com/TsubasaHiga/umaki/compare/v0.13.1...v0.13.2

## [0.13.1](https://github.com/TsubasaHiga/umaki/compare/v0.13.0...v0.13.1) (2026-10-24)


### Bug Fixes

* 🐛 DOM 依存関数の SSR ガード漏れと waitForAllMediaLoaded の動画判定を修正 ([#183](https://github.com/TsubasaHiga/umaki/issues/183)) ([81de0a5](https://github.com/TsubasaHiga/umaki/commit/81de0a53e18fe7c442abe22ec18d6d363de9ecf1))
* 🐛 DOM 依存関数の SSR ガード漏れと waitForAllMediaLoaded の動画判定を修正 ([#183](https://github.com/TsubasaHiga/umaki/issues/183)) ([779f456](https://github.com/TsubasaHiga/umaki/commit/779f456f93e2135769e944d4b3f8b32b3f1329aa))
* 🐛 getGcd / getRandomInt / getGravatarUrl / setConfig の入力検証を追加 ([#184](https://github.com/TsubasaHiga/umaki/issues/184)) ([d3c35fb](https://github.com/TsubasaHiga/umaki/commit/d3c35fb1eb861b3d04c1a352925fdb01dae3b5f2))
* 🐛 getGcd / getRandomInt / getGravatarUrl / setConfig の入力検証を追加 ([#184](https://github.com/TsubasaHiga/umaki/issues/184)) ([c721c8a](https://github.com/TsubasaHiga/umaki/commit/c721c8aff9e412ac525bb2e7b770aea4e066c075))
* 🐛 htmlSanitize を常に文字列で返し removeAllHtmlTags の出力仕様を明記 ([#182](https://github.com/TsubasaHiga/umaki/issues/182)) ([abc9d35](https://github.com/TsubasaHiga/umaki/commit/abc9d3511abd8f5e692aea187d8916680d9dd3b4))
* 🐛 htmlSanitize を常に文字列で返し removeAllHtmlTags の出力仕様を明記 ([#182](https://github.com/TsubasaHiga/umaki/issues/182)) ([fb3b4d8](https://github.com/TsubasaHiga/umaki/commit/fb3b4d8f8647330cb37b7db05eee01175a645675))
* 🐛 公開パッケージを Node.js から import / require できるよう修正 ([#178](https://github.com/TsubasaHiga/umaki/issues/178)) ([dbd02bf](https://github.com/TsubasaHiga/umaki/commit/dbd02bf235efd68608f1de3c4cd68a6f55ef7631))
* 🐛 公開パッケージを Node.js から import / require できるよう修正 ([#178](https://github.com/TsubasaHiga/umaki/issues/178)) ([f97b26b](https://github.com/TsubasaHiga/umaki/commit/f97b26ba32e93b5c554f2e5d9483f6a9a8dfe16c))
