import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'control-error',
    templateUrl: './control-error.component.html',
    styleUrl: 'control-error.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class ControlErrorComponent implements OnInit {
    @Input() public control: AbstractControl | null = null;
    // public set control(control: AbstractControl | null) {
    //     this.msgErrors = [];
    //     if (control) {
    //         this.checkError(control);
    //     }
    // }
    public msgErrors$: BehaviorSubject<string[]> = new BehaviorSubject<
        string[]
    >([]);

    public ngOnInit(): void {
        this.control?.valueChanges.subscribe(() => {
            this.checkError(this.control);
        });
    }

    /**
     * function for check errors
     * @param error
     */
    public checkError(control: AbstractControl | null): void {
        const msgErrors: string[] = [];
        if (control?.invalid && (control.touched || control.dirty)) {
            const errorsObj: ValidationErrors =
                control.errors as ValidationErrors;
            console.log(control.errors);
            for (const err in errorsObj) {
                console.log(err);
                switch (err) {
                    case 'required':
                        msgErrors.push('Обязательное поле');
                        break;
                    case 'email':
                        msgErrors.push(
                            'Почта должна соответствовать маске mail@mail.ru'
                        );
                        break;
                    case 'PasswordsNotMatch':
                        msgErrors.push('Пароли не совпадают');
                        break;
                }
            }
            console.log(msgErrors);
        }
        this.msgErrors$.next(msgErrors);
        console.log(msgErrors);
    }
}
