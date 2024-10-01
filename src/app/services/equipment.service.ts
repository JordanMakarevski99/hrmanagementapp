import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../models/Equipment';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = `${environment.apiUrl}/equipment`;

  constructor(private http: HttpClient) {}

  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl);
  }

  assignEquipment(equipmentId: number, employeeId: number, duration: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${equipmentId}/assign`, null, {
      params: {
        employeeId: employeeId.toString(),
        duration: duration.toString()
      }
    });
  }
  unassignEquipment(equipmentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${equipmentId}/unassign`, null, {
    });
  }

  addEquipment(name: string, employeeId: number | null): Observable<Equipment> {
    const body = { name, employeeId };
    return this.http.post<Equipment>(`${this.apiUrl}`, body);
  }
  
}