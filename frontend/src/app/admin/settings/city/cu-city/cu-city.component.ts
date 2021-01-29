import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromCountry from '../../../../store/country/country.reducer';
import { City } from '../../../../store/city/city.model';
import { CityService } from '../../../../service/city.service';
import { CstateService } from '../../../../service/cstate.service';
import { Store, select } from '@ngrx/store';
import * as fromCity from '../../../../store/city/city.reducer';
import * as cityActions from '../../../../store/city/city.actions';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import {TranslateService} from '@ngx-translate/core';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-city',
  templateUrl: './cu-city.component.html',
  styleUrls: ['./cu-city.component.scss']
})
export class CUCityComponent implements OnInit {
  apiUrl = environment.apiUrl;
  uploadForm: FormGroup;
  editForm: FormGroup;
  countries:[] = [];
  cstates:[] = [];
  cities:[] = [];
  country_id:'';
  cstate_id:'';
  error:any;
  data: any;
  message_type : any;
  addComponent : any;
  editComponent : any;


  constructor(private configService: ConfigService, private activatedRouter : ActivatedRoute, private router : Router, private translate: TranslateService,  private spinner: NgxSpinnerService, private cityService: CityService, private cstateService: CstateService, private toastr: ToastrService, private formBuilder: FormBuilder, private store: Store<fromCity.State>) {
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
      state_id: ''
    });
    this.editForm = this.formBuilder.group({
      id: '',
      name: '',
      code: '',
      status: '',
      country_id: '',
      state_id: ''
    });
    this.configService.get('fetchCountries').subscribe((data) => {
      this.countries = data;
    });


  }

  updateCountryNgModel(event) {
    if(event){
      this.country_id = event.id;  
    }
    else{
      this.country_id = '';  
    }
     this.cstateService.getStatesByCountry(this.country_id).subscribe(
      (data) => {
        this.cstates = data;
      }
    );   
  }
  updateStateNgModel(event) {
    console.log(event);
    if(event){
      this.cstate_id = event.id;  
    }
    else{
      this.cstate_id = '';  
    }
     
 }
  submitForm() {
    this.spinner.show();
    this.uploadForm.get('country_id').setValue(this.country_id);
    this.uploadForm.get('state_id').setValue(this.cstate_id);
    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('status', this.uploadForm.get('status').value);
    formData.append('country_id', this.country_id);
    formData.append('state_id', this.cstate_id);
    this.configService.post('addCity', this.uploadForm.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('City Added Successfully!');
        this.router.navigate(['/admin/city']);

      }
      this.spinner.hide();

    }, error => {
      this.error = error.error;
      this.spinner.hide();
    });
  }

  fetchDataToEdit(id) {

    this.cityService.fetchDataToEdit(id).subscribe(
      (data) => {
        this.country_id = data.country_id;
        this.cstateService.getStatesByCountry(this.country_id).subscribe(
          (data) => {
            this.cstates = data;
          }
        );  
        this.cstate_id = data.state_id;
        this.editForm.get('id').setValue(data.id);
        this.editForm.get('name').setValue(data.name);
        this.editForm.get('status').setValue(data.is_active);
        this.editForm.get('country_id').setValue(this.country_id);
        this.editForm.get('state_id').setValue(this.cstate_id);

      }
    );
  }
  submitEditForm() {
    this.spinner.show();
    this.editForm.get('country_id').setValue(this.country_id);
    this.editForm.get('state_id').setValue(this.cstate_id);

    const formData = new FormData();
    formData.append('id', this.editForm.get('id').value);
    formData.append('name', this.editForm.get('name').value);
    formData.append('status', this.editForm.get('status').value);
    formData.append('country_id', this.country_id);
    formData.append('state_id', this.cstate_id);
    this.configService.post('updateCity', this.editForm.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('City Updated Successfully!');
        this.router.navigate(['/admin/city']);

      }
      this.spinner.hide();

    }, error => {
      this.error = error.error;
      this.spinner.hide();
    });
    // this.store.dispatch(new cityActions.UpdateCity(this.editForm.value));
  }
  handleCityDeletion(cityId){
    this.store.dispatch(new cityActions.DeleteCity(cityId));
  }

}
