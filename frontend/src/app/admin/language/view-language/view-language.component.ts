import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-language',
  templateUrl: './view-language.component.html',
  styleUrls: ['./view-language.component.scss']
})
export class ViewLanguageComponent extends AppComponentBase {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;
  temp = [];
  page = new Page();
  rows = new Array<any>();
  searchColum = 'id';
  apiUrl = environment.apiUrl;
  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
    this.page.pageNumber = 0;
    this.page.size = 10;

  }

  columns = [
    { prop: 'id' },
    { prop: 'name', name: 'Name' },
    { prop: 'short_code', name: 'Code' },
    { prop: 'is_active', name: 'Status' },
    { name: 'Actions' },

  ];
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }


  setPage(pageInfo) {
    this.spinnerService.show();
    this.page.pageNumber = pageInfo.offset;
    var pageNum = this.page.pageNumber + 1;
    this.config.get('fetchLanguages?page=' + pageNum + '').subscribe((data) => {
      this.page.totalPages = data.last_page;
      this.page.totalElements = data.total
      this.rows = data.data;
      this.spinnerService.hide();
    });
  }
  setSearchColumn(event) {
    this.searchColum = event.target.value;
  }
  searchRecord(event) {
    let searchText = event.target.value;
    if (searchText) {
      this.spinnerService.show();
      this.config.get('fetchLanguages?searchText=' + searchText + '&searchColum=' + this.searchColum).subscribe((data) => {
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
    this.spinnerService.show();
    this.config.get('deleteLanguage/' + id).subscribe((data) => {
      this.setPage({ offset: 0 });
      this.toastr.success('Language Deleted Successfully!');
      this.spinnerService.hide();
    });
  }
}
export class Page {
  // The number of elements in the page
  size: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
}

