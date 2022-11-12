import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { UserService } from "../../user.service";
import { Product } from "../../product";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  form: FormGroup;
  myid: any;
  public search: any = "";

  constructor(
    private _UserService: UserService,
    private _FormBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._FormBuilder.group({
      name: [""],
    });
    this._UserService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  // onClick(name:any)
  // {
  //   console.log(this.form.value)
  //

  // }
}
