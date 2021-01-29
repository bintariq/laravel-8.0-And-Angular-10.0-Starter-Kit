import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { AssignProjectComponent } from '../assign-project/assign-project.component';
import { ZoneService } from '../../../service/zone.service';
import { ProjectDateService } from '../project-date.service';

declare function initializeOnLocation(agr1:any, agr2:any):any;

@Component({
  selector: 'app-view-poject',
  templateUrl: './view-poject.component.html',
  styleUrls: ['./view-poject.component.scss'],
  providers:[ProjectDateService]
})
export class ViewPojectComponent extends AppComponentBase {
  @ViewChild('viewProject', { static: true }) viewProject: AssignProjectComponent;
  currentUser = JSON.parse(localStorage.getItem('user'));
  workforceCategotyId=this.currentUser.detailWorkForce[0].category_id;
  employee_name=this.currentUser.profile.first_name;
  employee_pic=this.currentUser.profile.profile_pic;
  porjectId:any;
  isassigned:any;
  rows: any = [];
  projectDate: any;
  projectDate2:any;
  workforceHistory: any;
  modalRef: BsModalRef;
  template:any;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(injector: Injector, public config: ConfigService, private modalService: BsModalService, private zoneService: ZoneService) {
    super(injector);
  }

  ngOnInit(): void {
    ProjectDateService.projectData
    this.porjectId = this.activatedRouter.snapshot.queryParams['id']
    this.isassigned = this.activatedRouter.snapshot.queryParams['isassigned']
    
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
    });


    this.config.get('get-all-site').subscribe(
      (dataa) => {
        this.zoneService.getAllZones().subscribe(
          (data) => {
            console.log(data);
            console.log(dataa);

            initializeOnLocation(data,dataa);
    
          } 
        );  
    });

    this.config.get('workForceHistoryDetail?project_id='+this.porjectId+'&workforce_id='+this.currentUser.detailWorkForce[0].id).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.workforceHistory = data.data;
      console.log(data);
      });
  }

  AddTimeToproject()
  {
    this.viewProject.show(this.projectDate);
  }
  AssigProject()
  {
    var dat: { [k: string]: any } = {};
    dat.status = 1;
    dat.project_id = this.porjectId;
    dat.workforce_id = this.currentUser.detailWorkForce[0].id;
    this.config.post('AssignOrUnAssign', dat).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.toastr.show("Project Assign Successfully");
      this.router.navigate(['workforce/project']);
    });
  }


}
