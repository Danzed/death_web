import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HoursService } from 'src/app/services/hours.service';

export interface DialogData {
  date: string;
  email: string;
  hour: number;
}

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public hourService: HoursService,
    public dialogRef: MatDialogRef<HoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      hour: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(9), Validators.max(18)]],
    });
  }

  get email() {
    return this.form.controls.email;
  }
  get hour() {
    return this.form.controls.hour;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReserveClick() {
    this.email.markAsDirty();
    this.email.updateValueAndValidity();
    this.hour.markAsDirty();
    this.hour.updateValueAndValidity();
    if (this.email.invalid || this.hour.invalid) {
      return;
    }
    const dateArray = this.data.date.split('-');
    const date = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]), Number(this.hour.value), 0);
    const hour = {
      title: this.email.value,
      start: date,
      // tslint:disable-next-line: no-bitwise
      timestamps: ~~(Number(date) / 1000)
    };
    console.log('aca', hour);

    this.hourService.CreateHours(hour).subscribe(res => {
      this.dialogRef.close(hour);
      console.log(res);
    });
  }

  ngOnInit() {
  }


}
