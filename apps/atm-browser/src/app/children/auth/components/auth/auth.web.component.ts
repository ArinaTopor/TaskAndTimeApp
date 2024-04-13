import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-web-component',
    templateUrl: 'auth.web.component.html',
    styleUrls: ['./styles/auth.web.master.scss'],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthWebComponent {
    protected authForm: FormGroup = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });
    public isLoggingIn: boolean = false;
    protected authService: any = inject(AuthService);
    constructor(private _router: Router) {}
    /**
     * function for auth
     */
    protected onSubmit(): void {
        this.isLoggingIn = true;
        const rawForm: any = this.authForm.getRawValue();
        this.authService.login(rawForm.email, rawForm.password).subscribe(
            () => {
                this._router.navigate(['main']);
            },
            (error: any) => {
                alert(error);
            }
        );

        console.log('auth');
    }
}
