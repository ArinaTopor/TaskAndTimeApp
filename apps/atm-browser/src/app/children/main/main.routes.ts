import { Routes } from '@angular/router';
import { MainWebComponent } from './components/main.web.component';

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainWebComponent,
        children:[
            {
                path: '',
                loadChildren: () => import('./children/calendar/calendar.web.module')
                    .then((a: any) => a.CalendarWebModule)
            },
            {
                path: 'filter',
                loadChildren: () => import('./children/filter/filter.web.module')
                    .then((a: any) => a.FilterWebModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./children/list/list.web.module')
                    .then((a: any) => a.ListWebModule)
            },
            {
                path: 'project',
                loadChildren: () => import('./children/project/project.web.module')
                    .then((a: any) => a.ProjectWebModule)
            },
            {
                path: 'tags',
                loadChildren: () => import('./children/tags/tags.web.module')
                    .then((a: any) => a.TagsWebModule)
            },

        ]
    }
];
