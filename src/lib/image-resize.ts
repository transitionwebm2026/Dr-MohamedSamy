/**
 * Admin-uploaded photos routinely arrive as multi-megabyte, full-camera-
 * resolution files shown on the site at a few hundred CSS pixels — a
 * Lighthouse audit found single images over 2MB each, most of a page's
 * ~23MB weight. There's no server to resize them (static export), so this
 * runs in the browser before the upload, once, at upload time.
 */
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.85;

function hasTransparency(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  const { data } = ctx.getImageData(0, 0, width, height);
  for (let i = 3; i < data.length; i += 4 * 37) {
    // every 37th pixel's alpha channel — enough to catch real transparency without scanning every pixel
    if (data[i] < 255) return true;
  }
  return false;
}

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const transparent = hasTransparency(ctx, width, height);
    const outType = transparent ? "image/png" : "image/jpeg";
    const outExt = transparent ? "png" : "jpg";

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outType, outType === "image/jpeg" ? JPEG_QUALITY : undefined),
    );
    if (!blob || blob.size >= file.size) return file; // never ship something worse than the original

    const name = file.name.replace(/\.[^.]+$/, "") + `.${outExt}`;
    return new File([blob], name, { type: outType });
  } catch {
    return file; // decoding failed (unsupported format, corrupt file, …) — upload the original rather than block
  }
}
