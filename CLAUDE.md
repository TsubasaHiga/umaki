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

### TypeScriptベストプラクティス

- **strict型付け**を徹底する
- **`any`型の使用禁止** - 適切な型定義または`unknown`と型ガードを使用
- 複雑なオブジェクトにはインターフェースを定義
- 型が明らかな場合は型推論を活用
- 値が変更されない場合は`let`より`const`を優先

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

### ステージングポリシー（Claude Code向け）

**⚠️ 重要: 変更後に自動的に`git add`を実行しないこと。**

- **基本方針**: ファイル編集後に自動的にステージングエリアへ追加しない
- **実行タイミング**: ユーザーが明示的にステージングを依頼した時、またはコミット直前のみ
- **理由**: 開発中は試行錯誤が多いため、全ての変更を自動的にステージングすると管理が煩雑になる。ユーザーが意図した変更のみをステージングすることで、クリーンなコミット履歴を維持する

### ビルドポリシー（Claude Code向け）

**⚠️ 重要: 変更後に自動的にビルドを実行しないこと。**

- **基本方針**: 変更後に自動的にビルドを実行しない
- **実行タイミング**: ユーザーが明示的にビルドを依頼した時のみ実行する
- **理由**: 開発中は頻繁に変更を行うため、毎回のビルドは不要。必要な時だけビルドすることで効率的な開発を実現する

## Gitワークフロー

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

**著者情報が間違っていた場合の修正手順:**

```bash
# 1. amendで修正
GIT_COMMITTER_NAME="Claude" GIT_COMMITTER_EMAIL="noreply@anthropic.com" \
git commit --amend --author="Claude <noreply@anthropic.com>" --no-edit

# 2. 再度検証
git log -1 --pretty=fuller
```

両方がClaudeになるまで繰り返すこと。

### GitHub Issue作成ガイドライン

**⚠️ 重要: 新機能やタスクを開始する前に必ずGitHub Issueを作成する**

#### 新しいIssueの作成

**`gh issue create`を使用してIssueを作成し、自動的にIssue番号を取得:**

```bash
gh issue create \
  --title "feat: 機能の簡潔な説明" \
  --body "$(cat <<'EOF'
## 説明
機能やタスクの詳細な説明

## 受け入れ基準
- [ ] 基準1
- [ ] 基準2

## 技術的な注意点
技術的な考慮事項

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**コマンドはIssue番号（例: #123）を出力します。この番号をブランチ名に使用します。**

#### Issueタイトルフォーマット

コミットメッセージと同じ形式:

```
<type>: <簡潔な説明>
```

例:
- `feat: 新しいユーティリティ関数の追加`
- `fix: getScrollPositionのバグ修正`
- `docs: READMEの更新`

### ブランチ作成ガイドライン

**⚠️ 重要: 全ての新しいブランチは`develop`ブランチから作成する**

#### 新しいブランチの作成

**必ずこの手順に従う:**

1. **developブランチに切り替えて最新の変更を取得:**

```bash
git checkout develop
git pull origin develop
```

2. **`feature/issue-{ISSUE_NUMBER}`の命名規則で新しいブランチを作成:**

```bash
git checkout -b feature/issue-123
```

#### ブランチ命名規則

- ✅ **正しい**: `feature/issue-123`, `feature/issue-456`
- ❌ **誤り**: `feature/my-feature`, `feat/123`, `feature-123`

**ルール:**
- ブランチ名は`feature/`で始まる必要がある
- `issue-`の後にGitHub Issue番号を含める必要がある
- ホットフィックス以外は`main`からブランチを作成しない
- Issue番号なしのカスタム名でブランチを作成しない

### プルリクエストガイドライン

```
╔═══════════════════════════════════════════════════════════════════╗
║  ⚠️  重要: PRは`develop`ブランチをターゲットにする             ⚠️  ║
║                                                                   ║
║  プルリクエスト作成前に必ず確認:                                  ║
║  ✅ base branch = develop                                         ║
║  ✅ head branch = feature/issue-ISSUE_NUMBER                      ║
║  ❌ 緊急のホットフィックス以外はmainをbaseにしない                ║
╚═══════════════════════════════════════════════════════════════════╝
```

#### ブランチ戦略

このリポジトリはGit Flowブランチ戦略に従っています:

- `main` - 本番環境対応のコード（安定版リリース、npmパブリッシュ用）
- `develop` - 機能統合用ブランチ（**デフォルトのPRターゲット**）
- `feature/*` - 機能ブランチ（`develop`へのPRを作成）
- `hotfix/*` - ホットフィックスブランチ（緊急時のみ`main`をターゲットにする場合がある）

#### プルリクエストの作成

**方法1: gh CLIを使用（推奨）**

**必ず`--base develop`を使用:**

```bash
gh pr create --base develop --title "feat: 新機能の追加" --body "$(cat <<'EOF'
## 概要
- 機能の説明

## テスト計画
- [ ] 手動テスト完了
- [ ] `pnpm test:run`成功
- [ ] `pnpm build`成功

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**方法2: GitHub MCP Toolを使用**

**必ず`base: "develop"`を指定:**

```typescript
mcp__github__create_pull_request({
  owner: 'TsubasaHiga',
  repo: 'umaki',
  title: 'feat: 新機能の追加',
  head: 'feature/issue-ISSUE_NUMBER',
  base: 'develop', // ⚠️ 重要: "develop"である必要がある
  body: 'PRの説明...'
})
```

#### PR作成前の必須チェックリスト

**停止! PRを作成する前に、以下の全てを確認:**

- [ ] **Baseブランチが`develop`**（`main`ではない）
- [ ] Headブランチが`feature/issue-ISSUE_NUMBER`の形式に従っている
- [ ] `pnpm lint`がエラーなしで通過
- [ ] `pnpm test:run`がエラーなしで通過
- [ ] `pnpm build`がエラーなしで成功
- [ ] 全てのコミットが正しいAuthor/Committer（Claude）を持っている
- [ ] PRタイトルがconventional commitフォーマットに従っている
- [ ] PR説明に概要とテスト計画が含まれている

**チェックボックスのいずれかがチェックされていない場合、PRを作成しない。まず問題を修正する。**

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
- [ ] ブランチが`develop`から`feature/issue-ISSUE_NUMBER`の形式で作成されている

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
