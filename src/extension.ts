import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.concatAndCopyFiles', async (uri: vscode.Uri) => {
        // フォルダが選択されているかチェック
        if (!uri || !uri.fsPath) {
            vscode.window.showErrorMessage('フォルダを選択してください。');
            return;
        }

        try {
            const folderUri = uri;
            // フォルダ内のエントリ（ファイルやサブフォルダ）の一覧を取得
            const entries = await vscode.workspace.fs.readDirectory(folderUri);
            let combinedText = '';
            
            // 各エントリについてループ
            for (const [name, type] of entries) {
                // ファイルのみ処理（ディレクトリは除外）
                if (type === vscode.FileType.File) {
                    // ファイルのURIを生成
                    const fileUri = vscode.Uri.joinPath(folderUri, name);
                    // ファイルの内容を読み込み（Uint8Arrayで取得されるので文字列に変換）
                    const fileContentBytes = await vscode.workspace.fs.readFile(fileUri);
                    const fileContent = new TextDecoder('utf-8').decode(fileContentBytes);
                    // ファイル名のヘッダーと内容を結合
                    combinedText += `=== ${name} ===\n${fileContent}\n\n`;
                }
            }
            // もし結合したテキストが空の場合はファイルが無いと判断
            if (combinedText === '') {
                vscode.window.showInformationMessage('フォルダ内に読み込むファイルが見つかりませんでした。');
                return;
            }
            // クリップボードにテキストをコピー
            await vscode.env.clipboard.writeText(combinedText);
            vscode.window.showInformationMessage('ファイル内容を結合してクリップボードにコピーしました。');
        } catch (error) {
            vscode.window.showErrorMessage(`エラーが発生しました: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
