import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Avis } from '../core/model/avis.model';
import { AvisService } from '../core/avis.service';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {
  avis: Avis[] = [];
  @Input() jeuReference!: number;

  currentPage: number = 0;
  pageSize: number = 2;
  totalPages: number = 0;

  constructor(private avisService: AvisService) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  loadAvis(): void {
    this.avisService.getAvisByJeu(this.jeuReference, this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.avis = data.content;
        this.totalPages = data.totalPages;
        console.log('Avis récupérés :', this.avis);
      },
      (error) => {
        console.error('Erreur lors de la récupération des avis :', error);
      }
    );
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAvis();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadAvis();
    }
  }
}
