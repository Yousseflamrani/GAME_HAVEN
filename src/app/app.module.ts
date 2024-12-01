import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
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
import { JeuComponent } from './jeu/jeu.component'

import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JeuCreateComponent } from './jeu/jeu-create/jeu-create.component';
import { JeuUpdateComponent } from './jeu/jeu-update/jeu-update.component';
import { AvisComponent } from './avis/avis.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ConnexionComponent,
    InscriptionComponent,
    ProfilComponent,
    CommandesComponent,
    EnviesComponent,
    FaqComponent,
    ContactComponent,
    PremiumComponent,
    SoldesComponent,
    PromosComponent,
    PaiementComponent,
    PanierComponent,
    CguComponent,
    CgvComponent,
    CookiesComponent,
    MentionsLegalesComponent,
    PolitiqueDeConfidentialiteComponent,
    JeuComponent,
    JeuCreateComponent,
    JeuUpdateComponent,
    AvisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
