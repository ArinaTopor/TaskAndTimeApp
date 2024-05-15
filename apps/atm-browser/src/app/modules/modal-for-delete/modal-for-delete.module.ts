import { NgModule } from '@angular/core';
import { ModalForDeleteComponent } from './modal-for-delete.component';
import { CommonModule } from '@angular/common';
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

@NgModule({
    exports: [ModalForDeleteComponent],
    providers: [],
    declarations: [ModalForDeleteComponent],
    imports: [
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
export class ModalDeleteModule {}
