import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LoggerService} from "../../services/logger/logger.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService: AuthService = inject(AuthService);
  private loggerService: LoggerService = inject(LoggerService);
  private router: Router = inject(Router);
  logOut() {
    this.authService.logout()
      .subscribe({
        next: (message: string) =>{
          this.loggerService.log(message);
          this.authService.clearAllToken();
          this.router.navigate(['signin']);
        },
        error: (error) =>{
          this.loggerService.error(`Error while logging out : ${JSON.stringify(error)}`)
        }
      });
  }

  toggle() {
    const menu = document.getElementById('navbar-sticky');
    menu!.classList.toggle("hidden");
  }
}
