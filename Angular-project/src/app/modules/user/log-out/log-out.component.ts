import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {
  constructor(private _userService: UserService, private _router: Router) {
    this._userService.logOut();
    Swal.fire({
      position: "top",
      icon: "success",
      title: "bay bay",
      showConfirmButton: false,
      timer: 800
    });
    this._router.navigate(["home"])
   }
}
