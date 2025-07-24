import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateOneComponent } from './template-one.component';
import { RouterModule } from '@angular/router';
import { TemplateOneRoutingModule } from './template-one-routing.modules';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './form-components/button/button.component';
import { LoaderInterceptorService } from 'src/app/services/loader-interceptor/loader-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { Header2Component } from './components/header2/header2.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';

@NgModule({
  declarations: [
    TemplateOneComponent,
    ButtonComponent,
    Header2Component,
    FooterComponent,
    MyProjectsComponent,
  ],
  imports: [
    CommonModule,
    TemplateOneRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports: [
    TemplateOneComponent,
    ButtonComponent,
    Header2Component
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
})
export class TemplateOneModule { }
