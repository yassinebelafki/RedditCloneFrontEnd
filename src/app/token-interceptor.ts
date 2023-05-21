import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {RegistrationService} from "./login/services/registration.service";
import {LoginResponsePayload} from "./login/LoginModels/LoginResponsePayload";



@Injectable(
  {providedIn:"root"}
)
export class TokenInterceptor implements HttpInterceptor {
  private isTokenRefreshing: Boolean;
  private refreshTokenSubject:BehaviorSubject<any>= new BehaviorSubject<any>(null);

  constructor(private authService:RegistrationService) {
  }
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
    }
    const jwtToken = this.authService.getJwt();

    return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse
        && error.status === 403) {
        return this.handleAuthErrors(req, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers : req.headers.set("Authorization","Bearer "+jwtToken)
    })
  }
  // @ts-ignore
  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponsePayload) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req,
            refreshTokenResponse.authenticationToken));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req,
            this.authService.getJwt()))
        })
      );
    }
  }
}
