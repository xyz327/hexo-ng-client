import { Component, OnInit, Input } from '@angular/core';
import { ipcRenderer } from 'electron';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

import { SettingsService } from "../../services/settings/settings.service";

import {Settings} from "../../data/settings";

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
    settingsForm:FormGroup;
    constructor(private formBuilder:FormBuilder, private settingsServce:SettingsService,
        private router:Router) { 
       this.settingsForm = formBuilder.group({
            workDirPath:''
       })
    }

    ngOnInit() {
        ipcRenderer.on('selected-directory', (event,filePath)=>{
            console.log('选择 dir path:', event, filePath);
            this.settingsForm.setValue({
                'workDirPath': filePath.filePaths[0]
            })
        });
    }
    isVisible = true;
    openDir(){
        console.log('触发open-directory-dialog');
        ipcRenderer.send('open-directory-dialog');
    }
    handleOk(): void {
        let workDirPath = this.settingsForm.getRawValue()['workDirPath'];
        console.log('work dir path:', this.settingsForm.getRawValue()['workDirPath']);
        let settings = new Settings();
        settings.workDirPath = workDirPath;
        this.settingsServce.save(settings);
        this.router.navigate(['/']);

    }

    handleCancel(): void {
        console.log('取消选择目录,退出');
        ipcRenderer.send("close");
    }
}
