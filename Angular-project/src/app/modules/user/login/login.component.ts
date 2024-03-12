
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  lecturer=false
  u: User =JSON.parse(sessionStorage.getItem('userData'))||undefined;
  loginForm: FormGroup = new FormGroup({});
  constructor(private _userService: UserService, private _router: Router , private _act: ActivatedRoute) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "userName": new FormControl("", [Validators.required, Validators.minLength(3)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$")]),
    })
  }
  login() {

    this.u=new User();
    this.u.name = this.loginForm.controls["userName"].value;
    this.u.password = this.loginForm.controls["password"].value;
    this._userService.login(this.u).subscribe(x => {
      if (x != undefined&&x.code>0)
        { sessionStorage.setItem('userData', JSON.stringify(x));
          Swal.fire({
            position: "top",
            title: "hello "+JSON.parse(sessionStorage.getItem('userData')).name ,
            showConfirmButton: false,
            timer: 800
          });
          this._router.navigate(["allCourses"]);
        }
      else if (x == undefined) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "אינך רשום במערכת !",
        });
        sessionStorage.setItem('name',this.u.name );
        this._router.navigate(["register"])
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "הסיסמא שגויה!",
        });
      }
    })

  }

}
