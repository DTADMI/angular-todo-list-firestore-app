import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";
import {LoggerService} from "../../services/logger/logger.service";

export const publicGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loggerService: LoggerService = inject(LoggerService);
  const url: string = state.url;
  loggerService.log(`PublicGuard state url : ${url}`);

  if (authService.isUserLoggedInSig() && url!=='todolist') {

    // Navigate to the home page with extras
    router.navigate(['todolist']);
    return false;
  }

  return true;
};
