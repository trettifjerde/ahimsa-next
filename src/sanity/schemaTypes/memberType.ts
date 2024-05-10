import { defineField, defineType } from "sanity";

export const memberType = defineType({
    name: 'member',
    title: 'Članovi',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Ime',
            type: 'string',
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'surname',
            title: 'Prezime',
            type: 'string',
            validation: (rule) => rule.required().error('Obavezno')
        }),
        defineField({
            name: 'description',
            title: 'Informacije',
            type: 'string'
        }),
        defineField({
            name: 'image',
            title: 'Slika',
            type: 'image',
            validation: (rule) => rule.required().error('Obavezno'),
            options: {
                hotspot: true
            }

        }),
    ],
    preview: {
        select: {
          name: 'name',
          surname: 'surname',
          subtitle: 'description',
          media: 'image'
        },
        prepare(selection) {
            const {name, surname, subtitle, media} = selection;
            return {
                title: `${name} ${surname}`,
                media,
                subtitle
            }
        },

      }
});