import { Component } from '@angular/core';
import { Course, Type } from '../course.model';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';

import { Observable, Subject, debounceTime, distinctUntilChanged, filter, from, map, pipe, switchMap } from 'rxjs';
import { Category } from '../categoty.model';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent {
  today = new Date();
  nextWeek = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7);
  courses: Course[];
  courses2: Course[];
  categories: Category[];
  courseName: string = '';
  coursesSelct: Observable<Course> = new Observable();
  private searchTerms = new Subject<string>()
  constructor(private _courseService: CourseService, private _router: Router) {
    _courseService.getCoursesFromServer().subscribe(data => {
      this.courses = data;
      this.courses2 = data;
    })
  }
  ngOnInit(): void {
    this._courseService.getCategoriesFromServer().subscribe(x => {
      this.categories = x;
    })
  }
  showDetails2(s: User) {
    this._router.navigate(["/courseDetails", s.code])
  }
  getCoursesByName(): void {
    this.searchTerms.next(this.courseName);
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => this._courseService.getCoursesFromSrverByNme(this.courseName)),
    ).subscribe(data => this.courses = data);
  }
  changeValue(i: number) {

    this._courseService.getCoursesFromServer().pipe(
      map(data => data.filter(item => {
        if (i == 3 || i == +item.wayLearning) {
          return true;
        }
        return false;
      }))
    ).subscribe(data => {
      this.courses = data;
      this.courses2 = data;
    })
  }
  changeValue2(event: any) {

    const selectedValue: number = event.target.value;
    if (selectedValue == 0)
      this.courses = this.courses2
    else
      this.courses = this.courses2.filter(x =>
        +x.category == +selectedValue)
  }
  w
  isCourseInNextWeek(course: Course): boolean {
    
    console.log(this.nextWeek+"next")
    this.w=new Date(course.date)
    console.log(this.w)
      if (this.w.getDate() <= this.nextWeek.getDate())
      {
        console.log("hi")
        return true
      }   
    return false
  }
}
