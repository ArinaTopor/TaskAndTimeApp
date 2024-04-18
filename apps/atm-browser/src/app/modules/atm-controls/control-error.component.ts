import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
        this.msgErrors = [];
        this.checkError(error);
    }
    public msgErrors: string[] = [];
    /**
     * funct for check errors
     * @param error
     */
    public checkError(error: ValidationErrors | null | Error): void {
        const errorsObj: ValidationErrors = error as ValidationErrors;
        for (const err in errorsObj) {
            switch (err) {
                case 'required':
                    this.msgErrors.push('Обязательное поле');
                    break;
                case 'email':
                    this.msgErrors.push(
                        'Почта должна соответствовать маске mail@mail.ru'
                    );
                    break;
                case 'PasswordsNotMatch':
                    this.msgErrors.push('Пароли не совпадают');
                    break;
            }
        }
    }
}
