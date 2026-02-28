---
name: prepare-release
description: リリース準備を行う。指定バージョンタグから最新developまでの変更内容を確認し、適切なバージョン番号を提案する。
argument-hint: "[現在のバージョンタグ e.g. v0.10.0]"
disable-model-invocation: true
---

# リリース準備

$ARGUMENTS のタグから最新のdevelopまでの変更内容を確認し、相応しいバージョンを提案してください。

## 変更内容

- タグからの差分コミット: !`git log $ARGUMENTS...develop --oneline`
- タグからのファイル変更数: !`git diff --stat $ARGUMENTS...develop | tail -1`

## 提案内容

1. 変更内容のサマリーを作成
2. Semantic Versioning に基づき major/minor/patch を提案:
   - **major**: 破壊的変更（既存API削除、シグネチャ変更、デフォルト値変更）
   - **minor**: 新機能追加（新関数、新オプション）
   - **patch**: バグ修正、内部リファクタリング、ドキュメント更新
3. 提案理由を説明

## ライブラリ特有の考慮事項

- エクスポートされた関数の変更は破壊的変更の可能性
- 型定義の変更はユーザーのコードに影響
- 依存関係の更新は慎重に評価
