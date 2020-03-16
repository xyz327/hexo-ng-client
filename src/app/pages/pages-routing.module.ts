import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { InitComponent } from "./init/init.component";
import { SettingsComponent } from "./settings/settings.component";
import { EditorComponent } from "./editor/editor.component";
import { PreviewComponent } from "./preview/preview.component";
import { AboutComponent } from "./about/about.component";
const routes: Routes = [
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        canActivate: [

        ],
        component: HomeComponent,
        children: [
          {
            path: 'edit',
            component: EditorComponent
          },
          {
            path: 'preview',
            component: PreviewComponent
          }
        ]
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },
  {
    path: 'init',
    component: InitComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }