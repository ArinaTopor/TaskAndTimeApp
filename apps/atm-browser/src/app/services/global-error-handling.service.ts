import {
    ErrorHandler,
    Inject,
    Injectable,
    Injector,
    NgZone,
} from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
@Injectable({
    providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private _injector: Injector,
        @Inject(TuiAlertService) private readonly _alerts: TuiAlertService,
        private _zone: NgZone
    ) {}
    /**
     * function for handle error
     */
    public handleError(error: unknown): void {
        this._zone.run(() => {
            this._alerts
                .open('', {
                    label: 'Произошла ошибка. Попробуйте снова',
                    status: 'error',
                    autoClose: false,
                })
                .subscribe();
            console.log(error);
        });
    }
}
