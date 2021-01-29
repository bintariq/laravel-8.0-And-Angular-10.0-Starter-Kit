import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { ViewPojectComponent } from './project/view-poject/view-poject.component';
import { worksforceComponent } from './worksforce.component';
import { TimelistComponent } from './timelist/timelist.component';
const routes: Routes = [
  {path: '', component :worksforceComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch:'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'project', component: ProjectComponent},
    { path: 'project/view-project', component: ViewPojectComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'timelist', component: TimelistComponent},
  ]
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkforceRoutingModule { }
