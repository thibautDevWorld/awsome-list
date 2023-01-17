import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.workdayForm = this.createWorkdayForm();
  }

  get dueDate() { return this.workdayForm.get('dueDate') as FormControl }
  get notes() { return this.workdayForm.get('notes') as FormControl }
  get tasks() { return this.workdayForm.get('tasks') as FormArray }


  createWorkdayForm(): FormGroup {
    const workdayForm: FormGroup = this.fb.group({
      'dueDate': '',
      'tasks': this.fb.array([]),
      'notes': '',
    })
    return workdayForm;
  }

  submit(): void {
    console.info(this.workdayForm.value)
  }

}
