import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboaradminComponent } from './admin.component';
import { ProfileComponent } from './profile/profile.component';

import { CountryComponent } from './settings/country/country.component';
import { CstateComponent } from './settings/cstate/cstate.component';
import { CityComponent } from './settings/city/city.component';
import { ZoneComponent } from './settings/zone/zone.component';

import { MapComponent } from './settings/map/map.component';
import { MapViewComponent } from './location/map_view/map_view.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ViewUserComponent } from './user/view-user/view-user.component';
import { CreateUpdateUserComponent } from './user/create-update-user/create-update-user.component';


import { ViewClientComponent } from './client/view-client/view-client.component';
import { CreateUpdateClientComponent } from './client/create-update-client/create-update-client.component';

import { ViewCurrencyComponent } from './currency/view-currency/view-currency.component';
import { CreateUpdateCurrencyComponent } from './currency/create-update-currency/create-update-currency.component';

import { ViewLanguageComponent } from './language/view-language/view-language.component';
import { CreateUpdateLanguageComponent } from './language/create-update-language/create-update-language.component';

import { ViewRoleComponent } from './role/view-role/view-role.component';
import { CreateUpdateRoleComponent } from './role/create-update-role/create-update-role.component';

import { PermissionComponent } from './role/permissions/permission.component';

import { ViewLocationComponent } from './location/view-location/view-location.component';
import { CreateUpdateLocationComponent } from './location/create-update-location/create-update-location.component';

import { AuthGuard } from '../service/auth-guard.service';



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

      { path: 'state', component: CstateComponent,canActivate: [AuthGuard]},

      { path: 'city', component: CityComponent,canActivate: [AuthGuard]},

      { path: 'zone', component: ZoneComponent},
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



    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
