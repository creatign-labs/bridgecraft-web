import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'mapLat',
      title: 'Map Latitude',
      type: 'number',
    }),
    defineField({
      name: 'mapLng',
      title: 'Map Longitude',
      type: 'number',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Information' };
    },
  },
});
