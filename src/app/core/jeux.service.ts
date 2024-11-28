import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  private apiUrl = 'http://localhost:8080/jeux'; // L'URL de votre API backend

  constructor(private http: HttpClient) {}

  getJeux(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.apiUrl}/pageable`, { params });
  }
}
