import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import parseISO from 'date-fns/parseISO';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  format,
  formatISO9075
} from 'date-fns';
import { DatePipe } from '@angular/common';
import { DatePipePipe } from './date-pipe.pipe';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-project-a';
  member: any = [];
  public userData: any = [];
  viewDate: Date = new Date();
  events: CalendarEvent[];
  actions: any;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor (public userService: UserService, public datePipe: DatePipe) {
  }

  ngOnInit() {
  this.userData = this.userService.getUsers().subscribe(data => {
    this.userData = data;
  });
  }
  public passIndex(passedData: any) {
    $("#myModal").modal('show');
    this.events = [];
    passedData.activity_periods.forEach(data => {
      let memberData: any = {
        start : this.datePipe.transform(new Date(),'MMM d, y, h:mm:ss a'),
        end : this.datePipe.transform(new Date(),'MMM d, y, h:mm:ss a'),
        title : passedData.real_name,
        color: colors.red
        }
        this.events.push(memberData);
        console.log("memebers", memberData);
  });
  //  this.events = [
  //     {
  //       start: this.userData.members.activity_periods.start_time,
  //       end: this.userData.members.activity_periods.end_time,
  //       title: 'On DST. I\'m fine',
  //       color: colors.red,
  //     },
  //     {
  //       start: this.userData.members.activity_periods,
  //       end: this.userData.members.activity_periods,
  //       title: 'I am hanging off!',
  //       color: colors.yellow,
  //     },
  //     {
  //       start: this.userData.members.activity_periods,
  //       end: this.userData.members.activity_periods,
  //       title: 'I am also hanging off!',
  //       color: colors.yellow,
  //     }
  //   ];
  
    console.log("events",this.events);
  }

  public hideModal():void {
    document.getElementById('close-modal').click();
  }



  setView(view: CalendarView) {
    this.view = view;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
    console.log(event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }
  
}
