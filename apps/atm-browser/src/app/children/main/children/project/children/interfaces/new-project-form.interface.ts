import { FormControl } from '@angular/forms';

export interface INewProject {
    projectName: FormControl<string>;
    color: FormControl<string>;
}
