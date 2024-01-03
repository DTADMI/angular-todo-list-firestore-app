import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {LoggerService} from "../../services/logger/logger.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const loggerService: LoggerService = inject(LoggerService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      const errorMessage = error.message;
      const errorStatus = error.status;
      if([401, 403].includes(errorStatus)){
        loggerService.error("Unauthorized request");
        authService.logout()
          .subscribe({
            next: (message: string) =>{
              loggerService.log(message);
              authService.clearAllToken();
              router.navigate(['unauthorized']);
            },
            error: (error) =>{
              loggerService.error(`Error while logging out : ${JSON.stringify(error)}`)
            }
          });
      }
      if(errorStatus === 404){
        loggerService.error(errorMessage || "Resource not found");
        router.navigate(['not-found']);
      }
      loggerService.error(errorMessage)
      return throwError(() => error);
    })
  );
};
