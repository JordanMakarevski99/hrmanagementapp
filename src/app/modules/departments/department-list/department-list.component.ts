import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/Department';
import { Employee } from 'src/app/models/Employee';
import { AddEditDepartmentDialogComponent } from '../add-edit-department-dialog/add-edit-department-dialog.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments: any = [];
  totalDepartments = 0;
  totalEmployees = 0;
  averageEmployeesPerDepartment = 0;

  constructor(private departmentService: DepartmentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
      this.totalEmployees = this.departments.reduce((sum: any, dept: { employeeCount: any; }) => sum + dept.employeeCount, 0);
      this.totalDepartments = this.departments.length;
      this.averageEmployeesPerDepartment = this.departments.length > 0
      ? parseFloat((this.totalEmployees / this.departments.length).toFixed(2))
      : 0;

      this.departments.forEach((department: { managerId: number; manager: Employee; }) => {
        if (department.managerId) {
          this.departmentService.getEmployeeById(department.managerId).subscribe(manager => {
            department.manager = manager;
          });
        }
      });
    });
  }

  openAddDepartmentDialog(): void {
    const dialogRef = this.dialog.open(AddEditDepartmentDialogComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartments();
      }
    });
  }

  editDepartment(department: Department): void {
    const dialogRef = this.dialog.open(AddEditDepartmentDialogComponent, {
      width: '400px',
      data: { mode: 'edit', department }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartments();
      }
    });
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe(() => {
        this.loadDepartments();
      });
    }
  }
}
