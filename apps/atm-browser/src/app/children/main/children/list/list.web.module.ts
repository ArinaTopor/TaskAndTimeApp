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
    DATABASE_INFO_TOKEN,
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN
} from '@atm-project/common';
import { NewTaskComponent } from '../../components/new-task/components/new-task.component';
import { NewTaskService } from '../../components/new-task/services/new-task.service';

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
        { provide: DATABASE_INFO_TOKEN, useClass: FirebaseDatabaseService },
        FirebaseDatabaseService,
        NewTaskService

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
        NewTaskComponent
    ],
    declarations: [
        ListTodayWebComponent,
    ]
})
export class ListWebModule {
}
