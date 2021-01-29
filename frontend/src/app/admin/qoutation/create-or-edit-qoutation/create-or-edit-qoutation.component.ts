import { Component, OnInit, Injector, ViewChild, ElementRef, DebugElement } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ConfigService } from 'src/app/service/config.service';
import { AddTaskDetailInQoutationComponent } from '../AddTaskDetailInQoutation/AddTaskDetailInQoutation.component';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-create-or-edit-qoutation',
  templateUrl: './create-or-edit-qoutation.component.html',
  styleUrls: ['./create-or-edit-qoutation.component.scss']
})
export class CreateOrEditQoutationComponent extends AppComponentBase {

  @ViewChild('createOrEditModalTask', { static: true }) createOrEditModalTask: AddTaskDetailInQoutationComponent;
  @ViewChild('Materialtable') table: ElementRef;
 // @ViewChild('viewQuotaation', { static: true }) viewQuotaation: ViewQuotationComponent;

  active = false
  saving = false;
  savingDraft = false;
  createOrEditform: FormGroup;
  submitted = false;
  qoutationId: any;
  siteList: any = [];
  clientList: any = [];
  materialList: any = [];
  taskList: any = [];
  quoStatusList: any = [];
  AllworkFroce: any = [];
  AllCourency: any = [];
  AllProjectManager: any = [];
  material: any;
  task: any;
  workFroce: any;

