import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  date: string;
  name: string;
  email: string;
  hour: number;
}

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReserveClick() {
    console.log('cac');
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
  }


}
