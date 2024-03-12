
import {  NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogOutComponent } from './log-out/log-out.component';
const USER_ROUTES: Route[] = [
  {path:"login",component:LoginComponent},
  // {path:"register/:lecturer",component:RegisterComponent},
  {path:"register",component:RegisterComponent},
  {path:"logOut",component:LogOutComponent},

 // {path:"",redirectTo:"login", pathMatch:"full"} ,
  //{path:"**",title:"pageNotFound 404"}
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
