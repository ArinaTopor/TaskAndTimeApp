import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth',
    },
    {
        path: 'auth',
        loadChildren: () => import('./children/auth/auth.module').then((c: any) => c.AuthWebModule)
    },
    {
        path: 'main',
        loadChildren: () => import('./children/main/main.web.module').then((c: any) => c.MainWebModule)
    }
];
