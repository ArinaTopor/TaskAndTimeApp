import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { routes } from './calendar.routes.web';
import { CalendarWebComponent } from './components/calendar.web.component';
import {CalculatePositionDirective} from "./children/week/directives/calculate-position.web.directive";


@NgModule({
    exports: [],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
        RouterModule,
        CommonModule,
        TuiButtonModule,
    ],
    declarations: [
        CalendarWebComponent
    ]
})
export class CalendarWebModule {

}
