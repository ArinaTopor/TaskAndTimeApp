import { Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    IProject,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { Observable, of, switchMap } from 'rxjs';

@Injectable()
export class NewProjectService {
    constructor(
        private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService
    ) {}
    /**
     * function for add new project
     */
    public addProject(project: IProject): Observable<void | null> {
        return this.fbAuthService.user$.pipe(
            switchMap((user: firebase.default.User | null) => {
                if (user) {
                    return this._afs.addNewProject(project, user.uid);
                } else {
                    return of(null);
                }
            })
        );
    }
}
