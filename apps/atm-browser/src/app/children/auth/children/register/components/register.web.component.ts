import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'register-web-component',
    templateUrl: './register.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterWebComponent {
    protected authForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        login: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        passwordRepeat: new FormControl('', Validators.required),
    });
    constructor(private _router: Router) {}
    /**
     * function for auth
     */
}
