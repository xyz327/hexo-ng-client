import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HexoService } from "../../services/hexo/hexo.service";
import { NzLayoutModule,NzSliderModule } from 'ng-zorro-antd';
import * as Hexo from 'hexo';
import { PreviewComponent } from '../preview/preview.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[
    NzLayoutModule,NzSliderModule
  ],
})
export class HomeComponent implements OnInit {
  isCollapsed: true
  selectedTag: Hexo.Locals.Tag
  selectedCategory: Hexo.Locals.Category
  posts:Array<Hexo.Locals.Post>
  tags: Array<Hexo.Locals.Tag>
  categories: Array<Hexo.Locals.Category>

  constructor(private hexoService:HexoService) {
    //hexoService.init()
   }

  ngOnInit(): void {
      this.tags = this.hexoService.tags;
      this.posts = this.hexoService.posts;
      this.categories = this.hexoService.categories;
      this.sortPosts();
   }

   queryChange<T extends Hexo.Locals.Tag>(value: T, type:string): void{
      console.log(type, value, this)
      if(!value){
          this.posts = this.hexoService.posts;
      } else if(type == 'tag'){
          this.selectedCategory = null;
          this.posts = value.posts.toArray()
      } else if(type == 'category'){
          this.selectedTag = null;
          this.posts = value.posts.toArray()
      }
      this.sortPosts();
   }
   sortPosts():void{
      if(this.posts){
        this.posts = this.posts.sort((o1,o2)=>{
          return o1.date.isAfter(o2.date) ? -1 : 1;
        })
      }
   }
   trackByItems(index: number, item: Hexo.Locals.Post): string {
      return item.path; 
   }
}
