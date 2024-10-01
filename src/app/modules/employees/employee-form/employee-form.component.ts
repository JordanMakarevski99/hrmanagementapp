import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: UntypedFormGroup;
  departments: string[] = ['HR', 'Engineering', 'Marketing', 'Sales'];

  constructor(private fb: UntypedFormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(
        (response) => {
          this.employeeForm.reset();
        },
        (error) => {
          console.error('Error adding employee', error);
        }
      );
    }
  }
}
