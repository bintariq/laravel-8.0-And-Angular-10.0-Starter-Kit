import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-update-unit',
  templateUrl: './create-or-update-unit.component.html',
  styleUrls: ['./create-or-update-unit.component.scss']
})
export class CreateOrUpdateUnitComponent extends AppComponentBase {

  public createUnit: any;
  public params: any;
  submittedCreateUnit = false;
  dataToEdit = '';
  constructor(injector: Injector, private config: ConfigService) { 
    super(injector);
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    
    if (this.params) {
      
      this.spinnerService.show();
      this.config.get('show-unit/'+this.params).subscribe((data) => {
        
        this.dataToEdit = 'edit';
        console.log(data);

        this.createUnit.setValue({
          unitName: data.data.type,
          unitStatus: data.data.is_active,
        });
        this.spinnerService.hide();
      });
    } 
  }

  ngOnInit(): void {

    this.createUnit = this.formBuilder.group({
      unitName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      unitStatus: ['', Validators.required],
    });

       
  }
  get cc() { return this.createUnit.controls; }

  onSubmitUnit() {
    if (this.dataToEdit == 'edit') {
      this.onEditUnit();
    }
    else {
      this.onCreateUnit();
      
    }

  }
  onCreateUnit(){
    this.submittedCreateUnit = true;
    // stop here if form is invalid
    if (this.createUnit.invalid) {
      return;
    }

    var dat: { [k: string]: any } = {};
    dat.type= this.createUnit.value.unitName;
    dat.is_active = this.createUnit.value.unitStatus;

    this.config.post('add-unit', dat).subscribe((data)=>{
      debugger;
      if(data.success=="0"){
        this.toastr.success('Unit Already Exist!');
      }
      else{
        this.toastr.success('Unit Added Successfully!');
        this.router.navigate(['/admin/unit']);   
      }        
    });

  }

  onEditUnit() {
    this.submittedCreateUnit = true;
    // stop here if form is invalid
    if (this.createUnit.invalid) {
      return;
    }
    var dat: { [k: string]: any } = {};
    dat.id = this.params;
    dat.type= this.createUnit.value.unitName;
    dat.is_active = this.createUnit.value.unitStatus;

    this.spinnerService.show();
    this.config.post('edit-unit', dat).subscribe((data) => {
      console.log(data);
      if (data.success == 0) {
        this.toastr.warning('Ops!'+data.message);
      }
      else {
        this.toastr.success('Unit Updated Successfully!');
      }
      this.router.navigate(['/admin/unit']);   
      this.spinnerService.hide();
    });

  }

}
