import { ApplicationConfig } from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import {provideClientHydration, withHttpTransferCacheOptions} from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptors/auth/auth.interceptor";
import {cachingInterceptor} from "./interceptors/caching/caching.interceptor";
import {loggerInterceptor} from "./interceptors/logger/logger.interceptor";
import {errorInterceptor} from "./interceptors/error/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions()
    ),
    provideClientHydration(withHttpTransferCacheOptions({
      includePostRequests: true
    })),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, cachingInterceptor, loggerInterceptor, errorInterceptor]))
  ]
};
