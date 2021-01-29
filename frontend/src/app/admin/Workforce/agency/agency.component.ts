import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { Page } from '../../user/view-user/view-user.component';
import { CreateOrEditAgencyComponent } from './create-or-edit-agency/create-or-edit-agency.component';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent extends AppComponentBase {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;
  temp = [];
  page = new Page();
  rows = new Array<any>();
  saving: any;
  searchColum = 'id';


  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
    this.page.pageNumber = 0;
    this.page.size = this.config.pageSize;

  }
  allColumns = [
    { prop: 'agency_name', name: this.localization.instant('Agency Name') },
    { prop: 'contacted_person', name: this.localization.instant('Contact Person') },
    { prop: 'first_email', name: this.localization.instant("Email") },
    { prop: "phone", name: this.localization.instant('Contact Number') },
  ];
  columns = [
    { prop: 'agency_name', name: this.localization.instant('Agency Name') },
    { prop: 'contacted_person', name: this.localization.instant('Contact Person') },
    { prop: 'first_email', name: this.localization.instant("Email") },
    { prop: "phone", name: this.localization.instant('Contact Number') },
  ];
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }
  createAgency(): void {
    this.router.navigate(["/admin/workfore/createOrEditAgency"])
  }
  setPage(pageInfo) {
    this.spinnerService.show();
    this.page.pageNumber = pageInfo.offset;
    var pageNum = this.page.pageNumber + 1;
    this.config.get('fetchagency?page=' + pageNum + '').pipe(finalize(() => {
      this.saving = false;
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.page.totalPages = data.last_page;
      this.page.totalElements = data.total
      this.rows = data.data;
    });
  }

  setSearchColumn(event) {
    this.searchColum = event.target.value;
  }
  searchRecord(event) {
    let searchText = event.target.value;
    if (searchText) {
      this.spinnerService.show();
      this.config.get('fetchagency?searchText=' + searchText + '&searchColum=' + this.searchColum).subscribe((data) => {
        this.page.totalPages = data.last_page;
        this.page.totalElements = data.total
        this.rows = data.data;
        this.spinnerService.hide();
      });
    }
    else {
      this.setPage({ offset: 0 });
    }
  }

  delete(id) {
    this.config.get('delete-agency/' + id).pipe(finalize(() => {
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
  excelDownload(){
    this.excelService.exportAsExcelFile(this.rows, 'Agency');
  }

}