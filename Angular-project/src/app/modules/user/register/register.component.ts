import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  u1: User =JSON.parse(sessionStorage.getItem('userData'))||undefined;
  u:User;
  registerForm: FormGroup= new FormGroup({});
  constructor(private _usrService:UserService , private _router: Router, private _act: ActivatedRoute){
    this.registerForm=new FormGroup({
      "userName":new FormControl(sessionStorage.getItem('name'),[Validators.required,Validators.minLength(3)]),
      "password":new FormControl(this.u?.password,[Validators.required,Validators.minLength(3),Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$")]),
      "address":new FormControl("",[Validators.required,Validators.minLength(3)]),
      "email":new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
    })
  }
  register()
  {
    this.u=new User();
    this.u.name=this.registerForm.controls["userName"].value;
    this.u.password=this.registerForm.controls["password"].value;
    this.u.address=this.registerForm.controls["address"].value;
    this.u.email=this.registerForm.controls["email"].value;
    // this._act.paramMap.subscribe(p => {
    //   if (p.has("lecturer")) {
    //     this.u.lecturer=true;
    //     alert("le")
    //   }
    // })
    this._usrService.register(this.u).subscribe({
      next:(res=>{
        if(res==undefined){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: " כבר נרשמת במערכת !",
          });
           this._router.navigate(["login"]);
        }else{
          Swal.fire({
            position: "top",
            title: "hello "+res.name ,
            showConfirmButton: false,
            timer: 800
          });
          sessionStorage.setItem('userData', JSON.stringify(res));
          this._router.navigate(["allCourses"]);
        }
      })})
    
  }

}