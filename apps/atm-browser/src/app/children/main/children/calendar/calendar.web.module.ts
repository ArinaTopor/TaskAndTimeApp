import { NgModule } from '@angular/core';
import { CalendarWebComponent } from './components/calendar.web.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: CalendarWebComponent
    },
];

@NgModule({
    exports: [CalendarWebComponent],
    providers: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations: [
        CalendarWebComponent
    ]
})
export class CalendarWebModule {
}
