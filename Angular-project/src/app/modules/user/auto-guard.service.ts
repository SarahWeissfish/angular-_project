import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { flush } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AutoGuardService implements CanActivate {
 
  constructor(private _router:Router){}
  canActivate(): boolean  {
   
    if(JSON.parse(sessionStorage.getItem('userData'))!=undefined)
    
      return true;
    else{
      this._router.navigate(['/login'])
      return false;  
    }
      
}
}
