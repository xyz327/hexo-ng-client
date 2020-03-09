import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_LANG:string = 'zh_CN';

@Injectable({
    providedIn: 'root'
})
export class I18nService{
    constructor(private translateService:TranslateService){
        translateService.setDefaultLang(DEFAULT_LANG);
        translateService.use(DEFAULT_LANG);
    }

    load():void{

    }

    get(key:string){
        return this.translateService.get(key);
    }
}