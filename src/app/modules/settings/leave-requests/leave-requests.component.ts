import { Component, Input, OnInit } from '@angular/core';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { LeaveRequest } from 'src/app/models/LeaveRequest';
import { formatDate } from '@angular/common';
import { SnackbarService } from 'src/app/components/snackbar/snackbar.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.scss']
})
export class LeaveRequestsComponent implements OnInit {
  @Input() status!: string;
  leaveRequests: LeaveRequest[] = [];
  currentDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private snackbarService: SnackbarService,private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.leaveRequestService.getLeaveRequestsByStatus(this.status).subscribe(requests => {
      this.leaveRequests = requests;
    });
  }
  approveRequest(id: number): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.leaveRequestService.updateLeaveRequestStatus(id, 'APPROVED', undefined)
      .subscribe(() => {
        this.leaveRequests = this.leaveRequests.filter(r => r.id !== id);
        this.snackbarService.show('Leave request approved!')
      });
  }
  
  denyRequest(id: number): void {
    const denialReason = prompt("Reason for denial:");
    if (denialReason) {
      const currentDate = new Date().toISOString().split('T')[0];
      this.leaveRequestService.updateLeaveRequestStatus(id, 'REJECTED', denialReason)
        .subscribe(() => {
          this.leaveRequests = this.leaveRequests.filter(r => r.id !== id);
          this.snackbarService.show('Leave request denied!')
        });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'status-approved';
      case 'REJECTED':
        return 'status-denied';
      case 'PENDING':
        return 'status-pending';
      default:
        return '';
    }
  }
  
}