  material_sub_total: any = 0;
  task_sub_total: any = 0;
  workFroce_sub_total: any = 0;
  workFroce_hour_total: any = 0;
  additional_sub_total: any = 0;
  IsGenerated: any = 0;
  IsDraft: any = 0;
  params: any;
  fileName:any=null;
  countryData: any[] = ['India', 'US', 'UK'];  
  qoutationDto: QoutationDto = new QoutationDto();
  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
  }

  ngOnInit(): void {
    this.qoutationDto = new QoutationDto();
    this.getClient();
    this.getSite();
    this.getMaterile();
    this.getQouteStatus();
    this.getTask();
    this.getWorkForce();
    this.getCurrency();
    this.getProjectManager();
    this.params = this.activatedRouter.snapshot.queryParams['id']
    if (this.params) {
      this.config.get('GetQuotation-id/' + this.params).pipe(finalize(() => {
      })).subscribe((data) => {
        this.IsDraft=data.data.IsDraft;
        this.IsGenerated=data.data.IsGenerated;
        this.qoutationDto = data.data;
        this.qoutationDto.ClientId = data.data?.client_id;
        this.qoutationDto.SiteId = data.data?.site_id==undefined?undefined:data.data?.site_id.toString();
        this.qoutationDto.Createdate = data.data?.created_date;
        this.qoutationDto.ReferenceNo = data.data?.reference_no;
        this.qoutationDto.EstimatesComplationDate = data.data?.estimated_completed_date;
        this.qoutationDto.ValidityDate = data.data?.quotation_validity_date;
        this.qoutationDto.ShipmentDetail = data.data?.shipment_detail;
        this.qoutationDto.QuoteStatusId = data.data?.quotation_status_id;
        this.qoutationDto.QuotationNote = data.data?.quotation_note;
        this.qoutationDto.ShipmentPrice = data.data?.ShipmentPrice;
        this.qoutationDto.ShipmentCurrencyId = data.data?.shipment_currency_id;
        this.qoutationDto.ProjectmanagerId = data.data?.projectmanager_id;
        //this.qoutationDto.FileAttach=data.data?.attachment
        //this.fileName=data.data?.attachment
        if (this.qoutationDto.QoutationMaterialList == undefined) {
          this.qoutationDto.QoutationMaterialList = []
        }
        if (this.qoutationDto.Tasks == undefined) {
          this.qoutationDto.Tasks = []
        }
        if (this.qoutationDto.attachments == undefined) {
          this.qoutationDto.attachments = []
        }
        if (this.qoutationDto.workfroceDetail == undefined) {
          this.qoutationDto.workfroceDetail = []
        }
        if (this.qoutationDto.additionalChanres == undefined) {
          this.qoutationDto.additionalChanres = []
        }
        if (data.data.qoutation_material_list) {
          data.data.qoutation_material_list.forEach(x => {
            const material = new QoutationMaterialDto()
            material.id = x?.id
            material.MaterialId = x?.material_id;
            material.MaterialName = x?.material_name;
            material.VenderId = x?.vender_id;
            material.VenderName = x?.vender_name;
            material.price = x?.price;
            material.CurrencyId = x?.currency_id;
            material.CurrencyName = x?.currency_name;
            material.Unit = x?.Unit;
            material.Qty = x?.qty;
            material.SubTotal = x?.sub_total
            material.DistributorNo = x?.distributor_no;
            material.ManufactureName = x?.manufacture_name;
            material.ManufactureNo = x?.manufacture_no;
            material.ManufactureId = x?.manufacture_id;
            material.Description = x?.Description;
            this.qoutationDto.QoutationMaterialList.push(material)
            this.material_sub_total += material.SubTotal;
          });
        }
        if (data.data.tasks) {
          data.data.tasks.forEach(t => {
            const task = new Task();
            task.id = t.id;
            task.taskId = t.task_id;
            task.taskCode = t.task_code;
            task.qty = t.qty;
            task.Description = t.description;
            task.subTotal = t.sub_total;
            task.perHoureRate = t.per_houre_rate;
            this.qoutationDto.Tasks.push(task);
          });
          this.qoutationDto.Tasks.forEach(x=>{
          this.task_sub_total+=x.subTotal;  
          })
        }
        if (data.data.workfroce_detail) {
          data.data.workfroce_detail.forEach(w => {
            const workForce = new WorkFroceDetailDto();
            workForce.id = w.id;
            workForce.workforceId = w.workforce_id;
            workForce.workforceName = w.workforce_name;
            workForce.timeType = w.time_type;
            workForce.Price = w.price;
            workForce.houre = w.alot_time;
            this.qoutationDto.workfroceDetail.push(workForce);
            this.workFroce_sub_total += w.price * w.alot_time
            this.workFroce_hour_total+=w.alot_time;
          });
        }


        if (data.data.additional_chanres) {
          data.data.additional_chanres.forEach(a => {
            const addCharges = new AdditionalChanres();
            addCharges.id = a.id
            addCharges.price = a.price
            addCharges.subTotal = a.price
            addCharges.desctiption = a.description
            this.qoutationDto.additionalChanres.push(addCharges);
            this.additional_sub_total += a.price
          });
        }

        if (data.data.quotation_attachments) {
          data.data.quotation_attachments.forEach(t => {
            const attachment = new Attachments();
            attachment.id = t.id
            attachment.file_attach = t.attachment
            attachment.description = t.description
            this.qoutationDto.attachments.push(attachment);
          });
        }
      });
    }
  }
  checkStatus(status_code)
  {
    if(this.IsGenerated==1 && (status_code=='cancel'|| status_code=='approved' || status_code=='pending'))
    {
      return false;
    }
    else{
      return true;
    }
    
  }
  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
      this.gettable();
    });
  }
  gettable() {
    var generateData = function (amount) {
      var result = [];
      var data =
      {
        id: "0",
        coin: "100",
        game_group: "GameGroup",
        game_name: "XPTO2",
        game_version: "25",
        machine: "20485861",
        vlt: "0"
      };
      for (var i = 0; i < amount; i += 1) {
        data.id = (i + 1).toString();
        result.push(Object.assign({}, data));
      }
      return result;
    };

    function createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          'id': keys[i],
          'name': keys[i],
          'prompt': keys[i],
          'width': 65,
          'align': 'center',
          'padding': 0
        });
      }
      return result;
    }



    var headers = createHeaders(["id", "coin", "game_group", "game_name", "game_version", "machine", "vlt"]);
    var pdf = new jspdf('p', 'mm', 'a4');
    //var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
    pdf.table(1, 1, generateData(100), headers, { autoSize: true });
    pdf.save('table.pdf');
  }

  // fireEvent() {
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, 'SheetJS.xlsx');

  // }git 
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      let file = <File>event.target.files[0];
      let url = "fileUpload";
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.config.post(url, formData).pipe(finalize(() => { this.saving = false })).subscribe((data) => {
        this.qoutationDto.FileAttach = data;
        this.toastr.success('file Uploaded Successfully!');
      });
    }
  }
  OnAttachments(event, index) {
    if (event.target.files.length > 0) {
      let file = <File>event.target.files[0];
      let url = "fileUpload";
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.config.post(url, formData).pipe(finalize(() => { this.saving = false })).subscribe((data) => {
        this.qoutationDto.attachments[index].file_attach=data;
        this.toastr.success('file Uploaded Successfully!');
      });
    }
  }
  isIfNumber(number) {
    if (number) {
      return Number(number);
    }
    else {
      return 0;
    }
  }
  getClient() {
    this.config.get('Activeget-all-client').pipe(finalize(() => {
    })).subscribe((data) => {
      this.clientList = data
    });
  }

  getSite() {
    this.config.get('Activeget-all-site').pipe(finalize(() => {
    })).subscribe((data) => {
      this.siteList = data;
    });
  }


  getQouteStatus() {
    this.config.get('FetchQuotationStatus').pipe(finalize(() => {
    })).subscribe((data) => {
      this.quoStatusList = data;
    });
  }
  getTask() {
    this.config.get('Activeget-all-task').pipe(finalize(() => {
    })).subscribe((data) => {
      data.forEach(x => {
        x.name = x.categoryName+ ' >> ' +x.name + ' (' + x.task_code + ')';
      });
      this.taskList = data;
    });
  }
  getCurrency() {
    this.config.get('Activefetchcurrency').pipe(finalize(() => {
    })).subscribe((data) => {
      this.AllCourency = data;
    });
  }

  getProjectManager() {
    this.config.get('ActiveProjectManager').pipe(finalize(() => {
    })).subscribe((data) => {
      this.AllProjectManager = data;
    });
  }

  getMaterile() {
    this.config.get('ActiveFetchMaterial').pipe(finalize(() => {
    })).subscribe((data) => {
      this.materialList = data;
      data.forEach(x => {
        x.name = x.category_name+ ' >> ' +x.name + ' (' + x.manufacturer_code + ')' + ' (' + x.reference_no_vender + ')';
      });
    });
  }
  getWorkForce() {
    this.config.get('ActiveFetchWorkForceCategory').pipe(finalize(() => {
    })).subscribe((data) => {
      this.AllworkFroce = data;

      data.forEach(x => {
        x.name = x.workforceDeciplineName+ ' >> ' +x.name;
      });

    });
  }

  close(): void {
    this.router.navigate(['/admin/qoutation']);
  }
  saveAsDraft() {
    this.qoutationDto.FileAttach
    var dat: { [k: string]: any } = {};
    dat.data = this.qoutationDto;
    dat.id = this.params;
    let url = "quotationDraft";
    this.savingDraft=true;
    this.config.post(url, dat).pipe(finalize(() => { this.savingDraft = false })).subscribe((data) => {
      this.toastr.success('Quotation Added Successfully As Draft');
      this.router.navigate(['/admin/qoutation']);
    });
  }
  save() {
    var sum = 0;
    this.qoutationDto.workfroceDetail.forEach(x => {
      sum += x.houre == undefined ? 0 : x.houre;
    })
    var taskHoure = 0
    this.qoutationDto.Tasks.forEach(x => {
      taskHoure += x.perHoureRate * x.qty;
    });
    if (Number(sum.toFixed(2)) != Number(taskHoure.toFixed(2))) {
      this.toastr.error('Please Enter Correct Hour');
      return;
    }
   console.log(this.IsGenerated);
    var dat: { [k: string]: any } = {};
    dat.data = this.qoutationDto;
    dat.id = this.params;
    dat.userId = 1;
    var url = undefined;
    if (this.params && this.IsGenerated == 1 ) {
      url = "UpdateQuotation-id";
    }else {
      url = "quotationStore";
    }
    this.saving = true
    this.config.post(url, dat).pipe(finalize(() => { this.saving = false })).subscribe((data) => {
      this.toastr.success('Quotation Added Successfully!');
      debugger;
      if(this.qoutationDto.QuoteStatusId=='4')
      {
        //this.ViewQuotation(this.qoutationDto.id);
        //let baseUrl = window.location.href.replace(router.url, '');
        var link ='view-quotation?id='+this.qoutationDto.id;
        this.router.navigate([]).then(result => {  window.open(link, '_blank'); });
      }
      
        this.router.navigate(['/admin/qoutation']);
      
    });
  }
  ViewQuotation(QuotionId)
  {
      this.createOrEditModalTask.show(QuotionId)
  }
  ModalChangesEvent(event)
  {
    this.router.navigate(['/admin/qoutation']);
  }

  AddMateial() {
    const material = new QoutationMaterialDto()
    material.MaterialId = this.material.id;
    material.MaterialName = this.material?.name;
    material.VenderId = this.material?.venderId;
    material.VenderName = this.material?.venderName;
    material.price = this.material?.unit_price;
    material.MaterialCurrencyId = this.material?.currency_id;
    material.CurrencyName = this.material?.currency_title;
    material.Unit = this.material?.unit_name;
    material.DistributorNo = this.material?.reference_no_vender;
    material.ManufactureName = this.material?.ManufacturerName;
    material.ManufactureNo = this.material?.manufacturer_code;
    material.ManufactureId = this.material?.manufacturer_id;
    material.Description = this.material?.name;
    material.CurrencyId=this.material?.currency_id;

    this.qoutationDto.QoutationMaterialList.push(material)
    this.material = undefined;
  }

  removeMaterial(index) {
    this.qoutationDto.QoutationMaterialList.splice(index, 1);
    this.material_sub_total = 0;
    this.qoutationDto.QoutationMaterialList.forEach(x => {
      this.material_sub_total += x.SubTotal;
    });
  }

  addTask() {
    const task = new Task()
    task.taskId = this.task.id;
    task.taskCode = this.task.task_code;
    task.Description = this.task.name;
    task.perHoureRate = this.task.hours;
    task.qty = this.task.qty;
    this.qoutationDto.Tasks.push(task)
    this.task = undefined;
  }
  addAttenment()
  {
    this.qoutationDto.attachments.push(new Attachments())
  }
  RemoveAttenment(index)
  {
    this.qoutationDto.attachments.splice(index,1);
  }
  addWorkForce() {
    const workForce = new WorkFroceDetailDto();
    workForce.workforceName = this.workFroce?.name
    workForce.workforceId = this.workFroce?.id
    workForce.Price = 0
    workForce.houre = 0
    this.qoutationDto.workfroceDetail.push(workForce)
    this.workFroce = undefined;
  }
  removeWorkForce(index) {
    this.qoutationDto.workfroceDetail.splice(index, 1);
    this.workFroce_sub_total = 0;
    this.workFroce_hour_total = 0;
    this.qoutationDto.workfroceDetail.forEach(x => {
      this.workFroce_sub_total += x.Price * x.houre;
      this.workFroce_hour_total+=x.houre;
    });
  }
  getPrice(index) {
    var workforceDetail = this.AllworkFroce.filter(x => x.id == this.qoutationDto.workfroceDetail[index].workforceId);
    var price = workforceDetail[0][this.qoutationDto.workfroceDetail[index].timeType]
    this.qoutationDto.workfroceDetail[index].Price = price == undefined ? 0 : price
    this.workFroce_sub_total = 0;
    
    this.qoutationDto.workfroceDetail.forEach(x => {
      this.workFroce_sub_total += x.Price * x.houre
    });
  }
  checkifGreater(index) {
    var sum = 0;
    this.qoutationDto.workfroceDetail.forEach(x => {
      sum += x.houre == undefined ? 0 : Number(x.houre);
    })
    var taskHoure = 0
    this.qoutationDto.Tasks.forEach(x => {
      taskHoure += x.perHoureRate * x.qty
    });
    if (Number(sum.toFixed(2)) > Number(taskHoure.toFixed(2))) {
      this.toastr.error('Please Enter Correct Hour');
      this.qoutationDto.workfroceDetail[index].houre = 0;
      return;
    }
    this.workFroce_hour_total = 0;
    //this.qoutationDto.workfroceDetail[index].houre =parseFloat(this.qoutationDto.workfroceDetail[index].houre==undefined?0:this.qoutationDto.workfroceDetail[index].houre.toFixed(2));
    this.qoutationDto.workfroceDetail.forEach(x => {
      this.workFroce_hour_total+= x.houre == undefined ? 0 : Number(x.houre);
    });
  }
  removeTask(index) {
    this.qoutationDto.Tasks.splice(index, 1);
    this.task_sub_total=0;
    this.qoutationDto.Tasks.forEach(x=>{
      this.task_sub_total+=x.subTotal
   });
  }

  getSubTotalMateial(index) {
    //ugger;
    this.qoutationDto.QoutationMaterialList[index].SubTotal = this.qoutationDto.QoutationMaterialList[index].Qty == undefined ? 0 : this.qoutationDto.QoutationMaterialList[index].Qty * this.qoutationDto.QoutationMaterialList[index].price;
    this.material_sub_total = 0;
    this.qoutationDto.QoutationMaterialList.forEach(x => {
      this.material_sub_total += x.SubTotal;
    });

  }
  getSubTotalTask(index) {
    this.qoutationDto.Tasks[index].subTotal = this.qoutationDto.Tasks[index].qty == undefined ? 0 : this.qoutationDto.Tasks[index].qty * this.qoutationDto.Tasks[index].perHoureRate;
   this.task_sub_total=0;
   this.qoutationDto.Tasks.forEach(x=>{
      this.task_sub_total+=x.subTotal
   });
  }

  AddadditionalCharges() {
    this.qoutationDto.additionalChanres.push(new AdditionalChanres());
  }
  removeadditionalChanres(index) {
    this.qoutationDto.additionalChanres.splice(index, 1);
    this.additional_sub_total = 0;
    this.qoutationDto.additionalChanres.forEach(x => {
      this.additional_sub_total += x.price == undefined ? 0 : x.price;
    });
  }
  ChnageAdditionCharges(index) {
    this.additional_sub_total = 0;
    this.qoutationDto.additionalChanres.forEach(x => {
      this.additional_sub_total += x.price == undefined ? 0 : Number(x.price);
    });
  }
  reset()
  {
    this.task_sub_total=0;
    this.material_sub_total=0;
    this.additional_sub_total=0;
    this.workFroce_sub_total=0;
    this.qoutationDto.ShipmentPrice=0;
    this.qoutationDto.Tasks=null;
    this.qoutationDto.Tasks=[];
    this.qoutationDto.workfroceDetail=null;
    this.qoutationDto.workfroceDetail=[];
    this.qoutationDto.QoutationMaterialList=null;
    this.qoutationDto.QoutationMaterialList=[];
    this.qoutationDto.additionalChanres=null;
    this.qoutationDto.additionalChanres=[];
  }

}

