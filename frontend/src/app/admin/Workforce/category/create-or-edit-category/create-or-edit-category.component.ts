import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-edit-category',
  templateUrl: './create-or-edit-category.component.html',
  styleUrls: ['./create-or-edit-category.component.scss']
})
export class CreateOrEditCategoryComponent extends AppComponentBase {

  public createOrEditform: any;
  public getDeciplines: any;
  public params: any;
  public currenies: any;
  submitted = false;
  dataToEdit = '';
  constructor(injector: Injector, private config: ConfigService) { 
    super(injector);
    this.getParentCategories();
    this.getCurrenies();
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    
    if (this.params) {
      
      this.spinnerService.show();
      this.config.get('get-WorkForceCategory/'+this.params+'').subscribe((data) => {
        
        this.dataToEdit = 'edit';
        console.log('dfds',data);

        this.createOrEditform.setValue({
          name: data.data.name,
          decipline_id:data.data.decipline_id,
          is_active:data.data.is_active,
          description:data.data.description,
          currency_id:data.data.currency_id,
          normal:data.data.normal,
          over_time:data.data.over_time,
          weekend:data.data.weekend,
          g_h:data.data.g_h,
            
        });
        this.spinnerService.hide();
      });
    } 

    
  }

  ngOnInit(): void {

    this.createOrEditform = this.formBuilder.group({
      name: ['', Validators.required],
      decipline_id:[null, Validators.required],
      is_active:[null, Validators.required],
      description:[''],
      currency_id:[null, Validators.required],
      normal:['', Validators.required],
      over_time:['', Validators.required],
      weekend:[''],
      g_h:[''],
    });

       
  }
  get f() { return this.createOrEditform.controls; }

  onSubmit() {
    if (this.dataToEdit == 'edit') {
      this.onEditCategory();
    }
    else {
      this.onCreateCategory();
      
    }

  }
  onCreateCategory(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.createOrEditform.invalid) {
      return;
    }
    console.log(this.createOrEditform.value.currency_id);
    var dat: { [k: string]: any } = {};
    dat.name= this.createOrEditform.value.name;
    dat.decipline_id= this.createOrEditform.value.decipline_id;
    dat.is_active= this.createOrEditform.value.is_active;
    dat.description= this.createOrEditform.value.description;
    dat.currency_id= this.createOrEditform.value.currency_id;
    dat.normal= this.createOrEditform.value.normal;
    dat.over_time= this.createOrEditform.value.over_time;
    dat.weekend= this.createOrEditform.value.weekend;
    dat.g_h= this.createOrEditform.value.g_h;

    

    this.config.post('add-WorkForceCategory', dat).subscribe((data)=>{
      console.log(data)
      if(data.success=="0"){
        this.toastr.success('Rate Card Already Exist!');
      }
      else{
        this.toastr.success('Rate Card Added Successfully!');
        this.router.navigate(['/admin/workfore/rate-card']);   
      }        
    });

  }

  onEditCategory() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createOrEditform.invalid) {
      return;
    }
    var dat: { [k: string]: any } = {};
    dat.id = this.params;
    dat.name= this.createOrEditform.value.name;
    dat.decipline_id= this.createOrEditform.value.decipline_id;
    dat.is_active= this.createOrEditform.value.is_active;
    dat.description= this.createOrEditform.value.description;
    dat.currency_id= this.createOrEditform.value.currency_id;
    dat.normal= this.createOrEditform.value.normal;
    dat.over_time= this.createOrEditform.value.over_time;
    dat.weekend= this.createOrEditform.value.weekend;
    dat.g_h= this.createOrEditform.value.g_h;

    this.spinnerService.show();
    this.config.post('WorkForceCategory-update', dat).subscribe((data) => {
      console.log(data);
      if (data.success == 0) {
        this.toastr.warning('Ops!'+data.message);
      }
      else {
        this.toastr.success('Rate Card Updated Successfully!');
      }
      this.router.navigate(['/admin/workfore/rate-card']);   
      this.spinnerService.hide();
    });

  }

  getCurrenies(){
    this.config.get('fetchcurrency').subscribe((data) => {
      this.currenies = data;

    });
  }

  getParentCategories(){
    this.config.get('FetchWorkForceDiscipline/'+parent).subscribe((data) => {
      this.getDeciplines = data;

      
    });
  }
}





