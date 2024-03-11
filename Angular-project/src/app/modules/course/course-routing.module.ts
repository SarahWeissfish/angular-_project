
import {  NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
const COURSE_ROUTES: Route[] = [
  {path:"courseDetails/:id",component:CourseDetailsComponent},
  {path:"allCourses",component:AllCoursesComponent},
  {path:'addCourse/:id',component:AddCourseComponent},
  {path:'addCourse',component:AddCourseComponent},
 // {path:"",redirectTo:"login", pathMatch:"full"} ,
  //{path:"**",title:"pageNotFound 404"}
];

@NgModule({
  imports: [RouterModule.forChild(COURSE_ROUTES)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
