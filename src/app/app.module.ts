import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateOneModule } from './template-components/template-one/template-one.module';


@NgModule({
  declarations: [
    AppComponent,
    
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    TemplateOneModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
