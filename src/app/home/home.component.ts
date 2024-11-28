import { Component, OnInit } from '@angular/core';
import { JeuxService } from '../core/jeux.service';
import { Jeux } from '../core/model/jeux.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jeux: Jeux[] = [];
  filteredJeux: Jeux[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  errorMessage: string | null = null;

  constructor(private jeuxService: JeuxService) {}

  ngOnInit() {
    this.loadJeux();
  }

  loadJeux() {
    this.isLoading = true;
    this.jeuxService.getJeux(this.currentPage, this.pageSize, this.searchTerm).subscribe(
      (data: any) => {
        this.jeux = data.content; // Données récupérées depuis l'API
        this.filteredJeux = this.jeux; // Met à jour filteredJeux pour afficher les résultats
        this.totalPages = data.totalPages;
        this.totalItems = data.totalElements;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des jeux:', error);
        this.isLoading = false;
      }
    );
  }

  onSearchChange() {
    this.currentPage = 0;
    this.loadJeux();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadJeux();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadJeux();
    }
  }
}
