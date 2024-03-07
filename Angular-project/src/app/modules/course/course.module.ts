import { NgModule } from "@angular/core";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { CommonModule } from "@angular/common";
import { CourseService } from "./course.service";
import { CourseRoutingModule } from "./course-routing.module";
import { UserService } from "../user/user.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
@NgModule({
   declarations:[CourseDetailsComponent ,AllCoursesComponent ,AddCourseComponent],
   imports:[CommonModule,CourseRoutingModule,FormsModule,ReactiveFormsModule],
   providers:[CourseService,UserService],
   exports:[AllCoursesComponent,AddCourseComponent]
})

export class CourseModule{

}