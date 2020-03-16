import { Component} from '@angular/core';
import { DefaultEditorConfig } from "../../services/editor/model/editor-config";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HexoService } from '../../services';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  title = 'app';
  id:string
  conf = new DefaultEditorConfig({
    height:'90%'
  });
  editor: any;
  postRaw: string;

  // 同步属性内容
  syncModel(str): void {
    this.postRaw = str;
  }
  onEditorLoad(editor:any):void{
    this.editor = editor;
  }
  constructor(private route: ActivatedRoute,private hexoService:HexoService){
    this.route.queryParamMap.pipe(
      map(params => {
        // (+) before `params.get()` turns the string into a number
        console.log('route:', params)
        let id = this.id = params.get('id');
        return this.hexoService.findPostById(id);
      })
    ).subscribe(post=>{
        this.postRaw = post._content;
        if(this.editor){
          this.editor.setMarkdown(this.postRaw);
        }
        console.log(this)
    });
  }
}
