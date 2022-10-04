import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';
import {CurrencyService} from './service/currency.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
