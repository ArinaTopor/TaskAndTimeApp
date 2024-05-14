import { Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    IProject,
    USER_INFO_TOKEN,
} from '@atm-project/common';

@Injectable()
export class NewProjectService {
    constructor(
        private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService
    ) {}
    /**
     * function for add new project
     */
    public addProject(project: IProject): void {
        this.fbAuthService.user$.subscribe(
            (user: firebase.default.User | null) => {
                if (user) {
                    this._afs.addNewProject(project, user.uid);
                } else {
                    console.error('User is null');
                }
            }
        );
    }
}
