import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'brochure',
  title: 'Brochure',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'file',
      title: 'Brochure File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Company Brochure' };
    },
  },
});
