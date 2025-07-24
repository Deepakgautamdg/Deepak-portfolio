import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPageComponent } from './web-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { TrackComponent } from './track/track.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExperienceComponent } from './experience/experience.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: '', component: WebPageComponent},
  {path:'track', component:TrackComponent},
];

@NgModule({
  declarations: [
    WebPageComponent,
    MainPageComponent,
    TrackComponent,
    ExperienceComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
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