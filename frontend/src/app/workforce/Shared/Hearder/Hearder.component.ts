import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ConfigService } from 'src/app/service/config.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './Hearder.component.html',
  styleUrls: ['./Hearder.component.scss']
})
export class HeaderComponent extends AppComponentBase {
  currentUser = JSON.parse(localStorage.getItem('user'));
  apiUrl = environment.apiUrl;
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
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/accounts/login']);
    // this.authService.logout();
    // this.config.post('logout', {}).subscribe((data) => {
       
      

    // });
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
