export interface INavbarDataList {
    routeLink: string;
    icon: string;
    label: string;
}

export interface INavbarDataFunction {
    routeLink: string;
    icon: string;
    label: string;
    isShow: boolean;
    iconContent: string;
    content: string[];
}

export const navbarDataList: INavbarDataList[] = [
    {
        routeLink: 'main/list',
        icon: '@web-assets/icons/today-icon.svg',
        label:'Сегодня'
    },
    {
        routeLink: 'main/list',
        icon: '../../../../../assets/icons/week-icon.svg',
        label:'Неделя'
    },
    {
        routeLink: 'main/list',
        icon: '../../../../../assets/icons/calendar-icon.svg',
        label:'Календарь'
    },
];

export const navbarDataFunction: INavbarDataFunction[] = [
    {
        routeLink: 'main/project',
        icon: '../../../../../assets/icons/tag-close-icon.svg',
        label:'Проекты',
        isShow: false,
        iconContent: '../../../../../assets/icons/fake.svg',
        content: ['Книги', 'Учеба']
    },
    {
        routeLink: 'main/filter',
        icon: '../../../../../assets/icons/tag-close-icon.svg',
        label:'Фильтры',
        isShow: false,
        iconContent: '../../../../../assets/icons/filter-icon.svg',
        content: ['Вчерашние задачи', 'Только срочные']
    },
    {
        routeLink: 'main/tags',
        icon: '../../../../../assets/icons/tag-close-icon.svg',
        label:'Теги',
        isShow: false,
        iconContent: '../../../../../assets/icons/tag-icon.svg',
        content: ['ВАЖНО', 'прочитано']
    },
];


