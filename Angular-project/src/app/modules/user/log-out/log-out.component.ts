import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {
  u: User = JSON.parse(sessionStorage.getItem('userData')) || undefined;
  constructor(private _userService: UserService, private _router: Router) {
    if (this.u) {
      this._userService.logOut();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "bay bay",
        showConfirmButton: false,
        timer: 800
      });

    }
    this._router.navigate(["home"])
  }

}
