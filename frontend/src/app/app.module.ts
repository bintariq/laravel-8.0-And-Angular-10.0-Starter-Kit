import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { ApplicationPipesModule } from './customPipes/customPipe.module';

import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CountryModule } from './country.module';
import { CstateModule } from './cstate.module';
import { CityModule } from './city.module';
import { ZoneModule } from './zone.module';
// import { AuthGuard } from './_guards/auth.guard';
// import { NotAuthGuard } from './_guards/not.auth.guard';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpLoaderFactory, SharedModule } from './SharedModule.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleGuard } from './service/role-guard.service';
import { quotationViewComponent } from './quotationView/quotationView.component';
@NgModule({
  declarations: [
    AppComponent,
    quotationViewComponent
  ],
  imports: [
    CountryModule,
    ApplicationPipesModule,
    CstateModule,
    CityModule,
    ZoneModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
    
   
  ],
  providers: [RoleGuard,{provide: LOCALE_ID, useValue: 'en-US' }],
  // exports: [CurrencySymbolPipe],

  bootstrap: [AppComponent]
})
export class AppModule { }
