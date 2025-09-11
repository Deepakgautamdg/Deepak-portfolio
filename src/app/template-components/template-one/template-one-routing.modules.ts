import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateOneComponent } from './template-one.component';
import { WebPageComponent } from 'src/app/pages/public/web-page/web-page.component';
import { MainPageComponent } from 'src/app/pages/public/web-page/main-page/main-page.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateOneRoutingModule {}
