import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();
  if (accessToken) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['signin']);
  }
};
