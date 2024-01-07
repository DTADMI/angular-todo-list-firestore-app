import {Component, HostListener, inject, OnInit, signal, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {LoggerService} from "../../services/logger/logger.service";
import {TasksService} from "../../services/tasks/tasks.service";
import {Task, TaskResult} from "../../interfaces/task";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader/loader.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {BsDatepickerDirective, BsDatepickerModule} from "ngx-bootstrap/datepicker";
//import {datepickerAnimation} from "ngx-bootstrap/datepicker/datepicker-animations";
//import {document} from "ngx-bootstrap/utils";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  animations: []
})
export class TodoListComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private loggerService: LoggerService = inject(LoggerService);
  private tasksService: TasksService = inject(TasksService);
  private router: Router = inject(Router);
  protected tasks = signal<Task[]>([]);
  protected paginatedResults = signal<TaskResult>({} as TaskResult);
  private loaderService: LoaderService = inject(LoaderService);
  protected showModal : boolean = false;
  datepickerEl = document.getElementById('dueDate');
  taskForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', []],
    isDone: ['', []],
    dueDate: ['', []]
  });
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective | undefined;
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker!.hide();
    }

  myDateValue: Date | undefined;

  toggleModal() {
    //this.showModal = !this.showModal;
    // Get the element by its ID
    let element = document.getElementById("crud-modal")!;

    // Toggle the hidden style
    if(element.style.visibility === "visible") {
      element.style.visibility = "hidden";
    } else {
      element.style.visibility = "visible";
    }
    // Remove the "hidden" class from the element
    element?.classList.contains("hidden")? element?.classList.remove("hidden") : element?.classList.add("hidden");
  }

  ngOnInit(): void {
    //this.loaderService.showLoader();
    this.authService.generateCsrfToken()
      .subscribe({
      next: (tokenObject: {csrfToken: string}) => {
        const csrfToken: string = tokenObject.csrfToken;
        this.authService.setCsrfToken(csrfToken);
        this.tasksService.getTasks(1)
          .subscribe({
          next: (taskResult: TaskResult) => {
            this.loggerService.setMessage("success", "Task results successfully fetched! 👌🏿");
            this.paginatedResults.set(taskResult);
            this.tasks.set(taskResult.data);
            //this.loaderService.hideLoader();
            this.loggerService.log(`paginatedResults: ${JSON.stringify(this.paginatedResults())}`);
            this.loggerService.log(`tasks: ${JSON.stringify(this.tasks())}`);
          },
          error: (err) => {
            this.handleError(err);
          },
          complete: () =>{
            //this.loaderService.hideLoader();
          }
        });
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () =>{
        //this.loaderService.hideLoader();
      }
    });
  }

  private handleError = (err: any) => {
    //this.loaderService.hideLoader();
    this.loggerService.setMessage("error", "Error fetching tasks");
    this.loggerService.error(err);
  }

  onValueChange(value: Date) {
    this.loggerService.log(`Datepicker onValueChange value : ${value}`);
    this.loggerService.log(`Datepicker onValueChange this.taskForm.value.dueDate : ${this.taskForm?.value?.dueDate}`);
    this.loggerService.log(`Datepicker onValueChange this.datepickerEl.innerText : ${this.datepickerEl?.innerText}`);
  }
}
