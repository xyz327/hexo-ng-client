import { Injectable, OnInit } from '@angular/core';

import { ElectronService } from '../../core/services';
import { Settings } from "../../data/settings";
import * as fs from 'fs';
import * as path from 'path';

const CONFIG_FILE: string = 'app.config.json';

@Injectable({
    providedIn: 'root'
})
export class SettingsService implements OnInit {

    userData: string
    configFilePath: string
    settings: Settings
    constructor(private electronService: ElectronService) {
        this.userData = this.electronService.remote.app.getPath("userData");
        this.configFilePath = path.resolve(this.userData, CONFIG_FILE);
    }
    ngOnInit(): void {

    }
    /**
     * 检查是否初始化
     */
    check(): boolean {
        console.log('config file path', this.configFilePath);
        if (!fs.existsSync(this.configFilePath)) {
            fs.writeFileSync(this.configFilePath, '{}');
            return false;
        } else {
            this.init();
        }
        return this.validate();
    }
    init(): void {
        try {
            let jsonData = fs.readFileSync(this.configFilePath);
            let jsonObject = JSON.parse(jsonData.toLocaleString());
            this.settings = Settings.formJson(jsonObject);
        } catch (e) {
        }
    }
    /**
     * 校验配置是否正确
     */
    validate(): boolean {
        return this.settings !== null;
    }

    save(settings: Settings): void {
        this.settings = settings;
        fs.writeFileSync(this.configFilePath, JSON.stringify(settings));
    }
}