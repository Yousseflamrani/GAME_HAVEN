import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from '../core/jeux.service';
import { AvisService } from '../core/avis.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})
export class JeuComponent implements OnInit {
  jeu: any;
  avisContenu: string = '';
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jeuxService: JeuxService,
    private avisService: AvisService,
    private authService: AuthService
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

  createAvis(): void {
    this.userId = this.authService.getUserId();
    console.log('User ID récupéré:', this.userId);

    if (this.avisContenu.trim() === '') {
      alert('Veuillez entrer un avis.');
      return;
    }
    if (this.userId === null) {
      alert('Vous devez être connecté pour poster un avis.');
      return;
    }
    this.avisService.createAvis(this.avisContenu, this.userId, this.jeu.id).subscribe(
      (response) => {
        this.avisContenu = '';
        window.location.reload()
      },
      (error) => {
        console.error('Erreur lors de la création de l\'avis :', error);
        alert('Une erreur est survenue lors de la création de l\'avis.');
      }
    );
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
}
