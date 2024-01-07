import {Injectable, signal} from '@angular/core';

export type ALERT_SEVERITY = "info" | "success" | "warning" | "error" | "severe" | null;
export type ALERT = {
  id: string;
  severity: ALERT_SEVERITY;
  message: string
};
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _alertsSig= signal<ALERT[]>([]);
  alertsToRemove: string[] = [];

  getAlerts(): ALERT[] {
    return this._alertsSig();
  }

  addAlert(alert: ALERT): void {
    /*this.alertsToRemove.forEach(alert => {
      this.removeAlert(alert);
    });*/
    this.alertsToRemove = [];
    const al: ALERT = {...alert};
    al.id = crypto.randomUUID();
    console.log(`adding alert ${JSON.stringify(alert)}`);
    this._alertsSig.update(alerts => [...alerts, al]);
    console.log(`alerts updated ${JSON.stringify(this._alertsSig())}`);
  }

  removeAlert(alert: ALERT): void {

    console.log(`removing alert ${JSON.stringify(alert)}`);
    this._alertsSig.update(alerts => alerts.filter(al => al.id !== alert.id));
    console.log(`alerts updated ${JSON.stringify(this._alertsSig())}`);
  }

}
