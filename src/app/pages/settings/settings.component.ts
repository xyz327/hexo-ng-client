import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../services/settings/settings.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Settings, QiniuZone } from '../../data/settings';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings: Settings
  saving: boolean = false

  availableZone = [new QiniuZone('华东', 'Zone_z0'), new QiniuZone('华北', 'Zone_z1'),
  new QiniuZone('华南', 'Zone_z2'), new QiniuZone('北美', 'Zone_na0'), new QiniuZone('东南亚', 'Zone_as0')]

  constructor(private settingsService: SettingsService,
    private nzNotificationService:NzNotificationService) {
    this.settings = settingsService.settings;

  }

  ngOnInit(): void {
    console.log('settings component:', this)

  }
  saveSettings(): void {
    console.log(event)
    this.saving = true;
    this.settingsService.save(this.settings).then(() => {
      this.nzNotificationService.success('保存成功','设置保存成功');
      this.saving = false;
    }).catch(err => {
      console.error(err);
    })

  }
}
