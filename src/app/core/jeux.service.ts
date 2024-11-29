import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Jeux } from "./model/jeux.model";

@Injectable({
  providedIn: 'root',
})
export class JeuxService {
  private apiUrl = 'http://localhost:8080/jeux'; // URL du backend

  constructor(private http: HttpClient) {}

  getJeux(page: number, size: number, searchTerm: string | null = null): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<any>(`${this.apiUrl}/pageable`, { params });
  }

  createJeux(jeu: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, jeu);
  }

  getCategories(): string[] {
    return ['PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'WII', 'WII_U', 'NINTENDO_3DS', 'NINTENDO_SWITCH', 'XBOX', 'PC'];
  }

  getEtats(): string[] {
    return ['NORMAL', 'PROMO', 'SOLDE'];
  }

  getJeuByReference(reference: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reference/${reference}`);
  }

  updateJeu(jeu: Jeux): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/edit/${jeu.reference}`, jeu);
  }

  deleteJeuByReference(reference: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${reference}`);
  }
}
