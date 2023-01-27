import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Form } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DateService } from 'src/app/core/services/date.service';

@Component({
  selector: 'al-workday-form-date',
  templateUrl: './workday-form-date.component.html',
  styles: [
  ]
})
export class WorkdayFormDateComponent implements OnInit {
  @Input() dueDate: FormControl;
  @Output() dateSelected = new EventEmitter<string>();

  constructor(private localService: BsLocaleService, private dateService: DateService) {}

  ngOnInit(): void {
    this.localService.use('fr');
  }

  selectDate(date: Date): void {
    if(date) {
      const displayDate: string = this.dateService.getDisplayDate(date);
      console.log(displayDate)
      this.dateSelected.emit(displayDate);
    }
  }
}
