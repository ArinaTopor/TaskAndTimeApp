import { Inject, Injectable } from '@angular/core';
import {
    DATABASE_INFO_TOKEN,
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN,
} from '@atm-project/common';

import { ITask } from '../../../../../../../../../../../common/src/lib/db/interfaces/task.interface';

@Injectable()
export class NewTaskService {
    constructor(
        @Inject(DATABASE_INFO_TOKEN) private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService
    ) {}

    /**
     * Добавляем задачу
     */
    public addTask(task: ITask): void {
        this.fbAuthService.user$.subscribe(
            (user: firebase.default.User | null) => {
                if (user) {
                    this._afs.addNewTask(task, user.uid).then();
                } else {
                    console.error('User is null');
                }
            }
        );
    }

    /**
     * Обновляем задачу
     */
    public updateTask(task: ITask): void {
        this.fbAuthService.user$.subscribe(
            (user: firebase.default.User | null) => {
                if (user) {
                    this._afs.updateTask(task, user.uid).then();
                } else {
                    console.error('User is null');
                }
            }
        );
    }
}
