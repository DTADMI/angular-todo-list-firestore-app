import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ButtonModule} from "primeng/button";
import {LoggerService} from "../../services/logger/logger.service";
import {TasksService} from "../../services/tasks/tasks.service";
import {Task, TaskResult} from "../../interfaces/task";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader/loader.service";

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
  private router: Router = inject(Router);
  private tasks = signal<Task[]>([]);
  private paginatedResults = signal<TaskResult>({} as TaskResult);
  private loaderService: LoaderService = inject(LoaderService);

  logOut() {
    this.loaderService.hideLoader();
    this.authService.logout()
      .subscribe({
      next: (message: string) =>{
        this.loggerService.setSuccessMessage(message);
        this.authService.clearAllToken();
        this.router.navigate(['signin']);
      },
      error: (error) =>{
        this.loggerService.setErrorMessage(`Error while logging out : ${JSON.stringify(error)}`)
      }
    });
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.authService.generateCsrfToken()
      .subscribe({
      next: (tokenObject: {csrfToken: string}) => {
        const csrfToken: string = tokenObject.csrfToken;
        this.authService.setCsrfToken(csrfToken);
        this.tasksService.getTasks(1)
          .subscribe({
          next: (taskResult: TaskResult) => {
            this.loggerService.setSuccessMessage("Task results successfully fetched! 👌🏿");
            this.paginatedResults.set(taskResult);
            this.tasks.set(taskResult.data);
            this.loaderService.hideLoader();
            this.loggerService.log(`paginatedResults: ${JSON.stringify(this.paginatedResults())}`);
            this.loggerService.log(`tasks: ${JSON.stringify(this.tasks())}`);
          },
          error: (err) => {
            this.handleError(err);
          }
        });
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private handleError = (err: any) => {
    this.loaderService.hideLoader();
    this.loggerService.setErrorMessage("Error fetching tasks");
    this.loggerService.error(err);
  }
}
