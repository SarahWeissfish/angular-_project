import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../categoty.model';
import { CourseService } from '../course.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  new: boolean;
  private _course: Course;
  public get course(): Course {
    return this._course;
  }
  public set course(c: Course) {
    this._course = c;
    this.courseForm = new FormGroup({
      "name": new FormControl(this.course?.name, [Validators.required]),
      "countLesson": new FormControl(this.course?.countLesson || 0, ),
      "image": new FormControl(this.course?.image, [Validators.minLength(3)]),
      "wayLearning": new FormControl(this.course?.wayLearning),
      "date": new FormControl(this.course?.date, [Validators.required]),
      "category": new FormControl(this.course?.category,),
    })
  }

  courseForm: FormGroup = new FormGroup({});
  categories: Category[];
  constructor(private _usrService: UserService, private _router: Router, private _courseService: CourseService, private _act: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this._act.paramMap.subscribe(p => {
      if (p.has("id") && +p.get("id") > 0) {
        this._courseService.getCourseFromServer(+p.get("id")).subscribe(data => {
          this.course = data;
          this.new = false;
          alert(this.course.code)
        })
      }
      else {
        this.course = new Course();
        this.new = true;
      }
    })

    this._courseService.getCategoriesFromServer().subscribe(x => {
      this.categories = x;
    })
  }
  save() {
    this.fill()
    this.course.codeLecturer = JSON.parse(sessionStorage.getItem('userData')).code;
    this._courseService.saveCourseToServer(this.course).subscribe(x => {
      alert("the course add")
    })
  }
  fill(){
    this.course.name= this.courseForm.controls["name"].value;
    this.course.countLesson= this.courseForm.controls["countLesson"].value;
    this.course.image= this.courseForm.controls["image"].value;
    this.course.wayLearning= this.courseForm.controls["wayLearning"].value;
    this.course.date= this.courseForm.controls["date"].value;
    this.course.category= this.courseForm.controls["category"].value;
  }
  update(){
    this.fill()
    alert(this.course.name+" dsdd")
    this._courseService.updateourseToServer(this.course,this.course.code).subscribe(x => {
      alert("the course update")
    })
  }
  cancle(){
    this._router.navigate(["courseDetails",+this.course.code])
  }
}
