import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
declare var require: any;
const bcrypt = require("./../../custom-bcrypt");

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  userData;
  username;
  dbpassword;
  hashed;
  constructor(
    private _AuthService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: ["", [Validators.required, Validators.minLength(1)]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}
  postdata(angForm1) {
    this._AuthService
      .userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.userData = data;
          this.username = this.userData[0].name;

          const redirect = this._AuthService.redirectUrl
            ? this._AuthService.redirectUrl
            : "/admin";
          this.router.navigate([redirect]);
        },
        (error) => {
          alert("User name or password is incorrect");
        }
      );
  }

  get email() {
    return this.angForm.get("email");
  }
  get password() {
    return this.angForm.get("password");
  }
}
