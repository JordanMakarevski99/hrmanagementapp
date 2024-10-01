import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeListComponent } from './modules/employees/employee-list/employee-list.component';
import { DepartmentListComponent } from './modules/departments/department-list/department-list.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { EquipmentComponent } from './modules/equipment/equipment.component';
import { EmployeeDetailsComponent } from './modules/employees/employee-details/employee-details.component';
import { EmployeeFormComponent } from './modules/employees/employee-form/employee-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDialogComponent } from './modules/employees/employee-dialog/employee-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTabsModule } from '@angular/material/tabs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { AddEditDepartmentDialogComponent } from './modules/departments/add-edit-department-dialog/add-edit-department-dialog.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { LeaveRequestsComponent } from './modules/settings/leave-requests/leave-requests.component';
import { LeaveCalendarComponent } from './modules/settings/leave-calendar/leave-calendar.component';
import { AuthModule } from './auth/auth.module';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarService } from './components/snackbar/snackbar.service';
import { ProjectComponent } from './modules/project/project.component';
import { EmployeeProfileComponent } from './modules/employees/employee-profile/employee-profile.component';
import { ProjectDetailsComponent } from './modules/project/project-details/project-details.component';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        DashboardComponent,
        EmployeeListComponent,
        DepartmentListComponent,
        PageNotFoundComponent,
        EquipmentComponent,
        EmployeeDetailsComponent,
        EmployeeFormComponent,
        EmployeeDialogComponent,
        AddEditDepartmentDialogComponent,
        SettingsComponent,
        LeaveRequestsComponent,
        LeaveCalendarComponent,
        SnackbarComponent,
        ProjectComponent,
        EmployeeProfileComponent,
        ProjectDetailsComponent
        ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatTabsModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
        NgChartsModule,
        FullCalendarModule,
        MatTableModule,
        AuthModule,
        MatListModule,
        MatMenuModule
    ],
    providers: [SnackbarService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ],
    bootstrap: [AppComponent],
    entryComponents: [SnackbarComponent],

})
export class AppModule { }
