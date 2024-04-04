import { INavbarDataList } from '../interfaces/data-list.web.interface.ts';
import { initIconNavbar } from './init-icon.js';

export const navbarDataList: INavbarDataList[] = [
    {
        routeLink: 'list',
        icon: '',
        label:'Сегодня'
    },
    {
        routeLink: 'list',
        icon: '',
        label:'Неделя'
    },
    {
        routeLink: 'list',
        icon: '',
        label:'Календарь'
    },
];

/**
 * Asynchronously initializes data for the navigation list
 *
 * Function loads the paths to icons for each item in navbarDataList
 * and updates the icon property of each item using the loadIcon function
 */
async function initializeNavbarDataList(): Promise<void> {
    const icons:string[] = ['today.svg', 'week.svg', 'calendar.svg'];
    initIconNavbar(icons, navbarDataList);
}

initializeNavbarDataList();
