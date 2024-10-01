import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { Project,ProjectStatus } from 'src/app/models/Project';
import { Employee } from 'src/app/models/Employee';
import { ProjectService } from 'src/app/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'teamLeader', 'actions'];
  projects = new MatTableDataSource<Project>([]);
  employees: Employee[] = [];
  selectedProject: Project | null = null;
  selectedEmployee: Employee | null = null;
  projectStatus: ProjectStatus = ProjectStatus.IN_PROGRESS;
  addProjectForm!: FormGroup;

  @ViewChild('assignDialog', { static: true }) assignDialog!: TemplateRef<any>;
  @ViewChild('addProjectDialog', { static: true }) addProjectDialog!: TemplateRef<any>;
  @ViewChild('projectDetailsDialog', { static: true }) projectDetailsDialog!: TemplateRef<any>;


  constructor(
    private router: Router,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.addProjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }
  projectForm!: FormGroup;

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployees();
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects.data = projects;
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  createProject(): void {
    if (this.addProjectForm.valid) {
      const projectData = this.addProjectForm.value;
      this.projectService.createProject(projectData).subscribe(() => {
        this.loadProjects();
        this.dialog.closeAll();
      });
    }
  }
  openAssignDialog(project: Project): void {
    this.selectedProject = project;
    
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees.filter(employee => 
        !this.selectedProject?.employees.some(e => e.id === employee.id)
      );
    });
    this.dialog.open(this.assignDialog, {
      width: '400px'
    });
  }
  openAddProjectDialog(): void {
    this.dialog.open(this.addProjectDialog, {
      width: '400px'
    });
  }

  openProjectDetails(project: Project): void {
    this.router.navigate(['/project', project.id]);
  }
  onSelectEmployee(employee: Employee): void {
    this.router.navigate(['/employee', employee.id]);
  }

  assignEmployeeToProject(): void {
    if (this.selectedProject && this.selectedEmployee) {
      this.projectService.assignEmployee(this.selectedProject.id, this.selectedEmployee.id).subscribe(() => {
        this.loadProjects();
        this.dialog.closeAll();
      }, error => {
        alert('Cannot assign employee to more than 2 projects.');
      });
    }
  }

  updateProjectStatus(): void {
    if (this.selectedProject) {
      this.projectService.updateProjectStatus(this.selectedProject.id, this.projectStatus).subscribe(() => {
        this.loadProjects();
        this.dialog.closeAll();
      });
    }
  }

  setTeamLeader(): void {
    if (this.selectedProject && this.selectedEmployee) {
      this.projectService.setTeamLeader(this.selectedProject.id, this.selectedEmployee.id).subscribe(() => {
        this.loadProjects();
        this.dialog.closeAll();
      });
    }
  }
}
