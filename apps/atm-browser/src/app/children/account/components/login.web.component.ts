import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    standalone: true,
    selector: 'login-web-component',
    templateUrl: 'login-web-component.component.html',
    providers: [
        // {
        //     provide: STORAGE,
        //     useClass: LocalStorageService
        // }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

// export class LoginWebComponent extends LoginBaseComponent {
export class LoginWebComponent {
}