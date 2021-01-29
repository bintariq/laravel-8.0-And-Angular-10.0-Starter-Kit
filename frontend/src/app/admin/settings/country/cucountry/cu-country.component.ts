import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Country } from '../../../../store/country/country.model';
import { CountryService } from '../../../../service/country.service';
import { Store, select } from '@ngrx/store';
import * as fromCountry from '../../../../store/country/country.reducer';
import * as countryActions from '../../../../store/country/country.actions';
import { ConfigService } from 'src/app/service/config.service';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-country',
  templateUrl: './cu-country.component.html',
  styleUrls: ['./cu-country.component.scss']
})
export class CUCountryComponent implements OnInit {
  public createCountry: any;
  dataToEdit = 'create';
  submittedCreateCountry = false;
  apiUrl = environment.apiUrl;
  uploadForm: FormGroup;
  countries:[] = [];
  currencies:[] = [];
  languages:[] = [];
  currency_details:[] = [];
  data: any;
  fileData: any;
  image:null;
  code:'';
  constructor(private configService: ConfigService, private activatedRouter : ActivatedRoute,private router : Router,private config :ConfigService, private translate: TranslateService, private spinner: NgxSpinnerService, private countryService: CountryService, private toastr: ToastrService, private formBuilder: FormBuilder, private store: Store<fromCountry.State>) {
  }

   ngOnInit() {
    var params = this.activatedRouter.snapshot.paramMap.get("id");
    this.uploadForm = this.formBuilder.group({
      id:  [''],
      name:  ['', Validators.required],
      code:  ['', Validators.required],
      wrench_time:  ['', Validators.required],
      language_id:  ['', Validators.required],
      currency_id:  ['', Validators.required],
      is_active:  ['', Validators.required],
      country_flag:  [null]
    });
    if(params){
      this.fetchDataToEdit(params);
    } 
    this.config.get('fetchcurrency').subscribe((data) => {
      this.currencies = data;
    });
    this.config.get('fetchLanguages').subscribe((data) => {
      this.languages = data;
    });
    this.configService.get('fetchSymbols').subscribe((data) => {
      this.currency_details = data;
   });
  }

  get cu() { return this.uploadForm.controls; }

  upload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      country_flag: file
    });
    this.uploadForm.get('country_flag').updateValueAndValidity()
 }
  updateCurrencyNgModel(event) {
    if(event){
      this.uploadForm.get('code').setValue(event.code);    
    
    }
    else{
      this.uploadForm.get('code').setValue('');      
    }
  }
  onSubmitCountry() {
    if (this.dataToEdit == 'create') {
      this.submitCreateForm();
    }
    else {
      this.submitEditForm();
    }

  }

  submitCreateForm() {
    this.submittedCreateCountry = true;
    console.log(this.cu);
    // stop here if form is invalid
    if (this.uploadForm.invalid) {
      return;
    }
    this.spinner.show();
    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('code', this.uploadForm.get('code').value);
    formData.append('wrench_time', this.uploadForm.get('wrench_time').value);
    formData.append('language_id', this.uploadForm.get('language_id').value);
    formData.append('currency_id', this.uploadForm.get('currency_id').value);
    formData.append('is_active', this.uploadForm.get('is_active').value);
    formData.append('country_flag', this.uploadForm.get('country_flag').value);
    this.configService.post('addCountry', formData).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Country Added Successfully!');
        this.router.navigate(['/admin/view-countries']);

      }
      this.spinner.hide();

    },error => {
      for (const [key, value] of Object.entries(error.error)) {
        this.toastr.warning(`Ops! ${value}`);
      }
      this.toastr.warning(`Ops! ${error.message}`);
      this.spinner.hide();
    });
  }

  fetchDataToEdit(id) {

    this.countryService.fetchDataToEdit(id).subscribe(
      (data) => {
        this.dataToEdit = 'edit';
        this.uploadForm.get('id').setValue(data.countries.id);
        this.uploadForm.get('name').setValue(data.countries.name);
        this.uploadForm.get('code').setValue(data.countries.code);
        this.uploadForm.get('wrench_time').setValue(data.countries.wrench_time);
        this.uploadForm.get('language_id').setValue(data.countries.language_id);
        this.uploadForm.get('currency_id').setValue(data.countries.currency_id);
        this.uploadForm.get('is_active').setValue(data.countries.is_active);
        this.uploadForm.get('country_flag').setValue(data.countries.country_flag);
        this.image = data.countries.country_flag;
      }
    );
  }
  submitEditForm() {
    this.submittedCreateCountry = true;
    // stop here if form is invalid
    if (this.uploadForm.invalid) {
      return;
    }
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', this.uploadForm.get('id').value);
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('code', this.uploadForm.get('code').value);
    formData.append('wrench_time', this.uploadForm.get('wrench_time').value);
    formData.append('language_id', this.uploadForm.get('language_id').value);
    formData.append('currency_id', this.uploadForm.get('currency_id').value);
    formData.append('is_active', this.uploadForm.get('is_active').value);
    if(this.uploadForm.get('country_flag').value){
      formData.append('country_flag', this.uploadForm.get('country_flag').value);
    }
    else{
      formData.append('country_flag', this.uploadForm.get('country_flag').value);
    }
    this.configService.post('updateCountry', formData)
    .subscribe(data => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Country Added Successfully!');
        this.router.navigate(['/admin/view-countries']);

      }
    },
    error => {
      for (const [key, value] of Object.entries(error.error)) {
        this.toastr.warning(`Ops! ${value}`);
      }
      this.toastr.warning(`Ops! ${error.message}`);
      this.spinner.hide();
    });
    // this.store.dispatch(new countryActions.UpdateCountry(this.uploadForm.value));
  }
  handleCountryDeletion(countryId){
    this.store.dispatch(new countryActions.DeleteCountry(countryId));
  }

}
