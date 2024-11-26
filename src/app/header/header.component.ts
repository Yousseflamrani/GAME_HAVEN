import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  user: any = null;

  constructor(private authService: AuthService,
              private router: Router,
              private cdr: ChangeDetectorRef
              ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated = auth;
      if (auth) {
        const userData = localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;
      } else {
        this.user = null;
      }
      this.cdr.detectChanges();
    })
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }
}
