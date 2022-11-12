import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";
import { Product } from "./../../product";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sale",
  templateUrl: "./sale.component.html",
  styleUrls: ["./sale.component.css"],
})
export class SaleComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _UserService: UserService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  addForm: FormGroup;
  products: Product[];
  myserial;
  myquantity;
  name;
  sells: Product[];
  product: Product;

  ngOnInit() {
    this.addForm = this._FormBuilder.group({
      serial: ["", Validators.required],
      quantity: ["", Validators.required],
      name: ["", Validators.required],
    });
    this._UserService.showPill().subscribe((dd) => {
      this.newdata = dd;
    });
  }

  newdata: Product[];

  mine: any;
  serial: any;
  serial2;
  quantity: number;
  show: boolean = false;
  allQuantity;

  onSubmit(quantity) {
    this.myserial = this.addForm.value.serial;
    this.quantity = quantity;

    this.name = this.addForm.value.name;
    if (this.myserial) {
      this._UserService.search(this.myserial).subscribe((data) => {
        this.products = data;
        this.addForm.get("serial").setValue("");
        this.addForm.get("quantity").setValue("");
        this.addForm.get("name").setValue("");
        this.mine = this.products[0];
        this.myquantity = this.mine.quantity;

        if (this.myquantity == 0) {
          this.show = true;
          // this._UserService.delete(this.myserial).subscribe((data) => {});
        } else {
          this._UserService.addSells(this.mine).subscribe((dataaa) => {});

          this._UserService
            .addyearSells(this.mine)
            .subscribe((yearsells) => {});

          this._UserService.addPill(this.mine).subscribe((prod) => {
            this._UserService.showPill().subscribe((data) => {
              this.newdata = data;
            });
          });
          this._UserService
            .resetProducts(this.myserial, this.quantity)
            .subscribe((datas) => {});
        }
      });
    }
    if (this.name) {
      this._UserService.search_name(this.name).subscribe((data) => {
        this.products = data;
        this.addForm.get("serial").setValue("");
        this.addForm.get("quantity").setValue("");
        this.addForm.get("name").setValue("");
        this.mine = this.products[0];
        this.myquantity = this.mine.quantity;

        if (this.myquantity == 0) {
          this.show = true;
          // this._UserService.delete(this.myserial).subscribe((data) => {});
        } else {
          this._UserService.addSells(this.mine).subscribe((dataaa) => {});

          this._UserService
            .addyearSells(this.mine)
            .subscribe((yearsells) => {});

          this._UserService.addPill(this.mine).subscribe((prod) => {
            this._UserService.showPill().subscribe((data) => {
              this.newdata = data;
            });
          });
          this._UserService
            .resetProducts(this.myserial, this.quantity)
            .subscribe((datas) => {});
        }
      });
    }
  }

  deleteFromPill(serial, index) {
    this._UserService.deleteRowPill(serial).subscribe(() => {
      this._Router.navigate(["sale"]);
      this._ToastrService.error("Product Deleted", "", {
        timeOut: 3000,
      });
    });

    this.product = this.newdata[index];

    this._UserService.updateProducts(this.product).subscribe((datas) => {
      this._UserService.showPill().subscribe((data) => {
        this.newdata = data;
      });
    });

    this._UserService.deleteRow(serial).subscribe((data) => {});

    this._UserService.deleteRowYearSells(serial).subscribe((data) => {});

    // console.log(this.newdata[index]);
  }
  resetPill() {
    this._UserService.rest().subscribe((datam) => {
      // this.products.filter(u => u !== i);
      this._UserService.showPill().subscribe((data) => {
        this.newdata = data;
      });
    });
  }
}
