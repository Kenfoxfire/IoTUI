import { ChangeDetectionStrategy, ChangeDetectorRef, Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [MatCardModule,
    MatInputModule,
    MatButtonModule, ReactiveFormsModule, RouterModule, MatIconModule, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  error: string | null = null;
  showError: boolean = false;
  showCredentials: boolean = false;

  authService = inject(AuthService)
  router = inject(Router)
  cdr = inject(ChangeDetectorRef)

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.form.value.email, this.form.value.password).subscribe(({isAuthenticated, error}) => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        } else {
          this.error = error || 'Login failed';
          this.showError = true;
          this.cdr.detectChanges();

          setTimeout(() => {
            this.showError = false;
            this.cdr.detectChanges();
            setTimeout(() => {
              this.error = null;
              this.cdr.detectChanges();
            }, 1000);
          }, 3000);
        }
      });
    }
  }

  showPassword() {
    this.showCredentials = !this.showCredentials;
    this.cdr.detectChanges();
  }

}
