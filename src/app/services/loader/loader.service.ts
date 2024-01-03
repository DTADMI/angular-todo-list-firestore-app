import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSignal = signal<boolean>(false);

  showLoader() {
    this.loadingSignal.set(true);
  }

  hideLoader() {
    this.loadingSignal.set(false);
  }

  isLoading() {
    return this.loadingSignal();
  }
}
