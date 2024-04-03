import { InjectionToken } from '@angular/core';

export interface INavbarDataFunction {
    routeLink: string;
    icon: string;
    label: string;
    isShow: boolean;
    iconContent: string;
    content: string[];
}

export const FUNCTION:InjectionToken<INavbarDataFunction[]> = new InjectionToken<INavbarDataFunction[]>('Наполнение навбара-функция');
