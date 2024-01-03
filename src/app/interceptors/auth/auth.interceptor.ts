import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn, HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService : AuthService = inject(AuthService);
    const accessToken = authService.getAccessToken();
    const csrfToken = authService.csrfTokenSig();
    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${accessToken}`,
        "X-XSRF-TOKEN": `${csrfToken}`,
      }
    });
    return next(newCloneRequest);
}
