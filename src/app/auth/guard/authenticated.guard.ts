import { CanMatchFn, Router} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from '@angular/core';
import { firstValueFrom } from "rxjs";

export const authenticatedGuard: CanMatchFn = async () => {
   
    const router = inject(Router);
    const authService = inject(AuthService);
    const isAuthenticated = await firstValueFrom(authService.checkStatus());
    if (!isAuthenticated) {
        router.navigateByUrl('/auth/login')
        return false
    }
    return true
};