import {  NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { AllCoursesComponent } from './modules/course/all-courses/all-courses.component';
import { AddCourseComponent } from './modules/course/add-course/add-course.component';
import { HomeComponent } from './home/home.component';
import { LogOutComponent } from './modules/user/log-out/log-out.component';
import { AutoGuardService } from './modules/user/auto-guard.service';

const APP_ROUTES: Route[] = [
  // {path:"login",component:LoginComponent},
  // {path:"register/:lecturer",component:RegisterComponent},
  // {path:"register",component:RegisterComponent},
  // {path:"logOut",component:LogOutComponent},
  // {path:"allCourses",component:AllCoursesComponent},
  // {path:'addCourse/:id',component:AddCourseComponent},
  // {path:'addCourse',component:AddCourseComponent},
  // {path:"addCourse/:id",canActivate:[AutoGuardService], loadChildren:()=>import("./modules/course/add-course/add-course.component").then(m=>m.AddCourseComponent)},
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"home", pathMatch:"full"} ,
  { path: "user", loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule) },
  { path: "course", loadChildren: () => import("./modules/course/course.module").then(m => m.CourseModule) }
 // {path:"**",title:"pageNotFound 404"}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
