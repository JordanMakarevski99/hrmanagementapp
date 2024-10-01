import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/components/snackbar/snackbar.service';
import { Employee } from 'src/app/models/Employee';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
})
export class EmployeeDialogComponent implements OnInit {

  @Output() employeeAdded = new EventEmitter<Employee>();

  employeeForm: UntypedFormGroup;
  departments: string[] = []; 

  constructor(
    private snackbarService: SnackbarService,
    private departmentService: DepartmentService,
    private fb: UntypedFormBuilder,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', Validators.required],
      department: ['', Validators.required],
    });
  }
  loadDepartmentNames(): void {
    this.departmentService.getDepartments().subscribe(
      (departments) => {
        this.departments = departments.map(department => department.name); 
      },
    );
  }
  ngOnInit(): void {
    this.loadDepartmentNames();
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(
        (response) => {
          this.employeeAdded.emit(response); 
          this.snackbarService.show('Employee added successfully!');
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error adding employee', error);
        }
      );
    }
  }
}
