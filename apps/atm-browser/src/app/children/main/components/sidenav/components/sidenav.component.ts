import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { INavbarDataList } from '../interfaces/data-list.web.interface.ts';
import { INavbarDataFunction } from '../interfaces/data-function.web.interface';
import { DATANAV, IDataNav } from '../interfaces/data-navbar.web.interface.js';
import { DataNav } from '../model/data.js';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: DATANAV,
        useValue: new DataNav()
    }]
})

export class SidenavComponent {
    public isShow: boolean = false;
    protected navDataList:INavbarDataList[];
    protected navDataFunction:INavbarDataFunction[];

    constructor(
        @Inject(DATANAV) protected navbar:IDataNav
    ) {
        this.navDataList = navbar.dataList;
        this.navDataFunction = navbar.dataFunction;
    }

    /**
     * Toggles the visibility of navbar data
     *
     * @param {INavbarDataFunction} data - The navbar data whose visibility is to be toggled.
     * @returns {void}
     */
    protected showNavbarData(data: INavbarDataFunction): void {
        data.isShow = !data.isShow;
    }
}

