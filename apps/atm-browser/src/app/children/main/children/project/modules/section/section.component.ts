import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Input,
} from '@angular/core';
import { IElement } from '@atm-project/common';
import { ITask } from '@atm-project/interfaces';
import { CommonModalModule } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.module';
import { DeleteModalModule } from 'apps/atm-browser/src/app/modules/delete-modal/delete-modal.module';
import { SettingTabModule } from 'apps/atm-browser/src/app/modules/settings-tab-popap/setting-tab-popap.module';
import { ListWebModule } from '../../../../../../modules/list/list.web.module';
import { SectionService } from './services/section.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskComponent } from '../../../../../../modules/task-modal/components/task.component';

@Component({
    selector: 'section',
    templateUrl: './section.component.html',
    styleUrl: './section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DeleteModalModule,
        CommonModalModule,
        SettingTabModule,
        CommonModule,
        ListWebModule,
        TaskComponent,
    ],
})
export class SectionComponent {
    @Input()
    public section!: IElement;
    @Input()
    public todos: ITask[] | null = null;
    @Input()
    public projectId!: string;
    @Input()
    public projectTitle!: string;

    constructor(
        private _sectionService: SectionService,
        private _destroyRef: DestroyRef
    ) {}

    /**
     * updateSection
     */
    public updateSection(section: IElement): void {
        this._sectionService
            .updateSection(section, this.projectId)
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /**
     * delete section
     */
    public deleteSection(sectionId: string): void {
        this._sectionService
            .deleteSection(sectionId, this.projectId)
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }
}
