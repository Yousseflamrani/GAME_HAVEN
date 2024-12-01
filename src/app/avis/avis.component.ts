import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Avis } from '../core/model/avis.model';
import { AvisService } from '../core/avis.service';
import { AuthService } from '../core/auth.service';
import { JeuxService } from '../core/jeux.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {
  avis: Avis[] = [];
  @Input() jeuReference!: number;

  userId: number | null = null;
  jeu: any;
  avisContenu: string = '';

  currentPage: number = 0;
  pageSize: number = 2;
  totalPages: number = 0;
  @Output() avisCreated = new EventEmitter<string>();
  @Output() avisError = new EventEmitter<string>();

  constructor(private avisService: AvisService, private authService: AuthService, private jeuxService: JeuxService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const reference = this.route.snapshot.paramMap.get('reference');
    if (reference) {
      this.jeuxService.getJeuByReference(+reference).subscribe(
        (data) => {
          this.jeu = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des informations du jeu :', error);
        }
      );
    }
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

  createAvis(): void {
    const userId: number | null = this.authService.getUserId();
    console.log("jeu reference: ", this.jeuReference)

    if (this.avisContenu.trim() === '') {
      this.avisError.emit('Veuillez entrer un avis.');
      return;
    }

    if (userId === null) {
      this.avisError.emit('Vous devez être connecté pour poster un avis.');
      return;
    }

    this.jeuxService.getJeuByReference(this.jeuReference).subscribe(
      (jeu: any) => {
        if (!jeu) {
          this.avisError.emit('Jeu introuvable.');
          return;
        }


        const avisPayload = {
          contenu: this.avisContenu,
          userId: userId,
          jeu: { reference: this.jeuReference }
        };
        console.log('Payload envoyé au backend:', avisPayload);


        this.avisService.createAvis(avisPayload).subscribe(
          (response: Avis) => {
            this.avisContenu = '';
            this.avisCreated.emit('Avis créé avec succès !');
          },
          (error: any) => {
            console.error('Erreur lors de la création de l\'avis :', error);
            this.avisError.emit('Une erreur est survenue lors de la création de l\'avis.');
          }
        );
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du jeu :', error);
        this.avisError.emit('Une erreur est survenue lors de la récupération du jeu.');
      }
    );
  }
}
