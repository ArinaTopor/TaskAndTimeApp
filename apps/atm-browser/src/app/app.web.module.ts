import { ErrorHandler, importProvidersFrom, NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import {
    TuiAlertModule,
    TuiDialogModule,
    TuiNotificationModule,
    TuiRootModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import {
    BrowserAnimationsModule,
    provideAnimations,
} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonLoadingComponent } from './modules/loader/skeleton.component';
import { GlobalErrorHandler } from './services/global-error-handling.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertWithCustomLabelComponent } from './modules/widget-error/widget-error.component';

@NgModule({
    imports: [
        BrowserModule,
        NgxSkeletonLoaderModule.forRoot(),
        NxWelcomeComponent,
        RouterModule.forRoot(appRoutes),
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        CommonModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiNotificationModule,
        BrowserAnimationsModule,
        NgOptimizedImage,
        HttpClientModule,
    ],
    providers: [
        provideAnimations(),
        importProvidersFrom(TuiRootModule),
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ],
    declarations: [
        AppComponent,
        SkeletonLoadingComponent,
        AlertWithCustomLabelComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
