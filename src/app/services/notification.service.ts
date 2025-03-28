import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  public MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public MatSnackBarVerticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public _snackBar: MatSnackBar) { }

  public success(message: string, action = ''): void {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ["success-message"],
      horizontalPosition: this.MatSnackBarHorizontalPosition,
      verticalPosition: this.MatSnackBarVerticalPosition
    })
  }

  public warning(message: string, action = ''): void {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ["warning-message"],
      horizontalPosition: this.MatSnackBarHorizontalPosition,
      verticalPosition: this.MatSnackBarVerticalPosition
    })
  }

  public error(message: string, action = ''): void {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ["error-message"],
      horizontalPosition: this.MatSnackBarHorizontalPosition,
      verticalPosition: this.MatSnackBarVerticalPosition
    })
  }
}
