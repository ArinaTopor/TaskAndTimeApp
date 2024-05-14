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
    TuiDataListModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { CommonModalComponent } from './components/common-modal/common-modal.component';
import { SettingsTabComponent } from './components/settings-tab-popap/settings-tab-popap.component';
import { ModalForDeleteComponent } from '../../modules/modal-for-delete/modal-for-delete.component';
@NgModule({
    exports: [],
    providers: [{ provide: USER_INFO_TOKEN, useClass: FirebaseAuthService }],
    declarations: [
        MainWebComponent,
        SidenavComponent,
        ModeToggleComponent,
        CommonModalComponent,
        SettingsTabComponent,
        ModalForDeleteComponent,
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
        TuiDataListModule,
    ],
})
export class MainWebModule {}
