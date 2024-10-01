import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoginStatus());

  private apiUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        this.setLoginStatus(true);
        localStorage.setItem('authToken', response.token);
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('authToken');
    this.setLoginStatus(false);
    this.router.navigate(['/login']);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  setLoginStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
