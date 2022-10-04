import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Currency } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  fetchDataCurrency(): Observable<Currency> {
    return this.http.get<Currency>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }
}
