import { Injectable, Injector } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponentBase } from '../app-component-base';

var currentUser = JSON.parse(localStorage.getItem('user'));
  if(currentUser!=null && currentUser.info){

    if(currentUser.info.language_code){
      sessionStorage.languageCode = currentUser.info.language_code;
    }
    else{
      sessionStorage.languageCode = 'en';
    }
    if(currentUser.info.currency_code){
      sessionStorage.currencyCode = currentUser.info.currency_code;
    }
    else{
      sessionStorage.currencyCode = 'USD';
    }
  }
  else{
    sessionStorage.languageCode = 'en';
    sessionStorage.currencyCode = 'USD';

  }



@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AppComponentBase {

  public yourSiteUrl: string = 'http://127.0.0.1:8000';
  public token: string;
  public pageSize: number=25;

  public url: string = this.yourSiteUrl + '/api/';
  public imgUrl: string = this.yourSiteUrl + "/api";
  public languageCode: string = sessionStorage.languageCode;

  public countriesList: any = [];
  public countryId: any;
  public countryCode: any;
  public countryFlag: any;
  public countryName: any;

  constructor(
    injector: Injector,
    public http: HttpClient,
    ) {
    super(injector);
    this.localization.use(this.languageCode);
    var currentUser = JSON.parse(localStorage.getItem('user'));
    if(currentUser)
    {this.token =  currentUser.token;}
    else{
      this.router.navigate(["/accounts/login"])
    }


    this.getCountries().subscribe(res => {
      this.countriesList = res;
      this.countriesList.forEach(element => {

        this.countryCode = element.callingCodes[0];
        this.countryFlag = element.flag;

      });
    });

  }


  changeCountry(event, country) {
    sessionStorage.countryFlag = country.flag;
    sessionStorage.countryCode = country.callingCodes[0];
    this.countryFlag = sessionStorage.countryFlag;
    this.countryCode = sessionStorage.countryCode;
  }

  public upload(req, formData) {
    return this.http.post<any>(this.url + req,  formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  // get Method
  get(req:any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Authorization, Content-Type, Accept",
        "Authorization" : "Bearer " + this.token
      })
    };

    return this.http.get<any>(this.url + req, httpOptions)
    .pipe(
      catchError((err) => {

        if (err.status === 401 || err.status === 403) {
            this.router.navigateByUrl('/login');
        }
        return throwError(err);
      })
    )
  }

  // post Method
  post(req: any, data): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Authorization, Content-Type, Accept",
        "Authorization" : "Bearer " + this.token
      })
    };


    return this.http.post<any>(this.url + req, data, httpOptions)
    .pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigateByUrl('/login');
        }
        return throwError(err);
      })
    );
  }

  // delete Method
  delete(req: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Authorization, Content-Type, Accept",
        "Authorization" : "Bearer " + this.token
      })
    };
    return this.http.delete<any>(this.url + req, httpOptions)
    .pipe(
      catchError((err) => {

        return throwError(err);
      })
    );
  }


  getCountries(): any  {
    let _url: string = 'https://restcountries.eu/rest/v2';

    return this.http.get( _url );
  }
}
