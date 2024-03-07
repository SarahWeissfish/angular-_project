import { Component } from '@angular/core';
import { Course } from '../course.model';
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
  courses: Course[];
  categories: Category[];
  courseName: string = '';
  coursesSelct: Observable<Course> =new Observable();
  private searchTerms = new Subject<string>()
  constructor(private _courseService: CourseService, private _router: Router) {
    _courseService.getCoursesFromServer().subscribe(data => {
      this.courses = data;
    })
  }
  ngOnInit(): void {
    this._courseService.getCategoriesFromServer().subscribe(x => {
      this.categories = x;
    })
  }
  showDetails2(s: User) {
    this._router.navigate(["courseDetails", s.code])
  }
  getCoursesByName(): void {
    this.searchTerms.next(this.courseName);
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => this._courseService.getCoursesFromSrverByNme(this.courseName)),
    ).subscribe(data => this.courses = data);
  }
  changeValue(){
   
  }
}
