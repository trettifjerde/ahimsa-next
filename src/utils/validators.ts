export function isValidEmail(value: string) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
}

export const NAME = 'name';
export const NAME_LIMIT = 100;
export const SURNAME = 'surname';
export const EMAIL = 'email';
export const INFO = 'info';
export const INFO_LIMIT = 10000;

const requiredValidator = {
    f: (value: string) => !!value,
    message: 'Obavezno'
}

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
    [INFO]: {
        validators: [
            requiredValidator,
            {
                f: (value: string) => value.length < INFO_LIMIT,
                message: `Must be under ${INFO_LIMIT} characters`
            }
        ]
    },
};

export type VolunteerFormKey = keyof typeof volunteerFormFields;
export const volunteerFormKeys : VolunteerFormKey[] = [NAME, SURNAME, EMAIL, INFO];
export type VolunteerFormErrorLog = {[key in VolunteerFormKey]?: string};

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