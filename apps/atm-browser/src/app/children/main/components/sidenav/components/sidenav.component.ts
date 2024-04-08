import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import { Observable } from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { NavBarContentManagerService } from '../services/nav-bar-content-manager.service';
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NavBarContentManagerService,
        NgxSkeletonLoaderComponent,
        NgxSkeletonLoaderModule,
    ]
})
export class SidenavComponent {
    protected btnList: TabButtonViewModel[];
    protected sectionList$: Observable<SectionListViewModel[]>;

    constructor(
        protected contentManager: NavBarContentManagerService
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
    }
}

