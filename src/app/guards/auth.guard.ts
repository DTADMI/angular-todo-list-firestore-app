import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject/*, PLATFORM_ID*/} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
//import {isPlatformServer} from "@angular/common";

//const authService = inject(AuthService);
//const accessToken = authService.getAccessToken();
//const platformId = inject(PLATFORM_ID);
//const router = inject(Router);
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const url: string = state.url;
  return checkLogin(url);
  /*if (accessToken) {
    return true;
  } else {
    return router.navigate(['signin']);
  }*/

};
const checkLogin = (url: string): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  /*const platformId = inject(PLATFORM_ID);
  // Return if the platform is server
  if (isPlatformServer(platformId)){
    return true;
  }*/
  if (authService.isLoggedInSig()) {
    return true;
  }
  // Store the attempted URL for redirecting
  authService.setRedirectUrl(url);

  // Navigate to the login page with extras
  router.navigate(['signin']);
  return false;
}
