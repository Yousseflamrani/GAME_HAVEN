import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private apiUrl = 'http://localhost:8080/user'

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/save`, user)
  }
}
