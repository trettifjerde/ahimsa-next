'use server';

import { sendMails } from "@/utils/mail-helpers";
import { FormServerAction } from "@/utils/types";
import { VolunteerFormErrorLog, validateVolunteerForm } from "@/utils/volunteer-form-helpers";

const volunteer : FormServerAction<VolunteerFormErrorLog> = async(formData: FormData) => {

    try {
        const errors = validateVolunteerForm(formData);

        if (errors)
            return {status: 400, errors};


        sendMails('volunteer', formData);
        
        return {status: 200};
    }

    catch (error) {
        return {status: 500};
    }
}

export default volunteer;