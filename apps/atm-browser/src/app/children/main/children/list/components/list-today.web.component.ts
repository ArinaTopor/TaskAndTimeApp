import { ChangeDetectionStrategy, Component } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ListContentManagerService } from '../services/list-content-manager.service';
import {
    BehaviorSubject,
    delay,
    map,
    Observable,
    shareReplay,
    startWith,
    Subject,
    switchMap,
} from 'rxjs';
import { NewTaskService } from '../../../components/new-task/services/new-task.service';
import { ITask } from '../../../../../../../../../common/src/lib/db/interfaces/task.interface';

@Component({
    selector: 'list-web-component',
    templateUrl: './list-today.web.component.html',
    styleUrl: './list-today.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTodayWebComponent {
    protected readonly currentDate: string = dayjs().locale('ru').format('D MMMM');
    protected currentDateFull: dayjs.Dayjs = dayjs().locale('ru');
    protected isModalOpen: boolean = false;

    protected taskAll$: Observable<ITask[]>;
    protected unCompletedTask$: Observable<ITask[]>;
    protected completedTask$: Observable<ITask[]>;

    protected refreshSubject$: Subject<void> = new Subject<void>();
    private _isShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public get isShow$(): Observable<boolean> {
        return this._isShow$.asObservable();
    }

    constructor(protected listService: ListContentManagerService, protected taskService: NewTaskService) {
        this.taskAll$ = this.refreshSubject$
            .pipe(
                startWith(null),
                switchMap(() => this.getAllTask()),
                shareReplay(1)
            );

        this.unCompletedTask$ = this.taskAll$
            .pipe(
                map((taskList: ITask[]) =>
                    taskList.filter(task => {
                        const taskDate: dayjs.Dayjs = dayjs(task.date, 'YYYY-MM-DD');
                        const currentDate: dayjs.Dayjs = dayjs(this.currentDateFull, 'YYYY-MM-DD');

                        return!task.checkbox && taskDate.format('YYYY MM DD') === currentDate.format('YYYY MM DD');
                    })
                ),
                delay(300),
            );

        this.completedTask$ = this.taskAll$
            .pipe(
                map((taskList: ITask[]) =>
                    taskList.filter(task => {
                        const taskDate: dayjs.Dayjs | null = task.date? dayjs(task.date) : null;

                        return task.checkbox && (taskDate === this.currentDateFull);
                    })
                ),
                delay(300),
            );

    }

    /**
     * Открываем модалку
     */
    protected showDialog(): void {
        this.isModalOpen = true;
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
        this.taskService.updateTask(task);
    }

    /**
     *
     * Показываем и скрываем список выполненных задач
     */
    protected toggleSection(): void {
        this._isShow$.next(!this._isShow$.value);
    }
}
