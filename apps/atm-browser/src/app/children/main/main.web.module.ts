import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SidenavComponent } from './components/sidenav/components/sidenav.component';
import { MainWebComponent } from './components/main.web.component';

@NgModule({
    exports: [],
    providers: [],
    declarations: [
        MainWebComponent,
        SidenavComponent,
    ],
    imports: [
        RouterModule.forChild(mainRoutes),
        NgOptimizedImage,
        CommonModule,
    ]
})
export class MainWebModule {
}
