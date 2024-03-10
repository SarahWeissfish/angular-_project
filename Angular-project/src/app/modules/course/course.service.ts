import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from './categoty.model';

@Injectable()
export class CourseService {
    constructor(private _http:HttpClient){}
    getCoursesFromServer():Observable<Course[]>{
        return this._http.get<Course[]>("/api/Courses") 
     }
    getCoursesFromSrverByNme(name:string):Observable<Course[]>{
        if (name == '')
            return this.getCoursesFromServer()
        return this._http.get<Course[]>("api/Courses/name=" + name)
    }
    getCourseFromServer( id:number):Observable<Course>{
        return this._http.get<Course>(`/api/Courses/${id}`) 
    }
    getCategoryFromServer( id:number):Observable<Category>{
        return this._http.get<Category>(`/api/Category/${id}`) 
    }
    getCategoriesFromServer( ):Observable<Category[]>{
        return this._http.get<Category[]>(`/api/Category`) 
    }
    saveCourseToServer(c:Course):Observable<Course>{
        console.log(c);
        return this._http.post<Course>(`/api/Courses`,c) 
    }
    updateCourseToServer(c:Course,id:number):Observable<Course>{
        return this._http.put<Course>(`/api/Courses/${id}`,c) 
    }
    deleteCourseFromServer(id:number):Observable<Course>{
        return this._http.delete<Course>(`/api/Courses/${id}`) 
    }

}