import { Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    USER_INFO_TOKEN,
} from '@atm-project/common';

import { ITask } from '@atm-project/interfaces';
import { filter, Observable, of, switchMap } from 'rxjs';
import { FirebaseDatabaseService } from '@atm-project/common';

@Injectable()
export class TaskService {

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

    /**
     * Удаляем задачу
     */
    public deleteTask(task: ITask): Observable<void | null> {
        return this.fbAuthService.user$.pipe(
            filter((user): user is firebase.default.User => !!user),
            switchMap((user) => this._afs.deleteTask(task, user.uid))
        );
    }
}
