'use server';

import { ContactFormErrorLog, validateContactForm } from "@/utils/contact-form-helpers";
import { FormServerAction } from "@/utils/types";

const submitContactForm : FormServerAction<ContactFormErrorLog> = async(formData: FormData) => {

    try {
        const errors = validateContactForm(formData);

        if (errors)
            return {status: 400, errors};

        const someAsyncResponse = await new Promise<number>((resolve, reject) => {
            setTimeout(() => resolve(1), 3000);
        });
        
        return {status: 200};
    }

    catch (error) {
        return {status: 500};
    }
}

export default submitContactForm;