import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkforceRoutingModule } from './workforce-routing.module';
import { worksforceComponent } from './worksforce.component';
import { SharedModule } from '../SharedModule.module';
import { HeaderComponent } from './Shared/Hearder/Hearder.component';
import { SidebarComponent } from './Shared/SideBar/SideBar.component';
import { ProjectComponent } from './project/project.component';
import { ViewPojectComponent } from './project/view-poject/view-poject.component';
import { AssignProjectComponent } from './project/assign-project/assign-project.component';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from '../service/profile.service';
import { TimelistComponent } from './timelist/timelist.component';
import { viewWorkforceTimeComponent } from './timelist/viewWorkforceTime/viewWorkforceTime.component';


@NgModule({
  declarations: [
    worksforceComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectComponent,
    ViewPojectComponent,
    AssignProjectComponent,
    ProfileComponent,
    TimelistComponent,
    viewWorkforceTimeComponent
  ],
  imports: [
    CommonModule,
    WorkforceRoutingModule,
    SharedModule,
  ],
  providers: [AuthenticationService],
})
export class WorkforceModule { }
