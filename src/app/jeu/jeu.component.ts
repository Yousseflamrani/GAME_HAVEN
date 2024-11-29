import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JeuxService } from '../core/jeux.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})
export class JeuComponent implements OnInit {
  jeu: any;

  constructor(
    private route: ActivatedRoute,
    private jeuxService: JeuxService
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
}
