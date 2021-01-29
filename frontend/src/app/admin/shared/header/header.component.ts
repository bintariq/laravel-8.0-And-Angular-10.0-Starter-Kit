import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { AuthenticationService } from '../../../service/authentication.service';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AppComponentBase {
  currentUser = JSON.parse(localStorage.getItem('user'));
 
  currentLang = sessionStorage.languageCode;
  currentLangImage = '';
  allLangs = [];
  public token: string;
  constructor(public config: ConfigService, injector: Injector, private authService: AuthenticationService,router:Router) {
    super(injector);
   }

  ngOnInit() {
    this.config.get('fetchLanguages').subscribe((data) => {
        this.allLangs = data;
        this.allLangs.forEach(element => {
          if(this.currentLang == element.short_code){
              this.currentLangImage = element.image;
          }
        });
    });

    if(this.currentUser)
    {this.token =  this.currentUser.token;}

  }
  logout(){
    // this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/accounts/login']);
    
    this.config.post('logout', {}).subscribe((data) => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/accounts/login']);

    });
  }
  
  updateLanguage(lang){
    sessionStorage.languageCode = lang; 
    this.currentLang = sessionStorage.languageCode;
    this.localization.use(lang);
    this.allLangs.forEach(element => {
      if(this.currentLang == element.short_code){
          this.currentLangImage = element.image;
      }
    });
  }

}
