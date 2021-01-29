import { Component, OnInit, Injector, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { AppComponentBase } from 'src/app/app-component-base';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { finalize } from 'rxjs/operators';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.scss']
})
export class ViewQuotationComponent extends AppComponentBase {

  @ViewChild('Materialtable') table: ElementRef;

  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  qoutationDto: QoutationDto = new QoutationDto();
  active = false
  saving = false;
  material_sub_total: any = 0;
  workFroce_sub_total: any = 0;
  additional_sub_total: any = 0;
  pdf:any ;
  constructor(injector: Injector, private config: ConfigService) {
    super(injector);
  }

  ngOnInit(): void {
    this.qoutationDto = new QoutationDto();
  }
 

  EmailQuotation()
  {
    this.toastr.success("This Feature Is Under Development");
  }
  

  show(QuotationId:any) {
    this.config.get('GetQuotation-id/' +QuotationId).pipe(finalize(() => {
    })).subscribe((data) => {
      debugger;
      this.qoutationDto = data.data;
      this.qoutationDto.ClientId = data.data?.client_id;
      this.qoutationDto.SiteId = data.data?.site_id.toString();
      this.qoutationDto.Createdate = data.data?.created_date;
      this.qoutationDto.updated_at = data.data?.updated_at;
      this.qoutationDto.ReferenceNo = data.data?.reference_no;
      this.qoutationDto.EstimatesComplationDate = data.data?.estimated_completed_date;
      this.qoutationDto.ValidityDate = data.data?.quotation_validity_date;
      this.qoutationDto.ShipmentDetail = data.data?.shipment_detail;
      this.qoutationDto.QuoteStatusId = data.data?.quotation_status_id;
      this.qoutationDto.QuotationNote = data.data?.quotation_note;
      this.qoutationDto.ShipmentPrice = data.data?.ShipmentPrice;
      this.qoutationDto.ShipmentCurrencyId = data.data?.shipment_currency_id;
      this.qoutationDto.client_name = data.data?.client_detail[0]?.client_name;

      if (this.qoutationDto.QoutationMaterialList == undefined) {
        this.qoutationDto.QoutationMaterialList = []
      }
      if (this.qoutationDto.Tasks == undefined) {
        this.qoutationDto.Tasks = []
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
          this.material_sub_total+=material.SubTotal;
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
          this.workFroce_sub_total+=w.price*w.alot_time
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
      if (this.qoutationDto.SiteId) {
        this.config.get('get-all-site').pipe(finalize(() => {
        })).subscribe((data) => {
          data.forEach(x => {
            if (Number(this.qoutationDto.SiteId) == x.id) {
              this.qoutationDto.SiteName = x.name
            }
          });
        });
      }
    });

    this.active = true;
    this.modal.show()
  }
  close(): void {
    this.active = false;
    this.modalSave.emit(null);
    this.modal.hide();
  }
  isIfNumber(number)
  {
    if(number)
    {
      return Number(number);
    }
    else{
      return 0;
    }
  }
  Capture() {
    var element:any = document.querySelector("#content2convert");

    
      html2canvas(element).then(canvas => {
        var imgWidth = 208;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        let contentDataURL = canvas.toDataURL('image/png');
        document.body.appendChild(canvas)
       // this.download(contentDataURL,imgWidth, imgHeight);
     
      });
    
   

  }
  download(contentDataURL,imgWidth, imgHeight){
    let pdf = new jspdf('p', 'mm', 'a4');
        
        var position = 2;
        let filename = this.qoutationDto.ReferenceNo;
        pdf.addImage(contentDataURL, 'PNG', position, 10, imgWidth, imgHeight);
        pdf.save(filename);
  }
  generatePDF(action:any) {
    var docDefinition = {
      header: {
        // margin: 18,
        color: '#047886',
        columns: [
          {
            text: 'D Ground',
            width: 100,
          }
        ]
      },
      pageMargins: [0, 15, 0, 0],
      content: [
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Manufacturer', 'Manufacturer#', 'Distributor#', 'Description', 'Currency', "Price/u", "Qty", 'Unit', 'Total'],
              ...this.qoutationDto.QoutationMaterialList.map(p => ([p.ManufactureName, p.ManufactureNo, p.DistributorNo, p.Description, p.CurrencyName, p.price, p.Qty, p.Unit, p.SubTotal])),

            ]
          },
        },

        {
          style: 'tableExample',
          table: {
            widths: [100, 100, '*'],
            body: [
             // [{ text: 'Shipment Detail', colSpan: 3, alignment: 'center', fillColor: '#6b6a6a', color: '#FFFFFF' }, {}, {}],
              [{
                colSpan: 3,
                table: {
                  widths: ['*', '*', 'auto', 'auto'],
                  body: [[
                    { text: 'Detail', style: 'tableHeader' },
                    { text: 'Price', style: 'tableHeader' },
                    { text: 'Currency', style: 'tableHeader' },
                    { text: 'Total', style: 'tableHeader' },
                  ],
                  [{ text: this.qoutationDto.ShipmentDetail }, { text: this.qoutationDto.ShipmentPrice, background: '#C8E6C9' }, { text: this.qoutationDto.ShipmentCurrencyId }, { text: this.qoutationDto.ShipmentPrice }],
                  ]
                }
              }, '', ''],
            ]
          },
          layout: 'noBorders'
        },
        // {
        //   text: 'Task Detail',
        //   fontSize: 12,
        //   alignment: 'center',
        //   color: '#047886',
        // },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Task Code', 'Description', 'Hours Per Task', 'Qty', 'Total Hours'],
              ...this.qoutationDto.Tasks.map(p => ([p.taskCode, p.Description, p.perHoureRate, p.qty, p.subTotal])),

            ]
          },
        },
        {
          table: {
            headerRows: 1,
            widths: ['20.0%', '20.0%', '20.0%', '20.0%', '20.0%'],
            body: [
              ['workFroce',"Hour(s)", 'Time', 'Rate', 'Total', ],
              ...this.qoutationDto.workfroceDetail.map(p => ([p.workforceName,p.houre, p.timeType, p.Price, p.Price*p.houre])),

            ]
          },
        },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
          alignment: 'center'
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },

    };

   if(action=="open")
   {
    pdfMake.createPdf(docDefinition).open();
   }
   if(action=="download")
   {
    pdfMake.createPdf(docDefinition).download();
   }
   if(action=="print")
   {
    pdfMake.createPdf(docDefinition).print();
   }
  }
}


