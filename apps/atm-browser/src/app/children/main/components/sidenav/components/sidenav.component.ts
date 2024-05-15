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
import { Observable, filter, of } from 'rxjs';
import { SettingsTabComponent } from '../../settings-tab-popap/settings-tab-popap.component';
import { IProject } from '@atm-project/common';
import { ProjectType } from '../interfaces/project.interface';
@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NavBarContentManagerService,
        SkeletonLoadingComponent,
        ModeToggleService,
        ModeToggleStorageService,
        SettingsTabComponent,
    ],
})
export class SidenavComponent implements OnInit {
    protected btnList: TabButtonViewModel[];
    protected projectType: typeof ProjectType = ProjectType;
    protected allProject$: Observable<IProject[]>;
    protected showProject: boolean = false;
    protected showTags: boolean = false;
    protected showFilters: boolean = false;
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
