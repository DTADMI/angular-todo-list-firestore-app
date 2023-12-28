import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      const errorMessage = error.message;
      const errorStatus = error.status;
      if([401, 403].includes(errorStatus)){
        console.log("Unauthorized request");
        authService.logout();
      }
      if(errorStatus === 404){
        console.log(errorMessage || "Resource not found");
        router.navigateByUrl('/not-found');
      }
      console.error(errorMessage)
      return throwError(() => error);//.pipe(observeOn(scheduler));
    })
  );
};
