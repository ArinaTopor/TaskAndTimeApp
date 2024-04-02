import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectWebComponent
    },
];

@NgModule({
    exports: [ProjectWebComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations:[
        ProjectWebComponent
    ]
})
export class ProjectWebModule {
}
