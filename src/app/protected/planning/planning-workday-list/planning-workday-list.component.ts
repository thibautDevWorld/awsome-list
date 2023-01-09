import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {
  
  workdays$: Observable<{ dueDate: string, doneTasks: number, remainingTasks: number }[]>;
   
  constructor() { }
   
  ngOnInit() {
   
   this.workdays$ = of([
    { dueDate: 'Vendredi', doneTasks: 1, remainingTasks: 3 },
    { dueDate: 'Mardi', doneTasks: 1, remainingTasks: 2 },
    { dueDate: 'Mercredi', doneTasks: 1, remainingTasks: 0 }
   ]).pipe(delay(1000));
   
  }
   
 }