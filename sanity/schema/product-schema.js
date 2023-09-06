import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    },

    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),

    {
      name: "brand",
      title: "Brand",
      type: "string",
    },

    {
        name: "currency",
        title: "Currency",
        type: "string",
      },

    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
    },

    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "sectionType",
              title: "Section Type",
              type: "string",
              options: {
                list: [
                  { title: "Face (Makeover)", value: "face_makeover" },
                  { title: "Lips (Makeover)", value: "lips_makeover" },
                  { title: "Eyes (Makeover)", value: "eyes_makeover" },
                  { title: "Face (Skincare)", value: "face_skincare" },
                  { title: "Body (Skincare)", value: "body_skincare" },
                  { title: "Eyes (Skincare)", value: "eyes_skincare" },
                  {
                    title: "Feet/Head/Nails (Skincare)",
                    value: "feet_head_nails_skincare"
                  },
                ],
              },
            },
            {
              name: "subcategories",
              title: "Subcategories",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
});
