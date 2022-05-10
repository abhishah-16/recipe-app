import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

interface Authresponsedata {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(
        null
    )
    private tokentimer: any

    constructor(private http: HttpClient,
        private router: Router) { }

    signUp(email: string, password: string) {
        return this.http
            .post<Authresponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBInjfNk13KW6ZHkMiYlFzri8f4-l7NHb0',
                {
                    email,
                    password,
                    returnSecureToken: true
                })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                })
            )
    }
    logIn(email: string, password: string) {
        return this.http
            .post<Authresponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBInjfNk13KW6ZHkMiYlFzri8f4-l7NHb0',
                {
                    email,
                    password,
                    returnSecureToken: true
                })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                })
            )
    }
    autoLogin() {
        const userdata: {
            email: string;
            id: string;
            _token: string;
            _tokenexpdate: string


        } = JSON.parse(localStorage.getItem('userData'))
        if (!userdata) {
            return
        }
        const loadeduser = new User(userdata.email,
            userdata.id,
            userdata._token,
            new Date(userdata._tokenexpdate))
        if (loadeduser.token) {
            this.user.next(loadeduser)
            const expirationduration = new Date(userdata._tokenexpdate).getTime() - new Date().getTime()
            this.autoLogout(expirationduration)
        }
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['auth'])
        localStorage.removeItem('userData')
        if (this.tokentimer) {
            clearTimeout(this.tokentimer)
        }
        this.tokentimer = null
    }

    autoLogout(expiration: number) {
        this.tokentimer = setTimeout(() => {
            this.logout()
        }, expiration)
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expdate: number) {
        // console.log(resData)
        const expDate = new Date(new Date().getTime() + expdate * 1000)
        const user = new User(
            email,
            userId,
            token,
            expDate)
        this.user.next(user);
        this.autoLogout(expdate * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }
    private handleError(errRes: HttpErrorResponse) {
        let errmsg = 'An unknown error occured'
        // console.log(errRes)
        if (!errRes.error || !errRes.error.error) {
            return throwError(()=>{
                new Error(errmsg)
            })
        }
        switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errmsg = 'This email is already associated with an account.'
                break;
            case 'EMAIL_NOT_FOUND':
                errmsg = 'Incorrect Email'
                break;
            case 'INVALID_PASSWORD':
                errmsg = 'Incorrect Password'
                break;
        }
        return throwError(()=>{
            new Error(errmsg)
        })
    }
}
// AIzaSyBInjfNk13KW6ZHkMiYlFzri8f4-l7NHb0
