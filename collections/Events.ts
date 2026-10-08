import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type {
  CollectionConfig,
  DateFieldValidation,
  NumberFieldValidation,
} from "payload";

import { getEventDays, normalizeAgendaDay } from "../lib/event-days";

const isValidYouTubeUrl = (value: string | null | undefined) => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      return url.pathname === "/watch" && url.searchParams.has("v")
        ? true
        : "Please enter a valid YouTube watch URL.";
    }

    if (hostname === "youtu.be") {
      return url.pathname.length > 1
        ? true
        : "Please enter a valid YouTube short URL.";
    }

    return "Please enter a valid YouTube URL.";
  } catch {
    return "Please enter a valid YouTube URL.";
  }
};

const validateEndDate: DateFieldValidation = (value, { siblingData }) => {
  const startDate = (siblingData as { startDate?: string | Date } | undefined)
    ?.startDate;

  if (!value || !startDate) {
    return true;
  }

  const start = new Date(startDate);
  const end = new Date(value);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return true;
  }

  return end >= start || "End date must be on or after the start date.";
};

// `data` is the whole event document, so the agenda day can be checked
// against the event's own date range. Items beyond the range only appear when
// the dates were shortened after the agenda was written.
const validateAgendaDay: NumberFieldValidation = (value, { data }) => {
  const event = data as { startDate?: string | Date; endDate?: string | Date };
  const days = getEventDays(event?.startDate, event?.endDate);

  if (days.length === 0) {
    return true;
  }

  const day = normalizeAgendaDay(value);

  return (
    day <= days.length ||
    `This agenda item is on day ${day}, but the event only has ${days.length} ${
      days.length === 1 ? "day" : "days"
    }. Move it to another day or remove it.`
  );
};

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) =>
          rootFeatures.filter((feature) => feature.key !== "upload"),
      }),
      localized: true,
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
      required: true,
      validate: validateEndDate,
    },
    {
      name: "locationGeneral",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "locationDetail",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "downloads",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "file",
          type: "upload",
          relationTo: "documents",
          required: true,
        },
      ],
    },
    {
      name: "speakers",
      type: "array",
      fields: [
        {
          name: "profilePhoto",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "name",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "agendas",
      type: "array",
      admin: {
        components: {
          // Replaces the default array UI with one tab per event day. The
          // tabs are derived from startDate/endDate, see lib/event-days.ts.
          Field: "/components/admin/agenda-by-day#AgendaByDayField",
        },
      },
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          required: true,
        },
        {
          name: "time",
          type: "text",
          required: true,
        },
        {
          // 1-based day of the event this item belongs to. Edited through the
          // day dropdown in the custom field, never as a bare number input.
          name: "day",
          type: "number",
          required: true,
          defaultValue: 1,
          min: 1,
          validate: validateAgendaDay,
        },
      ],
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "previewYoutubeUrl",
      type: "text",
      validate: isValidYouTubeUrl,
    },
  ],
};
