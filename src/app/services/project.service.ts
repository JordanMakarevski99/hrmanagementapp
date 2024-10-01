import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Project, ProjectStatus } from '../models/Project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  assignEmployee(projectId: number, employeeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/assign`, { employeeId });
  }

  removeEmployee(projectId: number, employeeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/remove`, { employeeId });
  }

  updateProjectStatus(projectId: number, status: ProjectStatus): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/status`, status);
  }

  setTeamLeader(projectId: number, employeeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/team-leader`, employeeId);
  }
}
