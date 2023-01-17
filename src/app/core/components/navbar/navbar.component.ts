import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  homePath: string = 'home';
  loginPath: string = 'login';
  registerPath: string = 'register';

  constructor(private router: Router, private layoutService: LayoutService) {}
  
  ngOnInit(): void {}

  toggleSidenav() {
    this.layoutService.toggleSidenav();
  }

  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  public navigate(page: string): void {
    this.router.navigate([page])
  }

}
