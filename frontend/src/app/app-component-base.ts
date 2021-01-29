import { Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import * as fromCountry from './store/country/country.reducer';
import * as countryActions from './store/country/country.actions';
import { PermissionCheckerService } from './service/PermissionCheckerService.service';
import { ExcelService } from './service/excel.service';
import { ConfirmationDialogService } from './shared/confirmation-dialog/confirmation-dialog.service';
export abstract class AppComponentBase {
    localization: TranslateService;
    spinnerService: NgxSpinnerService;
    router:Router;
    activatedRouter: ActivatedRoute;
    toastr: ToastrService;
    formBuilder: FormBuilder;
    permission: PermissionCheckerService;
    store: Store;
    excelService:ExcelService
   confirmationDialogService: ConfirmationDialogService
    constructor(injector: Injector) {
        this.localization = injector.get(TranslateService);
        this.spinnerService = injector.get(NgxSpinnerService);
        this.router = injector.get(Router);
        this.activatedRouter = injector.get(ActivatedRoute);
        this.toastr = injector.get(ToastrService);
        this.formBuilder = injector.get(FormBuilder);
        this.permission=injector.get(PermissionCheckerService);
        this.excelService=injector.get(ExcelService);
        this.store = injector.get(Store);
        this.confirmationDialogService = injector.get(ConfirmationDialogService);
    }
    isGranted(nameKey): boolean {
        var currentUser = JSON.parse(localStorage.getItem('user'));
        for (var i=0; i < currentUser.permissions.length; i++) {
            if (currentUser.permissions[i].name === nameKey) {
                if(currentUser.permissions[i].checked == true){
                    return currentUser.permissions[i];
                }
            }
        }
    }
    
}