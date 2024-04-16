import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterForm } from '../interfaces/register-form.interface';
import { SignUpService } from '../services/register.service';
import { IRegisterData } from '../interfaces/register.interface';
@Component({
    selector: 'register-web-component',
    templateUrl: './register.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterWebComponent {
    protected registerForm: FormGroup<IRegisterForm> = new FormGroup({
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
    });
    constructor(
        private _router: Router,
        private _signUpService: SignUpService
    ) {}
    /**
     * register func
     */
    public signUp(): void {
        const rawForm: IRegisterData = this.registerForm.getRawValue();
        this._signUpService
            .signUp(rawForm)
            .subscribe(() => this._router.navigate(['auth']));
    }
}
