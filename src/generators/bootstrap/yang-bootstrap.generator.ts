import {YangGenerator} from "yang-cli/dist/generators/yang.generator";
import {YangUtils} from "yang-cli/dist/helpers/yang-utils";
import extend = require('deep-extend');

export class YangBootstrapGenerator extends YangGenerator
{
    async _writing(): Promise<void> {
        await super._writing();

        // Copy templates
        this._copyTemplates();

        // MAJ de package.json
        const pkg = this.fs.readJSON(this.destinationPath(`${this.projectRoot}/package.json`), {});

        extend(pkg, {
            dependencies: {
                "bootstrap": "4.0.0-beta",
                "jquery": "3.2.1"
            },
            devDependencies: {
                "@types/jquery": "2.0.45"
            }
        });

        this.fs.writeJSON(this.destinationPath(`${this.projectRoot}/package.json`), pkg);


        // MAJ de styles.scss avec l'import de bootstrap
        {
            let file = `${this.projectRoot}src/styles.scss`;
            let content = this.fs.read(this.destinationPath(file));
            content = `@import "assets/styles/bootstrap-custom";\r\n${content}`;
            this.fs.write(file, content);
        }


        // MAJ de _variable.scss
        {
            let file = `${this.projectRoot}src/assets/styles/_variables.scss`;
            let content = this.fs.read(this.destinationPath(file));
            content = `@import "~bootstrap/scss/functions";\r\n\r\n${content}\r\n\r\n@import "~bootstrap/scss/variables";`;
            this.fs.write(file, content);
        }


        // MAJ de main.ts avec l'import de bootstrap
        // {
        //     let file = `${this.projectRoot}src/main.ts`;
        //     let content = this.fs.read(this.destinationPath(file));
        //     content = `import 'bootstrap';\r\n${content}`;
        //     this.fs.write(file, content);
        // }
    }



    // Declaration du runLoop yeoman
    initializing() { return super.initializing(); }
    prompting() { return super.prompting(); }
    configuring() { return super.configuring(); }
    writing() { return super.writing(); }
    conflicts() { return super.conflicts(); }
    install() { return super.install(); }
    end() { return super.end(); }
}
