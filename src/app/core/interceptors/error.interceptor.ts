import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toasts: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return next.handle(request).pipe(
        catchError(error => {
          if(error)
          {
            if(error.status === 400){
              if(error.error.errors){
                throw error.error;
              }
              else{
                this.toasts.error(error.error.message, error.error.statusCode)
              }
            }
            if(error.status === 401){
                this.toasts.error(error.error.message, error.error.statusCode)
            }
            if(error.status === 404){
                this.router.navigateByUrl('/not-found')
            }
            if(error.status === 500){
                this.router.navigateByUrl('/server-error')
            }
          }
          return throwError(error)
        })
     )
  }
}
