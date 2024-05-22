import {
    ChangeDetectionStrategy,
    Component, DestroyRef, inject, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { NewTaskService } from '../services/new-task.service';
import dayjs from 'dayjs';
import { ITask } from '@atm-project/interfaces';
import { TuiInputTimeModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiCalendarModule, TuiDialogModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

@Component({
    selector: 'new-task-modal',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiInputTimeModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        FormsModule,
        TuiCalendarModule,
        ReactiveFormsModule,
        TuiDialogModule,
        TuiTextareaModule,
        TuiSelectModule,
        CommonModule,
        HttpClientModule,
        NgOptimizedImage
    ],
    standalone: true
})
export class NewTaskComponent implements OnChanges {
    @Input() public currentTask: ITask | null = null;
    @Input() public isEditing: boolean = false;
    @Input() public stateModal: boolean = false;
    public stateModalDate: boolean = false;
    protected valueDate: TuiDay | null = null;
    protected value: never[] = [];
    protected refreshSubject$: Subject<void> = new Subject<void>();
    protected destroyRef: DestroyRef = inject(DestroyRef);



    protected addTaskForm: FormGroup = new FormGroup({
        taskValueAdd: new FormControl(''),
        timeValueStart: new FormControl(''),
        timeValueEnd: new FormControl(''),
        checkboxRepeat: new FormControl(false),
        textarea: new FormControl(''),
        tags: new FormControl(''),
        isEdit: new FormControl(''),
    });

    public get valueTimeStart(): string | null {
        const time: any = this.addTaskForm.get('timeValueStart')?.value;

        if (time instanceof TuiTime) {
            return this.formatTuiTime(time);
        } else {
            return null;
        }
    }

    public get valueTimeEnd(): string | null {
        const time: any = this.addTaskForm.get('timeValueEnd')?.value;

        if (time instanceof TuiTime) {
            return this.formatTuiTime(time);
        } else {
            return null;
        }
    }

    constructor(private _newTaskService: NewTaskService) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.currentTask) {
            this.fillFormWithTaskData(this.currentTask);
        }
        console.log(this.currentTask);
    }
    /**
     * Форматируем данные
     */
    public addTask(): void {
        if (this.currentTask) {
            this._newTaskService.updateTask(this.currentTask)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.refreshSubject$.next();
                });
        } else {
            const taskDateJs: dayjs.Dayjs = dayjs(this.valueDate?.toLocalNativeDate());
            const taskDate: string = taskDateJs.toString();
            const taskValueAdd: string | null | undefined = this.addTaskForm.get('taskValueAdd')?.value;
            const taskDescription: string | null | undefined = this.addTaskForm.get('textarea')?.value;
            const taskTimeStart: string | null = this.valueTimeStart;
            const taskTimeEnd: string | null = this.valueTimeEnd;
            const taskTags: string | null | undefined = this.addTaskForm.get('tags')?.value;

            if (!taskValueAdd || taskValueAdd.trim() === '') {
                return;
            }

            const newTask: ITask = {
                id: crypto.randomUUID(),
                name: taskValueAdd,
                description: taskDescription,
                date: taskDate,
                timeStart: taskTimeStart,
                timeEnd: taskTimeEnd,
                tags: taskTags,
                checkbox: false,
            };

            this._newTaskService.addTask(newTask)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.refreshSubject$.next();
                });

            this.addTaskForm.reset();
            this.valueDate = null;
        }
        this.currentTask = null;
    }
    /**
     * Форматируем данные
     */
    public showDialog(): void {
        this.stateModal = true;
    }
    /**
     * Форматируем данные
     */
    public showDialogDate(): void {
        this.stateModalDate = true;
    }
    /**
     * Форматируем данные
     */
    protected onDayClick(day: TuiDay): void {
        this.valueDate = day;
    }
    /**
     * Форматируем данные
     */
    protected onDayClickDefault(): void {
        this.addTaskForm.reset();
        this.valueDate = null;
        this.stateModal = true;
    }
    /**
     * Форматируем данные
     */
    protected formatTuiTime(time: TuiTime): string {
        const hours: string = time.hours.toString().padStart(2, '0');
        const minutes: string = time.minutes.toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }
    /**
     * Форматируем данные
     */
    protected fillFormWithTaskData(task: ITask): void {
        const dateObject: Date = new Date(task.date?? '');

        const year: number = dateObject.getFullYear();
        const month: number = dateObject.getMonth() + 1;
        const day: number = dateObject.getDate();

        this.addTaskForm.patchValue({
            taskValueAdd: task.name,
            textarea: task.description,
            tags: task.tags,
            timeValueStart: task.timeStart,
            timeValueEnd: task.timeEnd,
            checkboxRepeat: task.checkbox,
            isEdit: task.isEditing
        });
        this.valueDate = new TuiDay(year, month, day);
    }


}
