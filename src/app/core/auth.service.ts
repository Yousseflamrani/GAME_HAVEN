import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  apiUrl = 'http://localhost:8080/user'

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token')
    this.isAuthenticatedSubject.next(!!token)
  }

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  authenticate(email: string, password: string): Observable<any> {
    const body = { email, mdp: password };

    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/authenticate`, body).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.isAuthenticatedSubject.next(true);

          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          this.isAuthenticatedSubject.next(false);
          observer.error(err);
        },
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => console.log('Déconnexion réussie'),
      error: (err) => console.error('Erreur lors de la déconnexion', err),
    });
    this.isAuthenticatedSubject.next(false)
  }
}
