import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  constructor(private _UserService: UserService, private _Router: Router) {}

  ngOnInit() {}

  myid: any;
  name: any;

  onClick(id: any, name: any) {
    // this.myid = id;
    // this.name = name;
    if (name) {
      this.myid = " ";
      this.name = name;
    } else {
      this.myid = id;
      this.name = " ";
    }
    // this._Router.navigate(["myedit/", { id: this.myid, name: this.name }]);
    this._Router.navigate(["myedit/" + this.myid + "/" + this.name]);
  }
}
