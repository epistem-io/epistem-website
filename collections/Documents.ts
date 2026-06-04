import { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
  slug: "documents",
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
