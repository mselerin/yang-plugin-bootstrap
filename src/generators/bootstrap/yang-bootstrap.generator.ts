import * as path from 'path';
import * as extend from "deep-extend";
import {YangGenerator} from "yang-cli/dist/src/generators/yang.generator";
import {FileUtils} from "yang-cli/dist/src/helpers/file-utils";

export class YangBootstrapGenerator extends YangGenerator
{
    async runWriting(): Promise<void> {
        await super.runWriting();
        await this.copyTemplates();
        this.updatePackageJson();

        // MAJ de styles.scss avec l'import de bootstrap
        {
            let file = `${this.projectRoot}src/styles.scss`;
            let content = FileUtils.read(file);
            content = `@import "assets/styles/bootstrap-custom";\r\n${content}`;
            FileUtils.write(file, content);
        }


        // MAJ de _variable.scss
        {
            let file = `${this.projectRoot}src/assets/styles/_variables.scss`;
            let content = FileUtils.read(file);
            content = `@import "~bootstrap/scss/functions";\r\n\r\n${content}\r\n\r\n@import "~bootstrap/scss/variables";`;
            FileUtils.write(file, content);
        }
    }



    updatePackageJson(): void {
        const file = path.join(this.root, 'package.json');
        const pkg = FileUtils.readJSON(file);

        extend(pkg, {
            dependencies: {
                "bootstrap": "4.0.0",
                "jquery": "3.2.1"
            },
            devDependencies: {
                "@types/jquery": "2.0.45"
            }
        });

        FileUtils.writeJSON(file, pkg);
    }
}
