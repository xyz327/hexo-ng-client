export interface IUploader extends UploaderType{
    upload(data:Buffer): Promise<string>
    init():Promise<void>;
}

export interface UploaderType{
    type:String
}