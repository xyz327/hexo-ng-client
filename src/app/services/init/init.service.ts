import { Injectable } from "@angular/core";
import { SettingsService } from '../settings/settings.service';
import { HexoService } from '../hexo/hexo.service';
import { Observable, of, observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { resolve } from "dns";

@Injectable({
    providedIn: 'root'
})
export class InitService{
    constructor(private settingsService:SettingsService,
        private hexoService:HexoService){
    }

    init(): Promise<boolean>{
        return this.settingsService.init().then(inited=>{
            if(!inited){
                return Promise.resolve(false)
            }
               // 初始化 hexo 
            return this.hexoService.init().then(()=>{
                return Promise.resolve(true);
            })
        });
    }

    check(): Promise<boolean>{
        return Promise.resolve(this.settingsService.validate());
    }
}