import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [MatCardModule,
    MatInputModule,
    MatButtonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: `./register-page.component.html`,
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RegisterPageComponent {
  showCredentials: boolean = false;
  error: string | null = null;

  authService = inject(AuthService)
  cdr = inject(ChangeDetectorRef)
  router = inject(Router)


  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.register(this.form.value.email, this.form.value.password, this.form.value.username)
      .subscribe( ({ isAuthenticated, error })=> {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        } else {
          this.error = error || 'Registration failed';
          this.cdr.detectChanges();

          setTimeout(() => {
            this.error = null;
            this.cdr.detectChanges();
          }, 3000);
        }

      } )
    }
  }

  showPassword() {
    this.showCredentials = !this.showCredentials;
    this.cdr.detectChanges();
  }


}
