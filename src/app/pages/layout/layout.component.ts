import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../services/settings/settings.service";
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private settingsService:SettingsService) {
    //hexoService.init()
   }

  ngOnInit(): void { }

}
