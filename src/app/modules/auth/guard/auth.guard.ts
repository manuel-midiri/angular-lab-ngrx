import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.getRefreshToken()) {
      return true;
    }
    this.router.navigate(['/login']).then();

    return false;
  }
  
}
