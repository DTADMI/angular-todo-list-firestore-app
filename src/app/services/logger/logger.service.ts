import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private successMessageSig = signal<string>("");
  private errorMessageSig = signal<string>("");

  log(message: string) {
    console.log(message);
  }
  error(message: string) {
    console.error(message);
  }
  warn(message: string) {
    console.warn(message);
  }

  getSuccessMessage() {
    return this.successMessageSig();
  }

  getErrorMessage() {
    return this.errorMessageSig();
  }

  setSuccessMessage(message: string) {
    this.successMessageSig.set(message);
    this.log(`Success message : ${message}`);
  }

  setErrorMessage(message: string) {
    this.errorMessageSig.set(message);
    this.error(`Error message : ${message}`);
  }

  clearSuccessMessage() {
    this.successMessageSig.set("");
  }

  clearErrorMessage() {
    this.errorMessageSig.set("");
  }

  clearAllMessages() {
    this.clearSuccessMessage();
    this.clearErrorMessage();
  }
}
