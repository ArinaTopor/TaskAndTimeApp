import { SidenavComponent } from './components/sidenav/components/sidenav.component';
import { MainWebComponent } from './components/main.web.component';
import { ModeToggleComponent } from './components/mode/mode-toggle.component';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { NewTaskComponent } from './components/new-task/components/new-task.component';

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
        NewTaskComponent,
    ],
})
export class MainWebModule {}
