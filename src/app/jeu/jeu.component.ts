import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from '../core/jeux.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})
export class JeuComponent implements OnInit {
  jeu: any;
  avisContenu: string = '';
  userId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jeuxService: JeuxService,
  ) {}

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
  }

  deleteJeu(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
      this.jeuxService.deleteJeuByReference(this.jeu.reference).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du jeu :', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }

  onAvisCreated(message: string): void {
    this.successMessage = message;

    setTimeout(() => (this.successMessage = ''), 3000);
  }

  onAvisError(message: string): void {
    this.errorMessage = message;

    setTimeout(() => (this.errorMessage = ''), 3000);
  }
}
