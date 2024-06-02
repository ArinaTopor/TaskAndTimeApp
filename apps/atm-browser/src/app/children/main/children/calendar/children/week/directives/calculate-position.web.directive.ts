import {AfterViewInit, Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ITask} from "@atm-project/interfaces";
import {WeekCalendarWebComponent} from "../components/week-calendar.web.component";

@Directive({
    standalone: true,
    selector: '[calculatePosition]',
})
export class CalculatePositionDirective {
    @Input()
    public set calculatePosition(task: ITask) {
        this._task=task
    }
    @Input()
    public set calculatePositionHeight(h: number) {
        this._height = h
        this.calculate()
    }

    private _task!: ITask

    private _height!: number

    private calculate(){
        const delta: number = this._height / 60 / 24;

        if (!this._task.timeStart || !this._task.timeEnd) {
            return
        }

        let [shour, sminute] = this._task.timeStart.split(':').map(e => Number(e))
        let [ehour, eminute] = this._task.timeEnd.split(':').map(e => Number(e))

        const tempStart: number = (shour * 60 + sminute) * delta;
        const tempEnd: number = (ehour * 60 + eminute) * delta;

        const el = this.viewContainer.createEmbeddedView(this.templateRef).rootNodes[0]
        el.style.height = tempEnd-tempStart + 'px'
        el.style.top = tempStart + 'px'
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
    ) {}
}
