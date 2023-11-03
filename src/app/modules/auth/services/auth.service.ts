import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse, RefreshTokenRequest, User } from '../../../models/general.models';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = 'https://frontendtest-backend.azurewebsites.net/api/Users';
  public userDetailBS: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  public userDetail$: Observable<User> = this.userDetailBS.asObservable();

  constructor(private http: HttpClient) { }

  //GESTIONE TOKEN
  public getToken(): string {
    return localStorage.getItem('access_token_labanalysis')!;
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh_token_labanalysis')!;
  }

  public getUser(): string {
    return localStorage.getItem('user_labanalysis')!;
  }

  public saveToken(token: any, expirationDate: any): void {
    localStorage.setItem('access_token_labanalysis', token);
    localStorage.setItem('access_token_labanalysis_expirationDate', expirationDate);
  }

  public saveRefreshToken(refreshToken: any, expirationDate: any): void {
    localStorage.setItem('refresh_token_labanalysis', refreshToken);
    localStorage.setItem('refresh_token_labanalysis_expirationDate', expirationDate);
  }

  public saveUser(user: User): void {
    localStorage.setItem('user_labanalysis', JSON.stringify(user));
  }

  public removeToken(): void {
    localStorage.removeItem('access_token_labanalysis');
    localStorage.removeItem('access_token_labanalysis_expirationDate');
  }

  public removeRefreshToken(): void {
    localStorage.removeItem('refresh_token_labanalysis');
    localStorage.removeItem('refresh_token_labanalysis_expirationDate');
  }

  public removeUser(): void {
    localStorage.removeItem('user_labanalysis');
  }

  //LOGIN
  public login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/Login`, loginData)
  }

  //REFRESH TOKEN
  public refreshToken(refreshData: RefreshTokenRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/RefreshToken`, refreshData).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  

  //LOGOUT
  public logout(): Observable<any> {
    return this.http.get(`${this.API_URL}/Logout`);
  }

  public userInfo(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/Me`)
  }

  public removeAll(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
  }
  
}
