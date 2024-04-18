import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterForm, conformPassword } from '@atm-project/common';
import { FirebaseAuthService } from '@atm-project/common';
import { IRegisterData } from '@atm-project/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
                validators: Validators.required,
            }),
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl('', {
                nonNullable: true,
                validators: Validators.required,
            }),
            repeatPassword: new FormControl('', {
                nonNullable: true,
                validators: Validators.required,
            }),
        },
        conformPassword
    );
    constructor(
        private _router: Router,
        private _fbAuthService: FirebaseAuthService,
        private _destroyRef: DestroyRef
    ) {}
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
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.navigateAuth());
    }
}
