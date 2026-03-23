import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'visionValues',
  title: 'Vision & Values',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Banner Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'visionText',
      title: 'Vision Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Vision & Values' };
    },
  },
});
