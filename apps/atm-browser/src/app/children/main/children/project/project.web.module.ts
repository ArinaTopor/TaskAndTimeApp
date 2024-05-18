import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { ModalDeleteModule } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.module';
import { CommonModalModule } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.module';
import { ProjectService } from './services/project.service';
import { NewTaskComponent } from '../../components/new-task/components/new-task.component';
import { NewTaskService } from '../../components/new-task/services/new-task.service';
import { SettingTabModule } from 'apps/atm-browser/src/app/modules/settings-tab-popap/setting-tab-popap.modal';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: ':id',
        component: ProjectWebComponent,
    },
];

@NgModule({
    exports: [ProjectWebComponent],
    providers: [ProjectService, NewTaskService],
    imports: [
        RouterModule.forChild(routes),
        TuiButtonModule,
        ModalDeleteModule,
        CommonModalModule,
        SettingTabModule,
        NewTaskComponent,
        CommonModule,
    ],
    declarations: [ProjectWebComponent],
})
export class ProjectWebModule {}
