import { Component, Input, OnInit } from '@angular/core';
import { Workday } from 'src/app/shared/models/workday';
import { interval, Observable, of, Subject } from 'rxjs';
import { delay, map, takeUntil, takeWhile } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'al-dashboard-workday',
  templateUrl: './dashboard-workday.component.html',
  styleUrls: ['./dashboard-workday.component.scss'],
})
export class DashboardWorkdayComponent implements OnInit {
  currentTask: Task | undefined;
  isWorkdayComplete: boolean;

  @Input() workday: Workday;
  isPomodoroActive: boolean;

  startPomodoro$: Subject<string>;
  cancelPomodoro$: Subject<string>;
  completePomodoro$: Subject<string>;
  currentProgress: number;
  maxProgress: number;
  pomodoro$: Observable<number>;

  constructor(
    private workdaysService: WorkdaysService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isPomodoroActive = false;
    this.startPomodoro$ = new Subject();
    this.cancelPomodoro$ = new Subject();
    this.completePomodoro$ = new Subject();
    this.currentProgress = 0;
    const user: User | null = this.authService.currentUser;
    if (user) {
      this.maxProgress = user.pomodoroDuration;
    }
    this.pomodoro$ = interval(1000).pipe(
      takeUntil(this.cancelPomodoro$),
      takeUntil(this.completePomodoro$),
      takeWhile((progress) => progress <= this.maxProgress),
      map((x) => x + 1)
    );
    this.isWorkdayComplete = this.getCurrentTask() === undefined;
  }

  startPomodoro() {
    this.isPomodoroActive = true;
    this.startPomodoro$.next('start');

    this.pomodoro$.subscribe((currentProgress) => {
      this.currentProgress = currentProgress;
    });

    if (this.currentProgress === this.maxProgress) {
      of(0)
        .pipe(delay(500))
        .subscribe((_) => this.completePomodoro());
    }
  }

  cancelPomodoro() {
    this.isPomodoroActive = false;
    this.cancelPomodoro$.next('cancel');
  }

  completePomodoro() {
    this.completePomodoro$.next('complete');
    this.isPomodoroActive = false;

    this.currentTask = this.getCurrentTask();

    if (this.currentTask) {
      this.currentTask.done++;
    }

    this.isWorkdayComplete = this.getCurrentTask() === undefined;

    this.workdaysService.update(this.workday).subscribe();
  }

  getCurrentTask(): Task | undefined {
    return this.workday.tasks.find((task) => task.todo > task.done);
  }
}
