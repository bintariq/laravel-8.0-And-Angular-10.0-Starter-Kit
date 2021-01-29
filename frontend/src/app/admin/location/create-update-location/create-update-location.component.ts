import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import { CityService } from 'src/app/service/city.service';
import { CstateService } from 'src/app/service/cstate.service';
import { finalize, debounce } from 'rxjs/operators';
import * as fromCountry from '../../../store/country/country.reducer';
import * as fromZone from '../../../store/zone/zone.reducer';
@Component({
  selector: 'app-create-update-location',
  templateUrl: './create-update-location.component.html',
  styleUrls: ['./create-update-location.component.scss']
})
export class CreateUpdateLocationComponent extends AppComponentBase {
  public createLocation: any;
  submittedCreateLocation = false;
  dataToEdit = '';
  countries = [];
  cities = [];
  cstates = [];
  zones = [];
  country_id = '';
  city_id = '';
  cstate_id = '';
  zone_id = '';
  teamleader_id = '';
  formattedaddress= '';
  teamleaderList:any = [];
  presold_hours = 0;
  constructor(injector: Injector, private configService: ConfigService, private cityservce : CityService, private cstateService : CstateService) {
    super(injector);
  }

  ngOnInit() {
    this.configService.get('ActivefetchCountries').subscribe((data) => {
      this.countries = data;
    });
    this.configService.get('ActivefetchZones').subscribe((data) => {
      this.zones = data;
    });
    this.getWorkforce();
  
    var params = this.activatedRouter.snapshot.paramMap.get("id");
    if (params) {
      this.spinnerService.show();
      this.configService.get('get-site-by-id/' + params,).subscribe((data) => {
        if (data) {
          this.dataToEdit = 'edit';
          this.createLocation = this.formBuilder.group({
            id: params,
            name: [data.data.name, Validators.required],
            country_id: [data.data.country_id, Validators.required],
            city_id: [data.data.city_id],
            state_id: [data.data.state_id],
            teamleader_id: [data.data.teamleader_id, Validators.required],
            presold_hours: [data.data.presold_hours, Validators.required],
            address: [data.data.address, Validators.required],
            zone_id: [data.data.zone_id, Validators.required],
            is_active: [data.data.is_active, Validators.required],
          });
          this.country_id = data.data.country_id;
          this.city_id = data.data.city_id;
          this.cstate_id = data.data.state_id;
          this.zone_id = data.data.zone_id;
          this.spinnerService.hide();
        }
      });
    }
    else {
      this.dataToEdit = 'create';
      this.createLocation = this.formBuilder.group({
        name: ['', Validators.required],
        country_id: [''],
        city_id: [''],
        teamleader_id: ['', Validators.required],
        presold_hours: [0, Validators.required],
        address: ['', Validators.required],
        state_id: [''],
        zone_id: ['', Validators.required],
        is_active: ['', Validators.required],
      });
    }

  }
  get cu() { return this.createLocation.controls; }

  updateCountryNgModel(event) { 
    if(event){
      this.country_id = event.id;
      this.createLocation.get('country_id').setValue(this.country_id);
      this.cstateService.getStatesByCountry(this.country_id).subscribe(
        (data) => {
          if(data.length > 0){
            this.cities = [];
            this.cstates = data;
          }
          else{
            this.cityservce.fetchCitiesByCountry(this.country_id).subscribe(
              (data) => {
                this.cstates = [];
                this.cities = data;
                this.createLocation.get('city_id').setValue(this.city_id);
              }
            );   
          }
        }
      );     
    }
    else{
      this.country_id = '';  
      this.createLocation.get('country_id').setValue('');
    }
  }
  updateStateNgModel(event) {
    if(event){
      this.cstate_id = event.id;
      this.createLocation.get('state_id').setValue(event.id);
      this.cityservce.fetchCitiesByState(this.cstate_id).subscribe(
        (data) => {
          this.cities = data;
        }
      );     
    }
    else{
      this.cstate_id = '';
      this.createLocation.get('state_id').setValue('');  
    }
  }
   updateCityNgModel(event) {
    if(event){
      this.city_id = event.id;  
      this.createLocation.get('city_id').setValue(event.id);
    }
    else{
      this.city_id = '';
      this.createLocation.get('city_id').setValue('');  
    }
  }
  updateZoneNgModel(event) {
    if(event){
      this.zone_id = event.id;
      this.createLocation.get('zone_id').setValue(event.id);    
    }
    else{
      this.zone_id = '';
      this.createLocation.get('zone_id').setValue('');      
    }
  }
  onSubmitLocation() {
    if (this.dataToEdit == 'create') {
      this.onCreateLocation();
    }
    else {
      this.onEditLocation();
    }

  }

  onCreateLocation() {
    this.submittedCreateLocation = true;
    // stop here if form is invalid
    if (this.createLocation.invalid) {
      return;
    }
    this.spinnerService.show();
    this.configService.post('site-store', this.createLocation.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Site Added Successfully!');
        this.router.navigate(['/admin/view-location']);
      }
      this.spinnerService.hide();
    });
  }

  onEditLocation() {
    this.submittedCreateLocation = true;
    // stop here if form is invalid
    if (this.createLocation.invalid) {
      return;
    }
    this.spinnerService.show();
    this.configService.post('site-update', this.createLocation.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Site Updated Successfully!');
        this.router.navigate(['/admin/view-location']);

      }
      this.spinnerService.hide();
    });

  }

  getWorkforce(){
    this.configService.get('Activework-force').pipe(finalize(() => {
      this.spinnerService.hide()
    })).subscribe((data) => {
      data.forEach(x => {
        x.name = x.employee_name+' ( '+x.WorkforceDeciplineName+ ' >> ' +x.workCategoryName+' )';
      });
      this.teamleaderList = data;
    });
  }
  public AddressChange(address: any) { 
    console.log('change address');
     this.formattedaddress=address.formatted_address;

     this.createLocation.patchValue({
      address: this.formattedaddress
   });

  } 
}
