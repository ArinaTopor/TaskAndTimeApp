import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SidenavComponent } from './components/sidenav/components/sidenav.component';
import { MainWebComponent } from './components/main.web.component';
import { ModeToggleComponent } from './components/mode/mode-toggle.component';
import { FirebaseAuthService, USER_INFO_TOKEN } from '@atm-project/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { CommonModalComponent } from './components/common-modal/common-modal.component';
@NgModule({
    exports: [],
    providers: [{ provide: USER_INFO_TOKEN, useClass: FirebaseAuthService }],
    declarations: [
        MainWebComponent,
        SidenavComponent,
        ModeToggleComponent,
        CommonModalComponent,
    ],
    imports: [
        RouterModule.forChild(mainRoutes),
        NgOptimizedImage,
        CommonModule,
        ReactiveFormsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        TuiHostedDropdownModule,
    ],
})
export class MainWebModule {}
