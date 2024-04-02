import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('./children/auth/auth.module').then((c: any) => c.AuthWebModule)
    },
    {
        path: 'main',
        loadChildren: () => import('./children/main/main.web.module').then((c: any) => c.MainWebModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth',
    },
];
