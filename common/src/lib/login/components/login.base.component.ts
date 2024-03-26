import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-base',
    templateUrl: 'login-base.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginBaseComponent implements OnInit {
    constructor() {
    }

    /**
     * инициализация компоненты и получения
     */
    public ngOnInit(): void {
        // init
    }

}