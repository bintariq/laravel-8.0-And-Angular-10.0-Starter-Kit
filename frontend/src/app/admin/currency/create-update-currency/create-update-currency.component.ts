import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';
import * as fromCountry from '../../../store/country/country.reducer';

@Component({
  selector: 'app-create-update-currency',
  templateUrl: './create-update-currency.component.html',
  styleUrls: ['./create-update-currency.component.scss']
})
export class CreateUpdateCurrencyComponent extends AppComponentBase {
  public createCurrency: any;
  submittedCreateCurrency = false;
  dataToEdit = '';
  countries = [];
  country_id = '';
  currency_details = [];
  symbol:'';

  constructor(injector: Injector, private configService: ConfigService) {
    super(injector);
  }

  ngOnInit() {
    this.store.select(fromCountry.getAllCountries).subscribe(
      (data) => {
        this.countries = data;
      }
    ); 
    this.configService.get('fetchSymbols').subscribe((data) => {
       this.currency_details = data;
    });

    var params = this.activatedRouter.snapshot.paramMap.get("id");
    if (params) {
      this.spinnerService.show();
      this.configService.get('show-currency/' + params,).subscribe((data) => {
        if (data) {
          this.symbol = data.data.symbol;
          this.createCurrency = this.formBuilder.group({
            id: params,
            title: [data.data.title, Validators.required],
            code: [data.data.code, [Validators.required,Validators.pattern('^[A-Z]{3,}$')]],
            symbol_position: [data.data.symbol_position],
            symbol: [data.data.symbol],
            decimal_point: [data.data.decimal_point, Validators.required],
            is_active: [data.data.is_active, Validators.required],
            value: [data.data.value, Validators.required],
          });
          this.dataToEdit = 'edit';
          this.spinnerService.hide();
        }
      });
    }
    else {
      this.dataToEdit = 'create';
      this.createCurrency = this.formBuilder.group({
        title: ['', Validators.required],
        code: ['', [Validators.required,Validators.pattern('^[A-Z]{3,}$')]],
        symbol_position: ['',Validators.required],
        symbol: ['',Validators.required],
        decimal_point: ['', Validators.required],
        is_active: ['', Validators.required],
        value: ['', Validators.required],
      });
    }

  }
  get cu() { return this.createCurrency.controls; }

  updateCurrencyNgModel(event) {
    if(event){
      this.symbol = event.currency_code;
      this.createCurrency.get('symbol').setValue(event.currency_code);
      this.createCurrency.get('code').setValue(event.currency_code);    
    
    }
    else{
      this.symbol = '';
      this.createCurrency.get('symbol').setValue('');      
    }
  }

  onSubmitCurrency() {
    if (this.dataToEdit == 'create') {
      this.onCreateCurrency();
    }
    else {
      this.onEditCurrency();
    }

  }

  onCreateCurrency() {
    this.submittedCreateCurrency = true;
    // stop here if form is invalid
    if (this.createCurrency.invalid) {
      return;
    }
    this.spinnerService.show();
    this.configService.post('add-currency', this.createCurrency.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Currency Added Successfully!');
        this.router.navigate(['/admin/view-currency']);

      }
      this.spinnerService.hide();

    });
  }

  onEditCurrency() {
    this.submittedCreateCurrency = true;
    // stop here if form is invalid
    if (this.createCurrency.invalid) {
      return;
    }
    this.spinnerService.show();
    this.configService.post('edit-currency', this.createCurrency.value).subscribe((data) => {
      if (data.success == 0) {
        for (const [key, value] of Object.entries(data.message)) {
          this.toastr.warning(`Ops! ${value}`);
        }
      }
      else {
        this.toastr.success('Currency Updated Successfully!');
        this.router.navigate(['/admin/view-currency']);

      }
      this.spinnerService.hide();
    });

  }
}
