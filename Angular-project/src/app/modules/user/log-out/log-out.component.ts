import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {
  constructor(private _userService: UserService, private _router: Router) {
    this._userService.logOut();
    alert("bay bay ")
    this._router.navigate(["home"])
   }
}
