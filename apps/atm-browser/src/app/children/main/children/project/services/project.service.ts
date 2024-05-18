import { DestroyRef, Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    IProject,
    ISection,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { Observable, filter, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable()
export class ProjectService {
    constructor(
        private _afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) private _authService: FirebaseAuthService,
        private _destroyRef: DestroyRef
    ) {}

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
     * function for get info about project by id
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
                    return of([]);
                }
            }),
            takeUntilDestroyed(this._destroyRef)
        );
    }
    /**
     * function for add newSection
     */
    public addSection(
        projectId: string,
        section: ISection
    ): Observable<void | never[]> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.addNewSection(
                        projectId,
                        user.uid,
                        section
                    );
                } else {
                    return of();
                }
            }),
            takeUntilDestroyed(this._destroyRef)
        );
    }

    /**
     * getProjectInfo
     */
    public getProject(projectId: string): Observable<IProject[]> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.formattedData(
                        this._afs.readProject(user.uid)
                    );
                } else {
                    return of([]);
                }
            }),
            takeUntilDestroyed(this._destroyRef)
        );
    }
}
