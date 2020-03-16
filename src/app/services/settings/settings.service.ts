import { Injectable, OnInit } from '@angular/core';

import { ElectronService } from '../../core/services';
import { Settings } from "../../data/settings";
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'dns';
import { rejects } from 'assert';

const CONFIG_FILE: string = 'app.config.json';

@Injectable({
    providedIn: 'root'
})
export class SettingsService implements OnInit {

    homePath: string
    appConfigDirPath: string
    configFilePath: string
    private _settings: Settings
    constructor(private electronService: ElectronService) {
        this.homePath = this.electronService.remote.app.getPath("home");
        this.appConfigDirPath = path.resolve(this.homePath, '.hexo-ng-client');
        this.configFilePath = path.resolve(this.appConfigDirPath, CONFIG_FILE);
        if (!fs.existsSync(this.appConfigDirPath)) {
            fs.mkdirSync(this.appConfigDirPath)
        }
        console.log('SettingsService:', this)
    }
    ngOnInit(): void {

    }
    get settings(): Settings {
        return this._settings;
    }
    set settings(settings: Settings) {
        this._settings = settings;
    }
    /**
     * 初始化配置
     */
    init(): Promise<boolean> {
        console.log('config file path', this.configFilePath);
        // 是否存在配置文件
        return new Promise((resolve, reject) => {
            fs.exists(this.configFilePath, (exists) => {
                if (exists) {
                    // 读取配置
                    this.readSettings().then((ret) => {
                        resolve(this.validate())
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    // 创建配置文件
                    this.createSettingsFile().then(() => {
                        resolve(false);
                    }).catch(err => {
                        reject(err);
                    })
                }
            })
        });
    }
    private readSettings(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.configFilePath, (err, jsonData) => {
                if (err) {
                    reject(err)
                } else {
                    try {
                        let jsonObject = JSON.parse(jsonData.toLocaleString());
                        this.settings = Settings.formJson(jsonObject);
                        resolve(true);
                    } catch (e) {
                        reject(e);
                    }
                }
            })
        })
    }
    private createSettingsFile(): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.configFilePath, "{}", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })

    }
    /**
     * 校验配置是否正确
     */
    validate(): boolean {
        console.log(this, this.settings)
        return !!this.settings && this.settings.workDirPath != null;
    }

    save(settings: Settings): Promise<void> {
        this.settings = settings;
        return new Promise((resolve, reject) => {
            console.log('write settings:', settings)
            fs.writeFile(this.configFilePath, JSON.stringify(settings), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            }
        )});
    }
}