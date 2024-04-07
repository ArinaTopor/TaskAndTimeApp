import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarButtonViewModel } from '../view-models/calendar-button.view-model';
import { Observable } from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { NavBarContentManagerService } from '../services/nav-bar-content-manager.service';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NavBarContentManagerService,
    ]
})
export class SidenavComponent {
    protected btnList: CalendarButtonViewModel[];
    protected sectionList$: Observable<SectionListViewModel[]>;


    constructor(
        protected contentManager: NavBarContentManagerService
    ) {
        this.btnList = this.contentManager.getBtnList();
        this.sectionList$ = this.contentManager.getSectionList();
    }

    protected toggleSection(section: SectionListViewModel): void {
        section.toggleSection();
    }
}

