import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Avis } from './model/avis.model';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost:8080/avis';

  constructor(private http: HttpClient) { }

  getAvisByJeu(reference: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jeu/${reference}/pageable?page=${page}&size=${size}`);
  }

  createAvis(avisPayload: { contenu: string; userId: number; jeu: { reference: number } }): Observable<Avis> {
    console.log('Payload envoyé au backend depuis le avis:', avisPayload);
    return this.http.post<Avis>(`${this.apiUrl}/create`, avisPayload);
  }
}
