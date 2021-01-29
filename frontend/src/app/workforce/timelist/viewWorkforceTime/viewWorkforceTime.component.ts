import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'viewWorkforceTime',
  templateUrl: './viewWorkforceTime.component.html',
})
export class viewWorkforceTimeComponent extends AppComponentBase {

  currentUser = JSON.parse(localStorage.getItem('user'));
  @ViewChild('createOrEditModal', { static: true}) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false
  saving = false;
  model: any = {};
  workforceDate: any;
  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
  }
  show(date:any) {
    this.workforceDate=date
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
    dat.id =this.workforceDate.workforce_projects_id;
     dat.approved = 1;
     dat.approved_notes = this.model.description;
     dat.approved_teamleader_id = this.workforceDate.approved_teamleader_id;
    this.config.post('approveWorkforce', dat).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.toastr.success("Time Added Successfully")
      this.close();
      window.location.reload();
      //  this.router.navigate(['workforce/project/view-project?id='+this.projectDate.id+'&isassigned=1']);
    });
  }
}
