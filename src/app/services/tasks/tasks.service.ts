import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { Task, TaskResult } from "../../interfaces/task";
import {Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http: HttpClient = inject(HttpClient);

  getTasks(page: number){
    return this.http.get<TaskResult>(environment.serverUrl + `/tasks?page=${page}&limit=6&showMetadata=true`, {withCredentials: true}).pipe(
      retry(2)
    );
  }

  getTaskById(taskId: string) {
    return this.http.get<Task>(environment.serverUrl + `/tasks/${taskId}`, {withCredentials: true});
  }

  getTaskByName(taskName: string) {
    return this.http.get<Task>(environment.serverUrl + `/tasks/name/${taskName}`, {withCredentials: true});
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(environment.serverUrl + `/tasks/task`, task, {withCredentials: true});
  }

  updateTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(environment.serverUrl + `/tasks`, task, {withCredentials: true});
  }

  updateTasksSubtasks(task: Partial<Task>) {
    return this.http.post<Task>(environment.serverUrl + `/tasks`, task, {withCredentials: true});
  }

  deleteTaskById(taskId: string) {
    return this.http.delete(environment.serverUrl + `/tasks/${taskId}`, {withCredentials: true});
  }

  deleteTaskByName(taskName: string) {
    return this.http.delete(environment.serverUrl + `/tasks?name=${taskName}`, {withCredentials: true});
  }

}
