import { Injectable } from '@angular/core';
import { TabButtonViewModel } from '../view-models/tab-button.view-model';
import { delay, Observable, of } from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { SECTION_LIST } from './children/section-list-content';
import { TAB_LIST } from './children/tab-list-content';

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
    public getSectionList(): Observable<SectionListViewModel[]> {
        return of(SECTION_LIST)
            .pipe(
                delay(2000)
            );
    }

}
