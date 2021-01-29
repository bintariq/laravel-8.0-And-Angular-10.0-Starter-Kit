import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  saleData = [
    { name: "Material", value: 105000 },
    { name: "Workforce", value: 55000 },
    { name: "Tasks", value: 15000 },
    { name: "Quotation", value: 150000 },
    { name: "Users", value: 20000 }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
