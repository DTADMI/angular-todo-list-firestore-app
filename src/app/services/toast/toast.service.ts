import {Injectable, signal, WritableSignal} from '@angular/core';

export type TOAST_SEVERITY = "success" | "warning" | "error" | null;

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _severitySig = signal<TOAST_SEVERITY>(null);
  private _messageSig= signal<string>("");
  private _successMessageSig = signal<string>("");
  private _errorMessageSig = signal<string>("");
  private _warningMessageSig = signal<string>("");

  getSuccessMessage(): string {
    return this._successMessageSig();
  }

  setSuccessMessage(message: string) {
    this._successMessageSig.set(message);
  }

  getErrorMessage(): string {
    return this._errorMessageSig();
  }

  setErrorMessage(message: string) {
    this._errorMessageSig.set(message);
  }

  getWarningMessage(): string {
    return this._warningMessageSig();
  }

  setWarningMessage(message: string) {
    this._warningMessageSig.set(message);
  }

  getSeverity(): TOAST_SEVERITY {
    return this._severitySig();
  }

  setSeverity(severity: TOAST_SEVERITY) {
    this._severitySig.set(severity);
  }

  setToast(severity: TOAST_SEVERITY, message: string) {
    this.setSeverity(severity);
    this.setMessage(message);
  }

  getMessage(): string {
    return this._messageSig();
  }

  setMessage(message: string) {
    this._messageSig.set(message);
  }

}
