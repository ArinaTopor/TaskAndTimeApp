import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { IElement } from '@atm-project/common';
import { ITask } from '@atm-project/interfaces';
import { CommonModalModule } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.module';
import { DeleteModalModule } from 'apps/atm-browser/src/app/modules/delete-modal/delete-modal.module';
import { SettingTabModule } from 'apps/atm-browser/src/app/modules/settings-tab-popap/setting-tab-popap.module';
import { Observable } from 'rxjs';
import { SectionModel } from './models/section.model';
import { ListWebModule } from '../../../../modules/list/list.web.module';
import { NewTaskComponent } from '../../../../components/new-task/components/new-task.component';
import { SectionService } from './services/section.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        NewTaskComponent,
    ],
})
export class SectionComponent implements OnChanges {
    @Input()
    public section!: IElement;
    @Input()
    public todos$!: Observable<ITask[]>;
    @Input()
    public projectId!: string;
    public sectionWithTodos!: SectionModel;

    constructor(
        private _sectionService: SectionService,
        private _destroyRef: DestroyRef
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['section'] || changes['todos$']) {
            if (this.section && this.todos$) {
                this.sectionWithTodos = new SectionModel(
                    this.section.id,
                    this.section.title,
                    this.todos$
                );
            }
        }
    }
    /**
     * updateSection
     */
    public updateSection(section: IElement): void {
        this._sectionService
            .updateSection(section, this.projectId)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }

    /**
     * delete section
     */
    public deleteSection(sectionId: string): void {
        this._sectionService
            .deleteSection(sectionId, this.projectId)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
}
