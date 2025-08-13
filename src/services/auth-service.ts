import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { System } from '../shared/system';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/dev'; // Replace with your API URL
  private readonly tokenKey = 'auth_token'; // The key in local storage to store the token
  private isLoginSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem(this.tokenKey)
  );
  public isLogin$: Observable<boolean> = this.isLoginSubject.asObservable();
  public profile: any;

  constructor(private router: Router) {}

  // Method to check if a user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey); // Retrieve token from localStorage
    const loggedIn = !!token;
    this.isLoginSubject.next(loggedIn);
    if (loggedIn) {
      this.profile = JSON.parse(token) ;
      console.log({token})
      if (this.profile.role === 'seller') {
        this.router.navigate(['/seller']);
      }
    }

    return loggedIn;
  }

  // Method to log the user in by setting a token
  login(token: any): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(token)); // Store token in localStorage
    console.log('Token saved to localStorage:', token);
    this.isLoginSubject.next(true);
  }

  // Method to log the user out by removing the token
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove token from localStorage
    this.isLoginSubject.next(false);
  }

  // Method to get the stored token (optional)
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Retrieve token
  }
}
