import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  baseUrlApi:string=environment.baseUrlApi;
  constructor(private http:HttpClient) { }

  postLogin(data:{email:string,password:string}):Observable<any>{
    let me=this;
    return me.http.post(`${me.baseUrlApi}/user/system/login`,data);
  }
}
