import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DataNav, DATANAV, IDataNav } from '../model/nav-data';
import { INavbarDataList } from '../interfaces/data-list.web.interface.ts';
import { INavbarDataFunction } from '../interfaces/data-function.web.interface';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DATANAV,
            useValue: DataNav
        }
    ]
})

export class SidenavComponent {
    public isShow: boolean = false;
    protected navDataList: INavbarDataList[];
    protected navDataFunction:INavbarDataFunction[];

    constructor(
        @Inject(DATANAV) protected data:IDataNav

    ) {
        console.log(data.dataList);
        this.navDataList = data.dataList,
        this.navDataFunction = data.dataFunction;
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

