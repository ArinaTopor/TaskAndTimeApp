import { ITask } from '@atm-project/interfaces';
import { Observable } from 'rxjs';

export class SectionModel {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public taskList$: Observable<ITask[]>
    ) {
        this.id = id;
        this.title = title;
        this.taskList$ = taskList$;
    }
}
