import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080/auth"

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/register`, user);
  }
  
  login(credentials: { email: string; password: string }): Observable<ApiResponse<{ token: string; userName: string }>> {
    return this.http.post<ApiResponse<{ token: string; userName: string }>>(`${this.baseUrl}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  

}
