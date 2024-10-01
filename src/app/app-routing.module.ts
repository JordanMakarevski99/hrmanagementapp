import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeListComponent } from './modules/employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './modules/employees/employee-details/employee-details.component';
import { DepartmentListComponent } from './modules/departments/department-list/department-list.component';
import { EquipmentComponent } from './modules/equipment/equipment.component';
import { EmployeeFormComponent } from './modules/employees/employee-form/employee-form.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { SettingsComponent } from './modules/settings/settings.component';
import { LoginComponent } from './auth/login/login.component';
import { LeaveCalendarComponent } from './modules/settings/leave-calendar/leave-calendar.component';
import { ProjectComponent } from './modules/project/project.component';
import { EmployeeProfileComponent } from './modules/employees/employee-profile/employee-profile.component';
import { ProjectDetailsComponent } from './modules/project/project-details/project-details.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'employee-form', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'employee-calendar', component: LeaveCalendarComponent, canActivate:[AuthGuard]},
  { path: 'employee-form/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentListComponent, canActivate: [AuthGuard] },
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'employee/:id', component: EmployeeProfileComponent, canActivate:[AuthGuard] },
  { path: 'project/:id',component: ProjectDetailsComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
