import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../_models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;
constructor(private httpClient: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.httpClient.get<User[]>(this.baseUrl + 'users');
}

getUser(id: number): Observable<User>{
  return this.httpClient.get<User>(this.baseUrl + 'users/' + id);
}

}
