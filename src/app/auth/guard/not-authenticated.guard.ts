import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from '@angular/core';
import { firstValueFrom } from "rxjs";

export const notAuthenticatedGuard: CanMatchFn = async (
    route: Route, segments: UrlSegment[]
) => {
   
    const router = inject(Router);
    const authService = inject(AuthService);
    const isAuthenticated = await firstValueFrom(authService.checkStatus());
    if (isAuthenticated) {
        router.navigateByUrl('/')
        return false
    }
    return true
};