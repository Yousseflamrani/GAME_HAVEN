import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfilComponent } from './profil/profil.component';
import { CommandesComponent } from './commandes/commandes.component';
import { EnviesComponent } from './envies/envies.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { PremiumComponent } from './premium/premium.component';
import { SoldesComponent } from './soldes/soldes.component';
import { PromosComponent } from './promos/promos.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PanierComponent } from './panier/panier.component';
import { CguComponent } from './cgu/cgu.component';
import { CgvComponent } from './cgv/cgv.component';
import { CookiesComponent } from './cookies/cookies.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite/politique-de-confidentialite.component';
import { JeuComponent } from './jeu/jeu.component';
import { JeuCreateComponent } from './jeu/jeu-create/jeu-create.component';
import { JeuUpdateComponent } from './jeu/jeu-update/jeu-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'commandes',
    component: CommandesComponent
  },
  {
    path: 'envies',
    component: EnviesComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'premium',
    component: PremiumComponent
  },
  {
    path: 'soldes',
    component: SoldesComponent
  },
  {
    path: 'promos',
    component: PromosComponent
  },
  {
    path: 'paiement',
    component: PaiementComponent
  },
  {
    path: 'panier',
    component: PanierComponent
  },
  {
    path: 'mentions-legales',
    component: MentionsLegalesComponent
  },
  {
    path: 'cgu',
    component: CguComponent
  },
  {
    path: 'cgv',
    component: CgvComponent
  },
  {
    path: 'politique-de-confidentialite',
    component: PolitiqueDeConfidentialiteComponent
  },
  {
    path: 'cookies',
    component: CookiesComponent
  },
  {
    path: 'jeu/:reference/show',
    component: JeuComponent
  },
  {
    path: 'jeux/create',
    component: JeuCreateComponent,
  },
  {
    path: 'jeux/:reference/edit',
    component: JeuUpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
