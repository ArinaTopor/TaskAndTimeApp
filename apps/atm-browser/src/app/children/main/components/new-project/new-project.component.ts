import {
    ChangeDetectionStrategy,
    Component,
    Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INewProject } from './interfaces/new-project-form.interface';
import {
    IProject,
} from '@atm-project/common';
import { NewProjectService } from './services/new-project.service';
@Component({
    selector: 'new-project-modal',
    templateUrl: './new-project.component.html',
    styleUrl: './new-project.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent {
    @Input() public isOpen: boolean = false;
    protected color: string = 'rgb(141,207,255)';
    protected newProjectForm: FormGroup<INewProject> = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
        }),
        color: new FormControl('rgb(141,207,255)', {
            nonNullable: true,
            validators: Validators.required,
        }),
    });
    constructor(private _newProjectServics: NewProjectService) {}

    /**
     * function for add new project
     */
    public addProject(): void {
        const project: IProject = {
            id: '',
            title: this.newProjectForm.getRawValue().title,
            color: this.newProjectForm.getRawValue().color,
        };
        this._newProjectServics.addProject(project);
    }
}
