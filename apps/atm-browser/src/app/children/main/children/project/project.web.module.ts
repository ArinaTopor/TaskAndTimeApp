import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';
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

const routes: Routes = [
    {
        path: '',
        component: ProjectWebComponent,
    },
];

@NgModule({
    exports: [ProjectWebComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
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
    declarations: [ProjectWebComponent],
})
export class ProjectWebModule {}
