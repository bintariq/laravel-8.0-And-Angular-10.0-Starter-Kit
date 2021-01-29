import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromCountry from '../../../../store/country/country.reducer';
import { Zone } from '../../../../store/zone/zone.model';
import { ZoneService } from '../../../../service/zone.service';
import { CstateService } from '../../../../service/cstate.service';
import { CityService } from '../../../../service/city.service';

import { Store, select } from '@ngrx/store';
import * as fromZone from '../../../../store/zone/zone.reducer';
import * as zoneActions from '../../../../store/zone/zone.actions';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import {TranslateService} from '@ngx-translate/core';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-zone',
  templateUrl: './cu-zone.component.html',
  styleUrls: ['./cu-zone.component.scss']
})
export class CUZoneComponent implements OnInit {
  apiUrl = environment.apiUrl;
  uploadForm: FormGroup;
  editForm: FormGroup;
  countries:[] = [];
  cstates:[] = [];
  cities:[] = [];
  zones:[] = [];
  country_id:'';
  cstate_id:'';
  city_id:'';
  error: any;
  data: any;
  addComponent : any;
  editComponent : any;


  constructor(private configService: ConfigService,private router : Router, private activatedRouter : ActivatedRoute,private translate: TranslateService,  private spinner: NgxSpinnerService, private zoneService: ZoneService,private cityService: CityService, private cstateService: CstateService, private toastr: ToastrService, private formBuilder: FormBuilder, private store: Store<fromZone.State>) {
  }

  async ngOnInit() {
    var params = this.activatedRouter.snapshot.paramMap.get("id");
    if(params){
      this.editComponent = true;
      this.fetchDataToEdit(params);
    }
    else{
      this.addComponent = true;
    }
    this.uploadForm = this.formBuilder.group({
      id: '',
      name: '',
      status: '',
      country_id: '',
      state_id: '',
      city_id:''
    });
    this.editForm = this.formBuilder.group({
      id: '',
      name: '',
      code: '',
      status: '',
      country_id: '',
      state_id: '',
      city_id:''
    });
 
    this.configService.get('fetchCountries').subscribe((data) => {
      this.countries = data;
    });

  }

  updateCountryNgModel(event) {
    if(event){
      this.cstate_id = '';
      this.cstates = [];
      this.city_id = '';
      this.cities = [];
      this.country_id = event.id;
      this.cstateService.getStatesByCountry(this.country_id).subscribe(
        (data) => {
          if(data.length > 0){
            this.cstates = data;
          }
          else{
            this.cityService.fetchCitiesByCountry(this.country_id).subscribe(
              (dataCity) => {
                this.cities = dataCity;
              }
            ); 
          }
        }
      );     
    }
    else{
      this.country_id = '';  
    }

  }
  updateStateNgModel(event) {
    this.city_id = '';
    this.cities = [];
    if(event){
      this.cstate_id = event.id;
      console.log(this.cstate_id);
      this.cityService.fetchCitiesByState(this.cstate_id).subscribe(
        (data) => {
          this.cities = data;
          console.log(this.cities);
        }
      );     
    }
    else{
      this.cstate_id = '';  
    }
     
  }
   updateCityNgModel(event) {
    if(event){
      this.city_id = event.id;  
    }
    else{
      this.city_id = '';  
    }
     
  }
  submitForm() {
    this.spinner.show();
    this.uploadForm.get('country_id').setValue(this.country_id);
    this.uploadForm.get('state_id').setValue(this.cstate_id);
    this.uploadForm.get('city_id').setValue(this.city_id);
    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('status', this.uploadForm.get('status').value);
    formData.append('country_id', this.country_id);
    formData.append('state_id', this.cstate_id);
    formData.append('city_id', this.city_id);
    this.configService.post('addZone',this.uploadForm.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Zone Added Successfully!');
        this.router.navigate(['/admin/map/' + data.added_zone_id]);

      }
      this.spinner.hide();

    }, error => {
      this.error = error.error;
      this.spinner.hide();
    });
  }

  fetchDataToEdit(id) {

    this.zoneService.fetchDataToEdit(id).subscribe(
      (dataZone) => {
        this.country_id = dataZone.country_id;
        this.cstateService.getStatesByCountry(this.country_id).subscribe(
          (dataState) => {
            if(dataZone.state_id){
              this.cstates = dataState;
              this.cstate_id = dataZone.state_id;
              this.cityService.fetchCitiesByState(this.cstate_id).subscribe(
                (dataCity) => {
                  this.cities = dataCity;
                  this.city_id = dataZone.city_id;
                  console.log('by State');   
                }
              ); 
            }
            else{
              this.cityService.fetchCitiesByCountry(this.country_id).subscribe(
                (dataCity) => {
                  this.cities = dataCity;
                  this.city_id = dataZone.city_id;
                  console.log('by Country');  
                }
              ); 
            }

          }
        );

        this.editForm.get('id').setValue(dataZone.id);
        this.editForm.get('name').setValue(dataZone.name);
        this.editForm.get('status').setValue(dataZone.is_active);
        this.editForm.get('country_id').setValue(this.country_id);
        this.editForm.get('state_id').setValue(this.cstate_id);
        this.editForm.get('city_id').setValue(this.city_id);

      }
    );
  }
  submitEditForm() {
    this.spinner.show();
    this.editForm.get('country_id').setValue(this.country_id);
    this.editForm.get('state_id').setValue(this.cstate_id);
    this.editForm.get('city_id').setValue(this.city_id);

    const formData = new FormData();
    formData.append('id', this.editForm.get('id').value);
    formData.append('name', this.editForm.get('name').value);
    formData.append('status', this.editForm.get('status').value);
    formData.append('country_id', this.country_id);
    formData.append('state_id', this.cstate_id);
    formData.append('city_id', this.city_id);
    this.configService.post('updateZone', this.editForm.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Zone Updated Successfully!');
        this.router.navigate(['/admin/zone']);

      }
      this.spinner.hide();

    }, error => {
      this.error = error.error;
      this.spinner.hide();
    });
  }
  handleZoneDeletion(zoneId){
    this.store.dispatch(new zoneActions.DeleteZone(zoneId));
  }

}
