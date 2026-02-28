---
name: work-issues
description: GitHub Issueの対応を開始する。Issue番号またはフィルタ条件を指定して、Issue対応フローに従い順次対応を進める。
argument-hint: "[Issue番号 or フィルタ条件]"
disable-model-invocation: true
---

# Issue対応開始

以下のIssue対応を開始してください: $ARGUMENTS

## 現在の状況

- Open Issues: !`gh issue list --state open --limit 20 --json number,title,labels`
- Open PRs: !`gh pr list --state open --limit 10 --json number,title,headRefName,baseRefName`

## 作業ルール

`CLAUDE.md` のガイドラインに従ってください。

要点:
- 若いIssue番号から順にノンストップで進める
- 対応完了後はfeatureブランチにてコミット・PR作成まで進める
- PR作成前にCodexコードレビューを実施する（`/codex-review`）
- 既存のPRを先にマージした方が良い場合はお知らせする

## ブランチ作成

1. developブランチから最新を取得:
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. featureブランチを作成:
   ```bash
   git checkout -b feature/issue-{ISSUE_NUMBER}
   ```

## 実装後のチェック

- [ ] `pnpm lint` がエラーなしで通過
- [ ] `pnpm test:run` がエラーなしで通過
- [ ] `pnpm build` がエラーなしで成功
- [ ] 新規関数はindex.tsにエクスポート済み
- [ ] テストファイルが存在する（*.test.ts）
