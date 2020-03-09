import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitRoutingModule } from "./init-routing.module";
import { TranslateModule } from '@ngx-translate/core';
import { InitComponent } from './init.component';
import { NzModalModule,  NzInputModule, NzIconModule, NzButtonModule,NzGridModule } from 'ng-zorro-antd';

import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule,ReactiveFormsModule,
        TranslateModule,
        NzModalModule, NzInputModule, NzIconModule, NzButtonModule,NzGridModule,
        InitRoutingModule],
    declarations: [InitComponent],
    exports: [InitComponent]
})
export class InitModule { }
