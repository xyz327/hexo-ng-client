import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from "./pages-routing.module";
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule} from 'ng-zorro-antd';
import { EditorMdDirective } from "../services/editor/editor-md.directive";

import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { EditorComponent } from "./editor/editor.component";
import { InitComponent } from "./init/init.component";
import { PreviewComponent } from "./preview/preview.component";
import { SettingsComponent } from "./settings/settings.component";
import { AboutComponent } from "./about/about.component";
@NgModule({
    declarations: [
        EditorMdDirective,
        LayoutComponent,HomeComponent, EditorComponent,PreviewComponent, InitComponent,SettingsComponent,AboutComponent
    ],
    imports: [CommonModule, TranslateModule,
        FormsModule,ReactiveFormsModule,
        // ng-zorro-antd
        NgZorroAntdModule,
        // ng-zorro-antd
        PagesRoutingModule
    ]
})
export class PagesModule { }
