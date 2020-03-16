export interface EditorConfig {
    width: string
    height: string
    baseUrl:string
    path: string
    codeFold: boolean
    readOnly: boolean
    tocm: boolean
    watch: boolean
    previewCodeHighlight: boolean
    saveHTMLToTextarea: boolean
    markdown: string
    flowChart: boolean
    syncScrolling: boolean
    sequenceDiagram: boolean
    imageUpload: boolean
    imageFormats: Array<string>
    imageUploadURL: string
}

export class DefaultEditorConfig implements EditorConfig {
    width: string = '100%';
    height: string = '95%';
    baseUrl:string
    path: string = 'assets/editor.md/lib/';
    codeFold: boolean = true;
    searchReplace: boolean = true;
    toolbar: boolean = true;
    emoji: boolean = true;
    taskList: boolean = true;
    tex: boolean = true;
    readOnly: boolean = false;
    tocm: boolean = true;
    watch: boolean = true;
    previewCodeHighlight: boolean = true;
    saveHTMLToTextarea: boolean = true;
    markdown: string = '';
    flowChart: boolean = true;
    syncScrolling: boolean = true;
    sequenceDiagram: boolean = true;
    imageUpload: boolean = true;
    imageFormats: Array<string> = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
    imageUploadURL: string = '';
    constructor(options?: any) {
        if (options) {
            Object.getOwnPropertyNames(options).forEach(name => {
                this[name] = options[name];
            });
        }
    }
}

