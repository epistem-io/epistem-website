import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "events_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"profile_photo_id" integer
  );
  
  CREATE TABLE "events_speakers_locales" (
  	"name" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_agendas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar
  );
  
  CREATE TABLE "events_agendas_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "_events_v_version_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"profile_photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_speakers_locales" (
  	"name" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v_version_agendas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_agendas_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  ALTER TABLE "events" ADD COLUMN "start_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "end_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "preview_youtube_url" varchar;
  ALTER TABLE "events_locales" ADD COLUMN "location_general" varchar;
  ALTER TABLE "events_locales" ADD COLUMN "location_detail" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_start_date" timestamp(3) with time zone;
  ALTER TABLE "_events_v" ADD COLUMN "version_end_date" timestamp(3) with time zone;
  ALTER TABLE "_events_v" ADD COLUMN "version_preview_youtube_url" varchar;
  ALTER TABLE "_events_v_locales" ADD COLUMN "version_location_general" varchar;
  ALTER TABLE "_events_v_locales" ADD COLUMN "version_location_detail" varchar;
  ALTER TABLE "events_speakers" ADD CONSTRAINT "events_speakers_profile_photo_id_media_id_fk" FOREIGN KEY ("profile_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_speakers" ADD CONSTRAINT "events_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_speakers_locales" ADD CONSTRAINT "events_speakers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_agendas" ADD CONSTRAINT "events_agendas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_agendas_locales" ADD CONSTRAINT "events_agendas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_agendas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_images" ADD CONSTRAINT "events_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_images" ADD CONSTRAINT "events_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_speakers" ADD CONSTRAINT "_events_v_version_speakers_profile_photo_id_media_id_fk" FOREIGN KEY ("profile_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_speakers" ADD CONSTRAINT "_events_v_version_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_speakers_locales" ADD CONSTRAINT "_events_v_version_speakers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_version_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_agendas" ADD CONSTRAINT "_events_v_version_agendas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_agendas_locales" ADD CONSTRAINT "_events_v_version_agendas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_version_agendas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_images" ADD CONSTRAINT "_events_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_images" ADD CONSTRAINT "_events_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_speakers_order_idx" ON "events_speakers" USING btree ("_order");
  CREATE INDEX "events_speakers_parent_id_idx" ON "events_speakers" USING btree ("_parent_id");
  CREATE INDEX "events_speakers_profile_photo_idx" ON "events_speakers" USING btree ("profile_photo_id");
  CREATE UNIQUE INDEX "events_speakers_locales_locale_parent_id_unique" ON "events_speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_agendas_order_idx" ON "events_agendas" USING btree ("_order");
  CREATE INDEX "events_agendas_parent_id_idx" ON "events_agendas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_agendas_locales_locale_parent_id_unique" ON "events_agendas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_images_order_idx" ON "events_images" USING btree ("_order");
  CREATE INDEX "events_images_parent_id_idx" ON "events_images" USING btree ("_parent_id");
  CREATE INDEX "events_images_image_idx" ON "events_images" USING btree ("image_id");
  CREATE INDEX "_events_v_version_speakers_order_idx" ON "_events_v_version_speakers" USING btree ("_order");
  CREATE INDEX "_events_v_version_speakers_parent_id_idx" ON "_events_v_version_speakers" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_speakers_profile_photo_idx" ON "_events_v_version_speakers" USING btree ("profile_photo_id");
  CREATE UNIQUE INDEX "_events_v_version_speakers_locales_locale_parent_id_unique" ON "_events_v_version_speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_version_agendas_order_idx" ON "_events_v_version_agendas" USING btree ("_order");
  CREATE INDEX "_events_v_version_agendas_parent_id_idx" ON "_events_v_version_agendas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_events_v_version_agendas_locales_locale_parent_id_unique" ON "_events_v_version_agendas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_version_images_order_idx" ON "_events_v_version_images" USING btree ("_order");
  CREATE INDEX "_events_v_version_images_parent_id_idx" ON "_events_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_images_image_idx" ON "_events_v_version_images" USING btree ("image_id");
  ALTER TABLE "events" DROP COLUMN "event_date";
  ALTER TABLE "events_locales" DROP COLUMN "location";
  ALTER TABLE "_events_v" DROP COLUMN "version_event_date";
  ALTER TABLE "_events_v_locales" DROP COLUMN "version_location";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer
  );
  
  DROP TABLE "events_speakers" CASCADE;
  DROP TABLE "events_speakers_locales" CASCADE;
  DROP TABLE "events_agendas" CASCADE;
  DROP TABLE "events_agendas_locales" CASCADE;
  DROP TABLE "events_images" CASCADE;
  DROP TABLE "_events_v_version_speakers" CASCADE;
  DROP TABLE "_events_v_version_speakers_locales" CASCADE;
  DROP TABLE "_events_v_version_agendas" CASCADE;
  DROP TABLE "_events_v_version_agendas_locales" CASCADE;
  DROP TABLE "_events_v_version_images" CASCADE;
  ALTER TABLE "events" ADD COLUMN "event_date" timestamp(3) with time zone;
  ALTER TABLE "events_locales" ADD COLUMN "location" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_event_date" timestamp(3) with time zone;
  ALTER TABLE "_events_v_locales" ADD COLUMN "version_location" varchar;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_events_id_idx" ON "events_rels" USING btree ("events_id");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_events_id_idx" ON "_events_v_rels" USING btree ("events_id");
  ALTER TABLE "events" DROP COLUMN "start_date";
  ALTER TABLE "events" DROP COLUMN "end_date";
  ALTER TABLE "events" DROP COLUMN "preview_youtube_url";
  ALTER TABLE "events_locales" DROP COLUMN "location_general";
  ALTER TABLE "events_locales" DROP COLUMN "location_detail";
  ALTER TABLE "_events_v" DROP COLUMN "version_start_date";
  ALTER TABLE "_events_v" DROP COLUMN "version_end_date";
  ALTER TABLE "_events_v" DROP COLUMN "version_preview_youtube_url";
  ALTER TABLE "_events_v_locales" DROP COLUMN "version_location_general";
  ALTER TABLE "_events_v_locales" DROP COLUMN "version_location_detail";`)
}
