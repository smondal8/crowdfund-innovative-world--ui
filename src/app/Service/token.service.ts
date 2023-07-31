import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const TOKEN_KEY = 'accessToken';
const USER_NAME = 'userName';
const USER_ID = 'userId';
const ROLE = 'role';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public subject = new Subject<boolean>();
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

  public saveUser(bundle: any) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.removeItem(USER_ID);
    sessionStorage.removeItem(ROLE);
    sessionStorage.setItem(TOKEN_KEY,bundle.jwt);
    sessionStorage.setItem(USER_NAME,bundle.userName);
    sessionStorage.setItem(USER_ID,bundle.userId);
    sessionStorage.setItem(ROLE,bundle.role);
  }

  public getUser() {
    return sessionStorage.getItem(USER_ID);
  }

  public passValue(data){
    this.subject.next(data);
  }
}
