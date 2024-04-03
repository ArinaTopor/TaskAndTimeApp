import { INavbarDataFunction } from '../interfaces/data-function.web.interface.js';

export const navbarDataFunction: INavbarDataFunction[] = [
    {
        routeLink: 'project',
        icon: '../../../../../assets/icons/tag-close.svg',
        label:'Проекты',
        isShow: false,
        iconContent: '../../../../../assets/icons/fake.svg',
        content: ['Книги', 'Учеба']
    },
    {
        routeLink: 'filter',
        icon: '../../../../../assets/icons/tag-close.svg',
        label:'Фильтры',
        isShow: false,
        iconContent: '../../../../../assets/icons/filter.svg',
        content: ['Вчерашние задачи', 'Только срочные']
    },
    {
        routeLink: 'tags',
        icon: '../../../../../assets/icons/tag-close.svg',
        label:'Теги',
        isShow: false,
        iconContent: '../../../../../assets/icons/tag.svg',
        content: ['ВАЖНО', 'прочитано']
    },
];
