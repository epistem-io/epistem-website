"use client";

/**
 * Custom admin UI for the Events "agendas" array: one tab per event day.
 *
 * The days come from the event's startDate/endDate (see lib/event-days.ts),
 * so editors never create days by hand. Each agenda row carries a `day`
 * number; this component only decides which rows to show and lets editors
 * add, move, reorder and remove rows. The title/description/time inputs are
 * rendered by Payload's own RenderFields, so validation and localization
 * behave exactly as in the default array UI.
 */

import type {
  ArrayFieldClientComponent,
  ClientField,
  FormState,
} from "payload";
import {
  Banner,
  Button,
  ErrorPill,
  FieldLabel,
  RenderFields,
  ShimmerEffect,
  useField,
  useForm,
  useFormFields,
  useFormSubmitted,
  useTranslation,
} from "@payloadcms/ui";
import React, { useCallback, useMemo, useState } from "react";

import {
  type EventDay,
  formatEventDayLabel,
  getEventDays,
  groupAgendaByDay,
  normalizeAgendaDay,
} from "@/lib/event-days";

const baseClass = "agenda-by-day";
const OUT_OF_RANGE = "out-of-range";

type ActiveTab = number | typeof OUT_OF_RANGE;

type AgendaRow = {
  id: string;
  /** Position in the underlying array (what Payload's row APIs expect). */
  index: number;
  day: number;
  isLoading: boolean;
  errorCount: number;
};

type RowPermissions = Parameters<typeof RenderFields>[0]["permissions"];

const dayTitle = (day: EventDay) => `Day ${day.index}`;
const dayDate = (day: EventDay) => formatEventDayLabel(day.date, "en-GB");
const classNames = (...names: Array<string | false | null | undefined>) =>
  names.filter(Boolean).join(" ");

