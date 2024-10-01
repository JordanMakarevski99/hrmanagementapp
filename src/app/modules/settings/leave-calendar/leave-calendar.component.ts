import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { LeaveRequest } from 'src/app/models/LeaveRequest';

@Component({
  selector: 'app-leave-calendar',
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.scss']
})
export class LeaveCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    themeSystem: 'bootstrap',
    events: [],
    eventColor: '#378006', 
    eventTextColor: '#fff', 
    eventBorderColor: '#000',
    eventDisplay: 'block',
    editable: true,
    droppable: true, 
    eventTimeFormat: { 
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'long' }
      },
      timeGridWeek: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
      },
      timeGridDay: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
      }
    }
  };

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.leaveRequestService.getAllLeaveRequests().subscribe(requests => {
      this.calendarOptions.events = this.formatEvents(requests);
    });
  }

  private formatEvents(requests: LeaveRequest[]): any[] {
    return requests.map(request => ({
      title: `${request.leaveType} (${request.employee.firstName} ${request.employee.lastName})`,
      start: request.startDate,
      end: request.endDate,
      backgroundColor: this.getEventColor(request.status),
      borderColor: this.getEventColor(request.status),
      textColor: '#fff'
    }));
  }

  private getEventColor(status: string): string {
    switch (status) {
      case 'APPROVED':
        return '#4CAF50';
      case 'PENDING':
        return '#FFC107';
      case 'DENIED':
        return '#F44336';
      default:
        return '#2196F3';
    }
  }
}
