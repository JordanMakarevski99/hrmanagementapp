import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from 'src/app/models/Equipment';
import { Employee } from 'src/app/models/Employee';
import { EquipmentService } from 'src/app/services/equipment.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions', 'assigned'];
  equipmentList = new MatTableDataSource<Equipment>([]);
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  assignDuration: number | null = null;
  newEquipmentName: string = '';
  newEquipmentEmployee: Employee | null = null;
  selectedEquipment: Equipment | null = null;

  @ViewChild('assignDialog', { static: true }) assignDialog!: TemplateRef<any>;
  @ViewChild('addEquipmentDialog', { static: true }) addEquipmentDialog!: TemplateRef<any>;
  @ViewChild('assignmentDetailsDialog', { static: true }) assignmentDetailsDialog!: TemplateRef<any>;

  constructor(
    private equipmentService: EquipmentService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEquipment();
    this.loadEmployees();
  }

  loadEquipment(): void {
    this.equipmentService.getAllEquipment().subscribe(equipment => {
      this.equipmentList.data = equipment;
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  openAssignDialog(equipment: Equipment): void {
    this.selectedEquipment = equipment;
    this.dialog.open(this.assignDialog, {
      width: '400px'
    });
  }

  openAddEquipmentDialog(): void {
    this.dialog.open(this.addEquipmentDialog, {
      width: '400px'
    });
  }

  openAssignmentDetailsDialog(equipment: Equipment): void {
    this.selectedEquipment = equipment;
    this.dialog.open(this.assignmentDetailsDialog, {
      width: '400px'
    });
  }

  assignEquipment(): void {
    if (this.selectedEquipment && this.selectedEmployee && this.assignDuration !== null) {
      this.equipmentService.assignEquipment(this.selectedEquipment.id, this.selectedEmployee.id, this.assignDuration).subscribe(() => {
        this.loadEquipment();
        this.dialog.closeAll();
      });
    }
  }
  unassignEquipment(equipment: Equipment): void {
    if (confirm('Are you sure you want to unassign this equipment?')) {
      this.equipmentService.unassignEquipment(equipment.id).subscribe(() => {
        this.loadEquipment();
      });
    }
  }

  addEquipment(name: string, employeeId: number | null): void {
    if (name && employeeId !== null) {
      this.equipmentService.addEquipment(name, employeeId).subscribe(() => {
        this.loadEquipment();
        this.dialog.closeAll();
      });
    }
  }

  getAssignedEmployeeName(equipment: Equipment): string {
    return equipment.employee
      ? `${equipment.employee.firstName} ${equipment.employee.lastName}`
      : 'Not Assigned';
  }
}
