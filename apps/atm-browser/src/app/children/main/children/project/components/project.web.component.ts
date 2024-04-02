import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
    selector: 'project-web-component',
    template: './project.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectWebComponent {

}
