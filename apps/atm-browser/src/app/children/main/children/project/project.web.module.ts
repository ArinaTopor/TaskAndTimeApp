import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';
import { HttpClientModule } from '@angular/common/http';
import {
    TuiButtonModule,
    TuiSvgModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
    TuiDialogModule,
    TuiRootModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProjectComponent } from './children/modal-component/new-project.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: ProjectWebComponent,
    },
];

@NgModule({
    exports: [ProjectWebComponent, NewProjectComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
        TuiInputModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        TuiSvgModule,
        HttpClientModule,
        TuiLinkModule,
        FormsModule,
        ColorPickerModule,
        CommonModule,
        ReactiveFormsModule,
        TuiRootModule,
        TuiDialogModule,
    ],
    declarations: [ProjectWebComponent, NewProjectComponent],
})
export class ProjectWebModule {}
