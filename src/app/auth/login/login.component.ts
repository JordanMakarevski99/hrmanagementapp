import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  @Output() logIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        localStorage.setItem('authToken', response.token);
        this.logIn = true;
        this.router.navigate(['/admin/dashboard']);
      },
      error => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}