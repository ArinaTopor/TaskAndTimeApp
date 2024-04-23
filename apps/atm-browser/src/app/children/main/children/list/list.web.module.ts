import { NgModule } from '@angular/core';
import { ListWebComponent } from './components/list.web.component';
import { RouterModule, Routes } from '@angular/router';
import { TuiCheckboxModule, TuiInputModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgClass,
        NgForOf,
        NgIf
    ],
    declarations:[
        ListWebComponent
    ]
})
export class ListWebModule {
}
