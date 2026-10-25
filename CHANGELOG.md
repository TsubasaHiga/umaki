# Changelog

## 0.16.1 (2026-10-25)

<!-- Release notes generated using configuration in .github/release.yml at main -->

## What's Changed
### 🐛 Bug Fixes
* fix: 🐛 moduleResolution が node16 / nodenext の TypeScript から型を読めるようにする (#243) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/244


**Full Changelog**: https://github.com/TsubasaHiga/umaki/compare/v0.16.0...v0.16.1

## 0.16.0 (2026-10-25)

<!-- Release notes generated using configuration in .github/release.yml at main -->

## What's Changed
### 💥 Breaking Changes
* feat!: 💥 getQueryParams の戻り値の型を parseOptions に追従させ、htmlSanitize の無視される設定を型から除く (#237) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/238
### ✨ New Features
* feat: ✨ setSessionStorage / getSessionStorage の型を localStorage 版とそろえる (#235) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/236
### 📝 Documentation
* docs: 📝 docs/semver.md のバージョン決定の説明を release-please の運用に合わせる (#239) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/240


**Full Changelog**: https://github.com/TsubasaHiga/umaki/compare/v0.15.0...v0.16.0

## 0.15.0 (2026-10-25)

<!-- Release notes generated using configuration in .github/release.yml at main -->

## What's Changed
### ✨ New Features
* feat: ✨ getLocalStorage / setLocalStorage / removeLocalStorage を追加 (#221) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/224
* feat: ✨ isDarkMode / isReducedMotion を追加 (#222) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/225
* feat: ✨ truncate を追加 (#223) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/226
### 🐛 Bug Fixes
* fix: 🔒 sessionStorage 関数を SSR で何もしないようにする (#227) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/229
* fix: 🐛 getStringLength / wrapTextWithSpans で結合文字を 1 文字として扱う (#228) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/230
### 🔧 Maintenance
* ci: 🔒 npm publish ジョブの権限分離とスモークテストのサプライチェーン対策 (#219) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/220
* test: ✅ sleep のテストを fake timers にして実時間への依存をなくす (#232) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/233


**Full Changelog**: https://github.com/TsubasaHiga/umaki/compare/v0.14.0...v0.15.0

## 0.14.0 (2026-10-24)

<!-- Release notes generated using configuration in .github/release.yml at main -->

## What's Changed
### 💥 Breaking Changes
* feat!: 💥 Node.js 20 のサポートを終了し query-string 10 / isomorphic-dompurify 4 へ更新 (#214) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/215
### 📦 Dependencies
* ci: bump the github-actions group with 6 updates by @dependabot[bot] in https://github.com/TsubasaHiga/umaki/pull/206
* chore: bump @biomejs/biome from 2.5.15 to 2.6.2 in the development-dependencies group by @dependabot[bot] in https://github.com/TsubasaHiga/umaki/pull/207
* chore: bump typescript from 5.9.3 to 6.0.3 by @dependabot[bot] in https://github.com/TsubasaHiga/umaki/pull/208
### 🔧 Maintenance
* chore: 🔧 @types/node のメジャー更新を dependabot の対象外にする (#212) by @TsubasaHiga in https://github.com/TsubasaHiga/umaki/pull/213

## New Contributors
* @dependabot[bot] made their first contribution in https://github.com/TsubasaHiga/umaki/pull/206

**Full Changelog**: https://github.com/TsubasaHiga/umaki/compare/v0.13.2...v0.14.0

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
