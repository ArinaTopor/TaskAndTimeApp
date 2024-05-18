import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { ModalDeleteModule } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.module';
import { CommonModalModule } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.module';
import { ProjectService } from './services/project.service';

const routes: Routes = [
    {
        path: ':id',
        component: ProjectWebComponent,
    },
];

@NgModule({
    exports: [ProjectWebComponent],
    providers: [ProjectService],
    imports: [
        RouterModule.forChild(routes),
        TuiButtonModule,
        ModalDeleteModule,
        CommonModalModule,
    ],
    declarations: [ProjectWebComponent],
})
export class ProjectWebModule {}
