import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'}
  ],
  fields: [
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule
        .required()
        .error('Required to generate a page on the website')
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details'
    }),
    defineField({
      name: 'doorsOpen',
      type: 'number',
      description: 'Number of minutes before the start',
      initialValue: 60,
      group: 'details'
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      group: 'details'
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'details'
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial'
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'details'
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'editorial'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline.name',
      media: 'image'
    }
  }
})