export const AgendaByDayField: ArrayFieldClientComponent = (props) => {
  const {
    field,
    field: { fields, label, localized, required },
    forceRender = false,
    path: pathFromProps,
    permissions,
    readOnly,
    schemaPath: schemaPathFromProps,
  } = props;
  const schemaPath = schemaPathFromProps ?? field.name;

  const { addFieldRow, moveFieldRow, removeFieldRow } = useForm();
  const submitted = useFormSubmitted();
  const { i18n } = useTranslation();
  const {
    errorPaths = [],
    path,
    rows = [],
  } = useField({ hasRows: true, potentiallyStalePath: pathFromProps });

  const startDate = useFormFields(
    ([formState]) => formState.startDate?.value as string | undefined,
  );
  const endDate = useFormFields(
    ([formState]) => formState.endDate?.value as string | undefined,
  );
  // Joined into one string so the selector returns a stable primitive and
  // only re-renders when a day actually changes.
  const rowDaysKey = useFormFields(([formState]) =>
    rows
      .map((_, index) =>
        normalizeAgendaDay(formState[`${path}.${index}.day`]?.value),
      )
      .join(","),
  );

  const days = useMemo(
    () => getEventDays(startDate, endDate),
    [startDate, endDate],
  );
  const hasDays = days.length > 0;

  const agendaRows = useMemo<AgendaRow[]>(() => {
    const rowDays = rowDaysKey ? rowDaysKey.split(",").map(Number) : [];

    return rows.map((row, index) => ({
      id: row.id,
      index,
      day: rowDays[index] ?? 1,
      isLoading: Boolean(row.isLoading),
      errorCount: errorPaths.filter((errorPath) =>
        errorPath.startsWith(`${path}.${index}.`),
      ).length,
    }));
  }, [errorPaths, path, rowDaysKey, rows]);

  const { byDay, outOfRange } = useMemo(
    () => groupAgendaByDay(agendaRows, days),
    [agendaRows, days],
  );

  const [requestedTab, setActiveTab] = useState<ActiveTab>(1);

  // The chosen tab can become invalid when the dates change or the last
  // out-of-range item is fixed, so the effective tab is derived, not stored.
  const activeTab: ActiveTab =
    requestedTab === OUT_OF_RANGE
      ? outOfRange.length > 0
        ? OUT_OF_RANGE
        : 1
      : hasDays
        ? Math.min(requestedTab, days.length)
        : requestedTab;

  const visibleRows = useMemo(() => {
    if (!hasDays) {
      return agendaRows;
    }

    if (activeTab === OUT_OF_RANGE) {
      return outOfRange;
    }

    return byDay[activeTab - 1]?.items ?? [];
  }, [activeTab, agendaRows, byDay, hasDays, outOfRange]);

  const addTargetDay =
    hasDays && typeof activeTab === "number" ? activeTab : 1;

  // `day` gets its own dropdown in the card header, so it is kept out of the
  // generic field rendering.
  const itemFields = useMemo(
    () =>
      fields.filter(
        (subField) => !("name" in subField) || subField.name !== "day",
      ),
    [fields],
  );

  const addRow = useCallback(
    (day: number) => {
      const subFieldState: FormState = {
        day: { initialValue: day, passesCondition: true, valid: true, value: day },
      };

      addFieldRow({ path, rowIndex: rows.length, schemaPath, subFieldState });
    },
    [addFieldRow, path, rows.length, schemaPath],
  );

  // Moving a row onto its same-day neighbour's index swaps the two while
  // leaving the relative order of every other day untouched.
  const moveRow = useCallback(
    (row: AgendaRow, direction: -1 | 1) => {
      const position = visibleRows.findIndex(
        (candidate) => candidate.index === row.index,
      );
      const target = visibleRows[position + direction];

      if (!target) {
        return;
      }

      moveFieldRow({
        moveFromIndex: row.index,
        moveToIndex: target.index,
        path,
      });
    },
    [moveFieldRow, path, visibleRows],
  );

  const removeRow = useCallback(
    (row: AgendaRow) => removeFieldRow({ path, rowIndex: row.index }),
    [path, removeFieldRow],
  );

  const rowPermissions: RowPermissions =
    permissions === true || !permissions
      ? true
      : ((permissions.fields as RowPermissions | undefined) ?? true);

  return (
    <div
      className={classNames("field-type", baseClass)}
      id={`field-${path.replace(/\./g, "__")}`}
    >
      <header className={`${baseClass}__header`}>
        <h3 className={`${baseClass}__title`}>
          <FieldLabel
            as="span"
            label={label}
            localized={localized}
            path={path}
            required={required}
          />
        </h3>
        <span className={`${baseClass}__summary`}>
          {rows.length} {rows.length === 1 ? "item" : "items"}
          {hasDays
            ? ` · ${days.length} ${days.length === 1 ? "day" : "days"}`
            : ""}
        </span>
      </header>

      {!hasDays ? (
        <Banner>
          Set the start and end dates to organize the agenda by day. Until
          then, all items are listed together.
        </Banner>
      ) : (
        <div
          className={`${baseClass}__tabs`}
          role="tablist"
          aria-label="Agenda days"
        >
          {byDay.map(({ day, items }) => {
            const isActive = activeTab === day.index;
            const errorCount = items.reduce(
              (sum, row) => sum + row.errorCount,
              0,
            );

            return (
              <button
                key={day.index}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={classNames(
                  `${baseClass}__tab`,
                  isActive && `${baseClass}__tab--active`,
                )}
                onClick={() => setActiveTab(day.index)}
              >
                <span>{dayTitle(day)}</span>
                <span className={`${baseClass}__tab-date`}>
                  · {dayDate(day)}
                </span>
                <span className={`${baseClass}__count`}>{items.length}</span>
                {submitted && errorCount > 0 ? (
                  <ErrorPill count={errorCount} i18n={i18n} />
                ) : null}
              </button>
            );
          })}

          {outOfRange.length > 0 ? (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === OUT_OF_RANGE}
              className={classNames(
                `${baseClass}__tab`,
                `${baseClass}__tab--warning`,
                activeTab === OUT_OF_RANGE && `${baseClass}__tab--active`,
              )}
              onClick={() => setActiveTab(OUT_OF_RANGE)}
            >
              <span>Outside event dates</span>
              <span
                className={`${baseClass}__count ${baseClass}__count--warning`}
              >
                {outOfRange.length}
              </span>
            </button>
          ) : null}
        </div>
      )}

      {activeTab === OUT_OF_RANGE ? (
        <Banner type="error">
          These items belong to days the event no longer has. Move each one to
          a day or remove it before saving.
        </Banner>
      ) : null}

      {visibleRows.length === 0 ? (
        <p className={`${baseClass}__empty`}>
          {hasDays && typeof activeTab === "number"
            ? `No agenda items on Day ${activeTab} yet.`
            : "No agenda items yet."}
        </p>
      ) : (
        visibleRows.map((row, position) => (
          <AgendaItemCard
            key={row.id}
            count={visibleRows.length}
            days={days}
            fields={itemFields}
            forceRender={forceRender}
            onMove={moveRow}
            onRemove={removeRow}
            parentPath={path}
            permissions={rowPermissions}
            position={position}
            readOnly={readOnly}
            row={row}
            schemaPath={schemaPath}
            submitted={submitted}
          />
        ))
      )}

      {!readOnly && activeTab !== OUT_OF_RANGE ? (
        <Button
          buttonStyle="icon-label"
          className={`${baseClass}__add-row`}
          icon="plus"
          iconPosition="left"
          iconStyle="with-border"
          onClick={() => addRow(addTargetDay)}
        >
          {hasDays ? `Add item to Day ${addTargetDay}` : "Add item"}
        </Button>
      ) : null}
    </div>
  );
};

