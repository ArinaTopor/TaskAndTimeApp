import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { WeekCalendarWebComponent } from './components/week-calendar.web.component';
import { TuiButtonModule } from '@taiga-ui/core';

import { DateParseWebPipe } from '../../pipes/date-parse.web.pipe';
import { CalculatePositionDirective } from './directives/calculate-position.web.directive';

const routes: Routes = [
    {
        path: '',
        component: WeekCalendarWebComponent
    },
];

@NgModule({
    exports: [],
    providers: [],
    declarations: [
        WeekCalendarWebComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TuiButtonModule,
        DateParseWebPipe,
        CalculatePositionDirective
    ],
})
export class WeekCalendarWebModule {}
