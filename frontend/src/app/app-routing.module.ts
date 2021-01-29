import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { quotationViewComponent } from './quotationView/quotationView.component';
import { RoleGuard } from './service/role-guard.service';
const routes: Routes = [
 { path: '', redirectTo: 'accounts', pathMatch: 'full' },
 { path: 'view-quotation', component: quotationViewComponent},
 {
  path: 'accounts',
  loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
  data: { preload: true }
},
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
 // data: { preload: true }
  canActivate: [RoleGuard],
  data: {role: 'Admin'}
},
{
  path: 'workforce',
  loadChildren: () => import('./workforce/workforce.module').then(m => m.WorkforceModule),
  canActivate: [RoleGuard],
  data: {role: 'workforce'}
},
{
  path: '**',
  redirectTo: ''
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
