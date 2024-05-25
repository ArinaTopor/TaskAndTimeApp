import { DestroyRef, Inject, Injectable } from '@angular/core';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    IProject,
    IElement,
    USER_INFO_TOKEN,
    ISection,
} from '@atm-project/common';
import { Observable, filter, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITask } from '@atm-project/interfaces';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
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
    public getSections(projectId: string): Observable<ISection[]> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.getSectionsProject(
                        user.uid,
                        projectId,
                        this.getAllTodos(projectId)
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
        section: IElement
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
    public getProjectById(
        projectId: string
    ): Observable<Array<DocumentChangeAction<IProject>>> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.getProjectById(user.uid, projectId).pipe();
                } else {
                    return of([]);
                }
            }),
            takeUntilDestroyed(this._destroyRef)
        );
    }

    /**
     * function for get all todos
     */
    public getAllTodos(projectId: string): Observable<ITask[]> {
        return this._authService.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => {
                if (user) {
                    return this._afs.getTodosByProject(user.uid, projectId);
                } else {
                    return of([]);
                }
            })
        );
    }
}
