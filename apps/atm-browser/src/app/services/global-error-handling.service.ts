import { HttpClient } from '@angular/common/http';
import {
    ErrorHandler,
    Inject,
    Injectable,
    Injector,
    NgZone,
} from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable, takeUntil } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AlertWithCustomLabelComponent } from '../modules/widget-error/widget-error.component';
import { Router } from '@angular/router';
// import {AlertExampleWithCustomLabelComponent} from './alert-example-with-custom-label/alert-example-with-custom-label.component';
// import {CustomLabelComponent} from './custom-label/custom-label.component';
@Injectable({
    providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
    public readonly notification: Observable<void>;

    constructor(
        private _injector: Injector,
        private _http: HttpClient,
        @Inject(TuiAlertService) alerts: TuiAlertService,
        private _zone: NgZone,
        @Inject(Router) router: Router
    ) {
        this.notification = alerts
            .open(
                new PolymorpheusComponent(
                    AlertWithCustomLabelComponent,
                    this._injector
                ),
                {
                    label: ({ status }) =>
                        status === 'error'
                            ? 'Ошибка'
                            : 'Info label from function',
                    status: 'error',
                    autoClose: false,
                }
            )
            .pipe(takeUntil(router.events));
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    public handleError(error: unknown): void {
        this.notification.subscribe();
        this._zone.run(() => {
            alert(error);
        });
    }
}
//нужно добавит throw error;
// for obsrvable use subscribe({error: err => console.error(err)})
// pipe(tap({ error: (error) => this.error = error}))
// in queries pipe(catchError(err => {console.info('Error handled); return throwError(() => new Error('Couldn't loading data))}))
