import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authservice: AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
       return next.handle(req)
    }
}