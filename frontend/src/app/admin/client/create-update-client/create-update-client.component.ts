import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-update-client',
  templateUrl: './create-update-client.component.html',
  styleUrls: ['./create-update-client.component.scss']
})
export class CreateUpdateClientComponent extends AppComponentBase {
  

  
  public createClient: any;
  submittedCreateClient = false;
  dataToEdit = '';
  params : any;
  
  constructor(injector: Injector, public configService: ConfigService) {
    super(injector);
  }

  ngOnInit() {
    

    this.createClient = this.formBuilder.group({
      client_name: ['',  [Validators.required]],
      contact_person_name: [''],
      company_name: ['', Validators.required],
      email: ['', [Validators.email]],
      email2: ['', [Validators.email]],
      phone: [''],
      country_code: [null],
      is_active: ['', Validators.required]
    });

 
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    if (this.params) {
      this.spinnerService.show();
      this.configService.get('get-client-by-id/' +this.params).subscribe((data) => {
          this.dataToEdit = 'edit';
          console.log(data);

          this.createClient.setValue({
            client_name: data.data.client_name,
            contact_person_name: data.data.contact_person_name,
            company_name: data.data.company_name,
            email: data.data.email,
            email2: data.data.email2,
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
    dat.client_name= this.createClient.value.client_name;
    dat.contact_person_name= this.createClient.value.contact_person_name;
    dat.company_name= this.createClient.value.company_name;
    dat.email= this.createClient.value.email;
    dat.email2= this.createClient.value.email2;
    dat.phone=  this.createClient.value.phone;    
    dat.country_code=  this.createClient.value.country_code;    
    dat.is_active= this.createClient.value.is_active;
        
    this.spinnerService.show();
    this.configService.post('client-store', dat ).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Client Added Successfully!');
        this.router.navigate(['/admin/view-clients']); 
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
    dat.client_name= this.createClient.value.client_name;
    dat.contact_person_name= this.createClient.value.contact_person_name;
    dat.company_name= this.createClient.value.company_name;
    dat.email= this.createClient.value.email;
    dat.email2= this.createClient.value.email2;
    dat.phone=  this.createClient.value.phone;    
    dat.country_code =  this.createClient.value.country_code;    
    dat.is_active= this.createClient.value.is_active;
    dat.id = this.params;

    this.spinnerService.show();
    this.configService.post('client-update', dat).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        
        this.toastr.success('Client Updated Successfully!');
        this.router.navigate(['/admin/view-clients']); 
      }
      this.spinnerService.hide();
    });
  }
}
