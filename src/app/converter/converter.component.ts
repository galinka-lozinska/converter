import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit{

  @Input() listDate = [];

  convertForm:FormGroup;

  constructor() {
  }

  ngOnInit(){
    this.convertForm = new FormGroup({
      inputFirst: new FormControl('',[Validators.required,
        Validators.pattern(/^[0-9]\d*(\.\d+)?$/)]),
      inputSecond: new FormControl('',[Validators.required,
        Validators.pattern(/^[0-9]\d*(\.\d+)?$/)]),
      firstSelect: new FormControl('1'),
      secondSelect: new FormControl('1')
    });

    this.convertForm.valueChanges.subscribe(()=>this.onChange);
  }

  onChange(value:number, nameElement:string, changeElement:string, firstSelect:string, secondSelect:string) {
    this.convertForm.patchValue({
      [changeElement] : this.convertForm.get(nameElement).valid
        ? this.converter(value, this.convertForm.get(firstSelect).value, this.convertForm.get(secondSelect).value)
         : null,},{emitEvent:false});
  }

  converter(value:number, currentCurrency:number, convertCurrency:number):number {
    console.log(+((value / currentCurrency) * convertCurrency).toFixed(2) || null);
    
    return +((value / currentCurrency) * convertCurrency).toFixed(2) || null;
  }
}
