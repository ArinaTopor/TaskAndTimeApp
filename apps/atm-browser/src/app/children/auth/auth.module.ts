import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { CommonModule } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthWebComponent } from './components/auth/auth.web.component';
import {
    TuiButtonModule,
    TuiSvgModule,
    tuiSvgOptionsProvider,
} from '@taiga-ui/core';

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        TuiInputModule,
        TuiButtonModule,
        TuiSvgModule,
    ],
    exports: [AuthWebComponent],
    providers: [
        tuiSvgOptionsProvider({
            path: 'https://taiga-ui.dev/assets/taiga-ui/icons',
        }),
    ],
    declarations: [AuthWebComponent],
})
export class AuthWebModule {}
