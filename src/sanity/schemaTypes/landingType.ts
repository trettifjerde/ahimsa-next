import { defineField, defineType } from "sanity";

export const landingType = defineType({
    name: 'landing',
    title: 'Main Page Header',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            type: 'array',
            of: [{type: 'block'}]
        })
    ]
});