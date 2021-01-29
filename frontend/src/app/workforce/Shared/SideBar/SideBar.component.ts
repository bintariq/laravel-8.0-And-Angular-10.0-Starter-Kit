import { Component, Injector, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-sidebar',
  templateUrl: './SideBar.component.html',
  styleUrls: ['./SideBar.component.scss']
})
export class SidebarComponent extends AppComponentBase {
  constructor(injector: Injector) {
    super(injector);
   }
   currentUser = JSON.parse(localStorage.getItem('user'));
  ngOnInit(): void {
    console.log(this.currentUser);
  }

}
