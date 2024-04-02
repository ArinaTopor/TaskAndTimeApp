import { NgModule } from '@angular/core';
import { ListWebComponent } from './components/list.web.component';
import { RouterModule, Routes } from '@angular/router';

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
    ],
    declarations:[
        ListWebComponent
    ]
})
export class ListWebModule {
}
