import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { InscriptionService } from './inscription.service';
import { Router } from '@angular/router'
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  registerForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
              private inscriptionService: InscriptionService,
              private router: Router,
              private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        prenom: ['', Validators.required],
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mdp: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        type_user: ['CLIENT', Validators.required],
        adresse: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('mdp')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = {
        ...this.registerForm.value,
        role: 'USER',
        status: this.registerForm.value.type_user,
        dateCreation: new Date().toISOString(),
      };

      this.inscriptionService.registerUser(formData).subscribe({
        next: () => {
          this.successMessage = 'Utilisateur créé avec succès.';
          this.errorMessage = null;

          const { email, mdp } = this.registerForm.value;
          this.authService.authenticate(email, mdp).subscribe({
            next: (response) => {
              localStorage.setItem('token', response.token);
              localStorage.setItem('user', JSON.stringify(response.user));
              this.router.navigate(['/']);
            },
            error: () => {
              this.errorMessage = "Une erreur est survenue lors de l'authentification.";
            }
          });
        },
        error: () => {
          this.errorMessage = 'Une erreur est survenue lors de l’inscription.';
          this.successMessage = null;
        },
      });
    }
  }
}
