import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators'

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent {
  workdays$: Observable<{ dueDate: string, doneTasks: number, remainingTasks: number }[]>;

  ngOnInit(): void {
    this.workdays$ = of([
      { dueDate: 'Lundi', doneTasks: 1, remainingTasks: 3 },
      { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 2 },
      { dueDate: 'Mercredi', doneTasks: 0, remainingTasks: 1 }
     ]).pipe(delay(1000));
  }
}
