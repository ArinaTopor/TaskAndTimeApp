import { Component, ChangeDetectionStrategy } from '@angular/core';
import { navbarDataList, navbarDataFunction, INavbarDataList, INavbarDataFunction } from '../nav-data';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SidenavComponent {
    public navDataList: INavbarDataList[];
    public navDataFunction: INavbarDataFunction[];
    public isShow: boolean = false;

    constructor() {
        this.navDataList = navbarDataList;
        this.navDataFunction = navbarDataFunction;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    protected show(data: INavbarDataFunction): void  {
        data.isShow = !data.isShow;
    }
}
