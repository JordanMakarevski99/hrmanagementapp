import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';
import { Project } from 'src/app/models/Project';
import { LeaveRequest } from 'src/app/models/LeaveRequest'; 
import { Router } from '@angular/router';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee | undefined;
  projects: Project[] = [];
  managedDepartment: string | undefined;
  leaveRequests: LeaveRequest[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private leaveRequestsService:LeaveRequestService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadEmployeeDetails(id);
    this.loadEmployeeProjects(id);
    this.loadManagedDepartment(id);
    this.loadEmployeeLeaveRequests(id);
  }

  loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      this.employee = employee;
    });
  }

  loadEmployeeProjects(id: number): void {
    this.employeeService.getEmployeeProjects(id).subscribe(projects => {
      this.projects = projects;
    });
  }

  loadManagedDepartment(id: number): void {
    this.employeeService.getEmployeeDepartment(id).subscribe(departmentName => {
      this.managedDepartment = departmentName;
    });
  }

  loadEmployeeLeaveRequests(id: number): void {
    this.leaveRequestsService.getLeaveRequestsByEmployee(id).subscribe(leaveRequests => {
      this.leaveRequests = leaveRequests;
    });
  }
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
