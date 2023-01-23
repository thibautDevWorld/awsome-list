import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Workday } from 'src/app/shared/models/workday';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private workdaysService: WorkdaysService,
    private authService: AuthService) {}

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
    const user: User|null = this.authService.currentUser;
 
    if(user) {
      const workday: Workday = new Workday({ ...this.workdayForm.value, userId: user.id });
      this.workdaysService.save(workday).subscribe({
        next: () => this.router.navigate(['/app/planning']),
        error: () => this.workdayForm.reset()
       });
    }
 }

}
