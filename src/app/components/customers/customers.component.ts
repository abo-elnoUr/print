import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "../../user.service";
import { Customers } from "../../customers";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"],
})
export class CustomersComponent implements OnInit {
  customers: Customers[];
  form: FormGroup;
  myid: any;
  public search: any = "";

  constructor(
    private _UserService: UserService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit() {
    this.form = this._FormBuilder.group({
      name: [""],
    });
    this._UserService.getCustomers().subscribe((data: Customers[]) => {
      this.customers = data;
    });
  }

  deleteRow(serial: any, namecustomer) {
    this._UserService.deleteCustomer(serial, namecustomer).subscribe((data) => {
      this._UserService.getCustomers().subscribe((data: Customers[]) => {
        this.customers = data;
      });
      // this.products.filter(u => u !== i);
      // this._Router.navigate(["products"]);
      this._ToastrService.error("Customer Deleted", "", {
        timeOut: 3000,
      });
    });
  }
}
