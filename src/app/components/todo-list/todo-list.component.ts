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
  private paginatedResults: TaskResult = {} as TaskResult;


  logOut() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.generateCsrfToken()
      .subscribe({
      next: (tokenObject: any) => {
        const csrfToken: string = tokenObject.csrfToken as string;
        this.authService.setCsrfToken(csrfToken);
        this.tasksService.getTasks(1)
          .subscribe({
          next: (json: any) => {
            this.tasks.set(json.data as Task[]);
            this.loggerService.log(`tasks: ${JSON.stringify(this.tasks())}`)
          },
          error: (err) => {
            this.loggerService.error(err);
          }
          }
        );
      },
      error: (err) => {
        this.loggerService.error(err);
      }
    });
  }
}
