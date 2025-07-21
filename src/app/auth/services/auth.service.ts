import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthLoginRes } from '../interfaces/auth-login-res.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

type AuthStatus = "checking" | "authenticated" | "not-authenticated";
const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Signals to hold the authentication state
  private _authStatus = signal<AuthStatus>("checking");
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);
  private router = inject(Router);


  // Resource to check the authentication status during app initialization

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });


  // Getters for signals Read Only
  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === "checking") return "checking"
    if (this._user()) return "authenticated";
    return "not-authenticated";
  })

  user = computed<User | null>(() => this._user());

  token = computed<string | null>(() => this._token());


  login(email: string, password: string): Observable<{ isAuthenticated: boolean, error: string }> {
    this._authStatus.set("checking");
    return this.http.post<AuthLoginRes>(`${baseUrl}/auth/login`, { email, password })
      .pipe(
        // Handle the response and update signals
        map(res => this.handleAuthSuccess(res)),
        catchError(({ error }) => this.handleAuthError(error))
      )
  }

  register(email: string, password: string, username: string): Observable<{ isAuthenticated: boolean, error: string }> {
    this._authStatus.set("checking");
    return this.http.post<AuthLoginRes>(`${baseUrl}/auth/register`, { email, password, username })
      .pipe(
        // Handle the response and update signals
        tap(res => {
          this._authStatus.set("authenticated");
          this._user.set(res.user);
          this._token.set(res.token);
          localStorage.setItem('token', res.token);
        }),
        map(() => ({ isAuthenticated: true, error: "" })),
        catchError(({ error }) => {
          console.log(error);
          this._authStatus.set("not-authenticated");
          this._user.set(null);
          this._token.set(null);
          localStorage.removeItem('token');
          return of({ isAuthenticated: false, error: error.error }); // Return an observable with false on error
        })
      )
  }

  checkStatus(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.post<AuthLoginRes>(`${baseUrl}/utils/check-status`, {})
      .pipe(
        map(res => this.handleAuthSuccess(res)),
        catchError(({ error }) => this.handleAuthError(error))
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set("not-authenticated")
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({user, token}:AuthLoginRes){
    this._authStatus.set("authenticated");
    this._user.set(user);
    this._token.set(token);
    localStorage.setItem('token', token);
    return { isAuthenticated: true, error: "" }
  }


  private handleAuthError(error: any) {
    this.logout() 
    return of({ isAuthenticated: false, error: error.error })
  }

}
