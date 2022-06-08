import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  baseUrlApi: string = environment.baseUrlApi;
  constructor(private http: HttpClient) { }

  postProduct(data: any): Observable<any> {
    let me = this;
    return me.http.post(`${me.baseUrlApi}/product`, data);
  }

}
