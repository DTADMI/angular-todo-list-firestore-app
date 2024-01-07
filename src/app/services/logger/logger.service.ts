import { inject, Injectable } from '@angular/core';
import {ToastService} from "../toast/toast.service";
import {ALERT, ALERT_SEVERITY, AlertService} from "../alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  protected alertService: AlertService = inject(AlertService);
  protected toastService: ToastService = inject(ToastService);

  log(message: string) {
    console.log(message);
  }
  error(message: string) {
    console.error(message);
  }
  warn(message: string) {
    console.warn(message);
  }

  setMessage(severity: ALERT_SEVERITY, message: string) {
    this.alertService.addAlert({severity, message} as ALERT);
    this.log(`${severity} message : ${message}`);
  }
}
