import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'main-web-component',
    templateUrl: './main.web.component.html',
    styleUrl: './main.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainWebComponent {
}
