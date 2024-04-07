import { Injectable } from '@angular/core';
import { CalendarButtonViewModel } from '../view-models/calendar-button.view-model';
import { delay, Observable, of } from 'rxjs';
import { SectionListViewModel } from '../view-models/section-list.view-model';
import { ProjectType } from '../interfaces/project.interface';

@Injectable()
export class NavBarContentManagerService {

    constructor() {
    }

    public getBtnList(): CalendarButtonViewModel[] {
        // TODO заполнить кнопки
        return [];
    }

    public getSectionList(): Observable<SectionListViewModel[]> {
        return of(SECTION_LIST)
            .pipe(
                delay(5000)
            );
    }

}

export const SECTION_LIST: SectionListViewModel[] = [
    new SectionListViewModel('Проекты', [
        {
            id: '1',
            title: 'Книги',
            type: ProjectType.project,
        },
        {
            id: '2',
            title: 'Книги',
            type: ProjectType.project,
        }
    ]),
    new SectionListViewModel('Фильтры', [
        {
            id: '3',
            title: 'Вчерашние',
            type: ProjectType.filter,
        },
        {
            id: '4',
            title: 'Только срочные',
            type: ProjectType.filter,
        }
    ]),
    new SectionListViewModel('Теги', [
        {
            id: '5',
            title: 'ВАЖНО',
            type: ProjectType.tag,
        },
        {
            id: '6',
            title: 'прочитано',
            type: ProjectType.tag,
        }
    ])
];