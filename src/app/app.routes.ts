import { Routes } from '@angular/router';


import { Auth_Routes } from './features/auth/auth.routes';

import { Feed_Routes } from './features/feed/feed.routes';
import { User_Profile_Routes } from './features/user-profile/user-profile.routes';
import { authGuard } from './core/guards/auth-guard';
import { loggedInGuard } from './core/guards/logged-in-guard';
import { Notification_Routes } from './features/notifications/notifications.routes';
import { ChangePasswordComponent } from './features/feed/components/change-password/change-password.component';

export const routes: Routes = [
    {
        path:'',
        canActivate:[loggedInGuard],
        loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children:Auth_Routes
    },

    {
        path:'',
        canActivate:[authGuard],
        loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children:[
            {
                path:'feed',
                children:Feed_Routes
            },
            {
                path:'user-profile',
                children:User_Profile_Routes
            },
            {
                path:'notifications',
                children:Notification_Routes
            },
            {
                path:'change-password',
                component: ChangePasswordComponent
            }
        ]
    },
    
    {
        path:'not-found',
        loadComponent: () => import('./features/static-pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path:'**',
        redirectTo:'not-found'
    }
];
