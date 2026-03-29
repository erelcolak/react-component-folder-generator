"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
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
            // camelCase conversion
            const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);
            const componentFolderUri = vscode.Uri.joinPath(targetFolder, componentName);
            // Create folder
            await vscode.workspace.fs.createDirectory(componentFolderUri);
            // file paths
            const indexUri = vscode.Uri.joinPath(componentFolderUri, `index.ts`);
            const tsxUri = vscode.Uri.joinPath(componentFolderUri, `${componentName}.tsx`);
            const typesUri = vscode.Uri.joinPath(componentFolderUri, `${componentName}.types.ts`);
            const scssUri = vscode.Uri.joinPath(componentFolderUri, `${componentName}.module.scss`);
            // file contents
            const contentIndexTS = `
        export { default as ${componentName} } from "./${componentName}";\n
      `;
            const contentComponentTSX = `
        import { ${componentName}Props } from "./${componentName}.types";
        import styles from "./${componentName}.module.scss";

        // ${componentName} component
        const ${componentName} = (props: ${componentName}Props) => {
          // destructuring props
          const {
            // base props
            // variant props
            // modifier props
            // other props
          } = props;

          // other variables/functions/handlers

          // render
          return <div className={styles.${camelCaseName}}></div>;
        };

        // export
        export default ${componentName};
      `;
            const contentComponentTypesTS = `
        /**
         * @author erelcolak
         * @interface ${componentName}Props
         * @description Prop definitions for ${componentName} component
         */
        export interface ${componentName}Props {
          // element props
          // variant props
          // modifier props
          // other props
        }
      `;
            const contentComponentModuleSCSS = `
        @use "variables" as *;
        @use "mixins" as *;

        // Elements
        .${camelCaseName} {
        }

        // Variants
        // alignVariant
        // colorVariant
        // styleVariant
        // sizeVariant

        // Modifiers

        // Interactions
      `;
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