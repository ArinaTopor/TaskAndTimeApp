import { Route } from '@angular/router';
import { authGuard } from './children/auth/components/auth/auth.guards';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./children/auth/auth.module').then(
                (c: any) => c.AuthWebModule
            ),
    },
    {
        path: 'main',
        loadChildren: () =>
            import('./children/main/main.web.module').then(
                (c: any) => c.MainWebModule
            ),
        canActivate: [authGuard],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth',
    },
];
