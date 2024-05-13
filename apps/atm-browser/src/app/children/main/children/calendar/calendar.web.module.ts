import { NgModule } from '@angular/core';
import { CalendarWebComponent } from './components/calendar.web.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

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
        CommonModule
    ],
    declarations: [
        CalendarWebComponent
    ]
})
export class CalendarWebModule {
}
