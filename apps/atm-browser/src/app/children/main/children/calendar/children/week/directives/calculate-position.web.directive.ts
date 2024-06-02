import { Directive,  Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ITask } from '@atm-project/interfaces';

@Directive({
    standalone: true,
    selector: '[calculatePosition]',
})
export class CalculatePositionDirective {
    @Input()
    public set calculatePosition(task: ITask) {
        this._task = task;
    }

    @Input()
    public set calculatePositionHeight(h: number) {
        this._height = h;
        this.calculate();
    }

    private _task!: ITask;

    private _height!: number;

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
    ) {}


    /**
    * Считаем позицию таски
     */
    private calculate(): void {
        const delta: number = this._height / 60 / 24;

        if (!this._task.timeStart || !this._task.timeEnd) {
            return;
        }

        const [startHour, startMinute]: number[] = this._task.timeStart.split(':').map(e => Number(e));
        const [endHour, endMinute]: number[]= this._task.timeEnd.split(':').map(e => Number(e));

        const tempStart: number = (startHour * 60 + startMinute) * delta;
        const tempEnd: number = (endHour * 60 + endMinute) * delta;

        const el: any = this._viewContainer.createEmbeddedView(this._templateRef).rootNodes[0];
        el.style.height = tempEnd - tempStart + 'px';
        el.style.top = tempStart + 'px';
    }
}
