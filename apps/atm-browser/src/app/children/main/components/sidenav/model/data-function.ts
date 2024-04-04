import { INavbarDataFunction } from '../interfaces/data-function.web.interface.js';
import { initIconNavbar, initIconNavbarContent } from './init-icon.js';

export const navbarDataFunction: INavbarDataFunction[] = [
    {
        routeLink: 'project',
        icon: '',
        label:'Проекты',
        isShow: false,
        iconContent: '',
        content: ['Книги', 'Учеба']
    },
    {
        routeLink: 'filter',
        icon: '',
        label:'Фильтры',
        isShow: false,
        iconContent: '',
        content: ['Вчерашние задачи', 'Только срочные']
    },
    {
        routeLink: 'tags',
        icon: '',
        label:'Теги',
        isShow: false,
        iconContent: '',
        content: ['ВАЖНО', 'прочитано']
    },
];

/**
 * Asynchronously initializes data for the navigation list
 *
 * This function loads the paths to icons for each item in navbarDataList
 * and updates the icon property of each item using the loadIcon function
 */
async function initializeNavbarDataFunction(): Promise<void> {
    const icons:string[] = ['tag-close.svg', 'tag-close.svg', 'tag-close.svg'];
    const iconsContent:string[] = ['fake.svg', 'filter.svg', 'tag.svg'];

    initIconNavbar(icons, navbarDataFunction);
    initIconNavbarContent(iconsContent, navbarDataFunction);
}

initializeNavbarDataFunction();
