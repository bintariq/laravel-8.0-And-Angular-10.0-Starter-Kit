import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { Page } from '../../user/view-user/view-user.component';

@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrls: ['./rate-card.component.scss']
})
export class RateCardComponent extends AppComponentBase {

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
    this.page.size = 10;

  }

  columns = [{ name: 'id' },
  { prop: 'Category_name', name: this.localization.instant('Category Name') },
  { prop: 'sub_category', name: this.localization.instant('Job Line') },
  { prop: 'normal_rate', name: this.localization.instant('Normal Rate') },
  { prop: 'overtime_rate', name: this.localization.instant('Over Time') },
  { prop: 'weekend_rate', name: this.localization.instant('Weekends') },
  { prop: 'public_holiday_rate', name: this.localization.instant('Public Folidays') },
  { name: 'Actions' }

  ];
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }
  createnew(): void {
    this.router.navigate(["/admin/workfore/CreateOrEditRatecard"])
  }
  setPage(pageInfo) {
    this.spinnerService.show();
    this.page.pageNumber = pageInfo.offset;
    var pageNum = this.page.pageNumber + 1;
    this.config.get('FetchRateCard?page=' + pageNum + '').pipe(finalize(() => {
      this.saving = false;
      this.spinnerService.hide()
    })).subscribe((data) => {
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

  delete(id) {
    this.config.get('delete-RateCard/' + id).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.setPage({ offset: 0 });
      this.toastr.success("Deleted Successfully");
    });
  }
}
