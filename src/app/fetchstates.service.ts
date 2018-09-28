import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchstatesService {

  constructor(private httpclient: HttpClient) { }

  getStates() {
    return this.httpclient.get('/assets/states.json');
  }
}
