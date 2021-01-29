import { Component, OnInit, ViewChild, Injector, ElementRef } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from '../user/view-user/view-user.component';
import { finalize } from 'rxjs/operators';
import { ConfigService } from 'src/app/service/config.service';
import * as XLSX from 'xlsx';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';
// import { DocumentCreator } from './quotationGenerator';
// import { achievements, education, experiences, skills } from './quoationdata';
@Component({
  selector: 'app-qoutation',
  templateUrl: './qoutation.component.html',
  styleUrls: ['./qoutation.component.scss']
})
export class QoutationComponent extends AppComponentBase {
  @ViewChild('viewQuotaation', { static: true }) viewQuotaation: ViewQuotationComponent;
  currentUser = JSON.parse(localStorage.getItem('user'));
  userId = this.currentUser.user_id;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;
  temp = [];
  page = new Page();
  rows = new Array<any>();
  saving: any;

  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
    this.page.pageNumber = 0;
    this.page.size = this.config.pageSize;
  }
  allColumns = [
    { prop: 'reference_no', name: this.localization.instant('Reference No') },
    { prop: 'SitesName', name: this.localization.instant('Sites Name') },
    { prop: 'quotation_validity_date', name: this.localization.instant('Valid Day(s)') },
    { prop: 'RequesterPerson', name: this.localization.instant('Site Requester Person') },
    { prop: 'RequesterPersonEmail', name: this.localization.instant('Site Requester Person Email') },
    { prop: 'RequesterPersonPhone', name: this.localization.instant('Site Requester Person Phone') },
    { prop: 'projectManagerName', name: this.localization.instant('Project Manager Person') },
    { prop: 'projectManagerEmail', name: this.localization.instant('Project Manager Email') },
    { prop: 'projectManagerPhone', name: this.localization.instant('Project Manager Phone') },
    { prop: 'estimated_completed_date', name: this.localization.instant('Estimated Completion Date') },

    { prop: 'ClientName', name: this.localization.instant('Client Name') }
    ];
  columns = [
  { prop: 'reference_no', name: this.localization.instant('Reference No') },
  { prop: 'ClientName', name: this.localization.instant('Client Name') },
  { prop: 'RequesterPerson', name: this.localization.instant('Site Requester Person') },
  { prop: 'projectManagerName', name: this.localization.instant('Project Manager Person') },
  { prop: 'estimated_completed_date', name: this.localization.instant('Estimated Completion Date') },

  ];
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }
  createNew(): void {
    this.router.navigate(["/admin/qoutation/createOrEdit"]);
  }
  setPage(pageInfo) {
    this.spinnerService.show();
    this.page.pageNumber = pageInfo.offset;
    var pageNum = this.page.pageNumber + 1;
    this.config.get('FetchQuotation?page=' + pageNum + '').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.page.totalPages = data.last_page;
      this.page.totalElements = data.total;
      this.rows = data.data;
    });
  }
  ModalChangesEvent() {
    this.setPage({ offset: 0 });
  }
  updateFilter(event) {

  }
  exportExcel() {
     this.excelService.exportAsExcelFile(this.rows, "Quotation")
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableExcel.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  delete(id) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do You Want To Delete?')
      .then((confirmed) => {
        if (confirmed) {
          this.config.get('DeleteQuotation-id/' + id).pipe(finalize(() => {
            this.spinnerService.hide()
          })).subscribe((data) => {
            this.setPage({ offset: 0 });
            this.toastr.success("Deleted Successfully");
          });
        }
      })
  }
  ViewQuotation(QuotionId)
  {
      this.viewQuotaation.show(QuotionId)
  }
  changeQuotationStatus(QuotionId)
  {
    //debugger;
    this.confirmationDialogService.confirm('Please confirm..', 'Do You Want Changes Quotaion Status?')
    .then((confirmed) => {
      if (confirmed) {
        this.config.post('quotationStatusUpadte?quotation_id='+QuotionId+'&userId='+ this.userId +'&status=4',null).subscribe(result=>{
          this.toastr.success("Status Change Successfully");
          this.setPage({ offset: 0 });
        });
      }
    })

  }

  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return (
      this.columns.find(c => {
        return c.name === col.name;
      }) !== undefined
    );
  }


}
