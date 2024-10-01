import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProjectDetails(parseInt(projectId, 10));
    }
  }

  loadProjectDetails(id: number): void {
    this.projectService.getProjectById(id).subscribe(project => {
      this.project = project;
    });
  }
  viewEmployee(employeeId: number): void {
    this.router.navigate(['/employee', employeeId]);
  }
}
