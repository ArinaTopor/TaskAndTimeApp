import {
    ChangeDetectionStrategy,
    Component, DestroyRef, inject, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TaskService } from '../services/task.service';
import dayjs from 'dayjs';
import { ITask } from '@atm-project/interfaces';
import { TuiInputTimeModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiCalendarModule, TuiDialogModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

@Component({
    selector: 'task-modal',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
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
export class TaskComponent implements OnChanges {
    @Input() public currentTask!: ITask | undefined;
    @Input() public isEditing: boolean = false;
    @Input() public stateModal: boolean = false;
    @Input() public actionModal: 'add' | 'edit' | undefined | null = null;

    public stateModalDate: boolean = false;
    protected valueDate: TuiDay | null = null;
    protected value: never[] = [];
    protected refreshSubject$: Subject<void> = new Subject<void>();
    protected destroyRef: DestroyRef = inject(DestroyRef);

    protected taskForm: FormGroup = new FormGroup({
        taskValueAdd: new FormControl(''),
        timeValueStart: new FormControl(''),
        timeValueEnd: new FormControl(''),
        checkboxRepeat: new FormControl(false),
        textarea: new FormControl(''),
        tags: new FormControl(''),
    });

    public get valueTimeStart(): string | null | undefined {
        return this.getTimeValue('timeValueStart');
    }

    public get valueTimeEnd(): string | null | undefined {
        return this.getTimeValue('timeValueEnd');
    }

    constructor(protected taskService: TaskService) {}

    /**
     * Получаем значение времени из формы и форматируем
     */
    public getTimeValue(fieldName: string): string | null | undefined {
        const time: any = this.taskForm.get(fieldName)?.value;

        if (time instanceof TuiTime) {
            return this.formatTuiTime(time);
        }

        return time;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.getForm();
    }

    /**
     * Открываем модалку
     */
    public showDialog(): void {
        this.stateModal = true;
    }

    /**
     * Получаем форму
     */
    public getForm(): FormGroup {
        if (this.actionModal === 'edit') {
            this.taskForm.setValue({
                taskValueAdd: this.currentTask?.name || '',
                timeValueStart: this.currentTask?.timeStart || null,
                timeValueEnd: this.currentTask?.timeEnd || null,
                checkboxRepeat: this.currentTask?.checkbox || false,
                textarea: this.currentTask?.description || '',
                tags: this.currentTask?.tags || [],
            });
            const dateObject: Date = dayjs(this.currentTask?.date).toDate();
            this.valueDate = TuiDay.fromLocalNativeDate(dateObject);
        }

        return this.taskForm;
    }
    /**
     * Открываем модалку даты
     */
    public showDialogDate(): void {
        this.stateModalDate = true;
    }

    /**
     * Работаем с задачей
     */
    public actionTask(): void {
        const taskValueAdd: string | null | undefined = this.taskForm.get('taskValueAdd')?.value;
        const taskDescription: string | null | undefined = this.taskForm.get('textarea')?.value;
        const taskTimeStart: string | null | undefined = this.valueTimeStart;
        const taskTimeEnd: string | null | undefined = this.valueTimeEnd;
        const taskDateJs: dayjs.Dayjs = dayjs(this.valueDate?.toLocalNativeDate());
        const taskDate: string = taskDateJs.toString();
        const taskTags: string | null | undefined = this.taskForm.get('tags')?.value;

        if (!taskValueAdd || taskValueAdd.trim() === '') {
            return;
        }

        if (this.currentTask) {
            const taskId: string | undefined = this.currentTask?.id;

            const updatedTask: ITask = {
                ...this.currentTask,
                id: taskId,
                name: taskValueAdd,
                description: taskDescription,
                date: taskDate,
                timeStart: taskTimeStart,
                timeEnd: taskTimeEnd,
                tags: taskTags,
                checkbox: false
            };

            this.taskService.updateTask(updatedTask)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.refreshSubject$.next();
                    this.stateModal = false;
                });
        } else {
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

            this.taskService.addTask(newTask)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.refreshSubject$.next();
                });
        }

        this.taskForm.reset();
        this.valueDate = null;
    }

    /**
     * Удаление задачи
     */
    public deleteTask(): void {
        this.taskService
            .deleteTask(this.currentTask!)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    /**
     * Выбираем день
     */
    protected onDayClick(day: TuiDay): void {
        this.valueDate = day;
    }

    /**
     * Очищаем форму
     */
    protected onDayClickDefault(): void {
        this.taskForm.reset();
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
}
