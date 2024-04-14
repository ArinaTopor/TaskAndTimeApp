import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * this function check valid control
 * @param regExp
 * @returns
 */
export function checkRegExp(regExp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden: boolean = regExp.test(control.value);

        return !forbidden ? { forbiddenValue: { value: control.value } } : null;
    };
}
/**
 * this function check valid control
 * @param regExp
 * @returns
 */
// export const checkAuthFormValid: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>  {
//     return control.value.email =
// }
