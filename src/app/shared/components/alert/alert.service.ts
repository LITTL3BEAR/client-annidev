import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from './alert.component';
import { Alert } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  openAlert(alert: Alert, config?: MatDialogConfig) {
    const dialogConfig = {
      ...config,
      data: { alert }
    };

    try {
      this.close()
      return this.dialog.open(AlertComponent, dialogConfig);
    } catch (error) {
      console.error('Error opening alert dialog:', error);
      return undefined
    }
  }

  loading(message: string = 'Loading...') {
    return this.openAlert({
      type: 'loading',
      message,
      icon: 'cached'
    });
  }

  success(message: string, title?: string, closable: boolean = true, buttons?: { text: string, action: () => void }[]) {
    return this.openAlert({
      type: 'success',
      title,
      message,
      icon: 'check_circle',
      closable,
      buttons
    });
  }

  error(message: string, title?: string, closable: boolean = true, buttons?: { text: string, action: () => void }[]) {
    return this.openAlert({
      type: 'error',
      title,
      message,
      icon: 'error',
      closable,
      buttons
    });
  }

  warning(message: string, title?: string, closable: boolean = true, buttons?: { text: string, action: () => void }[]) {
    return this.openAlert({
      type: 'warning',
      title,
      message,
      icon: 'warning',
      closable,
      buttons
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
