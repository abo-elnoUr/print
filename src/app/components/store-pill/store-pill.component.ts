import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { Customers } from "../../customers";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-store-pill",
  templateUrl: "./store-pill.component.html",
  styleUrls: ["./store-pill.component.css"],
})
export class StorePillComponent implements OnInit {
  storePill: Customers[];
  form: FormGroup;

  public search: any = "";

  constructor(
    private _UserService: UserService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}
  ngOnInit() {
    this.form = this._FormBuilder.group({
      name: [""],
    });
    this._UserService.getStorePill().subscribe((data: Customers[]) => {
      this.storePill = data;
    });
  }
  show(mobile) {
    // this._Router.navigate(["viewpill/", { serial, mobile }]);
    this._Router.navigate(["viewpill/" + mobile]);
  }
  delete(serial, namecustomer) {
    this._UserService.deleteStore(serial, namecustomer).subscribe(() => {
      this._UserService.getStorePill().subscribe((data: Customers[]) => {
        this.storePill = data;
      });
    });
  }
}
