import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-update-material',
  templateUrl: './create-or-update-material.component.html',
  styleUrls: ['./create-or-update-material.component.scss']
})
export class CreateOrUpdateMaterialComponent extends AppComponentBase {

  public createMaterial: any;
  public params: any;
  public MaterialCategories: any;
  public currenies: any;
  public units: any;
  public manufacturers: any;
  public Vendors: any;
  submittedCreateMaterial = false;
  dataToEdit = '';
  constructor(injector: Injector, private config: ConfigService) { 
    super(injector);
    this.getMaterialCategory();
    this.getCurrenies();
    this.getUnit();
    this.getManufacture();
    this.getVendor();

    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    
    if (this.params) {
      this.spinnerService.show();
      this.config.get('show-material/'+this.params+'').subscribe((data) => {
        
        this.dataToEdit = 'edit';
        console.log(data);

        this.createMaterial.setValue({
          name: data.data.name,
          category_id: data.data.category_id,
          unit_price: data.data.unit_price,
          currency: data.data.currency_id,
          unit: data.data.unit,
          manufacturer_id:data.data.manufacturer_id,
          sku_no: data.data.manufacturer_code,
          reference_no_vender: data.data.reference_no_vender,
          vendor_id: data.data.vendor_id,
          description: data.data.description,
        });
        this.spinnerService.hide();
      });
    } 
    
  }

  ngOnInit(): void {

    this.createMaterial = this.formBuilder.group({
      name: ['', Validators.required],
      category_id: [null, Validators.required],
      unit_price: ['', Validators.required],
      currency: [null, Validators.required],
      unit: [null, Validators.required],
      manufacturer_id:[null,  Validators.required],
      sku_no: ['', Validators.required],
      reference_no_vender: ['', Validators.required],
      vendor_id:[null,  Validators.required],
      description: [''],
    });

       
  }
  get cm() { return this.createMaterial.controls; }

  onSubmitMaterial() {
    if (this.dataToEdit == 'edit') {
      this.onEditMaterial();
    }
    else {
      this.onCreateMaterial();
      
    }

  }
  onCreateMaterial(){
    this.submittedCreateMaterial = true;
    //stop here if form is invalid
    if (this.createMaterial.invalid) {
      return;
    }

    var dat: { [k: string]: any } = {};
    dat.name= this.createMaterial.value.name,
    dat.category_id= this.createMaterial.value.category_id,
    dat.unit_price= this.createMaterial.value.unit_price,
    dat.currency_id= this.createMaterial.value.currency,
    dat.unit= this.createMaterial.value.unit,
    dat.manufacturer_id= this.createMaterial.value.manufacturer_id,
    dat.manufacturer_code= this.createMaterial.value.sku_no,
    dat.reference_no_vender= this.createMaterial.value.reference_no_vender,
    dat.vendor_id= this.createMaterial.value.vendor_id,
    dat.description= this.createMaterial.value.description,

    this.config.post('add-material', dat).subscribe((data)=>{
      if(data.success=="0"){
        this.toastr.success('Material Already Exist!');
      }
      else{
        this.toastr.success('Material Added Successfully!');
        this.router.navigate(['/admin/material/material']);   
      }        
    });

  }

  onEditMaterial() {
    this.submittedCreateMaterial = true;
    // stop here if form is invalid
    if (this.createMaterial.invalid) {
      return;
    }
    var dat: { [k: string]: any } = {};
    dat.name= this.createMaterial.value.name,
    dat.category_id= this.createMaterial.value.category_id,
    dat.unit_price= this.createMaterial.value.unit_price,
    dat.currency_id= this.createMaterial.value.currency,
    dat.unit= this.createMaterial.value.unit,
    dat.manufacturer_id= this.createMaterial.value.manufacturer_id,
    dat.manufacturer_code= this.createMaterial.value.sku_no,
    dat.reference_no_vender= this.createMaterial.value.reference_no_vender,
    dat.vendor_id= this.createMaterial.value.vendor_id,
    dat.description= this.createMaterial.value.description,
    dat.id= this.params,

    this.spinnerService.show();
    this.config.post('edit-material', dat).subscribe((data) => {
      if (data.success == 0) {
        this.toastr.warning('Ops!'+data.message);
      }
      else {
        this.toastr.success('Material Updated Successfully!');
      }
      this.router.navigate(['/admin/material/material']);   
      this.spinnerService.hide();
    });

  }
  getMaterialCategory(){
    this.config.get('Activefetchmaterial_category').subscribe((data) => {
      this.MaterialCategories = data;
    });
  }
  
  getCurrenies(){
    this.config.get('Activefetchcurrency').subscribe((data) => {
      this.currenies = data;
      
    });
  }
  getUnit(){
    this.config.get('ActiveFetchUnit').subscribe((data) => {
      this.units = data;
      
    });
  }
  getManufacture(){
    this.config.get('ActiveFetchmanufacturers').subscribe((data) => {
      this.manufacturers = data;
      console.log(data);
    });
  }
  getVendor(){
    this.config.get('ActiveFetchProductVender').subscribe((data) => {
      this.Vendors = data;
      
    });
  }
}
