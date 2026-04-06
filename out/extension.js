"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const utils_1 = require("./utils");
function activate(context) {
    let disposable = vscode.commands.registerCommand("reactComponentGenerator.generate", async (uri) => {
        let targetFolder;
        if (uri && uri.fsPath) {
            targetFolder = uri;
        }
        else {
            vscode.window.showErrorMessage("Lütfen bir klasöre sağ tıklayarak bu komutu çalıştırın.");
            return;
        }
        const componentName = await vscode.window.showInputBox({ prompt: "Component Adını Giriniz", placeHolder: "E.g. SampleComponent" });
        if (!componentName)
            return;
        try {
            const componentFolderUri = vscode.Uri.joinPath(targetFolder, componentName);
            // Create folder
            await vscode.workspace.fs.createDirectory(componentFolderUri);
            // file paths
            const indexUri = vscode.Uri.joinPath(componentFolderUri, `index.ts`);
            const tsxUri = vscode.Uri.joinPath(componentFolderUri, `${componentName}.tsx`);
            const typesUri = vscode.Uri.joinPath(componentFolderUri, `${componentName}.types.ts`);
            const scssUri = vscode.Uri.joinPath(componentFolderUri, `${componentName}.module.scss`);
            // file contents
            const contentIndexTS = (0, utils_1.contentIndex)(componentName);
            const contentComponentTSX = (0, utils_1.contentComponent)(componentName);
            const contentComponentTypesTS = (0, utils_1.contentType)(componentName);
            const contentComponentModuleSCSS = (0, utils_1.contentStyle)(componentName);
            // write file
            await vscode.workspace.fs.writeFile(indexUri, Buffer.from(contentIndexTS, "utf8"));
            await vscode.workspace.fs.writeFile(tsxUri, Buffer.from(contentComponentTSX, "utf8"));
            await vscode.workspace.fs.writeFile(typesUri, Buffer.from(contentComponentTypesTS, "utf8"));
            await vscode.workspace.fs.writeFile(scssUri, Buffer.from(contentComponentModuleSCSS, "utf8"));
            // toast
            vscode.window.showInformationMessage(`${componentName} componenti başarıyla oluşturuldu`);
        }
        catch (error) {
            vscode.window.showErrorMessage(error.message);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map