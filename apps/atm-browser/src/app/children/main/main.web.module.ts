import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SidenavComponent } from './components/sidenav/components/sidenav.component';
import { MainWebComponent } from './components/main.web.component';
import { ModeToggleComponent } from './components/mode/mode-toggle.component';

@NgModule({
    exports: [],
    providers: [],
    declarations: [MainWebComponent, SidenavComponent, ModeToggleComponent],
    imports: [
        RouterModule.forChild(mainRoutes),
        NgOptimizedImage,
        CommonModule,
    ],
})
export class MainWebModule {}
