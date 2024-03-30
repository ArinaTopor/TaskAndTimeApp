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
    }
];
