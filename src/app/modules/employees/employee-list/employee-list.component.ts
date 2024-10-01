import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  private dialogRef: any;
  departmentNames: { [key: number]: String } = {};

  constructor(private router: Router, private dialog: MatDialog, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  getEmployeeImage(employeeId: number): string {
    return `https://randomuser.me/api/portraits/lego/${employeeId % 10}.jpg`;
  }

  openAddEmployeeDialog(): void {
    if (this.dialogRef) {
      return;
    }

    this.dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px'
    });

    this.dialogRef.componentInstance.employeeAdded.subscribe((newEmployee: Employee) => {
      this.employees.push(newEmployee); 
      this.loadDepartmentName(newEmployee); 
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null; 
    });
  }

  onSelectEmployee(employee: Employee): void {
    this.router.navigate(['/employee', employee.id]);
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      this.loadDepartmentNames();
    });
  }

  loadDepartmentNames(): void {
    this.employees.forEach(employee => {
      this.loadDepartmentName(employee);
    });
  }

  loadDepartmentName(employee: Employee): void {
    this.employeeService.getEmployeeDepartment(employee.id).subscribe(departmentName => {
      this.departmentNames[employee.id] = departmentName;
    });
  }

  getDepartmentName(employeeId: number): String {
    return this.departmentNames[employeeId] || 'Loading...';
  }

  deleteEmployee(id: number) {
    if(confirm("Are you sure you want to delete this employee?")){
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(employee => employee.id !== id); 
    });
  }
  }
}
