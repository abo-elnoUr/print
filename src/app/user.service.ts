import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product";
import { Router } from "@angular/router";
import { Customers } from "./customers";

@Injectable({
  providedIn: "root",
})
export class UserService {
  namecustomer;
  constructor(private _HttpClient: HttpClient, private router: Router) {}

  getProducts() {
    return this._HttpClient.get<Product[]>("http://localhost/mobily/view.php");
  }
  getCustomers() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/getCustomers.php"
    );
  }

  getStorePill() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/getStorePill.php"
    );
  }

  search(serial) {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/search.php?serial=" + serial
    );
  }

  search_name(name) {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/search_name.php?name=" + name
    );
  }

  resetProducts(serial, quantity) {
    return this._HttpClient.put<Product[]>(
      "http://localhost/mobily/resetProducts.php?serial=" + serial,
      { quantity }
    );
  }

  delete(serial) {
    return this._HttpClient.delete<Product[]>(
      "http://localhost/mobily/delete.php?serial=" + serial
    );
  }

  addProduct(product: Product) {
    return this._HttpClient.post("http://localhost/mobily/insert.php", product);
  }

  update(product: Product) {
    return this._HttpClient.put(
      "http://localhost/mobily/update.php?serial=" + product.serial,
      product
    );
  }

  /////////////////////////

  addPill(product: Product) {
    return this._HttpClient.post(
      "http://localhost/mobily/insert2.php",
      product
    );
  }

  storePill(product: Product) {
    return this._HttpClient.post(
      "http://localhost/mobily/storePill.php",
      product
    );
  }

  deleteStore(serial, namecustomer) {
    return this._HttpClient.put<Product[]>(
      "http://localhost/mobily/deleteStore.php?serial=" + serial,
      { namecustomer }
    );
  }

  getOnePill(mobile) {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/getOnePill.php?mobile=" + mobile
    );
  }

  // getOnePill(mobile, serial) {
  //   return this._HttpClient.get<Product[]>(
  //     "http://localhost/mobily/getOnePill.php?serial=" +
  //       serial +
  //       "&mobile=" +
  //       mobile
  //   );
  // }

  showPill() {
    return this._HttpClient.get<Product[]>("http://localhost/mobily/pill.php");
  }

  updateProducts(product: Product) {
    return this._HttpClient.post("http://localhost/mobily/insert.php", product);
  }

  addCustomer(product: number) {
    return this._HttpClient.post(
      "http://localhost/mobily/addCustomer.php",
      product
    );
  }

  updatePay(installment, namecustomer, serial) {
    return this._HttpClient.put<Customers[]>(
      "http://localhost/mobily/updatePay.php?serial=" + serial,
      { installment, namecustomer }
    );
  }

  print() {
    return this._HttpClient.get<Product[]>("http://localhost/mobily/pill.php");
  }

  rest() {
    return this._HttpClient.delete<Product[]>(
      "http://localhost/mobily/resetPill.php"
    );
  }

  restSells() {
    return this._HttpClient.delete<Product[]>(
      "http://localhost/mobily/resetSells.php"
    );
  }

  restyearSells() {
    return this._HttpClient.delete<Product[]>(
      "http://localhost/mobily/resetyearSells.php"
    );
  }

  pricePill() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/pillPrice.php"
    );
  }

  priceSells() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/sellsPrice.php"
    );
  }

  priceSells2() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/sellsPrice2.php"
    );
  }

  priceyearSells() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/yearsellsPrice.php"
    );
  }

  priceyearSells2() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/yearsellsPrice2.php"
    );
  }

  addSells(product: Product) {
    return this._HttpClient.post(
      "http://localhost/mobily/addSells.php",
      product
    );
  }

  updateSells(product: Product) {
    return this._HttpClient.put(
      "http://localhost/mobily/updateSells.php?serial=" + product.serial,
      product
    );
  }

  addyearSells(product: Product) {
    return this._HttpClient.post(
      "http://localhost/mobily/yearsells.php",
      product
    );
  }

  showSells() {
    return this._HttpClient.get<Product[]>("http://localhost/mobily/sells.php");
  }

  showyearSells() {
    return this._HttpClient.get<Product[]>(
      "http://localhost/mobily/showsells.php"
    );
  }

  deleteRow(serial) {
    return this._HttpClient.delete<Product[]>(
      "http://localhost/mobily/deleteRow.php?serial=" + serial
    );
  }

  deleteRowYearSells(serial) {
    return this._HttpClient.delete<Product[]>(
      "http://localhost/mobily/deleteRowYearSells.php?serial=" + serial
    );
  }

  deleteRowPill(serial) {
    return this._HttpClient.delete<Product[]>(
      "http://localhost/mobily/deleteRowPill.php?serial=" + serial
    );
  }

  deleteCustomer(serial, namecustomer) {
    return this._HttpClient.put<Customers[]>(
      "http://localhost/mobily/deleteCustomer.php?serial=" + serial,
      { namecustomer }
    );
  }
}
