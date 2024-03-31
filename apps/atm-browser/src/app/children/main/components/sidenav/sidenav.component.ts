import { Component, ChangeDetectionStrategy, OnInit  } from '@angular/core';
import { navbarDataList, navbarDataFunction, INavbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrl: 'sidenav.component.scss',
    imports: [CommonModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidenavComponent implements OnInit{
    public navDataList: INavbarData[];
    public navDataFunction: INavbarData[];

    constructor() {
        this.navDataList = navbarDataList;
        this.navDataFunction = navbarDataFunction;
    }

    public ngOnInit(): void {
        console.log('gfhfhgytf');
    }
}
