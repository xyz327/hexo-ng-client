import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeComponent } from "./pages/home/home.component";
import { InitComponent } from "./pages/init/init.component";
import { AuthGuard } from "./auth/auth.guard";
import { EditorComponent } from "./pages/editor/editor.component";
import { PreviewComponent } from "./pages/preview/preview.component";
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'layout/home'
  },
  {
    path: 'init',
    component: InitComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}