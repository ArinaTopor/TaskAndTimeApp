import { DestroyRef, inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
} from '@atm-project/common';
import { ITask } from '../../../../../../../../../common/src/lib/db/interfaces/task.interface';
import { Observable, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class ListContentManagerService {
    protected destroyRef: DestroyRef = inject(DestroyRef);

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
                    return of([]);
                }
            }),
            takeUntilDestroyed(this.destroyRef)
        );
    }
}
