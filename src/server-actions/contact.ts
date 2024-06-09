'use server';

import { ContactFormErrorLog, validateContactForm } from "@/utils/contact-form-helpers";
import { sendMails } from "@/utils/mail-helpers";
import { FormServerAction } from "@/utils/types";

const submitContactForm : FormServerAction<ContactFormErrorLog> = async(formData: FormData) => {

    try {
        const errors = validateContactForm(formData);

        if (errors)
            return {status: 400, errors};

        sendMails('contact', formData);
        
        return {status: 200};
    }

    catch (error) {
        return {status: 500};
    }
}

export default submitContactForm;