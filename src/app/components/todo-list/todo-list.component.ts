import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ButtonModule} from "primeng/button";

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


  logOut() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.generateCsrfToken().subscribe((tokenObject) => {
        const csrfToken: string = tokenObject.toString();
        this.authService.setCsrfToken(csrfToken);
    });
  }
}
