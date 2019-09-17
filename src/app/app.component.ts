import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { MatDialog } from '@angular/material/dialog';
import { HoursComponent } from './dialog/hours/hours.component';
import { HoursService } from 'src/app/services/hours.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'death-web';

  animal: string;
  name: string;

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  validRange = { start: new Date() };
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = false;
  calendarEvents: EventInput[] = [];

  constructor(
    public dialog: MatDialog,
    public hourService: HoursService) { }

  ngOnInit() {
    this.hourService.GetHours().subscribe(res => {
      if (res.count > 0) {
        this.calendarEvents = this.calendarEvents.concat(res.rows);
      }
    });
  }

  openDialog(str): void {
    const dialogRef = this.dialog.open(HoursComponent, {
      width: '250px',
      data: { date: str }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.calendarEvents = this.calendarEvents.concat(result);
      }
    });
  }

  handleDateClick(arg) {
    this.openDialog(arg.dateStr);
  }
}
