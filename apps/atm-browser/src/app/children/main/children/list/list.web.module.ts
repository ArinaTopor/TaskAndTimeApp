import { NgModule } from '@angular/core';
import { ListWebComponent } from './components/list.web.component';
import { RouterModule, Routes } from '@angular/router';
import { TuiCheckboxModule, TuiInputModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

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
        TuiCheckboxModule,
        TuiInputModule,
        TuiMarkerIconModule,
        AsyncPipe,
        NgOptimizedImage
    ],
    declarations:[
        ListWebComponent
    ]
})
export class ListWebModule {
}
