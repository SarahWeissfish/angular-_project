import { Component } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { Category } from '../categoty.model';
import { Lecturer } from '../../user/lecturer.model';
import { UserService } from '../../user/user.service';
import { Type } from '../course.model';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {
  course: Course;
  category: Category = undefined;
  lecturer: Lecturer = undefined;
  userId: number = 0;
  constructor(private _courseService: CourseService, private _act: ActivatedRoute, private _usrService: UserService, private _router: Router) { }
  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userData'))?.code;
    if (this.userId > 0)
      this._act.paramMap.subscribe(p => {
        if (p.has("id")) {
          this._courseService.getCourseFromServer(+p.get("id")).subscribe(data => {
            this.course = data;
            console.log(this.course);
            if (this.course != null)
              this._courseService.getCategoryFromServer(this.course.category).subscribe(d => { this.category = d })
            this._usrService.getUserFromServer(this.course.codeLecturer).subscribe(d => {
              if (d.lecturer == true)
                this.lecturer = d
              else
                this.lecturer = undefined
            }
            )
          })
        }
      })
    else {
      alert("אינך מחובר ")
      this._router.navigate(["login"])
    }
  }
}
