import { Component, OnInit } from '@angular/core';
import { User } from './models/general.models';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public userData: User = {} as User;
  public isVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if (this.authService.getToken() && this.authService.getUser()) {
      this.authService.userDetailBS.next(JSON.parse(this.authService.getUser()));
    }
    this.authService.userDetail$.subscribe((userDetail: User) => {
      if (userDetail && userDetail.id) {
        this.userData = userDetail;
        this.isVisible = true;
      }
    });
  }

  public logout(): void {
    this.authService.logout().subscribe(() => this.authService.removeAll());
    this.router.navigate(['login']);
    this.isVisible = false;
    this.userData = {} as User;
  }

}
