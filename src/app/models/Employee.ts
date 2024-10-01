export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: string;
  department: Department;
}
