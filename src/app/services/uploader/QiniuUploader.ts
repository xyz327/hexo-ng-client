import * as qiniu from 'qiniu'
import * as stream from "stream";
import { Settings } from '../../data/settings';
import { IUploader } from "./iUploader";
import { Injectable } from '@angular/core';
import * as url from "url";
@Injectable({
    providedIn: 'root'
})
export class QiniuUploader implements IUploader {
    constructor(private settings: Settings) {
    }
    init(): Promise<void> {
        return new Promise((resolve, reject) => {
            let qiniuSettings = this.settings.qiniu;

            this.accessKey = qiniuSettings.accessKey;
            this.secretKey = qiniuSettings.secretKey;
            this.bucket = qiniuSettings.bucket;
            this.host = qiniuSettings.host;
            let zoneCode = qiniuSettings.zone;
            switch (zoneCode) {
                case 'Zone_z0':
                    this.zone = qiniu.zone.Zone_z0
                    break;
                case 'Zone_z1':
                    this.zone = qiniu.zone.Zone_z1
                    break;
                case 'Zone_z2':
                    this.zone = qiniu.zone.Zone_z2
                    break;
                case 'Zone_na0':
                    this.zone = qiniu.zone.Zone_na0
                    break;
                case 'Zone_as0':
                    this.zone = qiniu.zone.Zone_as0
                    break;
                default:
                    break;
            }
            this.mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
            let config = new qiniu.conf.Config({
                zone: qiniu.zone.Zone_z0
            });
            this.formUploader = new qiniu.form_up.FormUploader(config);

            this.putPolicy = new qiniu.rs.PutPolicy({
                scope: this.bucket,
                expires: this.uploadTokenExpires
            });
            resolve();
        })

    }
    accessKey: string
    secretKey: string
    host: string
    bucket: string
    zone: qiniu.conf.Zone
    type: string = 'qiniu'
    uploadToken: string
    uploadTokenCreateAt: Date
    uploadTokenExpires: number = 7200

    private mac: qiniu.auth.digest.Mac
    private putPolicy: qiniu.rs.PutPolicy
    private formUploader: qiniu.form_up.FormUploader
    upload(data: any): Promise<string> {
        return new Promise((resolve, reject) => {
            this.refreshUploadToken()
            // 创建一个bufferstream
            // let bufferStream = new stream.PassThrough();
            //将Buffer写入
            // bufferStream.end(data);
            let putExtra = new qiniu.form_up.PutExtra();
            let time = new Date().getTime();
            const host = this.host;
            this.formUploader.put(this.uploadToken, `${time}.png`, data, putExtra, function (respErr,
                respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                if (respInfo.statusCode == 200) {
                    respBody.url = url.resolve(host, respBody.key)
                    resolve(respBody.url)
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                    reject(respBody)
                }
            })

        })
    }
    refreshUploadToken() {
        let nowTime = new Date();
        if (this.uploadTokenCreateAt == null || nowTime.getTime() > (this.uploadTokenCreateAt.getTime() + this.uploadTokenExpires - 360)) {
            // 需要重新刷新token
            this.uploadToken = this.putPolicy.uploadToken(this.mac);
            this.uploadTokenCreateAt = nowTime;
        }
    }
    // base64 转 blob
    dataURItoBlob(dataURI: string): Blob {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        const mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0];

        // write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }
}