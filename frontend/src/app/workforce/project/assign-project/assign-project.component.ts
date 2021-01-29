import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { ProjectDateService } from '../project-date.service';

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.scss'],
  providers:[ProjectDateService]
})
export class AssignProjectComponent extends AppComponentBase {

  currentUser = JSON.parse(localStorage.getItem('user'));
  @ViewChild('createOrEditModal', { static: true}) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false
  saving = false;
  model: any = {};
  projectDate: any;
  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
  }
  show(projectDate:any) {
    this.projectDate=projectDate
    this.active = true;
    this.modal.show()
  }
  close(): void {
    this.active = false;
    this.modalSave.emit(null);
    this.modal.hide();
  }
  onSubmit()
  {
    if(this.model.hour > 15){
      this.toastr.show("Max working hours limit is 15!");
      return false;
    }
    var dat: { [k: string]: any } = {};
    dat.workforce_id = this.currentUser.detailWorkForce[0].id;
    dat.spent_hours = this.model.hour;
    dat.time_type = this.model.timeType;
    dat.description = this.model.description;
    dat.project_id = this.projectDate.id;
    this.config.post('AddHours', dat).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.toastr.show("Time Added Successfully")
      this.close();
      window.location.reload();
      //  this.router.navigate(['workforce/project/view-project?id='+this.projectDate.id+'&isassigned=1']);
    });
  }
}
