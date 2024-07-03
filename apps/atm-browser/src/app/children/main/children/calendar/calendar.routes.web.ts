import { Routes } from '@angular/router';
import { CalendarWebComponent } from './components/calendar.web.component';

export const routes: Routes = [
    {
        path: '',
        component: CalendarWebComponent,
        children:[
            {
                path: 'week',
                loadChildren: () => import('./children/week/week-calendar.web.module')
                    .then((a: any) => a.WeekCalendarWebModule)
            },
            {
                path: 'month',
                loadChildren: () => import('./children/month/month-calendar.web.module')
                    .then((a: any) => a.MonthCalendarWebModule)
            },
            {
                path: '',
                redirectTo: 'week',
                pathMatch: 'full'
            }]
    }
];
