# Uni-Copy Extension

https://github.com/0xkohe/uni-copy-vscode-extention

## Overview

Uni-Copy is a Visual Studio Code extension that allows users to concatenate the contents of files in a folder and copy them to the clipboard by simply right-clicking and selecting "Unified Copy". It supports both normal and recursive operations. In addition, it now supports copying the contents of all open tabs, with each tab’s content preceded by its file name.

![Peek 2025-03-16 19-52](https://github.com/user-attachments/assets/c4740ab8-2b94-48ec-8d19-866a0b9a3ca4)

![Selection_999(939)](https://github.com/user-attachments/assets/ca258429-c68c-463f-8888-7c59f1b2e56f)


![Peek 2025-03-18 17-14](https://github.com/user-attachments/assets/c217f391-7fcc-40b3-9745-660bd9f30c04)

## Features

- **Unified Copy (Folder)**: Combine the contents of files in a selected folder and copy them to the clipboard.
- **Recursive Mode**: Optionally include files from subdirectories.
- **Tab Copy**: Copy the contents of all open tabs. Each tab’s content is prefixed with its file name (excluding the path).
- **File Limit**: Processes up to 30 files to prevent excessive memory usage.

## Commands

- `Unified Copy`: Combines the contents of files in the selected folder.
- `Unified Copy Recursively`: Combines the contents of files in the selected folder and its subdirectories.
- `Unified Copy Tabs`: Combines the contents of all open tabs and copies them to the clipboard.

## Usage

1. **Folder Copy**
   - Right-click on a folder in the VS Code Explorer.
   - Select `Unified Copy` or `Unified Copy Recursively` from the context menu.
   - The contents of the files will be concatenated and copied to your clipboard.
2. **Tab Copy**
   - Right-click on an open tab or the editor title area.
   - Select `Unified Copy` from the context menu.
   - The contents of all open tabs, along with their file names as headers, will be concatenated and copied to your clipboard.

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

Uni-Copyは、フォルダ内のファイル内容を結合してクリップボードにコピーできるVisual Studio Codeの拡張機能です。右クリックして「Unified Copy」を選択するだけで操作できます。通常モードと再帰モードの両方をサポートしています。さらに、開いているタブすべての内容をコピーする機能も追加され、各タブの内容はファイル名（パスは除く）をヘッダーとして表示されます。

## 機能

- **Unified Copy（フォルダ）**: 選択したフォルダ内のファイル内容を結合してクリップボードにコピーします。
- **再帰モード**: サブディレクトリ内のファイルも含めるオプション。
- **タブコピー**: 開いているすべてのタブの内容をコピーします。各タブの内容は、ファイル名のみをヘッダーとして表示します。
- **ファイル制限**: メモリ使用量を抑えるため、最大30ファイルを処理します。

## コマンド

- `Unified Copy`: 選択したフォルダ内のファイル内容を結合します。
- `Unified Copy Recursively`: 選択したフォルダおよびそのサブディレクトリ内のファイル内容を結合します。
- `Unified Copy Tabs`: 開いているすべてのタブの内容を結合してコピーします。

## 使用方法

1. **フォルダコピー**
   - VS Codeのエクスプローラーでフォルダを右クリックします。
   - コンテキストメニューから`Unified Copy`または`Unified Copy Recursively`を選択します。
   - ファイル内容が結合され、クリップボードにコピーされます。
2. **タブコピー**
   - 開いているタブまたはエディタのタイトル部分を右クリックします。
   - コンテキストメニューから`Unified Copy`を選択します。
   - 開いているすべてのタブの内容が、各タブのファイル名をヘッダーとして結合され、クリップボードにコピーされます。

## インストール

1. Visual Studio Codeの拡張機能ビューを開きます（`Ctrl+Shift+X`）。
2. "Uni-Copy"を検索します。
3. `インストール`をクリックします。

## 制限事項

- 最大30ファイルまで処理します。
- 読み取れないファイルはスキップされます.
