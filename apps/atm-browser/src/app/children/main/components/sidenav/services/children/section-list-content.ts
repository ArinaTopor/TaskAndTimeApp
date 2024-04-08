import { ProjectType } from '../../interfaces/project.interface';
import { SectionListViewModel } from '../../view-models/section-list.view-model';

const pathToIcons: string = '../../../../../assets/icons/';

export const SECTION_LIST: SectionListViewModel[] = [
    new SectionListViewModel('Проекты', [
        {
            id: '1',
            title: 'Книги',
            type: ProjectType.project,
            icon: pathToIcons + 'fake.svg',
        },
        {
            id: '2',
            title: 'Учеба',
            type: ProjectType.project,
            icon: pathToIcons + 'fake.svg',
        }
    ]),
    new SectionListViewModel('Фильтры', [
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
        }
    ]),
    new SectionListViewModel('Теги', [
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
        }
    ])
];
