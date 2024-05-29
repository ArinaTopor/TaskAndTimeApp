import { NgModule } from '@angular/core';
import { ListTodayWebComponent } from './components/list-today.web.component';
import { RouterModule, Routes } from '@angular/router';
import {
    TuiCheckboxModule,
    TuiInputModule,
    TuiInputTimeModule,
    TuiMarkerIconModule,
    TuiSelectModule, TuiTextareaModule
} from '@taiga-ui/kit';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    TuiButtonModule,
    TuiCalendarModule,
    TuiDialogModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN
} from '@atm-project/common';
import { TaskComponent } from '../../../../modules/task-modal/components/task.component';
import { TaskService } from '../../../../modules/task-modal/services/task.service';
import { FormatTimeDirective } from '../../directives/formatTime.directive';
import { ListWebModule } from '../../../../modules/list/list.web.module';
import { ListService } from '../../../../modules/list/services/list-manager.service';

const routes: Routes = [
    {
        path: '',
        component: ListTodayWebComponent
    },
];

@NgModule({
    exports: [ListTodayWebComponent],
    providers: [
        { provide: USER_INFO_TOKEN, useClass: FirebaseAuthService },
        FirebaseDatabaseService,
        TaskService,
        ListService
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        TuiCheckboxModule,
        TuiSvgModule,
        TuiInputModule,
        TuiMarkerIconModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TuiDialogModule,
        TuiCalendarModule,
        TuiAutoFocusModule,
        TuiButtonModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiInputTimeModule,
        TuiTextareaModule,
        TaskComponent,
        FormatTimeDirective,
        ListWebModule
    ],
    declarations: [
        ListTodayWebComponent,
    ]
})
export class ListTodayWebModule {
}
