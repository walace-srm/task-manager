import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getList() {
    //return this.httpClient.get('http://localhost:3001');
    return this.httpClient.get('https://api-manager-task.herokuapp.com');
  }
  save(task) {
    //return this.httpClient.post('http://localhost:3001', task);
    return this.httpClient.post('https://api-manager-task.herokuapp.com', task);
  }
  update(id) {
    //return this.httpClient.put(`http://localhost:3001/${id}`, id);
    return this.httpClient.put(`https://api-manager-task.herokuapp.com/${id}`, id);
  }
  delete(id) {
    //return this.httpClient.delete(`http://localhost:3001/${id}`);
    return this.httpClient.delete(`https://api-manager-task.herokuapp.com/${id}`);
  }
}