type AgendaItemCardProps = {
  count: number;
  days: EventDay[];
  fields: ClientField[];
  forceRender: boolean;
  onMove: (row: AgendaRow, direction: -1 | 1) => void;
  onRemove: (row: AgendaRow) => void;
  parentPath: string;
  permissions: RowPermissions;
  position: number;
  readOnly?: boolean;
  row: AgendaRow;
  schemaPath: string;
  submitted: boolean;
};

function AgendaItemCard({
  count,
  days,
  fields,
  forceRender,
  onMove,
  onRemove,
  parentPath,
  permissions,
  position,
  readOnly,
  row,
  schemaPath,
  submitted,
}: AgendaItemCardProps) {
  const { i18n } = useTranslation();
  const rowPath = `${parentPath}.${row.index}`;
  const hasErrors = submitted && row.errorCount > 0;

  return (
    <div
      className={classNames(
        `${baseClass}__item`,
        hasErrors && `${baseClass}__item--has-errors`,
      )}
      id={`${parentPath.split(".").join("-")}-row-${row.index}`}
    >
      <div className={`${baseClass}__item-header`}>
        <span className={`${baseClass}__item-position`}>
          Item {position + 1} of {count}
          {hasErrors ? (
            <ErrorPill count={row.errorCount} i18n={i18n} withMessage />
          ) : null}
        </span>

        {!readOnly ? (
          <div className={`${baseClass}__item-actions`}>
            <DaySelect days={days} path={`${rowPath}.day`} />
            <Button
              buttonStyle="secondary"
              disabled={position === 0}
              onClick={() => onMove(row, -1)}
              size="small"
            >
              Up
            </Button>
            <Button
              buttonStyle="secondary"
              disabled={position === count - 1}
              onClick={() => onMove(row, 1)}
              size="small"
            >
              Down
            </Button>
            <Button
              buttonStyle="error"
              onClick={() => onRemove(row)}
              size="small"
            >
              Remove
            </Button>
          </div>
        ) : null}
      </div>

      {row.isLoading ? (
        <ShimmerEffect />
      ) : (
        <RenderFields
          className={`${baseClass}__fields`}
          fields={fields}
          forceRender={forceRender}
          margins="small"
          parentIndexPath=""
          parentPath={rowPath}
          parentSchemaPath={schemaPath}
          permissions={permissions}
          readOnly={readOnly}
        />
      )}
    </div>
  );
}

/** Dropdown bound to a single row's `day` value; doubles as "move to day". */
function DaySelect({ days, path }: { days: EventDay[]; path: string }) {
  const { setValue, value } = useField<number | null | undefined>({ path });
  const current = normalizeAgendaDay(value);
  const isOutOfRange = days.length > 0 && current > days.length;

  return (
    <label className={`${baseClass}__day`}>
      <span className={`${baseClass}__day-label`}>Day</span>
      <select
        className={`${baseClass}__day-select`}
        disabled={days.length === 0}
        onChange={(event) => setValue(Number(event.target.value))}
        value={current}
      >
        {days.map((day) => (
          <option key={day.index} value={day.index}>
            {dayTitle(day)} · {dayDate(day)}
          </option>
        ))}
        {isOutOfRange ? (
          <option value={current} disabled>
            Day {current} (outside event dates)
          </option>
        ) : null}
        {days.length === 0 ? (
          <option value={current}>Day {current}</option>
        ) : null}
      </select>
    </label>
  );
}
