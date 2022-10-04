import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../app.component';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit{

  convertForm:FormGroup;
  currUSD:number;
  currEUR:number;

  constructor(private curService: CurrencyService) {
  }

  ngOnInit(){
    this.curService.fetchDataCurrency()
    .subscribe((res:Array<Currency>) => {
      const usd = res.find((e:Currency) => e.ccy === 'USD');
      const eur = res.find((e:Currency) => e.ccy === 'EUR');
      this.currEUR = Number(eur.sale);
      this.currUSD = Number(usd.sale);
    });

    this.convertForm = new FormGroup({
      inputFirst: new FormControl('',[Validators.required,
        Validators.pattern(/^[0-9]\d*$/)]),
      inputSecond: new FormControl('',[Validators.required,
        Validators.pattern(/^[0-9]\d*$/)]),
      firstSelect: new FormControl('1'),
      secondSelect: new FormControl('1')
    });

    this.convertForm.get('inputFirst').valueChanges.subscribe((value) => {
      if (this.convertForm.get('inputFirst').valid) {
        this.convertForm.patchValue({
          inputSecond: this.converter(value, this.convertForm.get('firstSelect').value, this.convertForm.get('secondSelect').value),
        },{emitEvent: false});
      }
    });

    this.convertForm.get('inputSecond').valueChanges.subscribe((value) => {
      if (this.convertForm.get('inputSecond').valid) {
        this.convertForm.patchValue({
          inputFirst: this.converter(value, this.convertForm.get('secondSelect').value, this.convertForm.get('firstSelect').value),
        },{emitEvent: false});
      }
    });

    this.convertForm.get('firstSelect').valueChanges.subscribe((value) => {
      this.convertForm.patchValue({
        inputSecond: this.converter(this.convertForm.get('inputFirst').value, value, this.convertForm.get('secondSelect').value),
      },{emitEvent: false});
    });

    this.convertForm.get('secondSelect').valueChanges.subscribe((value) => {
      this.convertForm.patchValue({
        inputFirst: this.converter(this.convertForm.get('inputSecond').value, value, this.convertForm.get('firstSelect').value),
      },{emitEvent: false});
    });
  }

  private converter(value:number, currentCurrency:number, convertCurrency:number):number {
    return +((value / currentCurrency) * convertCurrency).toFixed(2) || null;
  }
}
