import { FormControl } from '@angular/forms';

export interface IRegisterForm {
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    repeatPassword: FormControl<string>;
}
