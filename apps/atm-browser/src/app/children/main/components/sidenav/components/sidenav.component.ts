import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { NavBarContentManagerService } from '../services/nav-bar-content-manager.service';
import { SkeletonLoadingComponent } from '../../../../../modules/loader/skeleton.component';

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
    protected sectionList: SectionListViewModel[];

    constructor(
        protected contentManager: NavBarContentManagerService,
    ) {
        this.btnList = this.contentManager.getBtnList();
        this.sectionList = this.contentManager.getSectionList();

        this.sectionList.forEach((section: SectionListViewModel) => {
            this.contentManager.initSection(section);
        });
    }

    /**
     *
     * This method toggle section: open and close space.
     */
    protected toggleSection(section: SectionListViewModel): void {
        section.toggleSection();
    }
}
