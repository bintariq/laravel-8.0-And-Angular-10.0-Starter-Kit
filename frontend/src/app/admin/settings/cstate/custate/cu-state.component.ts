import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromCountry from '../../../../store/country/country.reducer';
import { Cstate } from '../../../../store/cstate/cstate.model';
import { CstateService } from '../../../../service/cstate.service';
import { Store, select } from '@ngrx/store';
import * as fromCstate from '../../../../store/cstate/cstate.reducer';
import * as cstateActions from '../../../../store/cstate/cstate.actions';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import {TranslateService} from '@ngx-translate/core';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-cstate',
  templateUrl: './cu-state.component.html',
  styleUrls: ['./cu-state.component.scss']
})
export class CUStateComponent implements OnInit {
  apiUrl = environment.apiUrl;
  uploadForm: FormGroup;
  editForm: FormGroup;
  countries:[] = [];
  cstates:[] = [];
  country_id:'';
  data: any;
  error: any;
  addComponent : any;
  editComponent : any;

  constructor(private configService: ConfigService,private activatedRouter : ActivatedRoute, private router : Router,private translate: TranslateService,  private spinner: NgxSpinnerService, private cstateService: CstateService, private toastr: ToastrService, private formBuilder: FormBuilder, private store: Store<fromCstate.State>) {
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
      country_id: ''
    });
    this.editForm = this.formBuilder.group({
      id: '',
      name: '',
      code: '',
      status: '',
      country_id: ''
    });
    this.configService.get('fetchCountries').subscribe((data) => {
        this.countries = data;
    });
  }


  updateNgModel(event) {
     this.country_id = event.id;
     console.log(this.country_id);   
  }

  submitForm() {
    this.spinner.show();
    console.log(this.country_id);
    this.uploadForm.get('country_id').setValue(this.country_id);

    const formData = new FormData();
    this.uploadForm.get('country_id').value
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('status', this.uploadForm.get('status').value);
    formData.append('country_id', this.country_id);
    this.configService.post('addCstate', this.uploadForm.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('State Created Successfully!');
        this.router.navigate(['/admin/state']);

      }
      this.spinner.hide();

    }, error => {
      this.error = error.error;
      this.spinner.hide();
    });
  }
  fetchDataToEdit(id) {

    this.cstateService.fetchDataToEdit(id).subscribe(
      (data) => {
        console.log(data);
        this.country_id = data.country_id;
        this.editForm.get('id').setValue(data.id);
        this.editForm.get('name').setValue(data.name);
        this.editForm.get('status').setValue(data.is_active);
        this.editForm.get('country_id').setValue(this.country_id);
      }
    );
  }
  submitEditForm() {
    this.spinner.show();
    this.editForm.get('country_id').setValue(this.country_id);
    const formData = new FormData();
    formData.append('id', this.editForm.get('id').value);
    formData.append('name', this.editForm.get('name').value);
    formData.append('status', this.editForm.get('status').value);
    formData.append('country_id', this.country_id);
    this.configService.post('updateCstate', this.editForm.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('State Updated Successfully!');
        this.router.navigate(['/admin/state']);

      }
      this.spinner.hide();

    }, error => {
      this.error = error.error;
      this.spinner.hide();
    });
  }
  handleCstateDeletion(cstateId){
    this.store.dispatch(new cstateActions.DeleteCstate(cstateId));
  }

}
