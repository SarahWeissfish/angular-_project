
import {  NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
const COURSE_ROUTES: Route[] = [
  {path:"courseDetails/:id",component:CourseDetailsComponent},

 // {path:"",redirectTo:"login", pathMatch:"full"} ,
  //{path:"**",title:"pageNotFound 404"}
];

@NgModule({
  imports: [RouterModule.forChild(COURSE_ROUTES)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
