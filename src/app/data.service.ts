import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', data);
  }


}
