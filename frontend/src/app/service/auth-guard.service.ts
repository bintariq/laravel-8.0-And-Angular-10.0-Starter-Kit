import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _router: Router,private route: ActivatedRoute) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    var role = JSON.parse(localStorage.getItem('user'));

    if (localStorage.getItem('user') != null && role.profile.role_name == "SUPER ADMIN") {
      if (state.url == '/accounts/login' || state.url == '/workforce/dashboard') {
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
    }
    if (localStorage.getItem('user') != null  && role.profile.role_name == "workforce") {
      if (state.url == '/accounts/login' || state.url == '/admin/dashboard') {
        this._router.navigate(['/workforce/dashboard']);
      return true;
      }

    }

    var userId;
     this.route.queryParams.subscribe(params => {
      var userId = params['id'];
    });
     var currentUser = JSON.parse(localStorage.getItem('user'));
     if(localStorage.getItem('user') != null){
     currentUser.permissions.forEach(element => {
      /*
      |--------------------------------------------------------------------------
      | Languages CALL
      |--------------------------------------------------------------------------
      */
      if(state.url == '/admin/view-language' && element.name == 'View Languages' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-language/' + next.paramMap.get("id") && element.name == 'Update Languages' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-language' && element.name == 'Create Languages' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | CURRENCY CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/view-currency' && element.name == 'View Currencies' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-currency/' + next.paramMap.get("id") && element.name == 'Update Currencies' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-currency' && element.name == 'Create Currencies' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | COUNTRY CALL
      |--------------------------------------------------------------------------
      */
      if(state.url == '/admin/view-countries' && element.name == 'View Countries' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-country' && element.name == 'Create Countries' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-country/' + next.paramMap.get("id") && element.name == 'Update Countries' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | STATE CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/state' && element.name == 'View States' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-state/' + next.paramMap.get("id") && element.name == 'Update States' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-state' && element.name == 'Create States' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | CITY CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/city' && element.name == 'View Cities' && element.checked == false){
       this._router.navigate(['/admin/dashboard']);
       return true;
      }
      else if(state.url == '/admin/create-update-city/' + next.paramMap.get("id") && element.name == 'Update Cities' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-city' && element.name == 'Create Cities' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | ZONE CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/zone' && element.name == 'View Zones' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-zone/' + next.paramMap.get("id") && element.name == 'Update Zones' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-zone' && element.name == 'Create Zones' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | MAP CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/map/' + next.paramMap.get("id") && element.name == 'View Map Zone' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | LOCATION CALL
      |--------------------------------------------------------------------------
      */
      if(state.url == '/admin/view-location' && element.name == 'View Locations' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-location' && element.name == 'Create Locations' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-location/' + next.paramMap.get("id") && element.name == 'Update Locations' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      if(state.url == '/admin/view-location-map' && element.name == 'View Location Map' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | USERS CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/view-users' && element.name == 'View Users' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-user/' + next.paramMap.get("id") && element.name == 'Update Users' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-user' && element.name == 'Create Users' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | ROLES CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/view-role' && element.name == 'View Roles' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-role/' + next.paramMap.get("id") && element.name == 'Update Roles' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-role' && element.name == 'Create Roles' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | PERMISSIONS CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/set-permissions/' + next.paramMap.get("id") && element.name == 'Update Permissions' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }    
      /*
      |--------------------------------------------------------------------------
      | CLIENTS CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/view-clients' && element.name == 'View Clients' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-client/' + next.paramMap.get("id") && element.name == 'Update Clients' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/create-update-client' && element.name == 'Create Clients' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | WORKfORCE CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/workfore/workfore' && element.name == 'View Work Force' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/createoreditWorkfore?id=' + userId && element.name == 'Update Work Force' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/createoreditWorkfore' && element.name == 'Create Work Force' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | AGENCY CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/workfore/agency' && element.name == 'View Agency' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/createOrEditAgency?id=' + userId && element.name == 'Update Agency' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/createOrEditAgency' && element.name == 'Create Agency' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | AGENCY CATEGORY CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/workfore/category' && element.name == 'View Work Force Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/create-update-workforce-category/' + next.paramMap.get("id") && element.name == 'Update Work Force Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/create-update-workforce-category' && element.name == 'Create Work Force Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | DICIPLINE CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/workfore/discipline' && element.name == 'View Discipline' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/create-update-discipline/' + next.paramMap.get("id") && element.name == 'Update Discipline' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/create-update-discipline' && element.name == 'Create Discipline' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | RATE CARD CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/workfore/rate-card' && element.name == 'View Rate Card' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/create-update-workforce-rate-card/' + next.paramMap.get("id") && element.name == 'Update Rate Card' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/workfore/create-update-workforce-rate-card' && element.name == 'Create Rate Card' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | TASK CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/task/task' && element.name == 'View Task' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/task/create-update-task/' + next.paramMap.get("id") && element.name == 'Update Task' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/task/create-update-task' && element.name == 'Create Task' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | TASK CATEGORY CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/task/task-category' && element.name == 'View Task Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/task/create-update-task-category/' + next.paramMap.get("id") && element.name == 'Update Task Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/task/create-update-task-category' && element.name == 'Create Task Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | QUOTATION CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/qoutation' && element.name == 'View Qoutation' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/createOrEdit?id=' + userId && element.name == 'Update Qoutation' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/createOrEdit' && element.name == 'Create Qoutation' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | MATERIAL CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/material/material' && element.name == 'View Material' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-update-material/' + next.paramMap.get("id") && element.name == 'Update Material' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-update-material' && element.name == 'Create Material' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | MATERIAL CATEGORY CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/material/material-category' && element.name == 'View Material Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-update-category/' + next.paramMap.get("id") && element.name == 'Update Material Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-update-category' && element.name == 'Create Material Category' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | MATERIAL VENDOR CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/material/material-distributor' && element.name == 'View Material Vendor' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-update-distributor/' + next.paramMap.get("id") && element.name == 'Update Material Vendor' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-update-distributor' && element.name == 'Create Material Vendor' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | MATERIAL MANUFACTURER CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/material/manufacture' && element.name == 'View Material Manufacturer' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-or-edit-manufacture?id=' + userId && element.name == 'Update Material Manufacturer' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-or-edit-manufacture' && element.name == 'Create Material Manufacturer' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | MATERIAL DISTRIBUTOR CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/material/CommonDistrib' && element.name == 'View Material Distributor' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-or-edit-CommonDistrib?id=' + userId && element.name == 'Update Material Distributor' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/material/create-or-edit-CommonDistrib' && element.name == 'Create Material Distributor' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      /*
      |--------------------------------------------------------------------------
      | UNIT CALL
      |--------------------------------------------------------------------------
      */
      else if(state.url == '/admin/unit' && element.name == 'View Unit' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/unit/create-update-unit/' + next.paramMap.get("id") && element.name == 'Update Unit' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
      else if(state.url == '/admin/unit/create-update-unit' && element.name == 'Create Unit' && element.checked == false){
        this._router.navigate(['/admin/dashboard']);
        return true;
      }
     });
    }

    return true;
  }

}