import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import 'dayjs/locale/ru';
import { TaskService } from '../../../components/new-task/services/task.service';
import { ITask } from '@atm-project/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListService } from '../services/list-manager.service';
import {
    Observable,
    startWith,
    Subject,
    switchMap,
} from 'rxjs';

@Component({
    selector: 'list-web-component',
    templateUrl: './list.web.component.html',
    styleUrl: './list.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListWebComponent {
    @Input() public taskList: ITask[] | null | undefined;
    @Input() public isListCompleted: boolean | null | undefined = false;

    public curTask: ITask | undefined;
    public open: boolean = false;
    protected taskAll$: Observable<ITask[]>;
    protected destroyRef: DestroyRef = inject(DestroyRef);
    protected refreshSubject$: Subject<void> = new Subject<void>();

    constructor(protected taskService: TaskService, protected  listService: ListService) {
        this.taskAll$ = this.refreshSubject$
            .pipe(
                startWith(null),
                switchMap(() => this.getAllTask()),
            );
    }

    /**
     * Получаем список задач
     */
    protected getAllTask(): Observable<ITask[]> {
        return this.listService.getAllTask();
    }

    /**
     * Обновляем задачу
     */
    protected updateTask(task: ITask): void {
        this.taskService.updateTask(task)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.refreshSubject$.next();
            });
    }

    /**
     * Получаем текущую задачу
     */
    protected getCurrentTask(task: ITask): void {
        this.curTask = task;
        this.open = true;
    }
}
