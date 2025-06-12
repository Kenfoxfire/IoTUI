import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'register',
                component: RegisterPageComponent
            },
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ],
    }  

]


export default authRoutes;