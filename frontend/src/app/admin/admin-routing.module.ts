import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboaradminComponent } from './admin.component';
import { ProfileComponent } from './profile/profile.component';

import { CountryComponent } from './settings/country/country.component';
import { CUCountryComponent } from './settings/country/cucountry/cu-country.component';
import { CstateComponent } from './settings/cstate/cstate.component';
import { CUStateComponent } from './settings/cstate/custate/cu-state.component';

import { CityComponent } from './settings/city/city.component';
import { CUCityComponent } from './settings/city/cu-city/cu-city.component';

import { ZoneComponent } from './settings/zone/zone.component';
import { CUZoneComponent } from './settings/zone/cu-zone/cu-zone.component';

import { MapComponent } from './settings/map/map.component';
import { MapViewComponent } from './location/map_view/map_view.component';


import { ViewClientComponent } from './client/view-client/view-client.component';
import { CreateUpdateClientComponent } from './client/create-update-client/create-update-client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUpdateUserComponent } from './user/create-update-user/create-update-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { CreateUpdateCurrencyComponent } from './currency/create-update-currency/create-update-currency.component';
import { ViewCurrencyComponent } from './currency/view-currency/view-currency.component';
import { CreateUpdateLanguageComponent } from './language/create-update-language/create-update-language.component';
import { ViewLanguageComponent } from './language/view-language/view-language.component';
import { CreateUpdateRoleComponent } from './role/create-update-role/create-update-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { PermissionComponent } from './role/permissions/permission.component';
import { CreateUpdateLocationComponent } from './location/create-update-location/create-update-location.component';
import { ViewLocationComponent } from './location/view-location/view-location.component';
import { AuthGuard } from '../service/auth-guard.service';
import { AgencyComponent } from './Workforce/agency/agency.component';
import { CategoryComponent } from './Workforce/category/category.component';
import { WorkforeComponent } from './Workforce/workfore/workfore.component';
import { MaterialComponent } from './material/material/material.component';
import { MaterialCategoryComponent } from './material/material-category/material-category.component';
import { MaterialVendorComponent } from './material/material-vendor/material-vendor.component';
import { CreateOrUpdateMaterialCategoryComponent } from './material/material-category/create-or-update-material-category/create-or-update-material-category.component';
import { CreateOrUpdateMaterialComponent } from './material/material/create-or-update-material/create-or-update-material.component';
import { CreateOrUpdateMaterialVendorComponent } from './material/material-vendor/create-or-update-material-vendor/create-or-update-material-vendor.component';
import { CreateOrEditWorkforeceModalComponent } from './Workforce/workfore/create-or-edit-workforece-modal/create-or-edit-workforece-modal.component';
import { UnitComponent } from './unit/unit.component';
import { CreateOrUpdateUnitComponent } from './unit/create-or-update-unit/create-or-update-unit.component';
import { CreateOrEditAgencyComponent } from './Workforce/agency/create-or-edit-agency/create-or-edit-agency.component';
import { RateCardComponent } from './Workforce/rate-card/rate-card.component';
import { CreateOrEditRateCardComponent } from './Workforce/rate-card/create-or-edit-rate-card/create-or-edit-rate-card.component';

import { QoutationComponent } from './qoutation/qoutation.component';
import { CreateOrEditQoutationComponent } from './Qoutation/create-or-edit-qoutation/create-or-edit-qoutation.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { CreateOrUpdateTaskComponent } from './task/tasks/create-or-update-task/create-or-update-task.component';
import { CreateOrUpdateTaskCategoryComponent } from './task/task-category/create-or-update-task-category/create-or-update-task-category.component';
import { TaskCategoryComponent } from './task/task-category/task-category.component';
import { DisciplineComponent } from './Workforce/discipline/discipline.component';
import { CreateOrUpdateDisciplineComponent } from './Workforce/discipline/create-or-update-discipline/create-or-update-discipline.component';
import { CreateOrEditCategoryComponent } from './Workforce/category/create-or-edit-category/create-or-edit-category.component';
import { ManufactureComponent } from './material/manufacture/manufacture.component';
import { CreateOrEditManufacturerComponent } from './material/manufacture/create-or-edit-manufacturer/create-or-edit-manufacturer.component';
import { CommonDistribComponent } from './material/common-distrib/common-distrib.component';

import { CreateOrUpdateCommonDistribComponent } from './material/common-distrib/create-or-update-common-distrib/create-or-update-common-distrib.component';
import { ProjectComponent } from './project/project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';

