import { Injectable } from '@angular/core';

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'userName';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut() {
    sessionStorage.clear();
  }

  public saveToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: string) {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, user);
  }

  public getUser() {
    return sessionStorage.getItem(USER_KEY);
  }
}
