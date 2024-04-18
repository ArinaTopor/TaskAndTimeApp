import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '@atm-project/common';
import { FirebaseAuthService } from '@atm-project/common';
import { ILoginForm } from '@atm-project/common';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'auth-web-component',
    templateUrl: 'auth.web.component.html',
    styleUrls: ['../../styles/login.web.master.scss'],
    providers: [FirebaseAuthService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthWebComponent {
    public isLoggingIn: boolean = false;
    public isAuthError: BehaviorSubject<string | null> = new BehaviorSubject<
        string | null
    >(null);

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
        private _router: Router
    ) {}
    /**
     * function for auth
     */
    protected onSignIn(): void {
        const rawForm: ILogin = this.authForm.getRawValue();
        this._fbAuthService
            .signIn(rawForm)
            .then((userCredentials) => {
                this._fbAuthService.saveSessionInfo(userCredentials);
                this._router.navigate(['main']);
            })
            .catch(() =>
                this.isAuthError.next('Неправильный логин или пароль')
            );
    }
}
