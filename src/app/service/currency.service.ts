import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  fetchDataCurrency() {
    return this.http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .pipe(map((res) => {
      const listData = [];
      for(const key in res) {
        if (res[key].ccy !== 'BTC') {
          listData.push(res[key]);
        }
        
      }
      return listData;
    }));
  }
}
