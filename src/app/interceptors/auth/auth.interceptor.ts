import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn, HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    debugger;
    const authService = inject(AuthService);
    const accessToken = authService.accessTokenSig();
    //const accessToken = authService.accessToken$$.getValue();
    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    return next(newCloneRequest);
}
