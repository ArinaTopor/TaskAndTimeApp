import { DestroyRef, inject, Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN,
} from '@atm-project/common';

import { ITask } from '../../../../../../../../../common/src/lib/db/interfaces/task.interface';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class NewTaskService {
    protected destroyRef: DestroyRef = inject(DestroyRef);

    constructor(
        private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService
    ) {}

    /**
     * Добавляем задачу
     */
    public addTask(task: ITask): void {
        this.fbAuthService.user$.subscribe(
            (user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.addNewTask(task, user.uid).then();
                } else {
                    return of([]);
                }
            },
            takeUntilDestroyed(this.destroyRef)
        );
    }

    /**
     * Обновляем задачу
     */
    public updateTask(task: ITask): void {
        this.fbAuthService.user$.subscribe(
            (user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.updateTask(task, user.uid).then();
                } else {
                    return of([]);
                }
            },
            takeUntilDestroyed(this.destroyRef)
        );
    }
}
