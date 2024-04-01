import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterWebComponent } from './components/filter.web.component';

const routes: Routes = [
    {
        path: '',
        component: FilterWebComponent
    },
];

@NgModule({
    exports: [FilterWebComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations:[
        FilterWebComponent
    ]
})
export class FilterWebModule {
}
