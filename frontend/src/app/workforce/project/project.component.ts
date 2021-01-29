import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { finalize } from 'rxjs/operators';
import { Page } from 'src/app/admin/settings/country/country.component';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import * as _ from 'lodash';
import { ProjectDateService } from './project-date.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers:[ProjectDateService]
})
export class ProjectComponent extends AppComponentBase {
  currentUser = JSON.parse(localStorage.getItem('user'));
  
  temp = [];
  rows = new Array<any>();
  saving: any;

  constructor(injector: Injector, private config: ConfigService) {
    super(injector);

  }
  
 
  ngOnInit(): void {
    this.spinnerService.show();
    this.config.post('getProjectByWorkForce?workforce_id='+this.currentUser.detailWorkForce[0].id,null).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      // this.rows = data.filter(x=>x.assigned_to_other==undefined);
      this.rows = data;
      console.log(this.rows);
   
    //   debugger;
    //   this.rows = _.map(
    //     _.filter(data, {assigned_to_other:}), pro => pro
    // );

    });

    
    
  }


  
  viewproject()
  {
    this.router.navigate([""])
  }
  viewProject(date)
  {
    ProjectDateService.projectData=date;
    this.router.navigate(['/workforce/project/view-project']);
  }
  exportExcel() { 
     this.excelService.exportAsExcelFile(this.rows, "Quotation") 
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableExcel.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}

