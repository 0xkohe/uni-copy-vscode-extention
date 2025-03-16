import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // 通常コピー
    const copyCommand = vscode.commands.registerCommand('extension.concatAndCopyFiles', async (uri: vscode.Uri) => {
        await processFiles(uri, false);
    });

    // 再帰的コピー
    const recursiveCopyCommand = vscode.commands.registerCommand('extension.concatAndCopyFilesRecursively', async (uri: vscode.Uri) => {
        await processFiles(uri, true);
    });

    context.subscriptions.push(copyCommand, recursiveCopyCommand);
}

async function processFiles(uri: vscode.Uri, isRecursive: boolean) {
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please select a folder.');
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
            vscode.window.showInformationMessage('No readable files were found in the folder.');
            return;
        }

        await vscode.env.clipboard.writeText(combinedText);
        vscode.window.showInformationMessage(`Contents of ${fileCount} files have been concatenated and copied to the clipboard.`);
    } catch (error) {
        vscode.window.showErrorMessage(`An error occurred: ${error}`);
    }
}

export function deactivate() {}
