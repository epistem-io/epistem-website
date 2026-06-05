import Image from "next/image";

interface FileDownloadProps {
  href: string;
  filename: string;
  filesize?: number | null;
  filetype?: string;
}

export function FileDownload({
  href,
  filename,
  filesize,
  filetype = "PDF",
}: FileDownloadProps) {
  const sizeLabel = formatFileSize(filesize);

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="flex w-full items-center gap-4 rounded-2xl border border-[#EAEBF0] bg-white px-4 py-4 transition-colors hover:bg-[#fff8fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2 sm:px-6"
    >
      <div className="flex size-[60px] shrink-0 items-center justify-center rounded-2xl">
        {/* <div className="flex h-9 w-8 items-end justify-center rounded-md bg-[#f95473] pb-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
          <span className="font-text-xs-semibold text-white">{filetype}</span>
        </div> */}
        <Image
          src="/images/file.webp"
          alt="file"
          width={90}
          height={90}
          className="h-15 w-auto"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-lp-body-l-semibold text-[#111A13]">
          {filename}
        </p>
        <p className="mt-1 font-lp-body-m-regular text-[#515151]">
          {filetype} {sizeLabel}
        </p>
      </div>

      <span className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-primary-pink px-4 font-text-button-semibold-small text-primary-pink">
        Download
      </span>
    </a>
  );
}

function formatFileSize(filesize?: number | null) {
  if (
    typeof filesize !== "number" ||
    !Number.isFinite(filesize) ||
    filesize <= 0
  ) {
    return "Unknown size";
  }

  const megabyte = 1024 * 1024;
  const kilobyte = 1024;

  if (filesize >= megabyte) {
    return `${(filesize / megabyte).toFixed(1)} MB`;
  }

  return `${Math.max(filesize / kilobyte, 0.1).toFixed(1)} KB`;
}
