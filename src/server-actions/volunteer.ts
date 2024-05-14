'use server';

import { FormServerAction } from "@/utils/types";
import { VolunteerFormErrorLog, validateVolunteerForm } from "@/utils/validators";

const volunteer : FormServerAction<VolunteerFormErrorLog> = async(formData: FormData) => {

    try {
        const errors = validateVolunteerForm(formData);

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

export default volunteer;