import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { SettingsService,I18nService } from "./services";
import { Router } from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private settingsService: SettingsService,
    private i18nService: I18nService,
    private router: Router
  ) {
    i18nService.load();
    console.log('AppConfig', AppConfig);
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    // check init settings
    if(!settingsService.check()){
       // need init settings
       this.router.navigate(['init']);
       console.log(location)
    }
   
  }
}