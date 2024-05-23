import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'project-web-component',
    templateUrl: './project.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class ProjectWebComponent {}
