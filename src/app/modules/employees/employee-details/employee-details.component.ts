import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail-dialog',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit{
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}
  employeeDepartment: string ="";
  ngOnInit(): void {
    this.employeeService.getEmployeeDepartment(this.data.id).subscribe(result =>{
      this.employeeDepartment = result;
    })
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
