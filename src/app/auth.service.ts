import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  redirectUrl: string;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private _HttpClient: HttpClient) {}

  public userlogin(username, password) {
    // alert(username);
    return this._HttpClient
      .post<any>("http://localhost/mobily/login.php", { username, password })
      .pipe(
        map((Users) => {
          this.setToken(Users[0].name);
          this.getLoggedInName.emit(true);
          return Users;
        })
      );
  }
  public userregistration(name, email, pwd) {
    return this._HttpClient
      .post<any>("http://localhost/mobily/register.php", { name, email, pwd })
      .pipe(
        map((Users) => {
          return Users;
        })
      );
  }

  //token
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    localStorage.removeItem("token");
  }
  isLoggedIn() {
    const usertoken = this.getToken();

    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
