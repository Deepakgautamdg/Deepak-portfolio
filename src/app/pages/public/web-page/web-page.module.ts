import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPageComponent } from './web-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ExperienceComponent } from './experience/experience.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { MereProjectsComponent } from './mere-projects/mere-projects.component';

const routes: Routes = [
  { path: '', component: WebPageComponent},
  { path:'project', component: MereProjectsComponent}
];

@NgModule({
  declarations: [
    WebPageComponent,
    MainPageComponent,
    ExperienceComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    MereProjectsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],  
})
export class WebPageModule { }