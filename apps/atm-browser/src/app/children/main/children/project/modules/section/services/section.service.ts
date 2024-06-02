import { Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    IElement,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { Observable, filter, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
@Injectable()
export class SectionService {
    constructor(
        private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) private _authService: FirebaseAuthService
    ) {}
    /**
     * function for update section
     * @param projectId
     * @param section
     * @returns
     */
    public updateSection(
        section: IElement,
        projectId: string
    ): Observable<void> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.updateSection(
                        user.uid,
                        projectId,
                        section.id,
                        section
                    );
                } else {
                    return of();
                }
            })
        );
    }

    /**
     * delete section
     */
    public deleteSection(
        sectionId: string,
        projectId: string
    ): Observable<void> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.deleteSection(
                        user.uid,
                        projectId,
                        sectionId
                    );
                } else {
                    return of();
                }
            })
        );
    }
}
