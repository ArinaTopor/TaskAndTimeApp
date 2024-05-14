import { Inject, Injectable } from '@angular/core';
import {
    DATABASE_INFO_TOKEN,
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN
} from '@atm-project/common';
import { ITask } from '../../../../../../../../../common/src/lib/db/interfaces/task.interface';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListContentManagerService {
    constructor(
        @Inject(DATABASE_INFO_TOKEN) private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService
    ) {}

    /**
     * Получаем невыполненные задачи от сервера*/
    public getAllTask(): Observable<ITask[]> {
        return this.fbAuthService.user$.pipe(
            switchMap((user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.getAllTasks(user.uid);
                } else {
                    console.error('User is null');

                    return of([]);
                }
            })
        );
    }

    /**
     * Получаем невыполненные задачи от сервера

    public getAllTask(): Observable<ITask[]> {
        return this.fbAuthService.user$.subscribe(
            (user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.getAllTasks(user.uid);
                } else {
                    console.error('User is null');
                    return of([]);
                }
            }
        );
    }*/
}
