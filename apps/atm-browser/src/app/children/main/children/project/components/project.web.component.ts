import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewProjectComponent } from '../children/modal-component/new-project.component';

@Component({
    selector: 'project-web-component',
    templateUrl: './project.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NewProjectComponent],
})
export class ProjectWebComponent {}
