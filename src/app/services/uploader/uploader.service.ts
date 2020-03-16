import { SettingsService } from "../settings/settings.service";
import { QiniuUploader } from "./QiniuUploader";
import { IUploader } from "./iUploader";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UploaderService {
   
    iUploader: IUploader
    constructor(private settingsService: SettingsService){
        this.init();
    }
    init():Promise<void>{
        let settings = this.settingsService.settings;
        let uploaderType = settings.uploader;
        this.iUploader = new QiniuUploader(settings);
        return this.iUploader.init();
    }
    upload(data:any): Promise<string>{
        return this.iUploader.upload(data);
    }
}
