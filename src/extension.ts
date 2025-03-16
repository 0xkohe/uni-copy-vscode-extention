import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.concatAndCopyFiles', async (uri: vscode.Uri) => {
        // Check if a folder is selected
        if (!uri || !uri.fsPath) {
            vscode.window.showErrorMessage('Please select a folder.');
            return;
        }

        try {
            const folderUri = uri;
            // Retrieve the list of entries (files and subfolders) in the folder
            const entries = await vscode.workspace.fs.readDirectory(folderUri);
            let combinedText = '';
            
            // Iterate over each entry
            for (const [name, type] of entries) {
                // Process only files (exclude directories)
                if (type === vscode.FileType.File) {
                    // Generate the URI for the file
                    const fileUri = vscode.Uri.joinPath(folderUri, name);
                    // Read the file content (returns Uint8Array, so convert it to string)
                    const fileContentBytes = await vscode.workspace.fs.readFile(fileUri);
                    const fileContent = new TextDecoder('utf-8').decode(fileContentBytes);
                    // Concatenate the file name header and content
                    combinedText += `=== ${name} ===\n${fileContent}\n\n`;
                }
            }
            // If the combined text is empty, it means no files were found
            if (combinedText === '') {
                vscode.window.showInformationMessage('No readable files were found in the folder.');
                return;
            }
            // Copy the concatenated text to the clipboard
            await vscode.env.clipboard.writeText(combinedText);
            vscode.window.showInformationMessage('File contents have been concatenated and copied to the clipboard.');
        } catch (error) {
            vscode.window.showErrorMessage(`An error occurred: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
