import { FormControl } from '@angular/forms';

export interface INewProject {
    title: FormControl<string>;
    color: FormControl<string>;
}
