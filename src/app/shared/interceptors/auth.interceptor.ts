import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { inject } from "@angular/core";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const token = inject(AuthService).token();

    // console.log(`Request to ${req.url} with method ${req.method} and headers:`, req.headers);
    
    const newReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }