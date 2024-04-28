import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
    selector: 'atm-project-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
    constructor(public http: HttpClient) {}
    /**
     * this funct
     * это не забыть убрать
     */
    public addError(): any {
        console.log('k');

        return this.http
            .get('https://jsonplрhaceholder.typicode.com/postks')
            .pipe(
                catchError((err) => {
                    console.info('Error handled');

                    return throwError(() => new Error('Couldnt loading data'));
                })
            )
            .subscribe();
    }
}
