# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 公式ドキュメント参照

機能の調査や実装時は、**必ず公式ドキュメントを参照**してください：

### 主要な依存関係

- **dayjs**: https://day.js.org/docs/en/installation/installation
- **ua-parser-js**: https://github.com/faisalman/ua-parser-js
- **isomorphic-dompurify**: https://github.com/kkomelin/isomorphic-dompurify
- **query-string**: https://github.com/sindresorhus/query-string
- **store2**: https://github.com/nbubna/store
- **runes2**: https://github.com/benpigchu/runes2
- **md5**: https://github.com/pvorb/node-md5
- **image-size**: https://github.com/image-size/image-size

**重要: 不明な点がある場合は、APIの動作を推測せず、必ず公式ドキュメントを確認すること。**

## Project Overview

Umaki is a TypeScript utility library for web development, providing commonly used functions for DOM manipulation, event handling, device detection, and more. It's published as an npm package with both ESM and CJS builds.

## Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build (TypeScript + Vite)
pnpm build

# Run all tests
pnpm test

# Run tests once (no watch mode)
pnpm test:run

# Run a single test file
pnpm test src/libs/get/getAspectRatio.test.ts

# Run tests with coverage
pnpm coverage

# Lint
pnpm lint

# Format
pnpm format

# Analyze bundle
pnpm analyze
```

## Architecture

### Source Structure

All utilities are in `src/libs/` organized by category:
- `config/` - Global configuration (BREAKPOINT, custom values)
- `control/` - Scroll control, video playback, event prevention
- `convert/` - Data transformation (dates, JSON)
- `eventControl/` - debounce, throttle
- `get/` - Value retrieval (DOM properties, UA data, computed values)
- `is/` - Boolean checks (device detection, element existence, date ranges)
- `remove/` - DOM/storage removal utilities
- `security/` - HTML sanitization
- `set/` - DOM/storage setters, CSS variable utilities
- `to/` - Type conversions
- `transform/` - DOM transformations
- `wait/` - Async utilities (sleep, media loading)

### Module Pattern

Each utility follows a consistent pattern:
- `utilityName.ts` - Implementation
- `utilityName.test.ts` - Tests (co-located)
- Category `index.ts` - Re-exports all utilities in that category
- Root `src/index.ts` - Re-exports all categories

### Path Aliases

```typescript
@/*     -> src/*
@libs/* -> src/libs/*
```

### Build Output

Dual format output to `dist/`:
- ESM: `*.es.js` (preserveModules)
- CJS: `*.cjs.js` (preserveModules)
- Types: `*.d.ts`

External dependencies are not bundled: dayjs, image-size, isomorphic-dompurify, md5, query-string, runes2, store2, ua-parser-js.

## Testing

- Framework: Vitest with happy-dom environment
- Globals enabled (`describe`, `it`, `expect` available without import)
- Tests co-located with source files (`*.test.ts`)

## Code Style

- Biome for linting and formatting
- Single quotes, no semicolons, no trailing commas
- Strict TypeScript (no unused locals/parameters)

### 命名規則

- **関数/変数**: camelCase（例: `getScrollPosition`, `isIOS`）
- **定数**: UPPER_SNAKE_CASE（例: `BREAKPOINT`, `DEFAULT_VALUE`）
- **型/インターフェース**: PascalCase（例: `ScrollOptions`, `DeviceInfo`）

### TypeScript型チェックポリシー（Claude Code向け）

**⚠️ 重要: コード変更のたびに自動で型チェックを実行しないこと。**

型チェックを実行するタイミング：

- ✅ **ユーザーから明示的に依頼された場合のみ**
- ✅ コミット作成前（コミット前チェックリストの一部として）
- ✅ プルリクエスト作成前

型チェックを実行しないタイミング：

- ❌ ファイル編集やコード変更のたび
- ❌ Edit/Writeツール使用後（明示的に依頼されない限り）
- ❌ ユーザーの依頼なしに自動的に

**理由**: 開発サーバーは開発中にライブフィードバック付きで型チェックを実行しています。手動チェックはコミット/PR前の最終確認、または明示的に型の問題をデバッグする場合にのみ必要です。

## コミットメッセージ形式

### Gitコミットコマンド（Claude Code向け）

```
╔═══════════════════════════════════════════════════════════════════╗
║  ⚠️  重要: AuthorとCommitterの両方をClaudeに設定すること      ⚠️  ║
║                                                                   ║
║  コミット作成前に必ず以下を使用:                                  ║
║  ✅ GIT_COMMITTER_NAME="Claude"                                   ║
║  ✅ GIT_COMMITTER_EMAIL="noreply@anthropic.com"                   ║
║  ✅ --author="Claude <noreply@anthropic.com>"                     ║
║                                                                   ║
║  ❌ 環境変数と--authorの両方なしでコミットしないこと              ║
╚═══════════════════════════════════════════════════════════════════╝
```

**コミット作成時は必ずこの形式を使用:**

```bash
GIT_COMMITTER_NAME="Claude" GIT_COMMITTER_EMAIL="noreply@anthropic.com" \
git commit --author="Claude <noreply@anthropic.com>" -m "$(cat <<'EOF'
<type>: <説明>

<詳細な説明>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

タイプ: feat, fix, docs, style, refactor, test, chore, build, ci, perf, revert

例: `chore: add configuration file`, `feat: add new utility function`

### 検証（コミット後に必須）

```bash
git log -1 --pretty=fuller
```

期待される出力:

```
Author:     Claude <noreply@anthropic.com>
Commit:     Claude <noreply@anthropic.com>
```

## コミット前チェックリスト

**変更をコミットする前に全項目を完了すること:**

### コード品質（必須）

- [ ] `pnpm lint`がエラーなしで通過
- [ ] `pnpm test:run`がエラーなしで通過
- [ ] `pnpm build`がエラーなしで成功

### Gitワークフロー

- [ ] コミットメッセージがconventional形式に従っている
- [ ] Authorが"Claude <noreply@anthropic.com>"に設定されている
- [ ] Committerが"Claude <noreply@anthropic.com>"に設定されている
- [ ] `git log -1 --pretty=fuller`で著者情報を確認済み

**チェックボックスが1つでも未完了の場合、コミットしないこと。まず問題を修正すること。**

## トラブルシューティング

### よくある問題と解決策

**ビルドエラー**

- 問題: 依存関係エラーでビルドが失敗
- 解決策: `pnpm install --force`でクリーン再インストール
- 解決しない場合: `node_modules/`と`pnpm-lock.yaml`を削除し、`pnpm install`を実行

**TypeScriptエラー**

- 問題: 型チェックが失敗
- 解決策: インポートと型定義を確認
- tsconfig.jsonのパスが正しいか確認

**テストが失敗**

- 問題: Vitestのテストが失敗
- 解決策: `pnpm test src/libs/<category>/<utilityName>.test.ts`で個別にテストを実行
- happy-dom環境でのDOM操作を確認

**デバッグのヒント**

- テストでは`console.log()`を使用してデバッグ
- `pnpm test --reporter=verbose`で詳細な出力を取得
