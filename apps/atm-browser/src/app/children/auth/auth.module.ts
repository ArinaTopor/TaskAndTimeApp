import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthWebComponent } from './components/auth/auth.web.component';
import {
    TuiButtonModule,
    TuiSvgModule,
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
        TuiButtonModule,
        TuiSvgModule,
        HttpClientModule,
    ],
    exports: [],
    providers: [],
    declarations: [AuthWebComponent],
})
export class AuthWebModule {}
