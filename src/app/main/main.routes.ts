import { Routes } from '@angular/router';
import { SideBarComponent } from '../shared/side-bar.component/side-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundPage } from './pages/not-found-page/not-found-page.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { TemplatesComponent } from './pages/templates/templates.component';

export const mainRoutes: Routes = [


    {
        path: '', component: SideBarComponent, children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'widgets', component: HomeComponent
            },
            {
                path: 'devices', component: DevicesComponent
            },
            {
                path: 'templates', component: TemplatesComponent
            },
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
        ]
    },

    { path: '**', component: NotFoundPage }//TODO 404 not found route
];
