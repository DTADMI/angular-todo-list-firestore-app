import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AuthService} from "./services/auth/auth.service";
import {LoadingComponent} from "./components/loading/loading.component";
import {LoaderService} from "./services/loader/loader.service";
import {LoggerService} from "./services/logger/logger.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, NavbarComponent, LoadingComponent],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  private loaderService: LoaderService = inject(LoaderService);
  private loggerService: LoggerService = inject(LoggerService);
  showLoaderSig: Signal<boolean> = computed(() => this.loaderService.isLoading());
  isUserAuthenticatedSig: Signal<boolean> = computed(()=>this.authService.isLoggedInSig());
  successMessageSig: Signal<string> = computed(()=>this.loggerService.getSuccessMessage());
  errorMessageSig: Signal<string> = computed(() => this.loggerService.getErrorMessage());

}
