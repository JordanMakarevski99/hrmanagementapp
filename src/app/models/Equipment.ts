import { Employee } from "./Employee";

export interface Equipment {
    id: number;
    name: string;
    employee?: Employee;
  }
  