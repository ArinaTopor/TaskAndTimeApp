import { NgModule } from '@angular/core';
import { ListWebComponent } from './components/list.web.component';
import { RouterModule, Routes } from '@angular/router';
import { TuiCheckboxModule, TuiInputModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TuiSvgModule } from '@taiga-ui/core';

const routes: Routes = [
    {
        path: '',
        component: ListWebComponent
    },
];

@NgModule({
    exports: [ListWebComponent],
    providers: [],
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
        HttpClientModule
    ],
    declarations:[
        ListWebComponent
    ]
})
export class ListWebModule {
}
