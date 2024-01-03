import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const url: string = state.url;
  return checkLogin(url);
};

const checkLogin = (url: string): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.isLoggedInSig()) {
    return true;
  }
  // Store the attempted URL for redirecting
  authService.setRedirectUrl(url);

  // Navigate to the login page with extras
  router.navigate(['signin']);
  return false;
}
