import { defineField, defineType } from "sanity";

export const ahimsaImageType = defineType({
    name: 'ahimsaImage',
    title: 'Slike',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Slika',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'isGalleryImage',
            title: 'Uključiti u galerije',
            type: 'boolean',
            initialValue: false,
            validation: (rule) => rule.required().error('Obavezno')
        })
    ],
    preview: {
        select: {
          media: 'image'
        },
      }
});