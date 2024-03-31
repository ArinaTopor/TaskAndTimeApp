import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
    selector: 'tags-web-component',
    template: './tags.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsWebComponent {

}
