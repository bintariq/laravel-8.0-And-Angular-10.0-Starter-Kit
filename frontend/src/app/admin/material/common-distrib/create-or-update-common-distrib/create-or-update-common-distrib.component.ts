import { Component, OnInit, Injector } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-or-update-common-distrib',
  templateUrl: './create-or-update-common-distrib.component.html',
  styleUrls: ['./create-or-update-common-distrib.component.scss']
})
export class CreateOrUpdateCommonDistribComponent extends AppComponentBase {

  public createOrEditform: any;
  public getDeciplines: any;
  public params: any;
  public currenies: any;
  submitted = false;
  dataToEdit = '';
  constructor(injector: Injector, private config: ConfigService) { 
    super(injector);
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    if (this.params) {
      this.spinnerService.show();
      this.config.get('show-CommonDisbuter/'+this.params).subscribe((data) => {
        console.log(data);
        this.createOrEditform.setValue({
          name: data.data.name,
          is_active: data.data.is_active,
        });
        this.spinnerService.hide();
      });
    } 
  }

  ngOnInit(): void {
    this.createOrEditform = this.formBuilder.group({
      name: ['', Validators.required],
      is_active: ['', Validators.required],
    });

       
  }
  get f() { return this.createOrEditform.controls; }

  onSubmit() {
    this.submitted = true;
    var dat: { [k: string]: any } = {};
    dat.name= this.createOrEditform.value.name;
    dat.is_active= this.createOrEditform.value.is_active;
    
    var url=undefined;
    if(this.params)
    {
      url='edit-CommonDisbuter'
      dat.id= Number(this.params);
    }
    else{
      url='add-CommonDisbuter'
    }
    this.config.post(url, dat).subscribe((data)=>{
      debugger;
        this.toastr.success('Common Distrib Added Successfully!');
        this.router.navigate(['/admin/material/CommonDistrib']);   
           
    });

  }
}

