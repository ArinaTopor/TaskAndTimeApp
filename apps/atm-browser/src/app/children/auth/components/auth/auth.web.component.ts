import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, IUserCredential, checkValid } from '@atm-project/common';
import { FirebaseAuthService } from '@atm-project/common';
import { ILoginForm } from '@atm-project/common';
import {
    BehaviorSubject,
    catchError,
    finalize,
    from,
    tap,
} from 'rxjs';

@Component({
    selector: 'auth-web-component',
    templateUrl: 'auth.web.component.html',
    styleUrls: ['../../styles/login.web.master.scss'],
    providers: [FirebaseAuthService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthWebComponent {
    public isAuthError: BehaviorSubject<string | null> = new BehaviorSubject<
        string | null
    >(null);
    protected isLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    protected authForm: FormGroup<ILoginForm> = new FormGroup({
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    constructor(
        private _fbAuthService: FirebaseAuthService,
        private _router: Router,
        private _destroyRef: DestroyRef
    ) {}
    /**
     * function for check valid
     */
    public isValidContol(control: AbstractControl): boolean {
        return checkValid(control);
    }
    /**
     * function for auth
     */
    protected onSignIn(): void {
        const rawForm: ILogin = this.authForm.getRawValue();
        this.isLoad.next(true);
        from(this._fbAuthService.signIn(rawForm))
            .pipe(
                tap((userCredentials: IUserCredential) => {
                    this._fbAuthService.saveSessionInfo(userCredentials);
                    this._router.navigate(['main']);
                }),
                catchError(async () =>
                    this.isAuthError.next('Неправильный логин или пароль')
                ),
                finalize(() => this.isLoad.next(false)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }
}
