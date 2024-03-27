import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert>(null);
  alertState = this.alertSubject.asObservable();

  constructor() { }

  success(message: string) {
    this.alertSubject.next(new Alert('success', message, timeout));
  }

  error(message: string) {
    this.alertSubject.next(new Alert('error', message, timeout));
  }

  warning(message: string) {
    this.alertSubject.next(new Alert('warning', message, timeout));
  }

  loading(message: string = 'Loading...') {
    this.alertSubject.next(new Alert('loading', message, timeout));
  }

  loadingProgress(message: string, progress: number) {
    this.alertSubject.next(new Alert('loading', message, undefined, progress));
  }

  updateProgress(progress: number) {
    const currentAlert = this.alertSubject.value;
    if (currentAlert?.type === 'loading') {
      this.alertSubject.next(new Alert('loading', currentAlert.message, undefined, progress));
    }
  }
}
