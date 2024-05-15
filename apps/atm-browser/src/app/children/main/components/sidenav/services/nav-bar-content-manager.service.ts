import { DestroyRef, Inject, Injectable } from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import {
    BehaviorSubject,
    delay,
    filter,
    Observable,
    of,
    switchMap,
} from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import {
    FILTERS,
    PROJECTS,
    SECTION_LIST,
    TAGS,
} from '../models/section-list-content';
import { TAB_LIST } from '../models/tab-list-content';
import { IProject, ProjectType } from '../interfaces/project.interface';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { IProject as project } from '@atm-project/common';
import firebase from 'firebase/compat/app';
@Injectable()
export class NavBarContentManagerService {
    public user$: BehaviorSubject<firebase.User | null> =
        new BehaviorSubject<firebase.User | null>(null);

    constructor(
        public afs: FirebaseDatabaseService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService,
        private _destroyRef: DestroyRef
    ) {
        this.fbAuthService.user$
            .pipe(filter((user) => !!user))
            .subscribe((user) => {
                this.user$.next(user);
            });
    }

    /**
     *
     * This method get data-list about tab-button
     */
    public getBtnList(): TabButtonViewModel[] {
        return TAB_LIST;
    }

    /**
     *
     * This method get data-list about section
     */
    public getSectionList(): SectionListViewModel[] {
        return SECTION_LIST;
    }

    /**
     * initSection
     * @param section
     */
    public initSection(section: SectionListViewModel): void {
        section.list$ = this.getProjectListByType(section.type);
    }
    /**
     * this method for take project from fb
     */
    public getProject(): Observable<project[]> {
        return this.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) => this.afs.formattedProjectsInfo(user.uid))
        );
    }

    /**
     *  This method return list navbar function as Observable
     */
    protected getProjectListByType(type: ProjectType): Observable<IProject[]> {
        switch (type) {
            case ProjectType.filter:
                return of(FILTERS).pipe(delay(1000));
            case ProjectType.tag:
                return of(TAGS);
            case ProjectType.project:
                return of(PROJECTS);
        }
    }
}
