import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type BaseLexicalNode = {
  children?: LexicalNode[];
  format?: number | string;
  tag?: string;
  text?: string;
  type?: string;
  url?: string;
  version?: number;
  [key: string]: unknown;
};

type LexicalNode = BaseLexicalNode;

type LexicalContent = {
  root?: {
    children?: LexicalNode[];
  };
};

type EventRichTextProps = {
  content: LexicalContent | null | undefined;
  className?: string;
};

const TEXT_FORMAT_BOLD = 1;
const TEXT_FORMAT_ITALIC = 1 << 1;

export function EventRichText({ content, className }: EventRichTextProps) {
  const children = content?.root?.children;

  if (!Array.isArray(children) || children.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "font-lp-body-m-regular text-justify text-text-icons-base-second",
        className,
      )}
    >
      {renderChildren(children)}
    </div>
  );
}

function renderChildren(children: LexicalNode[]) {
  return children.map((child, index) => (
    <Fragment key={getNodeKey(child, index)}>
      {renderNode(child, index)}
    </Fragment>
  ));
}

function renderNode(node: LexicalNode, index: number): ReactNode {
  switch (node.type) {
    case "heading": {
      const tag = typeof node.tag === "string" ? node.tag.toLowerCase() : "h2";
      const Tag = getHeadingTag(tag);

      return (
        <Tag className={getHeadingClassName(Tag)}>
          {renderChildren(node.children ?? [])}
        </Tag>
      );
    }

    case "paragraph": {
      if (!node.children?.length) {
        return null;
      }

      return <p className="mt-4 first:mt-0">{renderChildren(node.children)}</p>;
    }

    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      const className =
        Tag === "ol"
          ? "mt-4 list-decimal space-y-2 pl-6 first:mt-0"
          : "mt-4 list-disc space-y-2 pl-6 first:mt-0";

      return <Tag className={className}>{renderChildren(node.children ?? [])}</Tag>;
    }

    case "listitem":
      return <li>{renderChildren(node.children ?? [])}</li>;

    case "link": {
      const href = typeof node.url === "string" ? node.url : "#";

      return (
        <a
          href={href}
          className="font-semibold text-primary-pink underline underline-offset-4 transition-colors hover:text-primary-pink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
        >
          {renderChildren(node.children ?? [])}
        </a>
      );
    }

    case "linebreak":
      return <br />;

    case "text":
      return renderFormattedText(node.text ?? "", node.format, index);

    default: {
      if (node.children?.length) {
        return renderChildren(node.children);
      }

      if (typeof node.text === "string") {
        return renderFormattedText(node.text, node.format, index);
      }

      return null;
    }
  }
}

function renderFormattedText(
  text: string,
  format: LexicalNode["format"],
  index: number,
) {
  let content: ReactNode = text;

  if (hasTextFormat(format, TEXT_FORMAT_BOLD, "bold")) {
    content = <strong key={`bold-${index}`}>{content}</strong>;
  }

  if (hasTextFormat(format, TEXT_FORMAT_ITALIC, "italic")) {
    content = <em key={`italic-${index}`}>{content}</em>;
  }

  return content;
}

function hasTextFormat(
  format: LexicalNode["format"],
  bitmask: number,
  fallbackToken: string,
) {
  if (typeof format === "number") {
    return (format & bitmask) !== 0;
  }

  if (typeof format === "string") {
    return format.includes(fallbackToken);
  }

  return false;
}

function getHeadingTag(tag: string) {
  switch (tag) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
      return tag;
    default:
      return "h2";
  }
}

function getHeadingClassName(tag: string) {
  switch (tag) {
    case "h1":
      return "mt-6 font-lp-headline-l-bold text-text-icons-base-main first:mt-0";
    case "h2":
      return "mt-6 font-lp-headline-xs-semibold text-text-icons-base-main first:mt-0";
    case "h3":
      return "mt-5 font-lp-text-xl-bold text-text-icons-base-main first:mt-0";
    default:
      return "mt-5 font-lp-text-l-semibold text-text-icons-base-main first:mt-0";
  }
}

function getNodeKey(node: LexicalNode, index: number) {
  const type = typeof node.type === "string" ? node.type : "node";
  const version = typeof node.version === "number" ? node.version : 0;

  return `${type}-${index}-${version}`;
}
