import { IProject, ProjectType } from '../interfaces/project.interface';
import { SectionListViewModel } from '../view-models/section-list.view-model';

const pathToIcons: string = '../../../../../assets/icons/';

export const SECTION_LIST: SectionListViewModel[] = [
    new SectionListViewModel('Проекты', ProjectType.project),
    new SectionListViewModel('Фильтры', ProjectType.filter),
    new SectionListViewModel('Теги', ProjectType.tag),
];

export const PROJECTS: IProject[] = [
    {
        id: '1',
        title: 'Книги',
        type: ProjectType.project,
        color: '#fddd',
    },
    {
        id: '2',
        title: 'Учеба',
        type: ProjectType.project,
        color: '#k009e',
    },
];

export const TAGS: IProject[] = [
    {
        id: '5',
        title: 'ВАЖНО',
        type: ProjectType.tag,
        icon: pathToIcons + 'tag.svg',
    },
    {
        id: '6',
        title: 'прочитано',
        type: ProjectType.tag,
        icon: pathToIcons + 'tag.svg',
    },
];

export const FILTERS: IProject[] = [
    {
        id: '3',
        title: 'Вчерашние задачи',
        type: ProjectType.filter,
        icon: pathToIcons + 'filter.svg',
    },
    {
        id: '4',
        title: 'Только срочные',
        type: ProjectType.filter,
        icon: pathToIcons + 'filter.svg',
    },
];
