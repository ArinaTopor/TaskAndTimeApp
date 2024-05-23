import { SidenavComponent } from './components/sidenav/components/sidenav.component';
import { MainWebComponent } from './components/main.web.component';
import { ModeToggleComponent } from './components/mode/mode-toggle.component';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { NewProjectComponent } from './components/new-project/new-project.component';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { ModalDeleteModule } from '../../modules/modal-for-delete/modal-for-delete.module';
import { CommonModalModule } from '../../modules/common-modal/common-modal.module';
import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { NewTaskComponent } from './components/new-task/components/new-task.component';
import { SettingTabModule } from '../../modules/settings-tab-popap/setting-tab-popap.module';
import { ChangeColorElementDirective } from './directives/change-color.directive';
import { ControlErrorModule } from '../../modules/atm-controls/control-error.module';

@NgModule({
    exports: [],
    providers: [
        { provide: USER_INFO_TOKEN, useClass: FirebaseAuthService },
        FirebaseDatabaseService,
    ],
    declarations: [
        MainWebComponent,
        SidenavComponent,
        ModeToggleComponent,
        ChangeColorElementDirective,
    ],
    imports: [
        RouterModule.forChild(mainRoutes),
        NgOptimizedImage,
        CommonModule,
        ColorPickerModule,
        ReactiveFormsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        ModalDeleteModule,
        CommonModalModule,
        SettingTabModule,
        NewTaskComponent,
        ControlErrorModule,
        NewProjectComponent,
    ],
})
export class MainWebModule {}
