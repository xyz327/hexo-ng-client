import { Injectable, OnInit } from "@angular/core";
import * as Hexo from 'hexo';
import { SettingsService } from "../settings/settings.service";
import { resolve } from "dns";
import { rejects } from "assert";
import { Observable, Subscriber,generate, Scheduler } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";

@Injectable({
    providedIn: 'root'
})
export class HexoService implements OnInit {
    constructor(private settingService: SettingsService) {

    }
    watch: boolean = false
    hexo: Hexo
    tags: Array<Hexo.Locals.Tag>
    posts: Array<Hexo.Locals.Post>
    categories: Array<Hexo.Locals.Category>
    initHexo: boolean = true
    ngOnInit(): void {
      
    }
    init(): Promise<void> {
        if(!this.initHexo){
            return Promise.resolve();
        }
        this.hexo = new Hexo(this.settingService.settings.workDirPath, {
            debug: true,
            silent: false,
            safe: true,
            config: '_config.yml'
        });
        console.log('初始化 hexo',this)
        return this.hexo.init().then(() => {
            if(this.watch){
                return this.hexo.watch().then(() => {
                    return this.loadHexoData();
                });
            }else{
                return this.hexo.load().then(() => {
                    return this.loadHexoData();
                });
            }
        });
    }

    loadHexoData():Promise<void>{
        return new Promise((resolve, reject)=>{
            this.tags = this.hexo.locals.get('tags').toArray();
            this.posts = this.hexo.locals.get('posts').toArray();
            this.categories = this.hexo.locals.get('categories').toArray();
            console.log('loaded hexo data:', this)
            resolve();
        })
    }

    findPostById(id:string): Hexo.Locals.Post{
        let filtered = this.posts.filter(post=>post._id==id);
        console.log('id:', id, 'filtered:', filtered)
        if(filtered.length > 0){
            return filtered[0];
        }
        return null;
    }
}