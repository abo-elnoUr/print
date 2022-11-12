import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "./../../product";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-myedit",
  templateUrl: "./myedit.component.html",
  styleUrls: ["./myedit.component.css"],
})
export class MyeditComponent implements OnInit {
  taskserial;
  name;
  serial: any;
  serial_m;
  name_m;
  price_m;
  price_m2;
  quantity_m;
  myid: any;
  products: Product[];
  form: FormGroup;

  constructor(
    private _UserService: UserService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private route: ActivatedRoute,
    private _ToastrService: ToastrService
  ) {
    this.taskserial = this.route.snapshot.paramMap.get("id");
    this.name = this.route.snapshot.paramMap.get("name");
    if (this.taskserial) {
      this._UserService.search(this.taskserial).subscribe((data) => {
        this.products = data;
        this.serial = this.products[0];
        this.serial_m = this.serial.serial;
        this.name_m = this.serial.name;
        this.price_m = this.serial.price;
        this.price_m2 = this.serial.price2;
        this.quantity_m = this.serial.quantity;
        this.form = this._FormBuilder.group({
          serial: [""],
          name: [""],
          price: [""],
          price2: [""],
          quantity: [""],
        });
      });
    } else {
      this._UserService.search_name(this.name).subscribe((data) => {
        this.products = data;
        this.serial = this.products[0];
        this.serial_m = this.serial.serial;
        this.name_m = this.serial.name;
        this.price_m = this.serial.price;
        this.price_m2 = this.serial.price2;
        this.quantity_m = this.serial.quantity;
        this.form = this._FormBuilder.group({
          serial: [""],
          name: [""],
          price: [""],
          price2: [""],
          quantity: [""],
        });
      });
    }
  }

  ngOnInit() {}

  onDelete(): void {
    this._UserService.delete(this.serial_m).subscribe((data) => {
      // this.products.filter(u => u !== i);
    });
    this._Router.navigate(["edit"]);
    this._ToastrService.error("Product Deleted", "", {
      timeOut: 3000,
    });
  }

  onUpdate() {
    this._UserService.update(this.form.value).subscribe(() => {
      this._Router.navigate(["edit"]);
      this._ToastrService.info("Product Updated", "", {
        timeOut: 3000,
      });
    });
  }
}
