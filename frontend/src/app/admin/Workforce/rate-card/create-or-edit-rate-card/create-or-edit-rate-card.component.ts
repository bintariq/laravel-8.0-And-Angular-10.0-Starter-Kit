import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-edit-rate-card',
  templateUrl: './create-or-edit-rate-card.component.html',
  styleUrls: ['./create-or-edit-rate-card.component.scss']
})
export class CreateOrEditRateCardComponent extends AppComponentBase{

  active = false
  saving = false;
  createOrEditform: FormGroup;
  submitted = false;
  retecardId:any;
  countryList:any=[];
  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
  }

  ngOnInit(): void {
    this.retecardId = this.activatedRouter.snapshot.queryParams['id']
    if (this.retecardId) {
      this.config.get('get-RateCard/'+this.retecardId).pipe(finalize(() => {
      })).subscribe((data) => {
        this.createOrEditform.setValue({
          categoryName: data.data.Category_name,
          subCategory: data.data.sub_category,
          normalRate: data.data.normal_rate,
          overtimeRate: data.data.overtime_rate,
          weekendrate: data.data.weekend_rate,
          publicHolidayrate: data.data.public_holiday_rate,
        });
      });
    }
    this.createOrEditform = this.formBuilder.group({
      categoryName: ['', Validators.required],
      subCategory: ['', Validators.required,],
      normalRate: ['', [Validators.required]],
      overtimeRate: ['', [Validators.required]],
      weekendrate: ['', Validators.required],
      publicHolidayrate: ['', Validators.required],
  });

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

  close(): void {
   
    this.router.navigate(['/admin/workfore/ratecard']);
  }
  onSubmit() {
    this.submitted = true;
    if (this.createOrEditform.invalid) {
        return;
    }
    
    var dat: { [k: string]: any } = {};
      dat.Category_name = this.createOrEditform.value.categoryName,
      dat.sub_category = this.createOrEditform.value.subCategory,
      dat.normal_rate = this.createOrEditform.value.normalRate.toString(),
      dat.overtime_rate = this.createOrEditform.value.overtimeRate.toString(),
      dat.weekend_rate = this.createOrEditform.value.weekendrate.toString(),
      dat.public_holiday_rate = this.createOrEditform.value.publicHolidayrate.toString();
      dat.id = this.retecardId==undefined? 0 :Number(this.retecardId);
      var url=undefined;
      if(this.retecardId)
      {
        url="RateCard-update"  
      }
      else{
        url="add-rate-card"
      }
      this.saving=true;
    this.config.post(url, dat).pipe(finalize(()=>{this.saving=false})).subscribe((data) => {
      if (data.success == "0") {
        this.toastr.success('Rate Card Already Exist!');
      }
      else {
        this.toastr.success('Rate Card Successfully!');
        this.router.navigate(['/admin/workfore/ratecard']);
      }
    });
}
onReset() {
  this.submitted = false;
  this.createOrEditform.reset();
}
  save() { }
}
