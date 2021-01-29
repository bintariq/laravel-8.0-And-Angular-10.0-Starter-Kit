import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent extends AppComponentBase {
  
  porjectId:any;
  rows: any = [];
  projectDate: any;
  projectDate2: any;

  totalQuotedHours: any = 0;
  totalSpendHours: any = 0;

  workforceHistory: any;
  constructor(injector: Injector, public config: ConfigService) {
    super(injector);
  }

  ngOnInit(): void {
    this.porjectId = this.activatedRouter.snapshot.queryParams['id']
    
    this.config.get('Fetch-project-id/' + this.porjectId).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.projectDate2 = data.data;
    });

    this.config.get('get-project-id/' + this.porjectId).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.rows = data.data;
      this.projectDate = data.data;
      this.projectDate.tasks.forEach(x => {
        this.totalQuotedHours = this.totalQuotedHours+x.sub_total;
      });

     


    });

    this.config.get('workForceHistoryDetail?project_id='+this.porjectId).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.workforceHistory = data.data;

      this.workforceHistory.forEach(x => {
        if(x.approved ==1 ){
          this.totalSpendHours = this.totalSpendHours+x.spent_hours;
        }
        
      });

      });
  }

}
