import { Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    USER_INFO_TOKEN,
} from '@atm-project/common';

import { ITask } from '@atm-project/interfaces';
import { Observable, of, switchMap } from 'rxjs';
import { FirebaseDatabaseService } from '@atm-project/common';

@Injectable()
export class NewTaskService {

    constructor(
        private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService
    ) {}

    /**
     * Добавляем задачу
     */
    public addTask(task: ITask): Observable<void | null> {
        return this.fbAuthService.user$.pipe(
            switchMap((user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.addNewTask(task, user.uid);
                } else {
                    return of(null);
                }
            })
        );
    }

    /**
     * Обновляем задачу
     */
    public updateTask(task: ITask): Observable<void | null> {
        return this.fbAuthService.user$.pipe(
            switchMap((user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.updateTask(task, user.uid);
                } else {
                    return of(null);
                }
            })
        );
    }
}
