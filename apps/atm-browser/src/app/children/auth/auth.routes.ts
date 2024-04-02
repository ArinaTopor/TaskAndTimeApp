import { Routes } from '@angular/router';
import { AuthWebComponent } from './components/auth/auth.web.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthWebComponent
    },
    {
        path: 'register',
        loadChildren: () => import('./children/register/register.web.module')
            .then((a: any) => a.RegisterWebModule)
    }
];
