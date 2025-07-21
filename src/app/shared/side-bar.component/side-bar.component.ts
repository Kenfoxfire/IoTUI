import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-side-bar.component',
  imports: [MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule, 
    MatListModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  opened = false;

  authService = inject(AuthService);
  private router = inject(Router)

  toggleSidenav() {
    this.opened = !this.opened;
  }



  isLight = document.documentElement.classList.contains('light-mode');

  toggleTheme() {
    this.isLight = !this.isLight;
    const classList = document.documentElement.classList;
    if (this.isLight) {
      classList.add('light-mode');
    } else {
      classList.remove('light-mode');
    }
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/auth/login');
  }

}
