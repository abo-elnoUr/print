import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";
import { Product } from "./../../product";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/auth.service";

declare var require: any;

@Component({
  selector: "app-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.css"],
})
export class PrintComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
  });
  today = new Date();
  jstoday = "";

  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _AuthService: AuthService
  ) {
    let formatDate = require("dateformat");
    this.jstoday = formatDate(this.today, "yyyy-mm-dd - h:MM:ss TT ");
  }

  addForm: FormGroup;
  mydisc: number = 0;
  disscount: any = 0;
  products: Product[];
  newdata: Product[];
  newdata2;
  allprice: any[];
  finaly: any = 0;
  merged;
  val;
  val2;
  nameCustomer;
  customerName;
  data;
  username;
  payed;

  ngOnInit() {
    this.addForm = this._FormBuilder.group({
      namecustomer: ["", Validators.required],
      mobile: ["", Validators.required],
      pay: ["", Validators.required],
    });
    this._UserService.print().subscribe((data) => {
      this.newdata = data;
      this._UserService.pricePill().subscribe((dataa) => {
        this.allprice = dataa;
        for (let i = 0; i < this.allprice.length; i++) {
          this.finaly += parseFloat(this.allprice[i]);
        }
      });
    });
    this.data = window.localStorage.getItem("token");
    if (this.data) {
      this.username = this.data;
    } else {
      this.username = "user";
    }
    this._UserService.namecustomer = this.customerName;
  }

  onSubmit() {
    // this.newdata2 = this.newdata[0];
    for (this.val of this.newdata) {
      this.newdata2 = this.val;

      this.merged = Object.assign(this.newdata2, this.addForm.value);
      this._UserService.addCustomer(this.merged).subscribe((dataa) => {
        this._ToastrService.success("Customer Added", "", {
          timeOut: 3000,
        });
      });
      this._UserService.updateSells(this.merged).subscribe(() => {});
      this._UserService.storePill(this.merged).subscribe(() => {});
    }

    this.nameCustomer = this.addForm.value;
    this.customerName = this.nameCustomer[Object.keys(this.nameCustomer)[0]];
    this.payed = this.nameCustomer[Object.keys(this.nameCustomer)[2]];
  }

  printComponent(serial) {
    this._Router.navigate(["printpill/" + serial]);
    // this._UserService.rest().subscribe((datam) => {
    //   // this.products.filter(u => u !== i);
    // });
  }
}
