import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Category } from '../categoty.model';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  user = JSON.parse(sessionStorage.getItem('userData'))?.lecturer || false
  new: boolean;
  sillibosArray;
  controls;
  private _course: Course;
  public get course(): Course {
    return this._course;
  }
  public set course(c: Course) {
    this._course = c;
    this.courseForm = new FormGroup({
      "courseName": new FormControl(this.course?.name, [Validators.required]),
      "countLesson": new FormControl(this.course?.countLesson, [Validators.required]),
      "image": new FormControl(this.course?.image, [Validators.minLength(3)]),
      "wayLearning": new FormControl(this.course?.wayLearning, [Validators.required]),
      "date": new FormControl(this.course?.date, [Validators.required]),
      "category": new FormControl(this.course?.category,),
      "sillibos": this._formBuilder.array([])
    })
    this.course.sillibos.forEach(sillibo => {
      (this.courseForm.get('sillibos') as FormArray).push(new FormControl(sillibo));
    });
    this.addSillibo();
    this.sillibosArray = this.courseForm.get('sillibos') as FormArray;
    this.controls = this.sillibosArray.controls;
  }
  courseForm: FormGroup = new FormGroup({});
  categories: Category[];
  constructor(private _router: Router, private _courseService: CourseService, private _act: ActivatedRoute, private _formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this._act.paramMap.subscribe(p => {
      if (p.has("id")) {
        this._courseService.getCourseFromServer(+p.get("id")).subscribe(data => {
          this.course = data;
          this.new = false;})
      }
      else {
        this.course = new Course();
        this.new = true;
        this.course.codeLecturer = JSON.parse(sessionStorage.getItem('userData'))?.code;
      }
    })
    this._courseService.getCategoriesFromServer().subscribe(x => {
      this.categories = x;
    })
  }
  getSilliboControl(index: number) {

    return (this.courseForm.get('sillibos') as FormArray).controls[index] as FormControl;
  }
  addSillibo() {
    (this.courseForm.get('sillibos') as FormArray).push(new FormControl());
  }
  removeSillibo(index: number) {
    alert("remover " + index)
    const sillibosArray = this.courseForm.get('sillibos') as FormArray;
    sillibosArray.removeAt(index);
  }
  onSilliboChange(index: number, value: any) {
    const sillibosArray = this.courseForm.get('sillibos') as FormArray;
    const lastIndex = sillibosArray.length - 1;

    if (value.target.value !== '' && index === lastIndex) {
      this.addSillibo();
    } else if (value.target.value === '' && index !== lastIndex) {
      sillibosArray.removeAt(index);
    }
  }
  fillCourse() {
    this.course.name = this.courseForm.controls["courseName"].value;
    this.course.countLesson = this.courseForm.controls["countLesson"].value;
    this.course.image = this.courseForm.controls["image"].value;
    this.course.wayLearning = this.courseForm.controls["wayLearning"].value;
    this.course.date = this.courseForm.controls["date"].value;
    this.course.category = this.courseForm.controls["category"].value;
    const sillibosArray = this.courseForm.get('sillibos') as FormArray;
    this.course.sillibos = sillibosArray.getRawValue();
    this.course.sillibos.pop()
  }
  saveOrUpdateCourse(): void {
    this.fillCourse();
    if (this.new) {
      this._courseService.saveCourseToServer(this.course).subscribe(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "הקורס נוסף בהצלחה'" ,
          showConfirmButton: false,
          timer: 800
        });
        this._router.navigate(['/allCourses']);
      });
    } else {
      this._courseService.updateCourseToServer(this.course, this.course.code).subscribe(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "הקורס עודכן בהצלחה'" ,
          showConfirmButton: false,
          timer: 800
        });
        this._router.navigate(['/allCourses']);
      });
    }
  }
  cancle() {
    if (!this.new)
      this._router.navigate(["courseDetails", +this.course.code])
    else
      this._router.navigate(["allCourses"])
  }
  deleteCourse() {
    this._courseService.deleteCourseFromServer(this.course.code).subscribe(x => {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "הקורס נמחק בהצלחה'",
        showConfirmButton: false,
        timer: 800
      });
      this._router.navigate(["allCourses"]);
    })
  }
}
