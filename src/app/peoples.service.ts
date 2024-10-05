import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { People } from './People';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type' : 'application;json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {

  url = 'https://localhost:5151/api/peoples';


  constructor(private http: HttpClient) { }

  GetAll() : Observable<People[]>{
    return this.http.get<People[]>(this.url);
  }

  GetById(peopleId: number) : Observable<People>{
    const apiUrl = `${this.url}/${peopleId}`;

    return this.http.get<People>(apiUrl);
  }

  SavePeple(people: People) : Observable<any>{
    return this.http.post<People>(this.url, people, httpOptions);
  }

  DeletePeople(peopleId: number) : Observable<any>{
    const apiUrl = `${this.url}/${peopleId}`;

    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
