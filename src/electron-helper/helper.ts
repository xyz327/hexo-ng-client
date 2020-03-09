import { ipcMain,dialog,BrowserWindow } from "electron";


export  default {
     init: function(browserWindow: BrowserWindow):void{
        // 
        ipcMain.on('open-directory-dialog', evet=>{
            dialog.showOpenDialog(browserWindow, {
                properties: ['openDirectory']
            }).then(dir=>{
                if(dir){
                    evet.sender.send('selected-directory', dir);
                }
            }).catch(err=>{
                evet.sender.send('selected-directory-error', err);
            })
        });
    }
}