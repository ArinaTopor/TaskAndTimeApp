import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TextControlComponent } from '../../modules/components/text-control.component';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

interface ITask {
    name: string;
    color: string;
}
@Component({
    standalone: true,
    selector: 'app-acc',
    template: `
        <div>
            <button (click)="addTask()">Добавить таску</button>
            <div class="task-container" *ngIf="(tasks$ | async) as tasks; else skeleton">
                <div class="task" *ngFor="let task of tasks" [style.margin-bottom]="'16px'" [style.background-color]="task.color">
                    {{task.name}}
                </div>
            </div>
            <ng-template #skeleton> Тасок нет, они грузятся</ng-template>
        </div>
    `,
    imports: [
        TextControlComponent,
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccComponent implements OnInit, OnDestroy {
    public get tasks$(): Observable<ITask[]> {
        return this._tasks$.asObservable();
    }

    protected _tasks$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
    private destroy$: Subject<void> = new Subject<void>();
    constructor() {
        this.tasks$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    protected addTask(): void {
        const curTask: ITask[] = this._tasks$.value;
        curTask.push({
            name: 'Я таска!',
            color: 'red'
        })

        this._tasks$.next(curTask);
    }
}