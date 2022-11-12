import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
declare var require: any;

@Component({
  selector: "app-print-pill",
  templateUrl: "./print-pill.component.html",
  styleUrls: ["./print-pill.component.css"],
})
export class PrintPillComponent implements OnInit {
  today = new Date();
  jstoday = "";
  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    let formatDate = require("dateformat");
    this.jstoday = formatDate(this.today, "yyyy-mm-dd - h:MM:ss TT ");
  }
  addForm: FormGroup;
  newdata;
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
    this.nameCustomer = this._ActivatedRoute.snapshot.paramMap.get("name");

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
    this._UserService.getCustomers().subscribe((name) => {
      this.newdata2 = name;
    });
  }
  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    this._UserService.rest().subscribe((datam) => {
      // this.products.filter(u => u !== i);
    });
    // this._Router.navigate(["home"]);
  }
}
