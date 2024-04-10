import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'atm-project-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
    protected title: string = 'atm-browser';
}
