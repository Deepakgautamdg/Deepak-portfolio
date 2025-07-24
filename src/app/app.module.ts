import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { TemplateOneModule } from './template-components/template-one/template-one.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-angular14';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonService } from './utilities/common.service';
import { BackendService } from './services/backend/backend.service';
import { SweetalertService } from './services/sweetalert/sweetalert.service';
import { AbilityModule } from '@casl/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ],

  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    NgxIntlTelInputModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TemplateOneModule,
    AbilityModule,
    NgChartsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    CommonModule
  ],
  providers: [
    BackendService,
    SweetalertService,
    CommonService,
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
