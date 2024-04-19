import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tuiIconRotate } from '@taiga-ui/icons';


@Component({
    selector: 'list-web-component',
    templateUrl: './list.web.component.html',
    styleUrl: 'list.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListWebComponent {
    protected readonly tuiIconRotate: string = tuiIconRotate;
}
