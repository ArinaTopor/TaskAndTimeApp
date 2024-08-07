import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { MonthCalendarWebComponent } from './components/month-calendar.web.component';
import { DateParseWebPipe } from '../../pipes/date-parse.web.pipe';


const routes: Routes = [
    {
        path: '',
        component: MonthCalendarWebComponent
    },
];

@NgModule({
    exports: [],
    providers: [],
    declarations: [
        MonthCalendarWebComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DateParseWebPipe,
        TuiButtonModule,
    ],
})
export class MonthCalendarWebModule {}
