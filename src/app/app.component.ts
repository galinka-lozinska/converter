import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

interface Currency{
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
  response:any;

  constructor(private http: HttpClient, private curService: CurrencyService) {

  }

  ngOnInit(){
    this.curService.fetchDataCurrency()
    .subscribe((res) => {
      this.listOfCurrencies = res.map((el) => {
        return {
          ccy: el.ccy,
          sale: Number(el.sale)
        }
      });
    });
  }

  
}
