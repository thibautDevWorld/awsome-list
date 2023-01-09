import { Component, Input } from '@angular/core';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent {

  currentWorkday: { dueDate: string, doneTasks: number, remainingTasks: number };

  @Input()
  set workday(workday: { dueDate: string, doneTasks: number, remainingTasks: number }) {

    this.currentWorkday = workday || {};

    if ('Lundi' === workday.dueDate) {
      this.currentWorkday.dueDate += '(Aujourd\'hui)';
    }
  }
  get workday() { return this.currentWorkday }
}
