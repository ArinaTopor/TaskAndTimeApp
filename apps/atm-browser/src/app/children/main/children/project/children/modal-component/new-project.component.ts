import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INewProject } from '../interfaces/new-project-form.interface';

@Component({
    selector: 'new-project-modal',
    templateUrl: './new-project.component.html',
    styleUrl: './new-project.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent {
    public isOpen: boolean = false;
    protected color: string = 'rgb(141,207,255)';
    protected newProjectForm: FormGroup<INewProject> = new FormGroup({
        projectName: new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
        }),
        color: new FormControl('rgb(141,207,255)', {
            nonNullable: true,
            validators: Validators.required,
        }),
    });
    /**
     * toggle isOpen for dialog
     */
    public showDialog(): void {
        console.log(this.isOpen);
        this.isOpen = true;
    }
}
