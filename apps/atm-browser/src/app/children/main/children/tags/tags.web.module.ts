import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsWebComponent } from './components/tags.web.component';

const routes: Routes = [
    {
        path: '',
        component: TagsWebComponent
    },
];

@NgModule({
    exports: [TagsWebComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations: [
        TagsWebComponent
    ]
})
export class TagsWebModule {
}
