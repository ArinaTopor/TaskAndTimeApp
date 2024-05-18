import { DestroyRef, Inject, Injectable } from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import {
    BehaviorSubject,
    filter,
    Observable,
    switchMap,
} from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import {
    SECTION_LIST,
} from '../models/section-list-content';
import { TAB_LIST } from '../models/tab-list-content';
import {
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN,
} from '@atm-project/common';
import { IProject } from '@atm-project/common';
import firebase from 'firebase/compat/app';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
            .pipe(
                filter((user) => !!user),
                takeUntilDestroyed(_destroyRef)
            )
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
        // section.list$ = this.getProjectListByType(section.type);
    }
    /**
     * this method for take project from fb
     */
    public getProject(): Observable<IProject[]> {
        return this.user$.pipe(
            filter((user): user is firebase.User => !!user),
            switchMap((user) =>
                this.afs.formattedData(this.afs.readProject(user.uid))
            ),
            takeUntilDestroyed(this._destroyRef)
        );
    }

    /**
     *  This method return list navbar function as Observable
     */
    // protected getProjectListByType(type: ProjectType): Observable<IProject[]> {
    //     switch (type) {
    //         case ProjectType.filter:
    //             return of(FILTERS).pipe(delay(1000));
    //         case ProjectType.tag:
    //             return of(TAGS);
    //         case ProjectType.project:
    //             return of(PROJECTS);
    //     }
    // }
}