export class QoutationDto {
  id: any;
  ReferenceNo: any;
  Createdate: any;
  ClientId: any;
  SiteId: any;
  RequesterPerson: any;
  RequesterPersonEmail: any;
  RequesterPersonPhone: any;
  ProjectmanagerId: any;
  // DesignerPerson: any;
  // DesignerPersonEmail: any;
  // DesignerPersonPhone: any;
  QuoteStatusId: any = 1;
  //note
  ValidityDate: any = 30;
  EstimatesComplationDate: any;
  QuotationNote: any;
  currency_id: any=1;
  //Shipment

  ShipmentDetail: any = "Fix Shipment";
  ShipmentPrice: any = 0;
  ShipmentCurrencyId: any =undefined;
  ShipmentSubTotal: any;
  //
  FileAttach: any;
  Total: any;

  QoutationMaterialList = Array<QoutationMaterialDto>();
  Tasks = Array<Task>();
  additionalChanres = Array<AdditionalChanres>();
  workfroceDetail = Array<WorkFroceDetailDto>();
  attachments = Array<Attachments>();

  constructor() {
    this.QoutationMaterialList = new Array<QoutationMaterialDto>()
    this.Tasks = new Array<Task>()
    this.additionalChanres = new Array<AdditionalChanres>()
    this.workfroceDetail = new Array<WorkFroceDetailDto>()
    this.attachments = new Array<Attachments>()
  }


}
export class QoutationMaterialDto {
  id: any;
  QuoteId: any;
  MaterialId: any;
  MaterialName: any;
  Qty: any;
  price: any;
  MaterialCurrencyId: any
  CurrencyId: any;
  CurrencyName: any;
  VenderId: any;
  VenderName: any;
  ManufactureId: any
  ManufactureName: any
  ManufactureNo: any;
  DistributorNo: any;
  Description: any;
  Unit: any;
  SubTotal: any;
}
export class AdditionalChanres {
  id: any;
  desctiption: any;
  price: any;
  subTotal: any;
}

export class Task {
  id: any
  taskId: any
  taskCode: any
  Description: any
  perHoureRate: any
  qty: any
  subTotal: any;
  //taskDetailDto: Array<TaskDetailDto>;
  // constructor() {
  // this.taskDetailDto = new Array<TaskDetailDto>();
  //}

}
export class WorkFroceDetailDto {
  id: any;
  workforceId: any;
  workforceName: any;
  timeType: any;
  Price: any;
  houre: any;
}
export class Attachments {
  id:any
  file_attach: any;
  description: any;
 
}
