import {AfterViewInit, Attribute, Directive, EventEmitter, Input, Output, OnInit, ComponentRef, Component, OnChanges} from '@angular/core';
import { EditorConfig } from './model/editor-config';
import { clipboard } from "electron";
import $ from 'jquery';
import { UploaderService } from "../uploader/uploader.service";

declare var editormd: any;
declare var $: any;

@Directive({
  selector: '[appEditorMd]',
  providers:[{
    provide:UploaderService
  }]
})
export class EditorMdDirective implements AfterViewInit,OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  
  }
  @Input() editormdConfig: EditorConfig; // 配置选项
  @Output() onEditorChange: EventEmitter<string> = new EventEmitter<string>(); // 发射器
  @Output() onEditorLoad: EventEmitter<any> = new EventEmitter<any>(); // 发射器
  editor: any; // editormd编辑器

  constructor(@Attribute('id') private id: string, @Attribute('preview') private preview: string, private uploaderService:UploaderService) {
    console.log(' constructor id:',id, preview)
  
  }

  ngAfterViewInit(): void {
    console.log('id:',this.id)
    console.log('preview:',this.preview)
    this.editor = editormd(this.id, this.editormdConfig); // 创建编辑器
    const editor = this.editor;
    const out = this.onEditorChange;
    const loadOut = this.onEditorLoad;
    const preview = this.preview;
    this.editor.on('resize', function () {
    
    });

    this.editor.on('load', function(){
      if(preview){
        editor.previewing();
      }
      console.log('editor load')
      loadOut.emit(editor);
    })
    if(this.preview){
      return;
    }
    const textarea = $('#' + this.id + ' :first'); // 获取textarea元素

    // 当编辑器内容改变时，触发textarea的change事件
    this.editor.on('change', function () {
      out.emit(textarea.val());
    });
    
    const uploaderService = this.uploaderService
    console.log('editor', editor);
    console.log('uploaderService', uploaderService);
    $(this.editor.editor).on('paste', function (event) {
        console.log('pasted:', event);
        let pasteImage = clipboard.readImage('clipboard');
        if(!pasteImage.isEmpty()){
            uploaderService.upload(pasteImage.toPNG())
            .then(res=>{
              console.log(res)
              editor.insertValue(`![image](${res})`)
            }).catch(e=>{
              console.error(e)
            });
           
        }
        // 此时file就是剪切板中的图片文件
    });
  }
}
