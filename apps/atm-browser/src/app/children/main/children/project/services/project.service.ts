import { DestroyRef, Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    ISection,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { Observable, filter, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable()
export class ProjectService {
    // public user$: BehaviorSubject<firebase.User | null> =
    //     new BehaviorSubject<firebase.User | null>(null);
    constructor(
        private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) private _authService: FirebaseAuthService,
        private _destroyRef: DestroyRef
    ) {
        // this._authService.user$
        //     .pipe(
        //         filter((user) => !!user),
        //         takeUntilDestroyed(_destroyRef)
        //     )
        //     .subscribe((user) => {
        //         this.user$.next(user);
        //     });
    }

    /**
     * function for get sections of project
     */
    public getSection(projectId: string): Observable<ISection[]> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.formattedData(
                        this._afs.getSectionsProject(user.uid, projectId)
                    );
                } else {
                    return of([]);
                }
            }),
            takeUntilDestroyed(this._destroyRef)
        );
    }
    /**
     * fd
     */
    public getSectionInfo(id: string): Observable<ISection[]> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.formattedData(
                        this._afs.getSectionsProject(user.uid, id)
                    );
                } else {
                    console.log('');

                    return of([]);
                }
            }),
            takeUntilDestroyed(this._destroyRef)
        );
    }
}
