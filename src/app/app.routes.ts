import { Routes } from '@angular/router';
import { SideBarComponent } from './shared/side-bar.component/side-bar.component';
import { notAuthenticatedGuard } from './auth/guard/not-authenticated.guard';
import { authenticatedGuard } from './auth/guard/authenticated.guard';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
        // canMatch: [notAuthenticatedGuard]
    },
    {
        path: '', 
        // canMatch: [authenticatedGuard], 
        loadChildren: ()=> import('./main/main.routes').then(m => m.mainRoutes),
    },

    { path: '**', redirectTo: '' }//TODO 404 not found route
];
