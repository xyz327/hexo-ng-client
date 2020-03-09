import { Injectable, OnInit } from "@angular/core";
import * as Hexo from 'hexo';
import { SettingsService } from "../settings/settings.service";

@Injectable({
    providedIn: 'root'
})
export class HexoService implements OnInit {
    constructor(private settingService: SettingsService) {

    }
    hexo: Hexo
    ngOnInit(): void {

    }
    init(): void {
        this.hexo = new Hexo(this.settingService.settings.workDirPath, {
            debug: true,
            silent: false,
            safe: false,
            config: '_config.yml'
        });
        console.log('初始化 hexo',this)
        this.hexo.init().then(() => {
            this.hexo.watch().then(() => {
                this.loadHexoData();
            });
            this.loadHexoData()
        });
    }

    loadHexoData():void{
        let tags = this.hexo.locals.get('tags');
        console.log('hexo tags:', tags)
    }
}