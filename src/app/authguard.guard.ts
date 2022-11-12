import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { AuthService } from "src/app/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthguardGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const routeurl: string = state.url;
    return this.isLogin(routeurl);
  }

  isLogin(routeurl: string) {
    if (this._AuthService.isLoggedIn()) {
      return true;
    }

    this._AuthService.redirectUrl = routeurl;
    this.router.navigate(["/login"], { queryParams: { returnUrl: routeurl } });
  }
}
