import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department, Employee } from '../models/Employee';
import { environment } from 'src/environments/environment';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;
  managedDepartment!: string;
  projects!: Project[];
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  getEmployeeDepartment(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${id}/department-name`, { responseType: 'text' });
  }
  
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignEmployeeToDepartment(employeeId: number, departmentId: number): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/assign`, { employeeId, departmentId });
  }

  assignManagerToDepartment(employeeId: number, departmentId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/assign-manager`, { employeeId, departmentId });
  }

  assignEmployeeToProject(employeeId: number, projectId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/assign-project`, { employeeId, projectId });
  }
  getEmployeeProjects(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/${id}/projects`)
  }
  
}
