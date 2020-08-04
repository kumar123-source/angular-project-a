import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { 

  }

  public getUsers(): Observable<any> {
    const userURL: string = "../../assets/test.json";
    return this.httpClient.get(userURL);
  }
}
