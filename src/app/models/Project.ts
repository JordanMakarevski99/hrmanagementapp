import { Employee } from "./Employee";
export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;  
    teamLeader?: Employee;  
    employees: Employee[]; 
  }

  export enum ProjectStatus {
    STARTED = 'Started',
    IN_PROGRESS = 'In Progress',
    FINISHED = 'Finished'
  }