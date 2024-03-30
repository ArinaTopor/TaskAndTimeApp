import { Component, ChangeDetectionStrategy, Inject, Renderer2 } from '@angular/core';
import { IStorage, LoginBaseComponent, STORAGE } from '@atm-project/common';

@Component({
    selector: 'login-web-component',
    template: '<div></div>',
    providers: [
        {
            provide: STORAGE,
            useValue: null
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoFactorWebComponent extends LoginBaseComponent {
    constructor(
        @Inject(STORAGE) service: IStorage,
        protected renderer: Renderer2
    ) {
        super(service);
        const root : HTMLElement = document.getElementById('root')!;
    }
}