import { ProjectManagerComponent } from './project-manager/project-manager.component';

import { CreateOrEditProjectManagerComponent } from './project-manager/create-or-edit-project-manager/create-or-edit-project-manager.component';

const routes: Routes = [
  {path: '', component :DashboaradminComponent,
    children: [
      { path: 'profile', component: ProfileComponent},
      { path: '', redirectTo: 'dashboard', pathMatch:'full', canActivate: [AuthGuard],data: {title: 'Home'}},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: {title: 'Home'}},
     
      { path: 'view-currency', component: ViewCurrencyComponent, canActivate: [AuthGuard]},
      { path: 'create-update-currency', component: CreateUpdateCurrencyComponent, canActivate: [AuthGuard]},
      { path: 'create-update-currency/:id', component: CreateUpdateCurrencyComponent, canActivate: [AuthGuard]},

      { path: 'view-language', component: ViewLanguageComponent, canActivate: [AuthGuard]},
      { path: 'create-update-language', component: CreateUpdateLanguageComponent, canActivate: [AuthGuard]},
      { path: 'create-update-language/:id', component: CreateUpdateLanguageComponent, canActivate: [AuthGuard]},

      { path: 'view-countries', component: CountryComponent,canActivate: [AuthGuard]},
      { path: 'create-update-country', component: CUCountryComponent,canActivate: [AuthGuard]},
      { path: 'create-update-country/:id', component: CUCountryComponent,canActivate: [AuthGuard]},
      
      { path: 'state', component: CstateComponent,canActivate: [AuthGuard]},
      { path: 'create-update-state', component: CUStateComponent,canActivate: [AuthGuard]},
      { path: 'create-update-state/:id', component: CUStateComponent,canActivate: [AuthGuard]},
      
      { path: 'city', component: CityComponent,canActivate: [AuthGuard]},
      { path: 'create-update-city', component: CUCityComponent,canActivate: [AuthGuard]},
      { path: 'create-update-city/:id', component: CUCityComponent,canActivate: [AuthGuard]},
      
      { path: 'zone', component: ZoneComponent, canActivate: [AuthGuard]},
      { path: 'create-update-zone', component: CUZoneComponent,canActivate: [AuthGuard]},
      { path: 'create-update-zone/:id', component: CUZoneComponent,canActivate: [AuthGuard]},
      
      { path: 'map/:id', component: MapComponent,canActivate: [AuthGuard]},

      { path: 'view-location', component: ViewLocationComponent, canActivate: [AuthGuard]},
      { path: 'view-location-map', component: MapViewComponent, canActivate: [AuthGuard]},
      { path: 'create-update-location', component: CreateUpdateLocationComponent, canActivate: [AuthGuard]},
      { path: 'create-update-location/:id', component: CreateUpdateLocationComponent, canActivate: [AuthGuard]},
      
      { path: 'view-users', component: ViewUserComponent, canActivate: [AuthGuard]},
      { path: 'create-update-user', component: CreateUpdateUserComponent, canActivate: [AuthGuard]},
      { path: 'create-update-user/:id', component: CreateUpdateUserComponent, canActivate: [AuthGuard]},
     
      { path: 'view-role', component: ViewRoleComponent, canActivate: [AuthGuard]},
      { path: 'create-update-role', component: CreateUpdateRoleComponent, canActivate: [AuthGuard]},
      { path: 'create-update-role/:id', component: CreateUpdateRoleComponent, canActivate: [AuthGuard]},
      
      { path: 'set-permissions/:id', component: PermissionComponent, canActivate: [AuthGuard]},
     
      { path: 'view-clients', component: ViewClientComponent,canActivate: [AuthGuard]},
      { path: 'create-update-client', component: CreateUpdateClientComponent,canActivate: [AuthGuard]},
      { path: 'create-update-client/:id', component: CreateUpdateClientComponent,canActivate: [AuthGuard]},
      
      // workforce routing
      { path: 'workfore/agency', component: AgencyComponent,canActivate: [AuthGuard]},
      { path: 'workfore/createOrEditAgency', component: CreateOrEditAgencyComponent,canActivate: [AuthGuard]},

      { path: 'workfore/category', component: CategoryComponent,canActivate: [AuthGuard]},
      { path: 'workfore/create-update-workforce-category', component: CreateOrEditCategoryComponent,canActivate: [AuthGuard]},
      { path: 'workfore/create-update-workforce-category/:id', component: CreateOrEditCategoryComponent,canActivate: [AuthGuard]},

      { path: 'workfore/workfore', component: WorkforeComponent,canActivate: [AuthGuard]},
      { path: 'workfore/createoreditWorkfore', component: CreateOrEditWorkforeceModalComponent,canActivate: [AuthGuard]},

      { path: 'workfore/rate-card', component: CategoryComponent,canActivate: [AuthGuard]},
      { path: 'workfore/create-update-workforce-rate-card', component: CreateOrEditCategoryComponent,canActivate: [AuthGuard]},
      { path: 'workfore/create-update-workforce-rate-card/:id', component: CreateOrEditCategoryComponent,canActivate: [AuthGuard]},


      { path: 'workfore/discipline', component: DisciplineComponent,canActivate: [AuthGuard]},
      { path: 'workfore/create-update-discipline', component: CreateOrUpdateDisciplineComponent,canActivate: [AuthGuard]},
      { path: 'workfore/create-update-discipline/:id', component: CreateOrUpdateDisciplineComponent,canActivate: [AuthGuard]},
     
      //Task 
      { path: 'task/task', component: TasksComponent,canActivate: [AuthGuard]},
      { path: 'task/create-update-task', component: CreateOrUpdateTaskComponent,canActivate: [AuthGuard]},
      { path: 'task/create-update-task/:id', component: CreateOrUpdateTaskComponent, canActivate: [AuthGuard]},

      { path: 'task/task-category', component: TaskCategoryComponent,canActivate: [AuthGuard]},
      { path: 'task/create-update-task-category', component: CreateOrUpdateTaskCategoryComponent,canActivate: [AuthGuard]},
      { path: 'task/create-update-task-category/:id', component: CreateOrUpdateTaskCategoryComponent,canActivate: [AuthGuard]},
      //

      //Qoutation
      { path: 'qoutation', component: QoutationComponent,canActivate: [AuthGuard]},
      { path: 'qoutation/createOrEdit', component: CreateOrEditQoutationComponent,canActivate: [AuthGuard]},

       // material routing
      { path: 'material/material', component: MaterialComponent,canActivate: [AuthGuard]},
      { path: 'material/create-update-material', component: CreateOrUpdateMaterialComponent,canActivate: [AuthGuard]},
      { path: 'material/create-update-material/:id', component: CreateOrUpdateMaterialComponent,canActivate: [AuthGuard]},
      
      { path: 'material/material-category', component: MaterialCategoryComponent,canActivate: [AuthGuard]},
      { path: 'material/create-update-category', component: CreateOrUpdateMaterialCategoryComponent,canActivate: [AuthGuard]},
      { path: 'material/create-update-category/:id', component: CreateOrUpdateMaterialCategoryComponent,canActivate: [AuthGuard]},
      
      

      { path: 'material/material-distributor', component: MaterialVendorComponent,canActivate: [AuthGuard]},
      { path: 'material/create-update-distributor', component: CreateOrUpdateMaterialVendorComponent,canActivate: [AuthGuard] },
      { path: 'material/create-update-distributor/:id', component: CreateOrUpdateMaterialVendorComponent,canActivate: [AuthGuard] },


      //manufacture 
      { path: 'material/manufacture', component: ManufactureComponent,canActivate: [AuthGuard]},
      { path: 'material/create-or-edit-manufacture', component: CreateOrEditManufacturerComponent,canActivate: [AuthGuard]},

      { path: 'material/CommonDistrib', component: CommonDistribComponent},
      { path: 'material/create-update-commondistrib', component: CreateOrUpdateCommonDistribComponent},
      { path: 'material/create-update-commondistrib/:id', component: CreateOrUpdateCommonDistribComponent},



      { path: 'unit', component: UnitComponent,canActivate: [AuthGuard]},
      { path: 'unit/create-update-unit', component: CreateOrUpdateUnitComponent,canActivate: [AuthGuard]},
      { path: 'unit/create-update-unit/:id', component: CreateOrUpdateUnitComponent,canActivate: [AuthGuard]},
      { path: 'project', component: ProjectComponent},
      { path: 'project/view-project', component: ViewProjectComponent},

      { path: 'project-manager', component: ProjectManagerComponent},

      { path: 'project-manager/create-update-projectmanager', component: CreateOrEditProjectManagerComponent},
      { path: 'project-manager/create-update-projectmanager/:id', component: CreateOrEditProjectManagerComponent},
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
