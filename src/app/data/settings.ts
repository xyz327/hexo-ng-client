
export class Settings {
    workDirPath: string
    uploader: string = 'local'
    qiniu: QiniuConfig = new QiniuConfig()
    static formJson(formData: any): Settings {
        let settings = new Settings();

        //settings.workDirPath = formData.workDirPath;
        Object.keys(formData).forEach(key=>{
            settings[key]  = formData[key]
        })
        return settings;
    }
}

export class QiniuConfig {
    accessKey: string
    secretKey: string
    host: string
    bucket: string
    zone: string = 'Zone_z0'
}

export class QiniuZone {
    name: string
    code: string
    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }

}

