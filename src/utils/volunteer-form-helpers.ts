import { EMAIL, MESSAGE, MESSAGE_LIMIT, NAME, NAME_LIMIT, SURNAME, isValidEmail, requiredValidator } from "@/utils/validators";

export const volunteerFormFields = {
    [NAME]: {
        validators: [
            requiredValidator,
            {
                f: (value: string) => value.length < NAME_LIMIT,
                message: `Must be under ${NAME_LIMIT} characters`
            }
        ]
    },
    [SURNAME]: {
        validators: [
            requiredValidator,
            {
                f: (value: string) => value.length < NAME_LIMIT,
                message: `Must be under ${NAME_LIMIT} characters`
            }
        ]
    },
    [EMAIL]: {
        validators: [
            requiredValidator,
            {
                f: (value: string) => isValidEmail(value),
                message: 'Invalid email'
            }
        ]
    },
    [MESSAGE]: {
        validators: [
            requiredValidator,
            {
                f: (value: string) => value.length < MESSAGE_LIMIT,
                message: `Must be under ${MESSAGE_LIMIT} characters`
            }
        ]
    },
};

export type VolunteerFormKey = keyof typeof volunteerFormFields;
export const volunteerFormKeys : VolunteerFormKey[] = [NAME, SURNAME, EMAIL, MESSAGE];
export type VolunteerFormErrorLog = {[key in VolunteerFormKey]?: string};
export type VolunteerFormData = {[key in VolunteerFormKey]: string};

export function validateVolunteerForm(data: FormData) {

    const errorLog : VolunteerFormErrorLog = {};

    for (const key of volunteerFormKeys) {
        const value = data.get(key)?.toString() || '';

        for (const validator of volunteerFormFields[key].validators) {
            if (!validator.f(value)) {
                errorLog[key] = validator.message;
                break;
            }
        }
    }

    return Object.keys(errorLog).length == 0 ? null : errorLog;
}