import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(public matDialog: MatDialog) { }
}
