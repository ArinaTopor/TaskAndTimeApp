import { Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
} from '@atm-project/common';
import { ITask } from '../../../../../../../../../common/src/lib/db/interfaces/task.interface';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListContentManagerService {
    constructor(
        private _afs: FirebaseDatabaseService,
        public fbAuthService: FirebaseAuthService
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
}
