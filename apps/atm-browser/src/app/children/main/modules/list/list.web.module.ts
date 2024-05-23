import { NgModule } from '@angular/core';
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
import { NewTaskComponent } from '../../components/new-task/components/new-task.component';
import { FormatTimeDirective } from '../../directives/formatTime.directive';
import { ListWebComponent } from './components/list.web.component';

@NgModule({
    exports: [ListWebComponent],
    providers: [
        { provide: USER_INFO_TOKEN, useClass: FirebaseAuthService },
        FirebaseDatabaseService,
    ],
    imports: [
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
        NewTaskComponent,
        FormatTimeDirective,
    ],
    declarations: [
        ListWebComponent
    ]
})
export class ListWebModule {
}
