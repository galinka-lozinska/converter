import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './service/currency.service';

export interface Currency{
  ccy:string,
  sale:number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  listOfCurrencies:Array<Currency> = [
    {
      ccy: "UAH",
      sale: 1,
    }
  ];

  errorMessage:boolean = false;

  constructor(private http: HttpClient, private curService: CurrencyService) {

  }

  ngOnInit(){
    this.curService.fetchDataCurrency()
    .subscribe(date => {
      for(let el in date) {
        if (date[el].ccy !== "BTC") {
          this.listOfCurrencies.push({
            ccy: date[el].ccy,
            sale: +Number(date[el].sale).toFixed(2),
          });
        }
      }
    },() => {
      this.errorMessage = true;;
    });
  }
}
