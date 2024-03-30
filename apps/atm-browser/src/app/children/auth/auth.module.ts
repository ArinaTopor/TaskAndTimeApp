import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWebComponent } from './components/auth/auth.web.component';
import { TwoFactorWebComponent } from './components/two-factor/two-factor.web.component';


const routes: Routes = [
    {
        path: '',
        component: AuthWebComponent
    },
    // {
    //     path: 'register',
    //     loadChildren: () => import('./children/register')
    //         .then((m: any) => m.RegisterWebRoutingModule)
    // }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [],
    providers: [],
    declarations: [
        TwoFactorWebComponent
    ]
})
export class AuthWebModule {

}
