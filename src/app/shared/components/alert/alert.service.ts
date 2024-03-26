import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert, AlertType } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSource = new BehaviorSubject<Alert | null>(null);
  alert$ = this.alertSource.asObservable();

  constructor() { }

  success(message: string, timeout?: number) {
    this.alertSource.next(new Alert('success', message, timeout));
  }

  error(message: string, timeout?: number) {
    this.alertSource.next(new Alert('error', message, timeout));
  }

  warning(message: string, timeout?: number) {
    this.alertSource.next(new Alert('warning', message, timeout));
  }

  loading(message: string, timeout?: number) {
    this.alertSource.next(new Alert('loading', message, timeout));
  }

  loadingProgress(message: string, progress: number) {
    this.alertSource.next(new Alert('loading', message, undefined, progress));
  }

  updateProgress(progress: number) {
    const currentAlert = this.alertSource.value;
    if (currentAlert?.type === 'loading') {
      this.alertSource.next(new Alert('loading', currentAlert.message, undefined, progress));
    }
  }
}
