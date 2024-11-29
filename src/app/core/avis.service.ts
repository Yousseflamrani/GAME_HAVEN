import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost:8080/avis';

  constructor(private http: HttpClient) { }

  getAvisByJeu(reference: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jeu/${reference}/pageable?page=${page}&size=${size}`);
  }

  createAvis(contenu: string, userId: number, jeuId: number): Observable<any> {
    const body = {
      contenu: contenu,
      user: { id: userId },
      jeux: { id: jeuId },
    };
    return this.http.post(`${this.apiUrl}/create`, body);
  }
}
