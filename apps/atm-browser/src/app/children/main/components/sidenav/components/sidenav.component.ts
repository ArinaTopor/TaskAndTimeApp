import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Inject,
    OnInit,
} from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import { NavBarContentManagerService } from '../services/nav-bar-content-manager.service';
import { SkeletonLoadingComponent } from '../../../../../modules/loader/skeleton.component';
import { ModeToggleService } from '../../mode/services/mode-toggle.service';
import { ModeToggleStorageService } from '../../mode/services/mode-storage.service';
import { FirebaseAuthService, USER_INFO_TOKEN } from '@atm-project/common';
import firebase from 'firebase/compat/app';
import { IProject } from '@atm-project/common';
import { SettingsTabComponent } from 'apps/atm-browser/src/app/modules/settings-tab-popap/settings-tab-popap.component';
import { BehaviorSubject, Observable, filter, of } from 'rxjs';
import { NewProjectComponent } from '../../new-project/new-project.component';
import { ProjectType } from '../interfaces/project.interface';
import { NewProjectService } from '../../new-project/services/new-project.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AnimationTriggerMetadata,
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
    state(
        'open',
        style({
            opacity: 1,
        })
    ),
    state(
        'close',
        style({
            opacity: 0,
        })
    ),
    transition('open => close', [animate('1s ease-out')]),
    transition('close => open', [animate('1s ease-out')]),
]);
@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NavBarContentManagerService,
        SkeletonLoadingComponent,
        ModeToggleService,
        NewProjectService,
        ModeToggleStorageService,
        SettingsTabComponent,
        NewProjectComponent,
    ],
    animations: [fadeInOut],
})
export class SidenavComponent implements OnInit {
    protected btnList: TabButtonViewModel[];
    protected projectType: typeof ProjectType = ProjectType;
    protected allProject$: Observable<IProject[]>;
    protected showProject: boolean = false;
    protected showTags: boolean = false;
    protected showFilters: boolean = false;
    protected isOpenModalProject: boolean = false;
    protected selectedTab: BehaviorSubject<ProjectType | null> =
        new BehaviorSubject<ProjectType | null>(null);
    public readonly tabs: typeof ProjectType = ProjectType;
    public user$: Observable<firebase.User | null> = of(null);

    constructor(
        protected contentManager: NavBarContentManagerService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService,
        private _destroyRef: DestroyRef
    ) {
        this.btnList = this.contentManager.getBtnList();
        this.allProject$ = this.contentManager.getProject();
    }
    public ngOnInit(): void {
        this.user$ = this.fbAuthService.user$.pipe(filter((user) => !!user));
    }
    /**
     * toggle selectedList
     */
    public toggleModal(open: boolean): void {
        this.isOpenModalProject = open;
    }

    /**
     * delete project
     */
    public deleteProject(projectId: string): void {
        this.contentManager
            .deleteProject(projectId)
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /**
     *
     * This method toggle section: open and close space.
     */
    protected toggleSection(typeProject: ProjectType): void {
        switch (typeProject) {
            case this.projectType.filter: {
                this.showFilters = !this.showFilters;
                break;
            }
            case this.projectType.tag: {
                this.showTags = !this.showTags;
                break;
            }
            case this.projectType.project: {
                this.showProject = !this.showProject;
                break;
            }
        }
    }
    /**
     * function for signOut
     */
    protected signOut(): void {
        this.fbAuthService.signOut();
    }
}
