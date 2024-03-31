import { Component, ChangeDetectionStrategy } from '@angular/core';
import { navbarDataList, navbarDataFunction, INavbarDataList, INavbarDataFunction } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    standalone: true,
    selector: 'sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrl: 'sidenav.component.scss',
    imports: [CommonModule, RouterModule, NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.OnPush
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
