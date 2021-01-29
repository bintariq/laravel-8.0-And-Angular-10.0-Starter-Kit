import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-create-or-update-task',
  templateUrl: './create-or-update-task.component.html',
  styleUrls: ['./create-or-update-task.component.scss']
})
export class CreateOrUpdateTaskComponent extends AppComponentBase {

  public createTask: any;
  public taskCategories: any;
  public params: any;
  submittedCreateTask = false;
  dataToEdit = '';
  constructor(injector: Injector, private config: ConfigService) { 
    super(injector);
    this.params = this.activatedRouter.snapshot.paramMap.get("id");
    
    if (this.params) {
      
      this.spinnerService.show();
      this.config.get('get-task-by-id/'+this.params+'').subscribe((data) => {
        
        this.dataToEdit = 'edit';
        console.log(data);

        this.createTask.setValue({
          name: data.data.name,
          category_id: data.data.category_id,
          task_code: data.data.task_code,
          hours: data.data.hours,
          is_active : data.data.is_active,
        });
        this.spinnerService.hide();
      });
    } 

    this.getTaskCategories();
  }

  ngOnInit(): void {

    this.createTask = this.formBuilder.group({
      name: ['', Validators.required],
      category_id:[null, Validators.required],
      task_code: ['', Validators.required],
      is_active: [''],
      hours:['',  Validators.required]
    });

       
  }
  get cc() { return this.createTask.controls; }

  onSubmitTask() {
    if (this.dataToEdit == 'edit') {
      this.onEditTask();
    }
    else {
      this.onCreateTask();
      
    }

  }
  onCreateTask(){
    this.submittedCreateTask = true;
    // stop here if form is invalid
    if (this.createTask.invalid) {
      return;
    }

    var dat: { [k: string]: any } = {};
    dat.name= this.createTask.value.name;
    dat.category_id= this.createTask.value.category_id;
    dat.task_code = this.createTask.value.task_code;
    dat.hours = this.createTask.value.hours;
    dat.is_active = this.createTask.value.is_active;

    this.config.post('task-store', dat).subscribe((data)=>{
      if(data.success=="0"){
        this.toastr.success('Task Already Exist!');
      }
      else{
        this.toastr.success('Task Added Successfully!');
        this.router.navigate(['/admin/task/task']);   
      }        
    });

  }

  onEditTask() {
    this.submittedCreateTask = true;
    // stop here if form is invalid
    if (this.createTask.invalid) {
      return;
    }
    var dat: { [k: string]: any } = {};
    dat.id = this.params;
    dat.name= this.createTask.value.name;
    dat.category_id= this.createTask.value.category_id;
    dat.task_code = this.createTask.value.task_code;
    dat.hours = this.createTask.value.hours;
    dat.is_active = this.createTask.value.is_active;

    this.spinnerService.show();
    this.config.post('task-update', dat).subscribe((data) => {
      if (data.success == 0) {
        this.toastr.warning('Ops!'+data.message);
      }
      else {
        this.toastr.success('Task Updated Successfully!');
      }
      this.router.navigate(['/admin/task/task']);
      this.spinnerService.hide();
    });

  }

  getTaskCategories(){
    this.config.get('ActiveFetchTaskCategry').subscribe((data) => {
      this.taskCategories = data;
    });
  }
}
