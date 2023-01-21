import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'al-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
   
  prefix: string = 'app';
  dashboardPath: string = `${this.prefix}/dashboard`;
  planningPath: string = `${this.prefix}/planning`;
  workdayPath: string = `${this.prefix}/workday`;
  profilPath: string = `${this.prefix}/profil`;
  parametersPath: string = `${this.prefix}/parameters`;
  subcription: Subscription;
  user: User|null;
   
  constructor(private router: Router, private authService: AuthService) { }
   
  ngOnInit() {
    this.subcription = this.authService.user$.subscribe(user => this.user = user)
  }
   
  public navigate(page: string): void {
   this.router.navigate([page]);
  }
  public isActive(page: string): boolean {
   return this.router.isActive(page, true);
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
 }
