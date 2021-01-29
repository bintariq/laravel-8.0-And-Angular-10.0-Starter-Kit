import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-edit-agency',
  templateUrl: './create-or-edit-agency.component.html',
  styleUrls: ['./create-or-edit-agency.component.scss']
})
export class CreateOrEditAgencyComponent extends AppComponentBase {



  active = false
  saving = false;
  createOrEditform: FormGroup;
  submitted = false;
  agencyId: any;
  countryList: any = [];
  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
  }

  ngOnInit(): void {
    this.agencyId = this.activatedRouter.snapshot.queryParams['id']

    this.createOrEditform = this.formBuilder.group({
      agencyName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      contactPerson: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z_\.\-]([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]],
      Secondemail: ['', [Validators.email, Validators.pattern('^[a-zA-Z_\.\-]([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]],
      contactNumber: ['', [Validators.required]],
      // location: ['', Validators.required],
    });


    if (this.agencyId) {
      this.config.get('show-agency/' + this.agencyId).pipe(finalize(() => {
      })).subscribe((data) => {
        this.createOrEditform.setValue({
          agencyName: data.data.agency_name,
          email: data.data.first_email,
          Secondemail: data.data.second_email,
          contactPerson: data.data.contacted_person,
          contactNumber: data.data.phone,
          // location: data.data.location,
        });
      });
    }
    this.getCountry();
  }
  get f() { return this.createOrEditform.controls; }

  getCountry() {
    this.config.get('fetchCountries').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      this.countryList = data;
      this.spinnerService.hide();
    });
  }

  show(id?) {
    this.agencyId = id;
    this.active = true;
  }
  close(): void {
    this.router.navigate(['/admin/workfore/agency']);
  }
  onSubmit() {
    this.submitted = true;
    if (this.createOrEditform.invalid) {
      return;
    }

    var dat: { [k: string]: any } = {};
    dat.agency_name = this.createOrEditform.value.agencyName,
      dat.contacted_person = this.createOrEditform.value.contactPerson,
      dat.phone = this.createOrEditform.value.contactNumber.toString(),
      dat.first_email = this.createOrEditform.value.email,
      dat.second_email = this.createOrEditform.value.Secondemail;
    // dat.location = this.createOrEditform.value.location;
    dat.id = this.agencyId == undefined ? 0 : Number(this.agencyId);
    var url = undefined;
    if (this.agencyId) {
      url = "edit-agency"
    }
    else {
      url = "add-agency"
    }
    this.saving = true
    this.config.post(url, dat).pipe(finalize(() => { this.saving = false })).subscribe((data) => {
      if (data.success == "0") {
        this.toastr.error('Agency Already Exist!');
      }
      else {
        this.toastr.success('Agency Added Successfully!');
        this.router.navigate(['/admin/workfore/agency']);
      }
    });
  }
  onReset() {
    this.submitted = false;
    this.createOrEditform.reset();
  }
  save() { }
}
