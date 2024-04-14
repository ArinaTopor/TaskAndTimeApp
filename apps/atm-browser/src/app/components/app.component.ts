import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'atm-project-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class AppComponent {}
