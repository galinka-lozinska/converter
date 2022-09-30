import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit{

  inputFirst:number;
  inputSecond:number;
  currUSD:number;
  currEUR:number;

  constructor(private curService: CurrencyService) {
  }

  ngOnInit(){
    this.curService.fetchDataCurrency()
    .subscribe((res) => {
      const usd = res.find(e => e.ccy === 'USD');
      const eur = res.find(e => e.ccy === 'EUR');
      this.currEUR = Number(eur.sale);
      this.currUSD = Number(usd.sale);
    });
  }

  getConverterForFirstInput(currentCurrency:string, convertCurrency:string, amount:string) {
    this.inputSecond = this.converter(currentCurrency, convertCurrency, amount);
  }

  getConverterForSecondInput(currentCurrency:string, convertCurrency:string, amount:string) {
    this.inputFirst = this.converter(currentCurrency, convertCurrency, amount);
  }

  private converter(currentCurrency:string, convertCurrency:string, amount:string):number {
    if(!isNaN(Number(amount))) {
      if(isNaN(Number(currentCurrency))) {
        if(currentCurrency === convertCurrency) {
          return Number(amount);
        } else {
          return isNaN(Number(convertCurrency))
            ? Number(amount)
            : +(Number(convertCurrency) * Number(amount)).toFixed(2);
        }
      } else {
        return isNaN(Number(convertCurrency))
          ? +(Number(amount) / Number(currentCurrency)).toFixed(2)
          : +(Number(amount) / Number(currentCurrency) * Number(convertCurrency)).toFixed(2);
      }
    }

    return 0;
  }
}