export class QoutationDto {
  id: any;
  ReferenceNo: any;
  Createdate: any;
  updated_at: any;
  ClientId: any;
  SiteId: any;
  SiteName: any;
  RequesterPerson: any;
  RequesterPersonEmail: any;
  RequesterPersonPhone: any;
  DesignerPerson: any;
  DesignerPersonEmail: any;
  DesignerPersonPhone: any;
  project_manager_detail:any;
  projectManagerName: any;
  projectManagerEmail: any;
  projectManagerPhone: any;
  client_name: any;

  QuoteStatusId: any;
  //note
  ValidityDate: any = 30;
  EstimatesComplationDate: any;
  AttachecDcoment: any;
  QuotationNote: any;
  //Shipment

  ShipmentDetail: any = "Fix Shipment";
  ShipmentPrice: any=0;
  ShipmentCurrencyId: any=0;
  ShipmentSubTotal: any;
  //
  Total: any;

  QoutationMaterialList = Array<QoutationMaterialDto>();
  Tasks = Array<Task>();
  additionalChanres = Array<AdditionalChanres>();
  workfroceDetail = Array<WorkFroceDetailDto>();

  constructor() {
    this.QoutationMaterialList = new Array<QoutationMaterialDto>()
    this.Tasks = new Array<Task>()
    this.additionalChanres = new Array<AdditionalChanres>()
    this.workfroceDetail = new Array<WorkFroceDetailDto>()
  }


}
export class QoutationMaterialDto {
  id: any;
  QuoteId: any;
  MaterialId: any;
  MaterialName: any;
  Qty: any;
  price: any;
  MaterialCurrencyId:any
  CurrencyId: any;
  CurrencyName: any;
  VenderId: any;
  VenderName: any;
  ManufactureId:any
  ManufactureName:any
  ManufactureNo:any;
  DistributorNo:any;
  Description:any;
  Unit:any;
  SubTotal: any;
}
export class AdditionalChanres {
  id:any;
  desctiption: any;
  price: any;
  subTotal: any;
}

export class Task {
  id:any
  taskId:any
  taskCode: any
  Description: any
  perHoureRate: any
  qty: any
  subTotal: any;
}
export class WorkFroceDetailDto {
  id:any;
  workforceId: any;
  workforceName: any;
  timeType: any;
  Price: any;
  houre: any;
}
