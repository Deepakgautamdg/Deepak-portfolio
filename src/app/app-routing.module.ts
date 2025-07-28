import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateOneComponent } from './template-components/template-one/template-one.component';
import { MainPageComponent } from './pages/public/web-page/main-page/main-page.component';
import { WebPageComponent } from './pages/public/web-page/web-page.component';

const routes: Routes = [

  {
    path: '',
    component: TemplateOneComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/public/web-page/web-page.module').then(
            (m) => m.WebPageModule
          ),
        data: {
          ogUrl: '',
          title: 'WebPage | HappyDost',
          description: '',
          key: '',
          pageTitle: 'WebPage',
        },
      },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
