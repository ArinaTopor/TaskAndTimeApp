import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Inject,
    OnInit,
} from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { NavBarContentManagerService } from '../services/nav-bar-content-manager.service';
import { SkeletonLoadingComponent } from '../../../../../modules/loader/skeleton.component';
import { ModeToggleService } from '../../mode/services/mode-toggle.service';
import { ModeToggleStorageService } from '../../mode/services/mode-storage.service';
import { FirebaseAuthService, USER_INFO_TOKEN } from '@atm-project/common';
import firebase from 'firebase/compat/app';
import { Observable, filter, of } from 'rxjs';
import { NewProjectComponent } from '../../../children/project/children/modal-component/new-project.component';
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
        NewProjectComponent,
    ],
})
export class SidenavComponent implements OnInit {
    protected btnList: TabButtonViewModel[];
    protected sectionList: SectionListViewModel[];
    public user$: Observable<firebase.User | null> = of(null);

    constructor(
        protected contentManager: NavBarContentManagerService,
        @Inject(USER_INFO_TOKEN) public fbAuthService: FirebaseAuthService,
        private _destroyRef: DestroyRef
    ) {
        this.btnList = this.contentManager.getBtnList();
        this.sectionList = this.contentManager.getSectionList();

        this.sectionList.forEach((section: SectionListViewModel) => {
            this.contentManager.initSection(section);
        });
    }
    public ngOnInit(): void {
        this.user$ = this.fbAuthService.user$.pipe(filter((user) => !!user));
    }

    /**
     *
     * This method toggle section: open and close space.
     */
    protected toggleSection(section: SectionListViewModel): void {
        section.toggleSection();
    }
    /**
     * function for signOut
     */
    protected signOut(): void {
        this.fbAuthService.signOut();
    }
}
