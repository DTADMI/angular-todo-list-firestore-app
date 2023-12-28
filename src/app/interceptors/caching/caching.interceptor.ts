import {inject} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {CacheService} from "../../services/cache/cache.service";

export const cachingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const cacheService = inject(CacheService);

  if(req.method !== 'GET' && req.method !== 'POST') {
    return next(req);
  }

  const cachedResponse = cacheService.get(req.url);
  if(cachedResponse){
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if(event.type === HttpEventType.Response) {
        cacheService.put(req.url, event);
      }
    })
  );
}
