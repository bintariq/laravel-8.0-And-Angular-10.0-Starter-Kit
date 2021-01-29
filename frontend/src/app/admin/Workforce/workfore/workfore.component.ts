import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { finalize, debounce } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { Page } from '../../user/view-user/view-user.component';

@Component({
  selector: 'app-workfore',
  templateUrl: './workfore.component.html',
  styleUrls: ['./workfore.component.scss']
})
export class WorkforeComponent extends AppComponentBase {

  // @ViewChild('createOrEditRoleModal', { static: true }) createOrEditRoleModal: CreateOrEditWorkforeceModalComponent;
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
    { prop: 'employee_name', name: this.localization.instant('Employee Name') }, 
    { prop: 'workforce_nature_name', name: this.localization.instant('Job Nature')  }, 
    { prop: 'email',name:this.localization.instant('Email') },
    { prop: 'phone',name:this.localization.instant('Phone') },
  ];
  columns = [
    { prop: 'employee_name', name: this.localization.instant('Employee Name') }, 
    { prop: 'workforce_nature_name', name: this.localization.instant('Job Nature')  }, 
    { prop: 'email',name:this.localization.instant('Email') },
    { prop: 'phone',name:this.localization.instant('Phone') },
  ];
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }
  createWorkForce(): void {
    this.saving = true;
    this.router.navigate(["/admin/workfore/createoreditWorkfore"])
    //this.createOrEditRoleModal.show();
  }
  setPage(pageInfo) {
    this.spinnerService.show();
    this.page.pageNumber = pageInfo.offset;
    var pageNum = this.page.pageNumber + 1;
    this.config.get('get-all-work-force?page=' + pageNum + '').pipe(finalize(() => {
      this.saving = false;
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.page.totalPages = data.last_page;
      this.page.totalElements = data.total
      this.rows = data.data;
      this.spinnerService.hide();
    });
  }
  ModalChangesEvent() {
    this.saving = false;
  }
  updateFilter(event) {

  }
  setSearchColumn(event) {
    this.searchColum = event.target.value;
  }
  searchRecord(event) {
    let searchText = event.target.value;
    if (searchText) {
      this.spinnerService.show();
      this.config.get('FetchWorkForceCategory?searchText=' + searchText + '&searchColum=' + this.searchColum).subscribe((data) => {
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

  delete(id)
  {
    this.config.get('delete-work-force/'+id).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
     this.toastr.success("Deleted Successfully");
     this.setPage({ offset: 0 });
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
    this.excelService.exportAsExcelFile(this.rows, 'Workforce');
  }
}
