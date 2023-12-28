import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BaseTask, Task} from "../../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http: HttpClient = inject(HttpClient);

  getTasks(page: number){
    return this.http.get(environment.serverUrl + `/tasks?page=${page}&limit=6&showMetadata=true`);
  }

  getTaskById(taskId: string) {
    return this.http.get(environment.serverUrl + `/tasks/${taskId}`)
  }

  getTaskByName(taskName: string) {
    return this.http.get(environment.serverUrl + `/tasks/name/${taskName}`)
  }

  createTask(task: BaseTask) {
    return this.http.post(environment.serverUrl + `/tasks/task`, task);
  }

  updateTask(task: BaseTask) {
    return this.http.post(environment.serverUrl + `/tasks`, task);
  }

  updateTasksSubtasks(task: Task) {
    return this.http.post(environment.serverUrl + `/tasks`, task);
  }

  deleteTaskById(taskId: string) {
    return this.http.delete(environment.serverUrl + `/tasks/${taskId}`);
  }

  deleteTaskByName(taskName: string) {
    return this.http.delete(environment.serverUrl + `/tasks?name=${taskName}`);
  }

}
