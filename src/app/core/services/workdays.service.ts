import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workday } from 'src/app/shared/models/workday';
import { Task } from 'src/app/shared/models/task';
import { ToastrService } from './toastr.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { tap, catchError, finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkdaysService {

  constructor(private http: HttpClient, private toastrService: ToastrService,
    private errorService: ErrorService,
    private loaderService: LoaderService) { }

  save(workday: Workday) {
    const url = `${environment.firebase.firestore.baseURL}/workdays?key=${environment.firebase.apiKey}`;
    const data = this.getWorkdayForFirestore(workday); // C'est cette ligne qui est un peu plus costaud que d'habitude...
    const jwt: string = localStorage.getItem('token')!;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${jwt}`
      })
    };
    this.loaderService.setLoading(true);

    return this.http.post(url, data, httpOptions).pipe(
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Votre journée de travail a été enregistrée avec succès.'
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  private getWorkdayForFirestore(workday: Workday): any {
    if(typeof workday.dueDate === 'string') {
     workday.dueDate = +workday.dueDate;
    }
    const date: number = new Date(workday.dueDate).getTime();
    const tasks: Object = this.getTaskListForFirestore(workday.tasks);
    
    return {
     fields: {
      dueDate: { integerValue: date },
      tasks: tasks,
      notes: { stringValue: workday.notes },
      userId: { stringValue: workday.userId }
     }
    };
   }

   private getTaskListForFirestore(tasks: Task[]): any {
    const taskList: any = {
     arrayValue: {
      values: []
     }
    };
    
    tasks.forEach(task => taskList.arrayValue.values.push(this.getTaskForFirestore(task)));
    
    return taskList;
   }

   private getTaskForFirestore(task: Task): any {
    return {
     mapValue: {
      fields: {
       title: { stringValue: task.title },
       todo: { integerValue: task.todo },
       done: { integerValue: task.done },
       completed: { booleanValue: false } 
      }
     }
    }
   }
}
