import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-edit-project-manager',
  templateUrl: './create-or-edit-project-manager.component.html',
  styleUrls: ['./create-or-edit-project-manager.component.scss']
})
export class CreateOrEditProjectManagerComponent extends AppComponentBase {
  

  
  public createClient: any;
  submittedCreateClient = false;
  dataToEdit = '';
  params : any;
  
  constructor(injector: Injector, public configService: ConfigService) {
    super(injector);
  }

  ngOnInit() {
    

    this.createClient = this.formBuilder.group({
      name: ['',  [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country_code: [null, Validators.required],
      is_active: ['', Validators.required]
    });

 
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    if (this.params) {
      this.spinnerService.show();
      this.configService.get('GetProjectManagerByid/' +this.params).subscribe((data) => {
          this.dataToEdit = 'edit';
          console.log(data);

          this.createClient.setValue({
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone,
            country_code: data.data.country_code,
            is_active: data.data.is_active,
          });
          this.spinnerService.hide();
      });
    }
    

  }

  get cu() { return this.createClient.controls; }

  
  onSubmitClient() {
    if (this.dataToEdit == 'edit') {
      this.onEditClient();
    }
    else {
      this.onCreateClient();
    }
  }

  onCreateClient() {
    this.submittedCreateClient = true;
    // stop here if form is invalid
    if (this.createClient.invalid) {
      return;
    }

    console.log(this.createClient.value.country_code);

    var dat: { [k: string]: any } = {};
    dat.name= this.createClient.value.name;
    dat.email= this.createClient.value.email;
    dat.phone=  this.createClient.value.phone;    
    dat.country_code=  this.createClient.value.country_code;    
    dat.is_active= this.createClient.value.is_active;
        
    this.spinnerService.show();
    this.configService.post('StoreProjectManager', dat ).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Project Manager Added Successfully!');
        this.router.navigate(['/admin/project-manager']); 
      }
      this.spinnerService.hide();
    });
  }

  onEditClient() {
    this.submittedCreateClient = true;
    // stop here if form is invalid
    if (this.createClient.invalid) {
      return;
    }

    var dat: { [k: string]: any } = {};
    dat.name= this.createClient.value.name;
    dat.email= this.createClient.value.email;
    dat.phone=  this.createClient.value.phone;    
    dat.country_code =  this.createClient.value.country_code;    
    dat.is_active= this.createClient.value.is_active;
    dat.id = this.params;

    this.spinnerService.show();
    this.configService.post('updatepojectManager', dat).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        
        this.toastr.success('Project Manager Updated Successfully!');
        this.router.navigate(['/admin/project-manager']); 
      }
      this.spinnerService.hide();
    });
  }
}
