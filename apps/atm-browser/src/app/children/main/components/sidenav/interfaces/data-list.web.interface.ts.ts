import { InjectionToken } from '@angular/core';

export interface INavbarDataList {
    routeLink: string;
    icon: string;
    label: string;
}

export const LIST:InjectionToken<INavbarDataList[]> = new InjectionToken<INavbarDataList[]>('Наполнение навбара-лист');
