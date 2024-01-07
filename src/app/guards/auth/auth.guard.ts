import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {LoggerService} from "../../services/logger/logger.service";
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loggerService: LoggerService = inject(LoggerService);
  const url: string = state.url;
  loggerService.log(`AuthGuard state url : ${url}`);

  if (!authService.isUserLoggedInSig() && url!=='signin') {
    // Store the attempted URL for redirecting
    authService.setRedirectUrl(url);

    // Navigate to the login page with extras
    router.navigate(['signin']);
    return false;
  }

  return true;
};
