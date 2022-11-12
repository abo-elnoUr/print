import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  loginbtn: boolean;
  logoutbtn: boolean;
  constructor(private _AuthService: AuthService) {
    _AuthService.getLoggedInName.subscribe((name) => this.changeName(name));
    if (this._AuthService.isLoggedIn()) {
      // console.log("loggedin");
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }

  ngOnInit() {}
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this._AuthService.deleteToken();
    window.location.href = window.location.href;
  }
}
