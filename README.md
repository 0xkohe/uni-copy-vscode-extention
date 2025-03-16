# Uni-Copy Extension

## Overview

Uni-Copy is a Visual Studio Code extension that allows users to concatenate the contents of files in a folder and copy them to the clipboard. It supports both normal and recursive operations.

![Peek 2025-03-16 19-52](https://github.com/user-attachments/assets/c4740ab8-2b94-48ec-8d19-866a0b9a3ca4)

![Selection_999(939)](https://github.com/user-attachments/assets/ca258429-c68c-463f-8888-7c59f1b2e56f)

## Features

- **Concatenate and Copy Files**: Combine the contents of files in a selected folder and copy them to the clipboard.
- **Recursive Mode**: Optionally include files from subdirectories.
- **File Limit**: Processes up to 30 files to prevent excessive memory usage.

## Commands

- `Concat and Copy Files`: Combines the contents of files in the selected folder.
- `Concat and Copy Files Recursively`: Combines the contents of files in the selected folder and its subdirectories.

## Usage

1. Right-click on a folder in the VS Code Explorer.
2. Select either `Concat and Copy Files` or `Concat and Copy Files Recursively` from the context menu.
3. The contents of the files will be concatenated and copied to your clipboard.

## Installation

1. Open the Extensions view in Visual Studio Code (`Ctrl+Shift+X`).
2. Search for "Uni-Copy".
3. Click `Install`.

## Limitations

- Only processes up to 30 files.
- Skips unreadable files.

---

# Uni-Copy 拡張機能

## 概要

Uni-Copyは、フォルダ内のファイル内容を結合してクリップボードにコピーできるVisual Studio Codeの拡張機能です。通常モードと再帰モードの両方をサポートしています。

## 機能

- **ファイルの結合とコピー**: 選択したフォルダ内のファイル内容を結合してクリップボードにコピーします。
- **再帰モード**: サブディレクトリ内のファイルも含めるオプション。
- **ファイル制限**: メモリ使用量を抑えるため、最大30ファイルを処理します。

## コマンド

- `ファイルを結合してコピー`: 選択したフォルダ内のファイル内容を結合します。
- `ファイルを再帰的に結合してコピー`: 選択したフォルダおよびそのサブディレクトリ内のファイル内容を結合します。

## 使用方法

1. VS Codeのエクスプローラーでフォルダを右クリックします。
2. コンテキストメニューから`ファイルを結合してコピー`または`ファイルを再帰的に結合してコピー`を選択します。
3. ファイル内容が結合され、クリップボードにコピーされます。

## インストール

1. Visual Studio Codeの拡張機能ビューを開きます（`Ctrl+Shift+X`）。
2. "Uni-Copy"を検索します。
3. `インストール`をクリックします。

## 制限事項

- 最大30ファイルまで処理します。
- 読み取れないファイルはスキップされます。
