import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) {}

  default(message: string) {
    this.show(message, {
      duration: 2000,
      panelClass: 'default-notification-overlay'
    });
  }

  info(
    message: string,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    duration: number = 2000
  ) {
    this.show(message, {
      panelClass: 'info-notification-overlay',
      duration,
      horizontalPosition,
      verticalPosition
    });
  }

  success(
    message: string,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    duration: number = 3000
  ) {
    this.show(message, {
      panelClass: 'success-notification-overlay',
      duration,
      horizontalPosition,
      verticalPosition
    });
  }

  warn(
    message: string,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    duration: number = 2500
  ) {
    this.show(message, {
      panelClass: 'warning-notification-overlay',
      duration,
      horizontalPosition,
      verticalPosition
    });
  }

  error(
    message: string,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    duration: number = 3000
  ) {
    this.show(message, {
      panelClass: 'error-notification-overlay',
      duration,
      horizontalPosition,
      verticalPosition
    });
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    this.zone.run(() => this.snackBar.open(message, null, configuration));
  }
}
