import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent {
 
  @Input() workday: Workday; // nouveau, tout le reste a été nettoyé :)
  @Output() workdayRemoved = new EventEmitter<Workday>();
  
  removeWorkday(workday: Workday) {
   this.workdayRemoved.emit(workday); // dueDate devient workday !
  }
 }
