import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ButtonModule} from "primeng/button";
import {LoggerService} from "../../services/logger/logger.service";
import {TasksService} from "../../services/tasks/tasks.service";
import {Task, TaskResult} from "../../interfaces/task";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private loggerService: LoggerService = inject(LoggerService);
  private tasksService: TasksService = inject(TasksService);
  private tasks = signal<Task[]>([]);
  private paginatedResults = signal<TaskResult>({} as TaskResult);


  logOut() {
    debugger;
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.generateCsrfToken()
      .subscribe({
      next: (tokenObject: {csrfToken: string}) => {
        const csrfToken: string = tokenObject.csrfToken;
        this.authService.setCsrfToken(csrfToken);
        this.tasksService.getTasks(1)
          .subscribe({
          next: (taskResult: TaskResult) => {
            this.paginatedResults.set(taskResult);
            this.tasks.set(taskResult.data);
            this.loggerService.log(`paginatedResults: ${JSON.stringify(this.paginatedResults())}`);
            this.loggerService.log(`tasks: ${JSON.stringify(this.tasks())}`);
          },
          error: (err) => {
            this.loggerService.error(err);
          }
        });
      },
      error: (err) => {
        this.loggerService.error(err);
      }
    });
  }
}
