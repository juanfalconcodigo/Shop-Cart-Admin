import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserInfoService } from '../helper/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  helper!: JwtHelperService;
  constructor(private router: Router,private _userInfoService:UserInfoService) {
    let me = this;
    me.helper = new JwtHelperService();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let me = this;
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      me.router.navigate(['/login']);
      return false;
    }
    try {
      const data = me.helper.decodeToken(token);
      const isExpired = me.helper.isTokenExpired(token);
      if (isExpired) {
        localStorage.removeItem('TOKEN');
        me.router.navigate(['/login']);
        return false;
      }
      me._userInfoService.setUserInfo(data.user);
      return true;
    } catch (error) {
      console.log('[ERROR]', error);
      localStorage.removeItem('TOKEN');
      me.router.navigate(['/login']);
      return false;
    }
  }

}
