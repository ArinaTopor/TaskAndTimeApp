import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login.interface';
import { SignInService } from './services/sign-in.service';
import { ILoginForm } from '../../interfaces/loginForm.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'auth-web-component',
    templateUrl: 'auth.web.component.html',
    styleUrls: ['./styles/_auth.web.component.scss'],
    providers: [SignInService],
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
        private _signInService: SignInService,
        private _router: Router
    ) {}
    /**
     * function for auth
     */
    protected onSubmit(): void {
        const rawForm: ILogin = this.authForm.getRawValue();
        this._signInService
            .signIn(rawForm)
            .then((userCredentials) => {
                this._signInService.saveSessionInfo(userCredentials);
                this._router.navigate(['main']);
            })
            .catch(() =>
                this.isAuthError.next('Неправильный логин или пароль')
            );
    }
}
