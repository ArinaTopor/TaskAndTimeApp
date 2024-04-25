import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'control-error',
    templateUrl: './control-error.component.html',
    styleUrl: 'control-error.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class ControlErrorComponent {
    @Input()
    public set errors(error: ValidationErrors | null | Error) {
        this.checkError(error);
    }
    public msgErrors$: BehaviorSubject<string[]> = new BehaviorSubject<
        string[]
    >([]);

    /**
     * function for check errors
     * @param error
     */
    public checkError(error: ValidationErrors | null | Error): void {
        const msgErrors: string[] = [];
        const errorsObj: ValidationErrors = error as ValidationErrors;
        for (const err in errorsObj) {
            switch (err) {
                case 'required':
                    msgErrors.push('Обязательное поле');
                    break;
                case 'email':
                    msgErrors.push(
                        'Почта должна соответствовать маске mail@mail.ru'
                    );
                    break;
                case 'minlength':
                    msgErrors.push('Пароль должен быть не меньше 6 символов');
                    break;
                case 'PasswordsNotMatch':
                    msgErrors.push('Пароли не совпадают');
                    break;
            }
        }

        this.msgErrors$.next(msgErrors);
    }
}
