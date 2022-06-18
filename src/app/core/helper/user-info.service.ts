import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface UserInfo {
  "idUser": number | null;
  "name": string | null;
  "lastName": string | null;
  "email": string | null;
  "password": string | null;
  "isActive": number | null;
  "isCreated": string | null;
  "idRole": number | null;
}
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private _userInfo = new BehaviorSubject<UserInfo>({
    "idUser": null,
    "name": null,
    "lastName": null,
    "email": null,
    "password": null,
    "isActive": null,
    "isCreated": null,
    "idRole": null
  });
  private _userInfo$ = this._userInfo.asObservable();
  
  constructor() { }
  getUserInfo() {
    let me=this;
    return me._userInfo$;
  }
  setUserInfo(data: UserInfo) {
    let me = this;
    me._userInfo.next(data);
  }
}
