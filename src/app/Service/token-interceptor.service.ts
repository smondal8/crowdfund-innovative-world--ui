import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TokenService } from './token.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
 constructor(private tokenService: TokenService, private toastr: ToastrService) { }

 intercept(req: HttpRequest<any>, next: HttpHandler) {
   let authReq = req;
   const token = this.tokenService.getToken();
   if (token != null) {
     authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
   }
   // return next.handle(authReq);

   return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
     return throwError(error.error.message);
   }));
 }
}

export const authInterceptorProviders = [
 { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
