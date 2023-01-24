import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Observable } from 'rxjs';
import { Workday } from 'src/app/shared/models/workday';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {
  workdays: Workday[];
 
 constructor(
  private authService: AuthService,
  private workdaysService: WorkdaysService) { }
 
 ngOnInit() {
   const user: User|null = this.authService.currentUser;
   if(user && user.id) {
       
   this.workdaysService.getWorkdayByUser(user.id).subscribe((workdays: Workday[]) => this.workdays = workdays);
  }
 }
 
 onWorkdayRemoved(workday: Workday) {
  console.info(workday.dueDate);
 }
 }