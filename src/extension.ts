import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // フォルダの内容を結合してコピー（通常コピー）
    const copyCommand = vscode.commands.registerCommand('extension.concatAndCopyFiles', async (uri: vscode.Uri) => {
        await processFiles(uri, false);
    });

    // フォルダの内容を再帰的に結合してコピー（再帰的コピー）
    const recursiveCopyCommand = vscode.commands.registerCommand('extension.concatAndCopyFilesRecursively', async (uri: vscode.Uri) => {
        await processFiles(uri, true);
    });

    // 開いているタブの内容を結合してコピーする Unified Copy コマンド
    const unifiedCopyTabsCommand = vscode.commands.registerCommand('extension.unifiedCopyTabs', async () => {
        let combinedText = '';
        const editors = vscode.window.visibleTextEditors;
        if (editors.length === 0) {
            vscode.window.showErrorMessage('開いているタブがありません。');
            return;
        }
        for (const editor of editors) {
            // ファイル名がない場合は 'Untitled' と表示
            combinedText += `=== ${editor.document.fileName || 'Untitled'} ===\n${editor.document.getText()}\n\n`;
        }
        await vscode.env.clipboard.writeText(combinedText);
        vscode.window.showInformationMessage(`開いている ${editors.length} タブの内容が結合され、クリップボードにコピーされました。`);
    });

    context.subscriptions.push(copyCommand, recursiveCopyCommand, unifiedCopyTabsCommand);
}

async function processFiles(uri: vscode.Uri, isRecursive: boolean) {
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('フォルダを選択してください。');
        return;
    }

    try {
        let combinedText = '';
        let fileCount = 0;
        const maxFiles = 30;

        async function readFiles(folder: vscode.Uri) {
            const entries = await vscode.workspace.fs.readDirectory(folder);
            for (const [name, type] of entries) {
                if (fileCount >= maxFiles) {
                    return;
                }

                const entryUri = vscode.Uri.joinPath(folder, name);
                if (type === vscode.FileType.File) {
                    const fileContentBytes = await vscode.workspace.fs.readFile(entryUri);
                    const fileContent = new TextDecoder('utf-8').decode(fileContentBytes);
                    combinedText += `=== ${name} ===\n${fileContent}\n\n`;
                    fileCount++;
                } else if (type === vscode.FileType.Directory && isRecursive) {
                    await readFiles(entryUri);
                }
            }
        }

        await readFiles(uri);

        if (combinedText === '') {
            vscode.window.showInformationMessage('フォルダ内に読み込めるファイルが見つかりませんでした。');
            return;
        }

        await vscode.env.clipboard.writeText(combinedText);
        vscode.window.showInformationMessage(`合計 ${fileCount} 個のファイルの内容が結合され、クリップボードにコピーされました。`);
    } catch (error) {
        vscode.window.showErrorMessage(`エラーが発生しました: ${error}`);
    }
}

export function deactivate() {}
