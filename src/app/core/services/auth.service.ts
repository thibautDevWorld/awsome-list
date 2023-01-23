import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  switchMap,
  tap,
  of,
  catchError,
  finalize,
  delay,
} from 'rxjs';
import { User } from 'src/app/shared/models/user';

import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  readonly user$: Observable<User | null> = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private errorService: ErrorService,
    private loaderService: LoaderService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  public register(
    name: string,
    email: string,
    password: string
  ): Observable<User | null> {
    const url: string = `${environment.firebase.auth.baseURL}/signupNewUser?key=${environment.firebase.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.loaderService.setLoading(true);

    return this.http.post(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const jwt: string = data.idToken;
        const user = new User({
          email: data.email,
          id: data.localId,
          name: name,
        });
        this.saveAuthData(data.localId, jwt);
        return this.usersService.save(user, jwt);
      }),
      tap((user) => this.user.next(user)),
      tap((_) => this.logoutTimer(3600)),
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  public login(email: string, password: string): Observable<User | null> {
    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=
    ${environment.firebase.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.loaderService.setLoading(true);

    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        this.saveAuthData(data.localId, jwt);
        return this.usersService.get(userId, jwt);
      }),
      tap((user) => this.user.next(user)),
      tap((_) => this.logoutTimer(3600)),
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  logout(): void {
    localStorage.removeItem('expirationDate'); // Ajoutez cette ligne,
    localStorage.removeItem('token'); // Et celle-ci aussi,
    localStorage.removeItem('userId'); // Et enfin celle-là !
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  private logoutTimer(expirationTime: number): void {
    of(true)
      .pipe(delay(expirationTime * 1000))
      .subscribe((_) => this.logout());
  }

  private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  autoLogin(user: User) {
    this.user.next(user);
    this.router.navigate(['app/dashboard']);
  }

  updateUserState(user: User): Observable<User | null> {
    this.loaderService.setLoading(true);
    return this.usersService.update(user).pipe(
      tap((user) => this.user.next(user)),
      tap((_) =>
        this.toastrService.showToastr({
          category: 'success',
          message: 'Vos informations ont été mises à jour !',
        })
      ),
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  get currentUser(): User | null {
    return this.user.getValue();
  }
}
