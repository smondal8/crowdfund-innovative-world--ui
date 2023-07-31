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
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // client-side error
       errorMessage = `Error: ${error.error.message}`;
     } else {
       // server-side error
       if (error && error.error && error.status === 401) {
         // Unauthorizez
         errorMessage = 'Token Error. Logging out!!';
         this.tokenService.signOut();
       } else if (error && error.error && error.error.error) {
         // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
         errorMessage = error.error.error;
       } else {
         errorMessage = 'Internal Server Error';
       }
     }
     //console.log(error);
     // window.alert(errorMessage);
     this.toastr.error(errorMessage);
     return throwError(errorMessage);
   }));
 }
}

export const authInterceptorProviders = [
 { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
