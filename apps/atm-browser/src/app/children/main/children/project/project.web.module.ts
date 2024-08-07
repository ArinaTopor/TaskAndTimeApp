import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { CommonModalModule } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.module';
import { ProjectService } from './services/project.service';
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
import { ListWebModule } from '../../../../modules/list/list.web.module';
import { ListService } from '../../../../modules/list/services/list-manager.service';
import { DeleteModalModule } from 'apps/atm-browser/src/app/modules/delete-modal/delete-modal.module';
import { SectionComponent } from './modules/section/section.component';
import { SectionService } from './modules/section/services/section.service';
import { TaskComponent } from '../../../../modules/task-modal/components/task.component';
import { TaskService } from '../../../../modules/task-modal/services/task.service';

const routes: Routes = [
    {
        path: ':id',
        component: ProjectWebComponent,
    },
];

@NgModule({
    exports: [ProjectWebComponent],
    providers: [ProjectService, TaskService, ListService, SectionService],
    imports: [
        RouterModule.forChild(routes),
        TuiButtonModule,
        DeleteModalModule,
        CommonModalModule,
        SettingTabModule,
        TaskComponent,
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
        SectionComponent,
    ],
    declarations: [ProjectWebComponent],
})
export class ProjectWebModule {}
