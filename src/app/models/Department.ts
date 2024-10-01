import { Employee } from "./Employee";

export interface Department {
  id?: number;
  name: string;
  employeeCount: number;
  managerId?: number; 
}
