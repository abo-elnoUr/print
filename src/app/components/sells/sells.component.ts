import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sells",
  templateUrl: "./sells.component.html",
  styleUrls: ["./sells.component.css"],
})
export class SellsComponent implements OnInit {
  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  allprice: any[];
  allprice2: any[];
  payed: any[];

  finaly: number = 0.0;
  finaly2: number = 0.0;
  payed2: number = 0.0;
  allFinal: number;

  mysells: any;

  ngOnInit() {
    this._UserService.showSells().subscribe((dadada) => {
      this.mysells = dadada;
    });
    this._UserService.priceSells().subscribe((dataa) => {
      this.allprice = dataa;
      for (let i = 0; i < this.allprice.length; i++) {
        this.finaly += parseFloat(this.allprice[i]);
      }
    });

    this._UserService.priceSells2().subscribe((dataa) => {
      this.allprice2 = dataa;
      for (let i = 0; i < this.allprice2.length; i++) {
        this.finaly2 += parseFloat(this.allprice2[i]);
      }

      this.allFinal = this.finaly2 - this.finaly;
    });
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  resetSell() {
    this._UserService.restSells().subscribe((dadada) => {
      // this.products.filter(u => u !== i);

      this._Router.navigate(["home"]);
      this._ToastrService.error("Product Deleted", "", {
        timeOut: 3000,
      });
    });
  }

  deleteRow(serial: any) {
    this._UserService.deleteRow(serial).subscribe((data) => {
      // this.products.filter(u => u !== i);
      this._Router.navigate(["products"]);
      this._ToastrService.error("Product Deleted", "", {
        timeOut: 3000,
      });
    });
  }
}
