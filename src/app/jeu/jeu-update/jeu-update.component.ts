import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from 'src/app/core/jeux.service';
import { Jeux } from 'src/app/core/model/jeux.model';

@Component({
  selector: 'app-jeu-update',
  templateUrl: './jeu-update.component.html',
  styleUrls: ['./jeu-update.component.scss'],
})
export class JeuUpdateComponent implements OnInit {
  jeu: Jeux | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  categories: string[] = [
    'PS1',
    'PS2',
    'PS3',
    'PS4',
    'PS5',
    'WII',
    'WII_U',
    'NINTENDO_3DS',
    'NINTENDO_SWITCH',
    'XBOX',
    'PC',
  ];

  etats: string[] = ['NORMAL', 'PROMO', 'SOLDE'];

  constructor(
    private route: ActivatedRoute,
    private jeuxService: JeuxService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const reference = this.route.snapshot.paramMap.get('reference');
    if (reference) {
      this.loadJeu(+reference);
    } else {
      this.showError('Référence du jeu introuvable.');
    }
  }

  loadJeu(reference: number): void {
    this.jeuxService.getJeuByReference(reference).subscribe(
      (data: Jeux) => {
        this.jeu = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement du jeu :', error);
        this.showError('Impossible de charger les informations du jeu.');
      }
    );
  }

  saveChanges(): void {
    if (this.jeu) {
      this.isLoading = true;
      this.jeuxService.updateJeu(this.jeu).subscribe(
        () => {
          console.log('Modifications enregistrées avec succès.');
          this.router.navigate([`/jeu/${this.jeu?.reference}/show`]);
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement des modifications :', error);
          this.showError('Impossible de sauvegarder les modifications.');
        }
      );
    } else {
      this.showError('Les données du jeu sont introuvables.');
    }
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
  }

  cancel(): void {
    this.router.navigate(['/jeux']);
  }
}
