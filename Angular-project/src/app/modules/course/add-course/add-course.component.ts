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
  sillibos:string[];
  private _course: Course;
  public get course(): Course {
    return this._course;
  }
  public set course(c: Course) {
    this._course = c;
    this.courseForm = new FormGroup({
      "courseName": new FormControl(this.course?.name, [Validators.required]),
      "countLesson": new FormControl(this.course?.countLesson ,),
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
      if (p.has("id") /*&& +p.get("id") > 0*/) {
        this._courseService.getCourseFromServer(+p.get("id")).subscribe(data => {
          this.course = data;
          this.new = false;
          this.sillibos=this.course.sillibos;
          this.sillibos.push("");
        })
      }
      else {
        this.course = new Course();
        this.new = true;
        console.log(this.course)
        this.sillibos=[""]
        this.course.codeLecturer=JSON.parse(sessionStorage.getItem('userData')).code;
        //this.sillibos.push("");
      }
    })

    this._courseService.getCategoriesFromServer().subscribe(x => {
      this.categories = x;
    })
   
    console.log(this.sillibos)
  }
  // save() {
  //   this.fill()
  //   this.course.codeLecturer = JSON.parse(sessionStorage.getItem('userData')).code;
  //   this._courseService.saveCourseToServer(this.course).subscribe(x => {
  //     alert("the course add")
  //   })
  // }
  fillCourse() {
    this.course.name = this.courseForm.controls["courseName"].value;
    this.course.countLesson = this.courseForm.controls["countLesson"].value;
    this.course.image = this.courseForm.controls["image"].value;
    this.course.wayLearning = this.courseForm.controls["wayLearning"].value;
    this.course.date = this.courseForm.controls["date"].value;
    this.course.category = this.courseForm.controls["category"].value;
    // this.sillibos.pop();
    console.log(this.sillibos)
    this.sillibos=this.sillibos
    console.log(this.course.sillibos)
  }
  // update() {
  //   this.fill()
  //   this._courseService.updateourseToServer(this.course, this.course.code).subscribe(x => {
  //     alert("the course update")
  //   })
  // }
  saveOrUpdateCourse(): void {
    this.fillCourse();
    if (this.new) {
      this._courseService.saveCourseToServer(this.course).subscribe(() => {
        alert('הקורס נוסף בהצלחה');
        this._router.navigate(['/allCourses']);
      });
    } else {
      this._courseService.updateCourseToServer(this.course, this.course.code).subscribe(() => {
        alert('הקורס עודכן בהצלחה');
        this._router.navigate(['/allCourses']);
      });
    }
  }
  cancle() {
    this._router.navigate(["courseDetails", +this.course.code])
  }
  deleteCourse(){
    this._courseService.deleteCourseFromServer(this.course.code).subscribe(x => {
      alert("the course deleted")
      this._router.navigate(["allCourses"]);
    })
  }
}
