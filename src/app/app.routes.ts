import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
        //TODO GUARDS
    },

    { path: '', redirectTo: 'test', pathMatch: 'full' },
    { path: '**', redirectTo: 'test' }
];
