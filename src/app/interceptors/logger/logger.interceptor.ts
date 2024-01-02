import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoggerService} from "../../services/logger/logger.service";

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const loggerService: LoggerService = inject(LoggerService);
  loggerService.log(`Executing request ${req.url}`);
  return next(req);
};
