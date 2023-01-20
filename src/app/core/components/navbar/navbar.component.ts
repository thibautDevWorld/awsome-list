import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  homePath: string = 'home';
  loginPath: string = 'login';
  registerPath: string = 'register';
  user: User|null;
  private subcription: Subscription;

  constructor(private router: Router, private layoutService: LayoutService, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.subcription = this.authService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }


  toggleSidenav() {
    this.layoutService.toggleSidenav();
  }

  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  public navigate(page: string): void {
    this.router.navigate([page])
  }

  logout() {
    this.authService.logout();
  }

}
