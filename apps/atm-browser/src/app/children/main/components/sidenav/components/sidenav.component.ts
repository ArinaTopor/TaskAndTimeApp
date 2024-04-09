import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import { Observable } from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { NavBarContentManagerService } from '../services/nav-bar-content-manager.service';
import { SkeletonLoadingComponent } from 'apps/atm-browser/src/app/modules/loader/skeleton.component';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NavBarContentManagerService,
        SkeletonLoadingComponent
    ]
})
export class SidenavComponent {
    protected btnList: TabButtonViewModel[];
    protected sectionList$: Observable<SectionListViewModel[]>;
    protected isLoading: boolean = true;

    constructor(
        protected contentManager: NavBarContentManagerService,
        protected loading: SkeletonLoadingComponent
    ) {
        this.btnList = this.contentManager.getBtnList();
        this.sectionList$ = this.contentManager.getSectionList();
    }

    /**
     *
     * This method toogle section: open and close space.
     */
    protected toggleSection(section: SectionListViewModel): void {
        section.toggleSection();
        this.isLoading = this.loading.loadData(this.isLoading);
    }
}
