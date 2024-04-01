import { NgModule } from '@angular/core';
import { RegisterWebComponent } from './components/register.web.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RegisterWebComponent
    },
];

@NgModule({
    exports: [RegisterWebComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations:[
        RegisterWebComponent
    ]
})
export class RegisterWebModule {
}
