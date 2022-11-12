import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _UserService: UserService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  addForm: FormGroup;
  ngOnInit() {
    this.addForm = this._FormBuilder.group({
      serial: ["", Validators.required],
      name: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      price2: ["", Validators.required],
    });
  }

  onSubmit() {
    this._UserService.addProduct(this.addForm.value).subscribe((data) => {
      this._Router.navigate(["admin"]);
      this._ToastrService.success("Product Added", "", {
        timeOut: 3000,
      });
      this.addForm.get("serial").setValue("");
      this.addForm.get("name").setValue("");
      this.addForm.get("quantity").setValue("");
      this.addForm.get("price").setValue("");
      this.addForm.get("price2").setValue("");
    });
  }
}
