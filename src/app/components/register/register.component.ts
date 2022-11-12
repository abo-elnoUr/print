import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// declare var require: any;
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from "@angular/forms";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  hash;

  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private router: Router,
    private _ToastrService: ToastrService
  ) {
    this.angForm = this.fb.group({
      email: ["", [Validators.required, Validators.minLength(1)]],
      password: ["", Validators.required],
      name: ["", Validators.required],
    });
  }

  ngOnInit() {}
  postdata(angForm1) {
    // bcrypt.hash(angForm1.value.password, saltRounds, function (err, hash) {
    this._AuthService
      .userregistration(
        angForm1.value.name,
        angForm1.value.email,
        angForm1.value.password
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(["login"]);
          this._ToastrService.success("Register Successful", "", {
            timeOut: 3000,
          });
        },

        (error) => {}
      );
    // });
  }

  get email() {
    return this.angForm.get("email");
  }
  get password() {
    return this.angForm.get("password");
  }
  get name() {
    return this.angForm.get("name");
  }
}
