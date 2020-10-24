import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getList() {
    return this.httpClient.get('http://localhost:3001');
  }
  save(task) {
    return this.httpClient.post('http://localhost:3001', task);
  }
  update(id) {
    return this.httpClient.put(`http://localhost:3001/${id}`, id);
  }
  delete(id) {
    return this.httpClient.delete(`http://localhost:3001/${id}`);
  }
}
