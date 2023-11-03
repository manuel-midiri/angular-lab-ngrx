import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RefreshTokenRequest } from './models/general.models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem('refresh_token_labanalysis')!;
    const accessToken = localStorage.getItem('access_token_labanalysis')!;
    const refreshData: RefreshTokenRequest = { accessToken, refreshToken };

    if (accessToken && !this.isTokenExpired()) {
      request = this.addAuthenticationToken(request, accessToken);
    }
    return next.handle(request).pipe(catchError(error => {
      if (error.status === 401 && this.isTokenExpired()) {
        if (this.refreshTokenInProgress) {
          return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request, accessToken)))
          );
        } else {
          this.refreshTokenInProgress = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refreshToken(refreshData).pipe(
            switchMap((tokenResponse: any) => {
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(tokenResponse.accessToken);

              localStorage.setItem('access_token_labanalysis', tokenResponse.accessToken);
              localStorage.setItem('refresh_token_labanalysis', tokenResponse.refreshToken);
              localStorage.setItem('access_token_labanalysis_expirationDate', tokenResponse.accessTokenExpirationDate);
              localStorage.setItem('refresh_token_labanalysis_expirationDate', tokenResponse.refreshTokenExpirationDate);

              return next.handle(this.addAuthenticationToken(request, tokenResponse.accessToken));
            }),
            catchError((err: any) => {
              this.refreshTokenInProgress = false;
              return throwError(err);
            })
          );
        }
      } else {
        return throwError(error);
      }
    }));
  }

  addAuthenticationToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  isTokenExpired(): boolean {
    const expirationDate = new Date(localStorage.getItem('access_token_labanalysis_expirationDate')!).toISOString();
    const currentDate = new Date().toISOString();
    return expirationDate < currentDate;
  }
  
  
  
  
  
  
}
