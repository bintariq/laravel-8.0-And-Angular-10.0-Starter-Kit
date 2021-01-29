
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-update-task-category',
  templateUrl: './create-or-update-task-category.component.html',
  styleUrls: ['./create-or-update-task-category.component.scss']
})
export class CreateOrUpdateTaskCategoryComponent extends AppComponentBase {

  public createCategory: any;
  public parentCategories: any = [];
  public params: any;
  submittedCreateCategory = false;
  dataToEdit = '';
  constructor(injector: Injector, private config: ConfigService) { 
    super(injector);
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    
    if (this.params) {
      
      this.spinnerService.show();
      this.config.get('showTaskCategry/'+this.params+'').subscribe((data) => {
        
        this.dataToEdit = 'edit';
        console.log(data);

        this.createCategory.setValue({
          categoryName: data.data.name,
          parent_id: data.data.parent_id,
          categoryStatus: data.data.is_active,
          description:data.data.description
        });
        this.spinnerService.hide();
      });
    } 

    this.getParentCategories();
  }

  ngOnInit(): void {

    this.createCategory = this.formBuilder.group({
      categoryName: ['', Validators.required],
      parent_id:[null],
      categoryStatus: ['', Validators.required],
      description:['']
    });

       
  }
  get cc() { return this.createCategory.controls; }

  onSubmitCategory() {
    if (this.dataToEdit == 'edit') {
      this.onEditCategory();
    }
    else {
      this.onCreateCategory();
      
    }

  }
  onCreateCategory(){
    this.submittedCreateCategory = true;
    // stop here if form is invalid
    if (this.createCategory.invalid) {
      return;
    }

    var dat: { [k: string]: any } = {};
    dat.name= this.createCategory.value.categoryName;
    dat.is_active = this.createCategory.value.categoryStatus;
    dat.parent_id= this.createCategory.value.parent_id;
    dat.description = this.createCategory.value.description;

    this.config.post('addTaskCategry', dat).subscribe((data)=>{
      if(data.success=="0"){
        this.toastr.success('Category Already Exist!');
      }
      else{
        this.toastr.success('Category Added Successfully!');
        this.router.navigate(['/admin/task/task-category']);   
      }        
    });

  }

  onEditCategory() {
    this.submittedCreateCategory = true;
    // stop here if form is invalid
    if (this.createCategory.invalid) {
      return;
    }
    var dat: { [k: string]: any } = {};
    dat.id = this.params;
    dat.name= this.createCategory.value.categoryName;
    dat.is_active = this.createCategory.value.categoryStatus;
    dat.parent_id= this.createCategory.value.parent_id;
    dat.description = this.createCategory.value.description;

    this.spinnerService.show();
    this.config.post('editTaskCategry', dat).subscribe((data) => {
      if (data.success == 0) {
        this.toastr.warning('Ops!'+data.message);
      }
      else {
        this.toastr.success('Category Updated Successfully!');
      }
      this.router.navigate(['/admin/task/task-category']);   
      this.spinnerService.hide();
    });

  }

  getParentCategories(){
    this.config.get('FetchTaskCategry/parent').subscribe((data) => {
      this.parentCategories = data;
      if(this.params){
        this.parentCategories.forEach(element => {
          if(this.params == element.id){
            this.parentCategories.splice(this.parentCategories.indexOf(element), 1);  
          }

      });
    }
      
    });
  }
}