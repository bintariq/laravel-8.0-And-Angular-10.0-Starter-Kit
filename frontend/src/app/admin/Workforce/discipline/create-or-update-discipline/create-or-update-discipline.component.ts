import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-update-discipline',
  templateUrl: './create-or-update-discipline.component.html',
  styleUrls: ['./create-or-update-discipline.component.scss']
})
export class CreateOrUpdateDisciplineComponent extends AppComponentBase {

  public createDiscipline: any;
  public parentCategories: any;
  public params: any;
  submittedCreateDiscipline = false;
  dataToEdit = '';
  constructor(injector: Injector, private config: ConfigService) { 
    super(injector);
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    
    if (this.params) {
      
      this.spinnerService.show();
      this.config.get('get-WorkForceDiscipline-id/'+this.params+'').subscribe((data) => {
        
        this.dataToEdit = 'edit';
        console.log('dfds',data);

        this.createDiscipline.setValue({
          name: data.data.name,
          parent_id: data.data.parent_id,
          is_active: data.data.is_active,
          description:data.data.description
        });
        this.spinnerService.hide();
      });
    } 

    this.getParentCategories();
  }

  ngOnInit(): void {

    this.createDiscipline = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      parent_id:[null],
      is_active: ['', Validators.required],
      description:['']
    });

       
  }
  get cc() { return this.createDiscipline.controls; }

  onSubmitDiscipline() {
    if (this.dataToEdit == 'edit') {
      this.onEditDiscipline();
    }
    else {
      this.onCreateDiscipline();
      
    }

  }
  onCreateDiscipline(){
    this.submittedCreateDiscipline = true;
    // stop here if form is invalid
    if (this.createDiscipline.invalid) {
      console.log('rrr');
      return;
    }

    var dat: { [k: string]: any } = {};
    dat.name= this.createDiscipline.value.name;
    dat.is_active = this.createDiscipline.value.is_active;
    dat.parent_id= this.createDiscipline.value.parent_id;
    dat.description = this.createDiscipline.value.description;

    this.config.post('add-WorkForceDiscipline', dat).subscribe((data)=>{
      console.log(data);
      if(data.success=="0"){
        this.toastr.success('Discipline Already Exist!');
      }
      else{
        this.toastr.success('Discipline Added Successfully!');
        this.router.navigate(['/admin/workfore/discipline']);   
      }        
    });

  }

  onEditDiscipline() {
    this.submittedCreateDiscipline = true;
    // stop here if form is invalid
    if (this.createDiscipline.invalid) {
      console.log('ee');
      return;
    }
    var dat: { [k: string]: any } = {};
    dat.id = this.params;
    dat.name= this.createDiscipline.value.name;
    dat.is_active = this.createDiscipline.value.is_active;
    dat.parent_id= this.createDiscipline.value.parent_id;
    dat.description = this.createDiscipline.value.description;

    this.spinnerService.show();
    this.config.post('WorkForceDiscipline-update', dat).subscribe((data) => {
      console.log(data);
      if (data.success == 0) {
        this.toastr.warning('Ops!'+data.message);
      }
      else {
        this.toastr.success('Discipline Updated Successfully!');
      }
      this.router.navigate(['/admin/workfore/discipline']);   
      this.spinnerService.hide();
    });

  }

  getParentCategories(){
    this.config.get('FetchWorkForceDiscipline/'+parent).subscribe((data) => {
      this.parentCategories = data;
      if(this.params){
        this.parentCategories.forEach(element => {
          if(this.params == element.id){
            this.parentCategories.splice(this.parentCategories.indexOf(element), 1);  
          }

      });
    }
    });
  }
}
