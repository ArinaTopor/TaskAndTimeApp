import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
    selector: 'list-web-component',
    template: './list.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListWebComponent {

}
