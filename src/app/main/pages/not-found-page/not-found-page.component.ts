import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [MatCard, MatCardContent,MatIcon, MatButton],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss'
})
export class NotFoundPage {

  private router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }
}
