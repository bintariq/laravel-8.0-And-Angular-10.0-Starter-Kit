import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-create-or-edit-workforece-modal',
  templateUrl: './create-or-edit-workforece-modal.component.html',
  styleUrls: ['./create-or-edit-workforece-modal.component.scss']
})
export class CreateOrEditWorkforeceModalComponent extends AppComponentBase {

  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false
  saving = false;
  createOrEditform: FormGroup;
  submitted = false;
  EmployeeID: any;
  jobNatureList: any = [];
  rollList: any = [];
  stateID: any;
  disciplaneList: any = [];
  countryList: any = [];
  statuesList: any = [];
  cityList: any = [];
  zoneList: any = [];
  agencyList: any = [];
  catgoriesList : any = [];
  getDeciplines: any;
  decipline_ID: any;
  jobContractual = false;
  IsLogingUpdateReadOnly=false;
  idUserNameIsRequired:any=false
  idPasswordIsRequired:any=false;
  constructor(injector: Injector, public config: ConfigService) {
    super(injector);
  }

  ngOnInit(): void {
    this.EmployeeID = this.activatedRouter.snapshot.queryParams['id']
    this.createOrEditform = this.formBuilder.group({
      employeeName: ['', Validators.required],
      // decipline_id:[null],
      category_id: [null, Validators.required],
      jobNature: [null, Validators.required],
      zone: [null, Validators.required],
      aginceID: [0],
      country: [null, Validators.required],
      state: [null],
      city: [null],
      country_code: [null, Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z_\.\-]([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]],
      email2: ['', [Validators.email, Validators.pattern('^[a-zA-Z_\.\-]([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]],
      userName: [''],
      password: [''],
      IsLogingInfoUpdate: [true],
      IsSendEmail: [true],
    });

    this.getCountry();
    this.getZones();
    this.getJobNature();
    this.getWorkforceCategory();
    // this.getAgency();
    this.getDecipline();


    if (this.EmployeeID) {
      this.config.get('get-work-force-by-id/' + this.EmployeeID).pipe(finalize(() => {
        this.spinnerService.hide()
      })).subscribe((data) => {
        console.log(data);
        this.config.get('getStatesByCountry/' + data.data.country).pipe(finalize(() => {
          this.spinnerService.hide()
        })).subscribe((data) => {
          this.statuesList = data;
          this.spinnerService.hide();
        });

        console.log(data);


        this.createOrEditform.setValue({
          employeeName:data.data.employee_name,
          // decipline_id:data.data.decipline_id,
          category_id: data.data.category_id,
          jobNature:data.data.job_nature_id,
          zone: data.data.zone_id,
          aginceID:Number(data.data.agency),

          country:  Number(data.data.country),
          state:data.data.state,
          city:Number(data.data.city),
          country_code:data.data.country_code,
          phone:data.data.phone,
          email:data.data.email,
          email2: data.data.email2,
          userName: null,
          password: null,
          IsLogingInfoUpdate:false,
          IsSendEmail:true
        });
        this.getAgency(data.data.job_nature_id);
        this.getCityByCountry(this.createOrEditform.value.country);
        //debugger;
      });
      
    }
    if (!this.EmployeeID) {
      this.IsLogingUpdateReadOnly = true;
      this.createOrEditform.value.IsLogingInfoUpdate=true;
    } 

  }
  get f() { return this.createOrEditform.controls; }

  getCountry() {
    this.config.get('ActivefetchCountries').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.countryList = data;
      console.log(data);
      this.spinnerService.hide();
    });
  }
  getZones(){
    this.config.get('ActivefetchZones').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.zoneList = data;
      console.log(this.zoneList);
      this.spinnerService.hide();
    });
  }
  getJobNature() {
    this.config.get('FetchWorkNature').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      
      this.jobNatureList = data.data;      
      console.log('job', this.jobNatureList);
    });    
  }


  getAgency(event) {
    console.log('name', event);
    if(event.id==2){
      this.jobContractual = true;
      this.config.get('Activefetchagency').pipe(finalize(() => {
        this.spinnerService.hide()
      })).subscribe((data) => {
        this.agencyList = data;
        console.log('aa',data);
      });
    }
    else{
      this.jobContractual = false;
    }
    
  }
  getStatus(countryId) {
    console.log(countryId.id);
    this.config.get('getStatesByCountry/' + countryId.id).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.statuesList = data;
      console.log(this.statuesList);
      this.spinnerService.hide();
      this.getCityByCountry(countryId.id);
    });
  }
  getCity(stateId) {
    this.config.get('fetchCitiesByState/' + stateId.id).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.cityList = data;
      this.spinnerService.hide();
    });
  }
  getCityByCountry(countryId){
    this.config.get('fetchCitiesByCountry/' + countryId).pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.cityList = data;
      this.spinnerService.hide();
    });
  }

  show(id?) {
    this.EmployeeID = id;
    this.active = true;
    //this.modal.show()
  }
  close(): void {
    this.active = false;
    this.modalSave.emit(null);
    //this.modal.hide();
  }
  onSubmit() {
    this.submitted = true;
    this.validateOk();
    
    if (this.createOrEditform.invalid) {
      
      console.log('da')
      return;
    }

    this.catgoriesList.forEach(element => {
        if(element.id == this.createOrEditform.value.category_id){
          this.decipline_ID= element.decipline_id;
        }
    });


    var dat: { [k: string]: any } = {};
    dat.employee_name = this.createOrEditform.value.employeeName;
    dat.decipline_id = this.decipline_ID;
    dat.category_id = this.createOrEditform.value.category_id;
    dat.job_nature_id = this.createOrEditform.value.jobNature;
    dat.zone_id = this.createOrEditform.value.zone;
    dat.agency = this.createOrEditform.value.aginceID;
    dat.country = this.createOrEditform.value.country;
    dat.state =this.createOrEditform.value.state;
    dat.city = this.createOrEditform.value.city;
    dat.country_code = this.createOrEditform.value.country_code;
    dat.phone = this.createOrEditform.value.phone;
    dat.email = this.createOrEditform.value.email;
    dat.email2= this.createOrEditform.value.email2;

    dat.workforce_user_name= this.createOrEditform.value.userName;
    dat.password= this.createOrEditform.value.password;
    dat.IsLogingInfoUpdate= this.createOrEditform.value.IsLogingInfoUpdate;
    dat.IsSendEmail= this.createOrEditform.value.IsSendEmail;
    
    dat.id = this.EmployeeID == undefined ? 0 : Number(this.EmployeeID);
    
    var url = undefined;
    if (this.EmployeeID) {
      url = "work-force-update"
    }
    else {
      url = "work-force-store"
    }
    this.saving = true;
    this.config.post(url, dat).pipe(finalize(() => { this.saving = false })).subscribe((data) => {
      if (data.success == "0") {
        this.toastr.success('WorkFore Already Exist!');
      }
      else {
        this.toastr.success('WorkFore Added Successfully!');
        this.router.navigate(['/admin/workfore/workfore']);
      }
    });
  }
  onReset() {
    this.submitted = false;
    this.createOrEditform.reset();
    this.router.navigate(["/admin/workfore/workfore"])
  }
  getWorkforceCategory(){
    this.config.get('ActiveFetchWorkForceCategory').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {

      this.catgoriesList = data;
      console.log('this.categories', this.catgoriesList);
    });
  }
  getDecipline(){
    this.config.get('ActiveFetchWorkForceDiscipline/'+parent).subscribe((data) => {
      this.getDeciplines = data;
      console.log('this.categories', this.getDeciplines);
    });
  }

  validateOk(){
    
    if(this.createOrEditform.value.IsLogingInfoUpdate==true){
      if(this.createOrEditform.value.userName==''){
        this.idUserNameIsRequired= true;
      }
      else{
        this.idUserNameIsRequired= false;
      }

      if(this.createOrEditform.value.password==''){
        this.idPasswordIsRequired= true;
      }
      else{
        this.idPasswordIsRequired= false;
      }
      
    }
    
    return;
  }
}
