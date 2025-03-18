import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // フォルダの内容を結合してコピー（通常コピー）
    const copyCommand = vscode.commands.registerCommand('extension.concatAndCopyFiles', async (uri: vscode.Uri) => {
        await processFiles(uri, false);
    });

    // フォルダの内容を再帰的に結合してコピー（再帰的コピー）
    const recursiveCopyCommand = vscode.commands.registerCommand('extension.concatAndCopyFilesRecursively', async (uri: vscode.Uri) => {
        await processFiles(uri, true);
    });

    // 開いているタブすべての内容を結合してコピーする Unified Copy コマンド
    const unifiedCopyTabsCommand = vscode.commands.registerCommand('extension.unifiedCopyTabs', async () => {
        try {
            let combinedText = '';

            // 新しい Tab API を使用して全タブを取得（vscode 1.64 以降）
            const tabGroups = vscode.window.tabGroups.all;
            const docPromises: Thenable<vscode.TextDocument>[] = [];
            for (const group of tabGroups) {
                for (const tab of group.tabs) {
                    // タブの input に uri があればテキストファイルとみなす
                    const input = tab.input as any;
                    if (input && input.uri) {
                        docPromises.push(vscode.workspace.openTextDocument(input.uri));
                    }
                }
            }
            const docs = await Promise.all(docPromises);

            // 同一ファイルが複数タブにある場合の重複除外
            const seen = new Set<string>();
            const uniqueDocs = docs.filter(doc => {
                const key = doc.uri.toString();
                if (seen.has(key)) {
                    return false;
                }
                seen.add(key);
                return true;
            });

            if (uniqueDocs.length === 0) {
                vscode.window.showErrorMessage('コピーできるタブが見つかりませんでした。');
                return;
            }

            for (const doc of uniqueDocs) {
                // ファイルパスではなく、basename（例: file.txt）のみを表示
                const baseName = doc.fileName ? path.basename(doc.fileName) : 'Untitled';
                combinedText += `=== ${baseName} ===\n${doc.getText()}\n\n`;
            }
            await vscode.env.clipboard.writeText(combinedText);
            vscode.window.showInformationMessage(`開いている ${uniqueDocs.length} タブの内容がコピーされました。`);
        } catch (error) {
            vscode.window.showErrorMessage(`エラーが発生しました: ${error}`);
        }
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
