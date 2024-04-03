import { Injectable, InjectionToken } from '@angular/core';
import { INavbarDataFunction } from '../interfaces/data-function.web.interface.js';
import { INavbarDataList } from '../interfaces/data-list.web.interface.ts';

export const navbarDataList: INavbarDataList[] = [
    {
        routeLink: '/list',
        icon: '@web-assets/icons/today.svg',
        label:'Сегодня'
    },
    {
        routeLink: '/list',
        icon: '../../../../../assets/icons/week.svg',
        label:'Неделя'
    },
    {
        routeLink: '/list',
        icon: '../../../../../assets/icons/calendar.svg',
        label:'Календарь'
    },
];

export const navbarDataFunction: INavbarDataFunction[] = [
    {
        routeLink: '/project',
        icon: '../../../../../assets/icons/tag-close.svg',
        label:'Проекты',
        isShow: false,
        iconContent: '../../../../../assets/icons/fake.svg',
        content: ['Книги', 'Учеба']
    },
    {
        routeLink: '/filter',
        icon: '../../../../../assets/icons/tag-close.svg',
        label:'Фильтры',
        isShow: false,
        iconContent: '../../../../../assets/icons/filter.svg',
        content: ['Вчерашние задачи', 'Только срочные']
    },
    {
        routeLink: '/tags',
        icon: '../../../../../assets/icons/tag-close.svg',
        label:'Теги',
        isShow: false,
        iconContent: '../../../../../assets/icons/tag.svg',
        content: ['ВАЖНО', 'прочитано']
    },
];

@Injectable()
export class DataNav implements IDataNav {
    public static dataList:INavbarDataList[] = [
        {
            routeLink: '/list',
            icon: '@web-assets/icons/today.svg',
            label:'Сегодня'
        },
        {
            routeLink: '/list',
            icon: '../../../../../assets/icons/week.svg',
            label:'Неделя'
        },
        {
            routeLink: '/list',
            icon: '../../../../../assets/icons/calendar.svg',
            label:'Календарь'
        },
    ];
    public static dataFunction:INavbarDataFunction[] = navbarDataFunction;
}

export interface IDataNav {
    dataList:INavbarDataList[],
    dataFunction:INavbarDataFunction[]
}

export const DATANAV:InjectionToken<IDataNav> = new InjectionToken<IDataNav>('Наполнение навбара', { factory: () => new DataNav() });

