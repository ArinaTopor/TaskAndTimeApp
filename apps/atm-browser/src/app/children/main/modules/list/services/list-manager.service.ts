import { Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
} from '@atm-project/common';
import { ITask } from '@atm-project/interfaces';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor(
        private _afs: FirebaseDatabaseService,
        public fbAuthService: FirebaseAuthService
    ) {}

    /**
     * Получаем невыполненные задачи от сервера
     * */
    public getAllTask(): Observable<ITask[]> {
        return this.fbAuthService.user$.pipe(
            switchMap((user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.getAllTasks(user.uid);
                } else {
                    return of([]);
                }
            })
        );
    }
}
