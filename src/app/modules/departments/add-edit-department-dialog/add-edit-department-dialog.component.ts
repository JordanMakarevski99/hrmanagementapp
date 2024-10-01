import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/department.service';
import { SnackbarService } from 'src/app/components/snackbar/snackbar.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-add-edit-department-dialog',
  templateUrl: './add-edit-department-dialog.component.html',
  styleUrls: ['./add-edit-department-dialog.component.scss']
})
export class AddEditDepartmentDialogComponent implements OnInit {
  departmentForm!: FormGroup;
  employees!: Employee[];
  
  constructor(
    private snackbarService: SnackbarService,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<AddEditDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployees();
  }

  initializeForm(): void {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      managerId: [null, Validators.required]
    });

    if (this.data.mode === 'edit') {
      this.departmentForm.patchValue({
        name: this.data.department.name,
        managerId: this.data.department.manager?.id
      });
    }
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  save(): void {
    if (this.departmentForm.invalid) {
      return;
    }

    const department: Department = {
      ...this.data.department,
      ...this.departmentForm.value,
    };

    if (this.data.mode === 'add') {
      this.departmentService.createDepartment(department).subscribe(() => {
        this.dialogRef.close(true);
        this.snackbarService.show('Department added!');
      });
    } else {
      this.departmentService.updateDepartment(department.id!, department).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
