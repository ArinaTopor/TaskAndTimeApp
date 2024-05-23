import { NgModule } from '@angular/core';
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
import { SettingsTabComponent } from './settings-tab-popap.component';
import { CommonModalModule } from '../common-modal/common-modal.module';
import { ModalDeleteModule } from '../modal-for-delete/modal-for-delete.module';
import { NewProjectComponent } from '../../children/main/components/new-project/new-project.component';
import { NewProjectService } from '../../children/main/components/new-project/services/new-project.service';

@NgModule({
    exports: [SettingsTabComponent],
    providers: [NewProjectService],
    declarations: [SettingsTabComponent],
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
        ModalDeleteModule,
        CommonModalModule,
        NewProjectComponent,
    ],
})
export class SettingTabModule {}
