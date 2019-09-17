import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { MatDialog } from '@angular/material/dialog';
import { HoursComponent } from './dialog/hours/hours.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'death-web';

  animal: string;
  name: string;

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = false;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];

  constructor(public dialog: MatDialog) { }

  openDialog(str): void {
    const dialogRef = this.dialog.open(HoursComponent, {
      width: '250px',
      data: { date: str }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const date = result.date.split('-');
        const event = { // add new event data. must create new array
          title: result.email,
          start: new Date(date[0], date[1] - 1, date[2], Number(result.hour), 0),
        };
        console.log(event);
        this.calendarEvents = this.calendarEvents.concat(event);
      }
    });
  }

  handleDateClick(arg) {
    this.openDialog(arg.dateStr);
  }
}
