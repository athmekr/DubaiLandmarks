import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  photo: string;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

/* export class DialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
} */

export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
