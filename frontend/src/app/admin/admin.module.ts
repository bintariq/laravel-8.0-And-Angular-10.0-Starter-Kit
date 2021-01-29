import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPipesModule } from '../customPipes/customPipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { GooglePlaceModule } from "ngx-google-places-autocomplete"; 

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
import { SharedModule } from '../SharedModule.module';
import { AuthenticationService } from '../service/authentication.service';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewClientComponent } from './client/view-client/view-client.component';
import { CreateUpdateClientComponent } from './client/create-update-client/create-update-client.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { CreateUpdateUserComponent } from './user/create-update-user/create-update-user.component';
import { ViewCurrencyComponent } from './currency/view-currency/view-currency.component';
import { CreateUpdateCurrencyComponent } from './currency/create-update-currency/create-update-currency.component';
import { ViewLanguageComponent } from './language/view-language/view-language.component';
import { CreateUpdateLanguageComponent } from './language/create-update-language/create-update-language.component';
import { CreateUpdateRoleComponent } from './role/create-update-role/create-update-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { PermissionComponent } from './role/permissions/permission.component';
import { ViewLocationComponent } from './location/view-location/view-location.component';
import { CreateUpdateLocationComponent } from './location/create-update-location/create-update-location.component';
import { DashboaradminComponent } from './admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ExcelService } from '../service/excel.service';
import { CategoryComponent } from './Workforce/category/category.component';
import { AgencyComponent } from './Workforce/agency/agency.component';
import { WorkforeComponent } from './Workforce/workfore/workfore.component';

import { CreateOrEditWorkforeceModalComponent } from './Workforce/workfore/create-or-edit-workforece-modal/create-or-edit-workforece-modal.component';
import { CreateOrEditAgencyComponent } from './Workforce/agency/create-or-edit-agency/create-or-edit-agency.component';
import { CreateOrEditCategoryComponent } from './Workforce/category/create-or-edit-category/create-or-edit-category.component';

import { MaterialComponent } from './material/material/material.component';
import { CreateOrUpdateMaterialComponent } from './material/material/create-or-update-material/create-or-update-material.component';
import { MaterialCategoryComponent } from './material/material-category/material-category.component';
import { CreateOrUpdateMaterialCategoryComponent } from './material/material-category/create-or-update-material-category/create-or-update-material-category.component';
import { MaterialVendorComponent } from './material/material-vendor/material-vendor.component';
import { CreateOrUpdateMaterialVendorComponent } from './material/material-vendor/create-or-update-material-vendor/create-or-update-material-vendor.component';
import { UnitComponent } from './unit/unit.component';
import { CreateOrUpdateUnitComponent } from './unit/create-or-update-unit/create-or-update-unit.component';

import { RateCardComponent } from './Workforce/rate-card/rate-card.component';
import { CreateOrEditRateCardComponent } from './Workforce/rate-card/create-or-edit-rate-card/create-or-edit-rate-card.component';


import { QoutationComponent } from './qoutation/qoutation.component';
import { CreateOrEditQoutationComponent } from './Qoutation/create-or-edit-qoutation/create-or-edit-qoutation.component';
import { AddTaskDetailInQoutationComponent } from './Qoutation/AddTaskDetailInQoutation/AddTaskDetailInQoutation.component';

import { TasksComponent } from './task/tasks/tasks.component';
import { CreateOrUpdateTaskComponent } from './task/tasks/create-or-update-task/create-or-update-task.component';
import { CreateOrUpdateTaskCategoryComponent } from './task/task-category/create-or-update-task-category/create-or-update-task-category.component';
import { TaskCategoryComponent } from './task/task-category/task-category.component';
import { DisciplineComponent } from './Workforce/discipline/discipline.component';
import { CreateOrUpdateDisciplineComponent } from './Workforce/discipline/create-or-update-discipline/create-or-update-discipline.component';
import { ManufactureComponent } from './material/manufacture/manufacture.component';
import { CreateOrEditManufacturerComponent } from './material/manufacture/create-or-edit-manufacturer/create-or-edit-manufacturer.component';
import { CommonDistribComponent } from './material/common-distrib/common-distrib.component';
import { BsDatepickerModule, BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CreateOrUpdateCommonDistribComponent } from './material/common-distrib/create-or-update-common-distrib/create-or-update-common-distrib.component';
import { ViewQuotationComponent } from './qoutation/view-quotation/view-quotation.component';
import { ProjectComponent } from './project/project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { FocusInvalidInputDirective } from '../shared/Directive/focus-invalid-input.directive';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { CreateOrEditProjectManagerComponent } from './project-manager/create-or-edit-project-manager/create-or-edit-project-manager.component';

@NgModule({
  declarations: [
    FocusInvalidInputDirective,
    DashboardComponent,
    ProfileComponent,
    CreateUpdateClientComponent,
    ViewClientComponent,
    DashboaradminComponent,
    SidebarComponent,
    HeaderComponent,
    ViewUserComponent,
    CreateUpdateUserComponent,
    CountryComponent,
    CUCountryComponent,
    CstateComponent,
    CUStateComponent ,
    CityComponent,
    CUCityComponent,
    ZoneComponent,
    CUZoneComponent,
    MapComponent,
    MapViewComponent,
    ViewCurrencyComponent,
    CreateUpdateCurrencyComponent,
    ViewLanguageComponent,
    CreateUpdateRoleComponent,
    ViewRoleComponent,
    PermissionComponent,
    CreateUpdateLanguageComponent,
    ViewLocationComponent,
    CreateUpdateLocationComponent,
    CategoryComponent,
    AgencyComponent,
    WorkforeComponent, 
    CreateOrEditWorkforeceModalComponent, 
    CreateOrEditAgencyComponent, 
    CreateOrEditCategoryComponent, 
    MaterialComponent, 
    CreateOrUpdateMaterialComponent, 
    MaterialCategoryComponent, 
    CreateOrUpdateMaterialCategoryComponent, 
    MaterialVendorComponent, 
    CreateOrUpdateMaterialVendorComponent, 
    UnitComponent, 
    CreateOrUpdateUnitComponent, 
    CreateOrUpdateMaterialVendorComponent ,
    RateCardComponent, 
    CreateOrEditRateCardComponent, 
    TasksComponent, 
    CreateOrUpdateTaskComponent,
    TaskCategoryComponent, 
    CreateOrUpdateTaskCategoryComponent,
    QoutationComponent, 
    CreateOrEditQoutationComponent,
    AddTaskDetailInQoutationComponent, 
    DisciplineComponent, 
    CreateOrUpdateDisciplineComponent, 
    ManufactureComponent, 
    CreateOrEditManufacturerComponent, 
    CommonDistribComponent, 
    CreateOrUpdateCommonDistribComponent, 
    ViewQuotationComponent, 
    ProjectComponent, 
    ViewProjectComponent, ProjectManagerComponent, CreateOrEditProjectManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxIntlTelInputModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    ApplicationPipesModule,
    
  ],
 
  providers: [ExcelService,AuthenticationService,
   
  ],
  bootstrap: [DashboaradminComponent]
})
export class AdminModule { }
