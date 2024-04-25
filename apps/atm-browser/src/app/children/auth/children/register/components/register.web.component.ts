import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterForm, conformPassword } from '@atm-project/common';
import { FirebaseAuthService } from '@atm-project/common';
import { IRegisterData } from '@atm-project/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { checkValid } from '@atm-project/common';
import { BehaviorSubject, catchError } from 'rxjs';
@Component({
    selector: 'register-web-component',
    templateUrl: './register.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../../../styles/login.web.master.scss'],
    providers: [FirebaseAuthService],
})
export class RegisterWebComponent {
    protected registerForm: FormGroup<IRegisterForm> = new FormGroup(
        {
            name: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(6)],
            }),
            repeatPassword: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
        },
        conformPassword
    );
    public isRegisterError: BehaviorSubject<string | null> =
        new BehaviorSubject<string | null>(null);
    constructor(
        private _router: Router,
        private _fbAuthService: FirebaseAuthService,
        private _destroyRef: DestroyRef
    ) {}
    /**
     * function for check valid
     */
    public isValidContol(control: AbstractControl): boolean {
        return checkValid(control);
    }

    /**
     * function for navigate to auth
     */
    public navigateAuth(): void {
        this._router.navigate(['auth']);
    }
    /**
     * register func
     */
    public signUp(): void {
        const rawForm: IRegisterData = this.registerForm.getRawValue();
        this._fbAuthService
            .signUp(rawForm)
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                catchError(async () =>
                    this.isRegisterError.next(
                        'Не удалось зарегистрировать пользователя. Попробуйте снова.'
                    )
                )
            )
            .subscribe(() => this.navigateAuth());
    }
}
