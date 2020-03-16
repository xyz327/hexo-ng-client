import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { HexoService, I18nService,InitService } from "./services";
import { Router } from "@angular/router";
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  inited: boolean = false
  messageId: string;
  ngOnInit(): void {
    this.initService.init().then(inited=>{
      if(!inited){
         this.router.navigate(['init']);
      } else {
        this.inited = true;
      }
   }).catch(e=>{
     console.log('init err:,', e)
   }).finally(()=>{
     console.log('remove messageId:', this.messageId)
     this.nzMessageService.remove(this.messageId)
   })
  }
  constructor(
    public electronService: ElectronService,
    private nzNotificationService:NzNotificationService,
    private nzMessageService:NzMessageService,
    private i18nService: I18nService,
    private initService: InitService,
    private router: Router
  ) {
    i18nService.load();
    console.log('AppConfig', AppConfig);
    this.messageId= this.nzMessageService.info('应用程序初始化中....', {
      nzDuration:0,
      nzPauseOnHover: true
    }).messageId
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}