import { Component, OnInit, AfterViewChecked, OnChanges } from '@angular/core';
import { DefaultEditorConfig, EditorConfig } from "../../services/editor/model/editor-config";
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { HexoService, SettingsService } from '../../services';
import { Observable } from 'rxjs';
import * as Hexo from 'hexo';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  private path: string
  post$: Observable<Hexo.Locals.Post>
  postRaw: string
  editor:any
  id:string

  basePath:any
  constructor(private route: ActivatedRoute,
    private hexoService:HexoService,private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    console.log(this.route)
    this.route.queryParamMap.pipe(
      map(params => {
        // (+) before `params.get()` turns the string into a number
        let id = this.id = params.get('id');
        return this.hexoService.findPostById(id);
      })
      ).subscribe(post=>{

        this.postRaw = post._content;
        //this.basePath = this.sanitizer.bypassSecurityTrustResourceUrl('file://'+post.asset_dir);
        this.basePath = 'file://'+post.asset_dir.replace(/\\/g, '/')
        
        console.log(this)
        this.conf = new DefaultEditorConfig({
          baseUrl: this.basePath,
          height: '90%',
          searchReplace: false,
          toolbar :false,
          readOnly: true,
          imageUpload: false
        })

        if(this.editor){
          //更新后重新初始化editormd
          this.editor.config({baseUrl: this.basePath})
          this.editor.setValue(this.postRaw);
          this.editor.previewing();
        }
        
    });
  }
  onEditorLoad(editor:any):void{
    this.editor = editor;
  }
  title = 'app';

  conf: EditorConfig;
}
