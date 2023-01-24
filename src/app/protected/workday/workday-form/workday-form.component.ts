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
  styles: [],
})
export class WorkdayFormComponent implements OnInit {
  workdayId: string;
  workdayForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private workdaysService: WorkdaysService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.workdayId = '';
    this.workdayForm = this.createWorkdayForm();
  }

  get dueDate() {
    return this.workdayForm.get('dueDate') as FormControl;
  }
  get notes() {
    return this.workdayForm.get('notes') as FormControl;
  }
  get tasks() {
    return this.workdayForm.get('tasks') as FormArray;
  }

  createWorkdayForm(): FormGroup {
    const workdayForm: FormGroup = this.fb.group({
      dueDate: '',
      tasks: this.fb.array([]),
      notes: '',
    });
    return workdayForm;
  }

  resetWorkdayForm() {
    while (this.tasks.length !== 0) {
      this.tasks.removeAt(0);
    }
    this.notes.reset();
  }

  onDateSelected(displayDate: string) {
    const user: User | null = this.authService.currentUser;

    if (user && user.id) {
      this.workdaysService
        .getWorkdayByDate(displayDate, user.id)
        .subscribe((workday) => {
          this.resetWorkdayForm();
          if (!workday) return;

          this.workdayId = workday.id as string;
          this.notes.setValue(workday.notes);
          workday.tasks.forEach((task) => {
            const taskField: FormGroup = this.fb.group({
              title: task.title,
              todo: task.todo,
              done: task.done,
            });
            this.tasks.push(taskField);
          });
        });
    }
  }

  submit(): void {
    const user: User | null = this.authService.currentUser;

    if (!(user && user.id)) {
      return;
    }
    // update workday
    if (this.workdayId) {
      const workdayToUpdate: Workday = new Workday({
        ...this.workdayForm.value,
        userId: user.id,
        id: this.workdayId,
      });

      this.workdaysService.update(workdayToUpdate).subscribe({
        next: () => this.router.navigate(['/app/planning']),
        error: () => this.workdayForm.reset(),
      });
      return;
    }
    // Create workday
    const workdayToCreate = new Workday({
      ...this.workdayForm.value,
      userId: user.id,
    });
    this.workdaysService.save(workdayToCreate).subscribe({
      next: () => this.router.navigate(['/app/planning']),
      error: () => this.workdayForm.reset(),
    });
  }
}
