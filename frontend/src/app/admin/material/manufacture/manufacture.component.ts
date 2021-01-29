import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from '../../client/view-client/view-client.component';
import { ConfigService } from 'src/app/service/config.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss']
})
export class ManufactureComponent  extends AppComponentBase {


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
    { prop: 'name', name: this.localization.instant('Name') },
  ];
  columns = [
    { prop: 'name', name: this.localization.instant('Name') },
  ];
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.spinnerService.show();
    this.page.pageNumber = pageInfo.offset;
    var pageNum = this.page.pageNumber + 1;
    this.config.get('Fetchmanufacturers').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.page.totalElements = data.length
      this.rows = data;
      console.log(this.rows);
    });
  }

  setSearchColumn(event) {
    this.searchColum = event.target.value;
  }
  searchRecord(event) {
    let searchText = event.target.value;
    if (searchText) {
      this.spinnerService.show();
      this.config.get('FetchUser?searchText=' + searchText + '&searchColum=' + this.searchColum).subscribe((data) => {
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
    this.config.get('delete-manufacturers/' + id).pipe(finalize(() => {
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
    this.excelService.exportAsExcelFile(this.rows, 'Manufacturer');
  }

}
