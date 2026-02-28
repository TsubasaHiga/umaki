---
name: update-changelog
description: 新しいバージョンのChangeLogを追加する。
argument-hint: "[バージョン番号 e.g. 0.11.0]"
disable-model-invocation: true
---

# ChangeLog更新

新しいバージョンのChangeLogを追加します。

## 手順

1. **前回リリースからの変更を取得**
   - `git log --oneline` で前回タグからのコミットを確認
   - `gh issue list --state closed` で最近クローズされたIssueを確認

2. **変更内容をカテゴリ別に整理**
   - **New Features**: 新しいユーティリティ関数の追加
   - **Bug Fixes**: バグ修正
   - **Breaking Changes**: 破壊的変更（既存APIの変更・削除）
   - **Dependencies**: 依存関係の更新
   - **Maintenance**: リファクタリング、設定変更

3. **開発者向けに簡潔にまとめる**
   - 各関数の用途と使用例を記載
   - 破壊的変更がある場合は移行方法を明記
   - Before/After の例を含める（APIが変わった場合）

4. **GitHub Releaseの形式で作成**
   ```markdown
   ## v$ARGUMENTS (YYYY-MM-DD)

   ### New Features
   - `functionName`: 機能の説明

   ### Bug Fixes
   - `functionName`: 修正内容

   ### Breaking Changes
   - `functionName`: 変更内容と移行方法
   ```

## 実行

$ARGUMENTS に新しいバージョン番号を指定してください
