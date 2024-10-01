import { Employee } from "./Employee";

export interface LeaveRequest {
  id: number;
  employee: Employee;
  leaveType: string;
  startDate: string; 
  endDate: string;
  status: string;
  reason: string;
  approvalDate?: string;  
  denialDate?: string;
}
