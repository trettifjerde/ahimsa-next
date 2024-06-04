import { defineType, defineField } from "sanity";

export const storyCategory = defineType({
    name: 'storyCategory',
    title: 'Kategorije priča',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Naziv kategorije',
            type: 'slug',
            validation: (rule) => rule
                .required()
                .error('Obavezno + Ne smije se poklapati s postojećim nazivima kategorija')
        }),
        defineField({
            name: 'color',
            title: 'Boja',
            type: 'color',
            options: {
                disableAlpha: true
            },
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
    ],
    preview: {
        select: {
            title: 'name.current',
        }
    }
});