export class Settings{
    workDirPath:string
    static formJson(formData:any):Settings{
        let settings = new Settings();

        settings.workDirPath = formData.workDirPath;
        return settings;
    }
}
