import { Directive, Inject, OnInit } from '@angular/core';
import { IStorage, STORAGE } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Directive()
export class LoginBaseComponent implements OnInit {

    constructor(
        @Inject(STORAGE) protected storageService: IStorage
    ) {
    }

    /**
     * инициализация компоненты и получения
     */
    public ngOnInit(): void {
        // init
        this.storageService.getDataByKey<string>('login')
            .pipe(
                tap((login: string): void => {
                    if (login) {
                        //...
                    }
                })
            );
    }

}