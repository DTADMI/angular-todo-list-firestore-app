import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AuthService} from "./services/auth/auth.service";
import {LoadingComponent} from "./components/loading/loading.component";
import {LoaderService} from "./services/loader/loader.service";
import {LoggerService} from "./services/logger/logger.service";
import {AlertComponent} from "./components/alert/alert.component";
import {Dismiss, type DismissInterface, DismissOptions, InstanceOptions} from "flowbite";
import {AlertService} from "./services/alert/alert.service";
//import {BrowserModule} from "@angular/platform-browser";
//import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
//import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //CommonModule,
    RouterOutlet,
    NavbarComponent,
    LoadingComponent,
    AlertComponent,
    //NoopAnimationsModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    //BsDatepickerModule
  ],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private loaderService: LoaderService = inject(LoaderService);
  private loggerService: LoggerService = inject(LoggerService);
  showLoaderSig: Signal<boolean> = computed(() => this.loaderService.isLoading());
  isUserAuthenticatedSig: Signal<boolean> = computed(()=>this.authService.isUserLoggedInSig());
  private alertService: AlertService = inject(AlertService);
  alertSignal: Signal<boolean> = computed(() => !!this.alertService.getAlerts().length);

  constructor() {
    //this.loaderService.showLoader();
    this.authService.isUserLoggedInSig.set(!!this.authService.getAccessToken());
    console.log(`construct ${this.isUserAuthenticatedSig()}`);
  }

  ngOnInit(): void {
    console.log(`onInit ${this.isUserAuthenticatedSig()}`);
    //this.loaderService.hideLoader();
  }

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit ${this.isUserAuthenticatedSig()}`);
    this.loaderService.hideLoader();
  }

  ngAfterViewChecked(): void {
    for(let alert of this.alertService.getAlerts()) {
      if(document.getElementById(alert.id) && this.alertService.alertsToRemove.indexOf(alert.id)===-1) {
        console.log(`HTML Document ${alert.id} found`);
        // target element that will be dismissed
        const $targetEl: HTMLElement = document.getElementById(alert.id)!;

        // optional trigger element
        const $triggerEl: HTMLElement | undefined = document.getElementById(alert.id)?.getElementsByTagName("button")[0];
        $triggerEl?.setAttribute("data-dismiss-target", alert.id);

        // options object
        const options: DismissOptions = {
          transition: 'transition-opacity',
          duration: 300,
          timing: 'ease-out',

          // callback functions
          onHide: (context, targetEl) => {
            console.log('element has been dismissed');
            console.log(targetEl);
            this.alertService.removeAlert(alert);
          }
        };

        // instance options object
        const instanceOptions: InstanceOptions = {
          id: alert.id,
          override: true
        };

        /*
        * $targetEl (required)
        * $triggerEl (optional)
        * options (optional)
        * instanceOptions (optional)
        */
        const dismiss: DismissInterface = new Dismiss($targetEl, $triggerEl, options, instanceOptions);

        // programmatically hide it
        setTimeout(()=>{
          dismiss.hide();
        }, ["error", "severe"].includes(alert.severity!) ? 10000 : 3000);

        this.alertService.alertsToRemove.push(alert.id);
      } else {
        console.log(`HTML Document ${alert.id} doesn't exist.`);
      }
    }
  }
}
