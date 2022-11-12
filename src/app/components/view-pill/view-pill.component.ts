import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "./../../product";

@Component({
  selector: "app-view-pill",
  templateUrl: "./view-pill.component.html",
  styleUrls: ["./view-pill.component.css"],
})
export class ViewPillComponent implements OnInit {
  taskserial;
  pill;
  username;
  data;
  mobile;

  constructor(
    private _UserService: UserService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {
    // this.taskserial = this._ActivatedRoute.snapshot.paramMap.get("serial");
    this.mobile = this._ActivatedRoute.snapshot.paramMap.get("mobile");
  }

  ngOnInit() {
    this._UserService.getOnePill(this.mobile).subscribe((data) => {
      this.pill = data;
    });
    this.data = window.localStorage.getItem("token");
    if (this.data) {
      this.username = this.data;
    } else {
      this.username = "user";
    }
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
  }
}
