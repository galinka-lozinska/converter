import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe } from '@angular/core';
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
  listOfCurrencies:Array<Currency> = [];

  constructor(private http: HttpClient, private curService: CurrencyService) {

  }

  ngOnInit(){
    this.curService.fetchDataCurrency()
    .subscribe((res:Array<Currency>) => {
      this.listOfCurrencies = res.map((el) => {
        return {
          ccy: el.ccy,
          sale: Number(el.sale)
        }
      });
    });
  }

  
}
