import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Snackbar {
  private snackbar = inject(MatSnackBar);

  error(message: string) {
    this.snackbar.open(message, 'close', {
      duration: 5000,
      panelClass: ['snack-error']
    })
  }

  success(message: string) {
    this.snackbar.open(message, 'close', {
      duration: 5000,
      panelClass: ['snack-success']
    })
  }
}
