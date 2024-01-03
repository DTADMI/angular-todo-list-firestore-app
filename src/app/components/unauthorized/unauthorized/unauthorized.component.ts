import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {LoggerService} from "../../../services/logger/logger.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private loggerService: LoggerService = inject(LoggerService);
  ngOnInit(): void {
    if(this.authService.isUserLoggedIn()) {
      this.authService.logout()
        .subscribe({
          next: (message: string) =>{
            this.loggerService.log(message);
            this.authService.clearAllToken();
          },
          error: (error) =>{
            this.loggerService.error(`Error while logging out : ${JSON.stringify(error)}`);
          }
        });
    }
  }

}
