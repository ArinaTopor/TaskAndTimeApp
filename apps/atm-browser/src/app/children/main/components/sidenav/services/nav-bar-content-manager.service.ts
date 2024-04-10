import { Injectable } from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import { delay, Observable, of } from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { FILTERS, PROJECTS, SECTION_LIST, TAGS } from '../models/section-list-content';
import { TAB_LIST } from '../models/tab-list-content';
import { IProject, ProjectType } from '../interfaces/project.interface';

@Injectable()
export class NavBarContentManagerService {

    constructor() {
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
