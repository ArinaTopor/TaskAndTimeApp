import { importProvidersFrom, NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { TuiAlertModule, TuiDialogModule, TuiRootModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        NxWelcomeComponent,
        RouterModule.forRoot(appRoutes),
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        CommonModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgOptimizedImage,
    ],
    providers: [
        provideAnimations(),
        importProvidersFrom(TuiRootModule)
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
}
