import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(mainRoutes),
    ],
    exports: [],
    providers: [],
})
export class MainWebModule {

}
