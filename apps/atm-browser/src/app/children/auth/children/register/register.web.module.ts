import { NgModule } from '@angular/core';
import { RegisterWebComponent } from './components/register.web.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiLinkModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { ControlErrorModule } from 'apps/atm-browser/src/app/modules/atm-controls/control-error.module';
const routes: Routes = [
    {
        path: '',
        component: RegisterWebComponent,
    },
];

@NgModule({
    exports: [RegisterWebComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        TuiSvgModule,
        HttpClientModule,
        TuiLinkModule,
        ControlErrorModule,
    ],
    declarations: [RegisterWebComponent],
})
export class RegisterWebModule {}
