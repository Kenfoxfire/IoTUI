import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

@Injectable({
  providedIn: 'root'
})
export class Auth {



  // Signals to hold the authentication state
  private _authStatus = signal<AuthStatus>("checking");
  private _user = signal<User | null >(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);


  // Getters for signals Read Only
  authStatus = computed<AuthStatus>(()=> {
    if (this._authStatus() === "checking") return "checking"
    if (this._user()) return "authenticated";
    return "not-authenticated";
  })

  user = computed<User | null>(() => this._user());

  token = computed<string | null>(() => this._token());


  login(username: string, password: string) {
    this._authStatus.set("checking");
    return this.http.post<{ user: User, token: string }>('/api/auth/login', { username, password })     
      .subscribe({
        next: ({ user, token }) => {
          this._user.set(user);   
          this._token.set(token);
          this._authStatus.set("authenticated");
        },
        error: (err) => {
          console.error('Login failed', err);
          this._authStatus.set("not-authenticated");
          this._user.set(null);
          this._token.set(null);
        }
      });
  } 


}
