import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthWebComponent } from './components/auth/auth.web.component';
import {
    TuiButtonModule,
    TuiLinkModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
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
    ],
    exports: [],
    providers: [],
    declarations: [AuthWebComponent],
})
export class AuthWebModule {}
