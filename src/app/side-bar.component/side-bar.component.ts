import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-bar.component',
  imports: [MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule, RouterOutlet],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  opened = true;

  toggleSidenav() {
    this.opened = !this.opened;
  }



  isDark = document.documentElement.classList.contains('dark-theme');

  toggleTheme() {
    this.isDark = !this.isDark;
    const classList = document.documentElement.classList;
    if (this.isDark) {
      classList.add('dark-theme');
    } else {
      classList.remove('dark-theme');
    }
  }
  


}
