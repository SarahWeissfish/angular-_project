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
  filter1 = 0;
  filter2 = 3;
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
    ).subscribe(data => {
      this.courses = data;
      this.courses2 = data
      this.filter()
    });
  }
  changeValue(i: number) {
    this.filter2=i;
    this.filter()
  }
  changeValue2(event: any) {

    this.filter1 = event.target.value;
    this.filter()
  }
  filter() {
   
    this.courses = this.courses2.filter(c => (this.filter1 == 0 || c.category == +this.filter1)
      && (this.filter2 == 3 || +c.wayLearning == this.filter2) && c.name.includes(this.courseName))
  }
  getCssClass(course: Course) {
    const dateString = course.date;
    const parts = dateString.toString().split('/');
    const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return dateObject <= this.nextWeek ? 'date' : null;
  }
}
