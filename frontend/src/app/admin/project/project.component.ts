import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { Page } from '../settings/country/country.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends AppComponentBase {

  
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
    { prop: 'project_reference_no', name: this.localization.instant('Project Reference#') },
    { prop: 'zoneName', name: this.localization.instant('Zone Name') },
    { prop: 'SitesName', name: this.localization.instant('Sites Name') },
    { prop: 'ClientName', name: this.localization.instant('Client Name') },
    { prop: 'CurrencyTitle', name: this.localization.instant('Currency Title') },
    { prop: 'project_created_date', name: this.localization.instant('Project Created Date') },
    { prop: 'UserName', name: this.localization.instant('Created By') }
    ];
    columns = [
    { prop: 'project_reference_no', name: this.localization.instant('Project Reference#') },
    { prop: 'zoneName', name: this.localization.instant('Zone Name') },
    { prop: 'SitesName', name: this.localization.instant('Sites Name') },
    { prop: 'ClientName', name: this.localization.instant('Client Name') },
    { prop: 'CurrencyTitle', name: this.localization.instant('Currency Title') },
    { prop: 'project_created_date', name: this.localization.instant('Project Created Date') },
    { prop: 'UserName', name: this.localization.instant('Created By') }
    ];
  
  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.spinnerService.show();
    // this.page.pageNumber = pageInfo.offset;
    // var pageNum = this.page.pageNumber + 1;
    this.config.get('Fetchproject').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      // this.page.totalPages = 50;
      // this.page.totalElements = 50;
      this.rows = data;
    });
  }

  setPage(pageInfo) {
    this.spinnerService.show();
    // this.page.pageNumber = pageInfo.offset;
    // var pageNum = this.page.pageNumber + 1;
    this.config.get('Fetchproject').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      // this.page.totalPages = 50;
      // this.page.totalElements = 50;
      this.rows = data;
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
    this.config.get('project-delete/' + id).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.setPage({ offset: 0 });
      this.toastr.success("Deleted Successfully");
    });
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
