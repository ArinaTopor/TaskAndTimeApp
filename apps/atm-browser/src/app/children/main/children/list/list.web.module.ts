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
import { NewTaskComponent } from './children/new-task/components/new-task.component';
import {
    DATABASE_INFO_TOKEN,
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN
} from '@atm-project/common';

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
        TuiTextareaModule
    ],
    declarations: [
        ListTodayWebComponent,
        NewTaskComponent,
    ]
})
export class ListWebModule {
}
