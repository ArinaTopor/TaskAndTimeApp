import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { ModalDeleteModule } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.module';
import { CommonModalModule } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.module';
import { ProjectService } from './services/project.service';
import { NewTaskComponent } from '../../components/new-task/components/new-task.component';
import { NewTaskService } from '../../components/new-task/services/new-task.service';
import { SettingTabModule } from 'apps/atm-browser/src/app/modules/settings-tab-popap/setting-tab-popap.module';
import { HttpClientModule } from '@angular/common/http';
import {
    TuiSvgModule,
    TuiLinkModule,
    TuiDialogModule,
    TuiRootModule,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';
import { ListWebModule } from '../../modules/list/list.web.module';
import { ListService } from '../../modules/list/services/list-manager.service';

const routes: Routes = [
    {
        path: ':id',
        component: ProjectWebComponent,
    },
];

@NgModule({
    exports: [ProjectWebComponent],
    providers: [ProjectService, NewTaskService, ListService],
    imports: [
        RouterModule.forChild(routes),
        TuiButtonModule,
        ModalDeleteModule,
        CommonModalModule,
        SettingTabModule,
        NewTaskComponent,
        CommonModule,
        TuiSvgModule,
        HttpClientModule,
        TuiLinkModule,
        FormsModule,
        ColorPickerModule,
        CommonModule,
        ReactiveFormsModule,
        TuiRootModule,
        TuiDialogModule,
        ListWebModule,
    ],
    declarations: [ProjectWebComponent],
})
export class ProjectWebModule {}
