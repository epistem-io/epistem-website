import path from "path";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Documents } from "./collections/Documents";
import { Events } from "./collections/Events";

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Documents, Events],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  localization: {
    locales: ["en", "id"],
    defaultLocale: "en",
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  sharp,
});
