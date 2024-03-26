import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { IStorage, LoginBaseComponent, STORAGE } from '@atm-project/common';

@Component({
    standalone: true,
    selector: 'login-web-component',
    templateUrl: 'login-web-component.component.html',
    providers: [
        {
            provide: STORAGE,
            useValue: null
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginWebComponent extends LoginBaseComponent {
    constructor(
        @Inject(STORAGE) service: IStorage
    ) {
        super(service);
    }
}