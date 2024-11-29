import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JeuxService } from 'src/app/core/jeux.service';

@Component({
  selector: 'app-jeu-create',
  templateUrl: './jeu-create.component.html',
  styleUrls: ['./jeu-create.component.scss'],
})
export class JeuCreateComponent implements OnInit {
  registerForm!: FormGroup;
  categories: string[] = [];
  etats: string[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private jeuxService: JeuxService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      image: ['', [Validators.required, Validators.pattern('https?://.+'), Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      prix: [null, [Validators.required, Validators.min(0)]],
      quantite: [null, [Validators.required, Validators.min(1)]],
      etat: ['', Validators.required],
      category: ['', Validators.required],
      note: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    });

    this.categories = this.jeuxService.getCategories();
    this.etats = this.jeuxService.getEtats();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const jeu = this.registerForm.value;

      this.jeuxService.createJeux(jeu).subscribe(
        (response) => {
          this.successMessage = 'Jeu créé avec succès : ' + response.nom;
          this.errorMessage = null;
          this.registerForm.reset();
        },
        (error) => {
          this.errorMessage = 'Une erreur est survenue : ' + (error.message || 'Erreur inconnue.');
          this.successMessage = null;
        }
      );
    }
  }
}
