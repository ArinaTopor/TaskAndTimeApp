import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IStorage, LoginBaseComponent, STORAGE } from '@atm-project/common';

@Component({
    selector: 'auth-web-component',
    templateUrl: 'auth.web.component.html',
    styleUrls: ['./styles/auth.web.master.scss'],
    providers: [
        {
            provide: STORAGE,
            useValue: null,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthWebComponent extends LoginBaseComponent {
    protected authForm: FormGroup = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });
    protected readonly testForm: FormGroup = new FormGroup({
        testValue: new FormControl('profit@cool.ru'),
    });
    constructor(
        @Inject(STORAGE) service: IStorage,
        protected renderer: Renderer2
    ) {
        super(service);
        const root: HTMLElement = document.getElementById('root')!;
        // this.renderer.setAttribute(root, );
    }
    /**
     * function for auth
     */
    protected onSubmit(): void {
        console.log('auth');
    }
}
