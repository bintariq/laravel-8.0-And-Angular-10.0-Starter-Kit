import { HttpClient } from '@angular/common/http';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PermissionCheckerService } from './service/PermissionCheckerService.service';
import { AuthGuard } from './service/auth-guard.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonBusyDirective } from './Directive/button-busy.directive';
import { ExcelService } from './service/excel.service';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './shared/confirmation-dialog/confirmation-dialog.service';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}


@NgModule({
  declarations: [
    ButtonBusyDirective,
  ],
  imports: [
    NgxSpinnerModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }),
      NgxDatatableModule,
      NgxChartsModule,
      NgxMaskModule.forRoot(),
      TabsModule,
      NgbModule
  ],
  exports :[
    NgxSpinnerModule,
    ToastrModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule,
    TabsModule,
    BsDropdownModule,
    ButtonBusyDirective,
    NgxChartsModule,
    NgxMaskModule,
    NgbModule
  ],
  providers:[PermissionCheckerService,
    AuthGuard,ExcelService,ConfirmationDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
