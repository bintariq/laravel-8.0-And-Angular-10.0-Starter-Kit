import { Component, OnInit,Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import * as _ from 'lodash';
import { viewWorkforceTimeComponent } from './viewWorkforceTime/viewWorkforceTime.component';
@Component({
  selector: 'app-timelist',
  templateUrl: './timelist.component.html',
  styleUrls: ['./timelist.component.scss']
})
export class TimelistComponent extends AppComponentBase {

  currentUser = JSON.parse(localStorage.getItem('user'));
  @ViewChild('viewworkforce', { static: true }) viewworkforce: viewWorkforceTimeComponent;
  workforceData: any;

  constructor(injector: Injector, public config: ConfigService) {
    super(injector);

  }

  ngOnInit(): void {
    this.config.get('FetchProjectByTeamLeader/'+this.currentUser.detailWorkForce[0].id).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.workforceData = data;
      debugger;
      console.log(data);
      });
  }
  showviewworkforce(date) {
    this.viewworkforce.show(date)
  }


  }
