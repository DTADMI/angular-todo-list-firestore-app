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
    return this.http.get(environment.serverUrl + `/tasks?page=${page}&limit=6&showMetadata=true`, {withCredentials: true});
  }

  getTaskById(taskId: string) {
    return this.http.get(environment.serverUrl + `/tasks/${taskId}`, {withCredentials: true});
  }

  getTaskByName(taskName: string) {
    return this.http.get(environment.serverUrl + `/tasks/name/${taskName}`, {withCredentials: true});
  }

  createTask(task: BaseTask) {
    return this.http.post(environment.serverUrl + `/tasks/task`, task, {withCredentials: true});
  }

  updateTask(task: BaseTask) {
    return this.http.post(environment.serverUrl + `/tasks`, task, {withCredentials: true});
  }

  updateTasksSubtasks(task: Task) {
    return this.http.post(environment.serverUrl + `/tasks`, task, {withCredentials: true});
  }

  deleteTaskById(taskId: string) {
    return this.http.delete(environment.serverUrl + `/tasks/${taskId}`, {withCredentials: true});
  }

  deleteTaskByName(taskName: string) {
    return this.http.delete(environment.serverUrl + `/tasks?name=${taskName}`, {withCredentials: true});
  }

}
