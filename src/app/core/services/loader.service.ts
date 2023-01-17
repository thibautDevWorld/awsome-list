import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoading.asObservable();
 
  setLoading(isLoading: boolean): void {
  this.isLoading.next(isLoading);
 }
}
