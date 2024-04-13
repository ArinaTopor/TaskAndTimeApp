import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
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
    protected regService: any = inject(RegisterService);
    constructor(private _router: Router) {}
    /**
     * function for auth
     */
    protected onSubmit(): void {
        const rawForm: any = this.authForm.getRawValue();
        this.regService
            .register(rawForm.email, rawForm.name, rawForm.password)
            .subscribe();
        this._router.navigate(['auth']);
        console.log('reg');
    }
}
