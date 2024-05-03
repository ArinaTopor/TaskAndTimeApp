import {
    ErrorHandler,
    Inject,
    Injectable,
    NgZone,
    isDevMode,
} from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { FirebaseError } from 'firebase/app';
import { take } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(TuiAlertService) private readonly _alerts: TuiAlertService,
        private _zone: NgZone
    ) {}
    /**
     * function for handle error
     */
    public handleError(error: unknown): void {
        if (error instanceof FirebaseError) {
            return;
        }
        this._zone.run(() => {
            this._alerts
                .open('', {
                    label: 'Произошла ошибка. Попробуйте снова',
                    status: 'error',
                    autoClose: false,
                })
                .pipe(take(1))
                .subscribe();
            if (isDevMode()) {
                console.log(error);
            }
        });
    }
}
