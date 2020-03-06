import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  Url = environment;
  constructor(private http: HttpClient) { }

  getAnual() {
    return this.http.get(this.Url.anualRecords);
  }
  getQuaterly() {
    return this.http.get(this.Url.quaterlyRecords);
}
}

