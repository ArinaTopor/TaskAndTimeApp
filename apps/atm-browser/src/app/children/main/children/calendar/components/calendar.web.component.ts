import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { Router } from '@angular/router';


type CalendarTypes = 'week' | 'month'

@Component({
    selector: 'calendar-web-component',
    templateUrl: './calendar.web.component.html',
    styleUrl: './calendar.web.component.scss',

    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CalendarWebComponent {
    public get calendarType(): CalendarTypes {
        const type: string  = this._router.url.split('/')[2];

        return type as CalendarTypes;
    }

    constructor(
        private _router: Router
    ) {
    }
}
