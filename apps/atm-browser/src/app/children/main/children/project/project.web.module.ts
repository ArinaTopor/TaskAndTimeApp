import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWebComponent } from './components/project.web.component';
import { TuiButtonModule } from '@taiga-ui/core';

const routes: Routes = [
    {
        path: '',
        component: ProjectWebComponent,
    },
];

@NgModule({
    exports: [ProjectWebComponent],
    providers: [],
    imports: [RouterModule.forChild(routes), TuiButtonModule],
    declarations: [ProjectWebComponent],
})
export class ProjectWebModule {}
