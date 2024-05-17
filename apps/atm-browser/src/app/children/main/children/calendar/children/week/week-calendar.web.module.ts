import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { WeekCalendarWebComponent } from './components/week-calendar.web.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { DayParseWebPipe } from '../../pipes/day-parse.web.pipe';
import { TimeParseWebPipe } from '../../pipes/time-parse.web.pipe';
import { DateParseWebPipe } from '../../pipes/date-parse.web.pipe';

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
        DayParseWebPipe,
        TimeParseWebPipe,
        DateParseWebPipe
    ],
})
export class WeekCalendarWebModule {}
