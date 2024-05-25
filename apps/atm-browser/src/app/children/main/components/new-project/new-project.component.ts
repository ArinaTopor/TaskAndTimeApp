import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { INewProject } from './interfaces/new-project-form.interface';
import { IProject } from '@atm-project/common';
import { NewProjectService } from './services/new-project.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    TuiButtonModule,
    TuiDialogModule,
    TuiRootModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { ColorPickerModule } from 'ngx-color-picker';
import { ControlErrorModule } from 'apps/atm-browser/src/app/modules/atm-controls/control-error.module';
@Component({
    selector: 'new-project-modal',
    templateUrl: './new-project.component.html',
    styleUrl: './new-project.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ColorPickerModule,
        ReactiveFormsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        ControlErrorModule,
    ],
})
export class NewProjectComponent implements OnChanges {
    @Input() public isOpen: boolean = false;
    @Input() public project?: IProject;
    @Input() public isEdit: boolean = false;
    @Output() public toggleModal: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    protected color: string = 'rgb(141,207,255)';
    protected newProjectForm: FormGroup<INewProject> = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        color: new FormControl(this.color, {
            nonNullable: true,
            validators: Validators.required,
        }),
    });

    constructor(
        private _newProjectService: NewProjectService,
        private _destoroyRef: DestroyRef
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['project'] && this.project && this.isEdit) {
            this.newProjectForm.patchValue({
                title: this.project.title,
                color: this.project.color,
            });
            this.color = this.project.color;
        }
    }

    /**
     * function for add new project
     */
    public addProject(): void {
        const project: IProject = {
            id: '',
            title: this.newProjectForm.getRawValue().title,
            color: this.color,
        };
        this._newProjectService
            .addProject(project)
            .pipe(
                takeUntilDestroyed(this._destoroyRef)
            )
            .subscribe();
    }
    /**
     * update project
     */
    public updateProject(): void {
        if (this.project) {
            const rawForm: IProject = {
                ...this.newProjectForm.getRawValue(),
                color: this.color,
                id: this.project?.id,
            };
            this._newProjectService
                .updateProject(rawForm)
                .pipe(takeUntilDestroyed(this._destoroyRef))
                .subscribe();
        }
    }
}
