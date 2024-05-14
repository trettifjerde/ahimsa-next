import { FormErrorLog, FormServerAction, FormValidator } from "@/utils/types";
import { FormEventHandler, RefObject, useReducer } from "react";

export default function useForm<EL>(validator: FormValidator<EL>, serverAction: FormServerAction<EL>, formRef: RefObject<HTMLFormElement>) {
    const [state, dispatch] = useReducer(reducer<EL>, null, initReducer);

    const handleSubmit : FormEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const errorLog = validator(formData);

        if (errorLog) {
            dispatch({ type: 'setErrors', errorLog });
            return;
        }

        dispatch({type: 'submit'});

        try {
            const res = await serverAction(formData);
            switch (res.status) {
                case 200:
                    dispatch({ type: 'success' });
                    formRef.current?.reset();
                    break;
    
                case 400:
                    dispatch({ type: 'setErrors', errorLog: res.errors })
                    break;
    
                case 500:
                    dispatch({ type: 'failure' })
                    break;
            }
        }
        catch (error) {
            dispatch({type: 'failure'});
        }

    }

    return { state, handleSubmit };
}

type FormState<EL> = {
    message: { text: string, isError: boolean },
    errorLog: FormErrorLog<EL>,
    pending: boolean
};


function initReducer<EL>(): FormState<EL> {
    return {
        message: { text: '', isError: false },
        errorLog: null,
        pending: false
    }
}

function reducer<EL>(state: FormState<EL>, action: FormAction<EL>): FormState<EL> {
    switch (action.type) {

        case 'submit':
            return {
                ...state,
                errorLog: null,
                message: { text: '', isError: false },
                pending: true
            }

        case 'setErrors':
            return {
                ...state,
                errorLog: action.errorLog,
                message: action.errorLog ? { text: 'Form contains errors', isError: true } : { text: '', isError: false },
                pending: false
            }

        case 'success':
            return {
                ...state,
                errorLog: null,
                message: { text: 'Submitted', isError: false },
                pending: false
            }

        case 'failure':
            return {
                ...state,
                errorLog: null,
                message: { text: 'An error has occurred. Try again later', isError: true },
                pending: false
            }

        default:
            return state;
    }
}

type FormAction<EL> = { type: 'submit' } |
{ type: 'setErrors', errorLog: FormErrorLog<EL> } |
{ type: 'success' } |
{ type: 'failure' };