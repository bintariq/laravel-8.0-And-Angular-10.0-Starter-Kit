import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-update-material-vendor',
  templateUrl: './create-or-update-material-vendor.component.html',
  styleUrls: ['./create-or-update-material-vendor.component.scss']
})
export class CreateOrUpdateMaterialVendorComponent extends AppComponentBase {

  public createVendor: any;
  public params: any;
  public countriesList: any;
  public provinceList: any;
  public cityList: any;
  public commanDistribuot: any;
  submittedCreateVendor = false;
  dataToEdit = '';
  formattedaddress= '';
  message: any;

  

  constructor(injector: Injector, public config: ConfigService) { 
    super(injector);
    this.getCountries();
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    
    if (this.params) {
      
      this.spinnerService.show();
      this.config.get('show-product-vender/'+this.params+'').subscribe((data) => {
        this.dataToEdit = 'edit';
        this.config.get('getStatesByCountry/'+data.data.country_id+'').subscribe((data)=>{    
          this.provinceList=data
        });
        this.config.get('fetchCitiesByState/'+data.data.state+'').subscribe((data)=>{   
          this.cityList=data
        });

        this.createVendor.setValue({
          vender_name: data.data.vender_name,
          vender_first_email: data.data.vender_first_email,
          vender_second_email: data.data.vender_second_email,
          country_code: '92',
          phone: data.data.phone,
          address: data.data.address,
          country: data.data.country_id,
         
          city: data.data.city,
          state: data.data.state,
          commanDist: data.data.common_id,
          
        });
        this.spinnerService.hide();
      });
    } 

    
  }

  ngOnInit(): void {
  this.getcommanDistribuot();

    this.createVendor = this.formBuilder.group({
      vender_name: ['', Validators.required],
      
      vender_first_email: ['',  [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z_\.\-]([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]],
      vender_second_email: ['', [Validators.email, Validators.pattern('^[a-zA-Z_\.\-]([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]],
      country_code: [null],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      country: [null, Validators.required],
     
      state: [null],
      city: [null],
      commanDist: [null, Validators.required],
      
    });

       
  }
  get cv() { return this.createVendor.controls; }
  get state(): any { return this.createVendor.get('state'); }
  get city(): any { return this.createVendor.get('city'); }
  
  getCountries(){
    this.config.get('fetchCountries').subscribe((data)=>{
      console.log(data);      
      this.countriesList=data
    });
  }
  
  getcommanDistribuot(){
    this.config.get('FetchCommonDisbuter').subscribe((data)=>{
      console.log(data);      
      this.commanDistribuot=data
    });
  }
  
  changeCountry(event){
    this.state.reset();
    this.city.reset();

    this.config.get('getStatesByCountry/' + event.id).subscribe((data) => {
      this.provinceList = data;
      
      this.changeProvince(event.id);
    });      
  }
  changeProvince(event){
    this.city.reset();
    if (event.id != "null"){
      console.log('elsse this.provinceId', event.id);
      this.config.get('fetchCitiesByState/'+event.id).subscribe((data)=>{
        this.cityList = data;
        console.log('this.cityData', this.cityList);
      }); 
    }
    else{
      this.cityList = null;
    }
           
  }

  onSubmitVendor() {
    if (this.dataToEdit == 'edit') {
      this.onEditVendor();
    }
    else {
      this.onCreateVendor();
      
    }

  }
  onCreateVendor(){
    this.submittedCreateVendor = true;
    this.message= '';
    // stop here if form is invalid
    if (this.createVendor.invalid) {
      return;
    }

    var dat: { [k: string]: any } = {};

    
    dat.vender_name = this.createVendor.value.vender_name;
    
    dat.vender_first_email = this.createVendor.value.vender_first_email;
    dat.vender_second_email = this.createVendor.value.vender_second_email;
    dat.country_code = this.createVendor.value.country_code;
    dat.phone = this.createVendor.value.phone;
    dat.address = this.formattedaddress;
    dat.country_id = this.createVendor.value.country;
    dat.city = this.createVendor.value.city;
    dat.state = this.createVendor.value.state;
    dat.common_id = this.createVendor.value.commanDist;
    this.config.post('add-product-vender', dat).subscribe((data)=>{
      this.message = data.message;
      if(data.success=="0"){
        this.toastr.success('Distributor Already Exist!');
      }
      else{
        this.toastr.success('Distributor Added Successfully!');
        this.router.navigate(['/admin/material/material-distributor']);   
      }        
    });

  }

  onEditVendor() {
    this.submittedCreateVendor = true;
    this.message= '';
    // stop here if form is invalid
    if (this.createVendor.invalid) {
      return;
    }
    var dat: { [k: string]: any } = {};

    
    console.log(this.createVendor.value.address );
    if(this.formattedaddress==''){
      this.formattedaddress = this.createVendor.value.address
    }
    
    
    dat.vender_name = this.createVendor.value.vender_name;
   
    dat.vender_first_email = this.createVendor.value.vender_first_email;
    dat.vender_second_email = this.createVendor.value.vender_second_email;
    dat.country_code = this.createVendor.value.country_code;
    dat.phone = this.createVendor.value.phone;
    dat.address = this.formattedaddress;
    dat.country_id = this.createVendor.value.country;
    dat.city = this.createVendor.value.city;
    dat.state = this.createVendor.value.state;
    dat.common_id = this.createVendor.value.commanDist;
    dat.id = this.params;
    this.spinnerService.show();
    this.config.post('edit-product-vender', dat).subscribe((data) => {
      this.message = data.message;
      if (data.success == 0) {
        this.toastr.warning('Ops!'+data.message);
      }
      else {
        this.toastr.success('Distributor Updated Successfully!');
      }
      this.router.navigate(['/admin/material/material-distributor']);   
      this.spinnerService.hide();
    });

  }


  public AddressChange(address: any) { 
    console.log('address', address);
    //setting address from API to local variable 
     this.formattedaddress=address.formatted_address 
  } 

}
