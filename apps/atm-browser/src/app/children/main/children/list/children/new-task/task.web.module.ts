import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
    TuiSvgModule,
    TuiLinkModule,
    TuiDialogModule,
    TuiRootModule,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    DATABASE_INFO_TOKEN,
    FirebaseAuthService,
    FirebaseDatabaseService,
    USER_INFO_TOKEN
} from '@atm-project/common';


@NgModule({
    exports: [],
    providers: [
        { provide: USER_INFO_TOKEN, useClass: FirebaseAuthService },
        { provide: DATABASE_INFO_TOKEN, useClass: FirebaseDatabaseService },
        FirebaseDatabaseService,
    ],
    imports: [
        TuiSvgModule,
        HttpClientModule,
        TuiLinkModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        TuiRootModule,
        TuiDialogModule,
    ],
    declarations: [],
})
export class TaskWebModule {}
