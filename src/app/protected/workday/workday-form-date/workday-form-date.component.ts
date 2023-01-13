import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'al-workday-form-date',
  templateUrl: './workday-form-date.component.html',
  styles: [
  ]
})
export class WorkdayFormDateComponent implements OnInit {
  @Input() dueDate: FormControl;

  constructor(private localService: BsLocaleService) {}

  ngOnInit(): void {
    this.localService.use('fr');
  }
}
