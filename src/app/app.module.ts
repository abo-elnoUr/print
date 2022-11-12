import { NotFoundComponent } from "./components/not-found/not-found.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthguardGuard } from "./authguard.guard";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ThermalPrintModule } from "ng-thermal-print";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { AdminComponent } from "./components/admin/admin.component";
import { EditComponent } from "./components/edit/edit.component";
import { ProductsComponent } from "./components/products/products.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PrintComponent } from "./components/print/print.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SellsComponent } from "./components/sells/sells.component";
import { SearchPipe } from "./search.pipe";
import { MyeditComponent } from "./components/myedit/myedit.component";
import { LoginComponent } from "./components/login/login.component";
import { YearSellsComponent } from "./components/year-sells/year-sells.component";
import { SaleComponent } from "./components/sale/sale.component";
import { RegisterComponent } from "./components/register/register.component";
import { ToastrModule } from "ngx-toastr";
import { CustomersComponent } from "./components/customers/customers.component";
import { StorePillComponent } from "./components/store-pill/store-pill.component";
import { ViewPillComponent } from "./components/view-pill/view-pill.component";
import { PrintPillComponent } from "./components/print-pill/print-pill.component";

const arr: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "navbar", component: NavbarComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthguardGuard] },
  { path: "edit", component: EditComponent, canActivate: [AuthguardGuard] },
  {
    path: "myedit/:id/:name",
    component: MyeditComponent,
    canActivate: [AuthguardGuard],
  },
  { path: "products", component: ProductsComponent },
  { path: "print", component: PrintComponent },
  { path: "sells", component: SellsComponent, canActivate: [AuthguardGuard] },
  {
    path: "yearsells",
    component: YearSellsComponent,
    canActivate: [AuthguardGuard],
  },
  { path: "login", component: LoginComponent },
  // {
  //   path: "register",
  //   component: RegisterComponent,
  //   canActivate: [AuthguardGuard],
  // },
  { path: "sale", component: SaleComponent },
  { path: "customers", component: CustomersComponent },

  { path: "sale/:serial", component: SaleComponent },
  { path: "storepill", component: StorePillComponent },
  { path: "viewpill/:mobile", component: ViewPillComponent },
  { path: "printpill/:name", component: PrintPillComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    EditComponent,
    ProductsComponent,
    NavbarComponent,
    NotFoundComponent,
    PrintComponent,
    FooterComponent,
    SellsComponent,
    SearchPipe,
    MyeditComponent,
    LoginComponent,
    YearSellsComponent,
    SaleComponent,
    RegisterComponent,
    CustomersComponent,
    StorePillComponent,
    ViewPillComponent,
    PrintPillComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(arr),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ThermalPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
