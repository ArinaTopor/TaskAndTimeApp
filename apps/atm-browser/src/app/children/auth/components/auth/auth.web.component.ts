import { Component, ChangeDetectionStrategy, Inject, Renderer2 } from '@angular/core';
import { IStorage, LoginBaseComponent, STORAGE } from '@atm-project/common';

@Component({
    standalone: true,
    selector: 'auth-web-component',
    templateUrl: 'auth.web.component.html',
    styleUrls: ['./styles/auth.web.master.scss'],
    providers: [
        {
            provide: STORAGE,
            useValue: null
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthWebComponent extends LoginBaseComponent {
    constructor(
        @Inject(STORAGE) service: IStorage,
        protected renderer: Renderer2
    ) {
        super(service);
        const root : HTMLElement = document.getElementById('root')!;
        // this.renderer.setAttribute(root, );
    }
}