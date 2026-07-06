import { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
  slug: "documents",
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["application/pdf"],
  },
  fields: [
    {
      name: "label",
      type: "text",
      localized: true,
      required: true,
    },
  ],
};
