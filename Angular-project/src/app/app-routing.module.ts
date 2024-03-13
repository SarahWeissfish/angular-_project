import {  NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const APP_ROUTES: Route[] = [
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"home", pathMatch:"full"} ,
  { path: "user", loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule) },
  { path: "course", loadChildren: () => import("./modules/course/course.module").then(m => m.CourseModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
