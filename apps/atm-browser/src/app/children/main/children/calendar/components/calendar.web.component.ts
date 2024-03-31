import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
    selector: 'calendar-web-component',
    template: './calendar.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarWebComponent {

}
