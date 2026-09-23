const sharp = require("sharp");

async function main() {
  const logoBuf = await sharp("public/images/logo-icon.png").resize(520, 520).png().toBuffer();
  const logoB64 = logoBuf.toString("base64");

  const W = 1200,
    H = 630;
  const logoSize = 320;
  const logoX = 90;
  const logoY = (H - logoSize) / 2;
  const logoCx = logoX + logoSize / 2;
  const logoCy = logoY + logoSize / 2;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#290b4c"/>
      <stop offset="45%" stop-color="#6e4b98"/>
      <stop offset="75%" stop-color="#a97fc9"/>
      <stop offset="100%" stop-color="#e1949f"/>
    </linearGradient>
    <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e1949f" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#e1949f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f5eefc" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#f5eefc" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="logoClip">
      <circle cx="${logoCx}" cy="${logoCy}" r="${logoSize / 2}"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1050" cy="80" r="260" fill="url(#glow1)"/>
  <circle cx="150" cy="620" r="220" fill="url(#glow2)"/>

  <circle cx="${logoCx}" cy="${logoCy}" r="${logoSize / 2 + 14}" fill="none" stroke="#f5eefc" stroke-opacity="0.35" stroke-width="2"/>
  <image href="data:image/png;base64,${logoB64}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" clip-path="url(#logoClip)"/>

  <text x="1120" y="255" text-anchor="end" font-family="Tahoma, Arial" font-size="66" font-weight="bold" fill="#f5eefc">دكتور محمد سامي</text>
  <text x="1120" y="315" text-anchor="end" font-family="Tahoma, Arial" font-size="32" fill="#f6e2ea">استشاري أمراض الجهاز الهضمي</text>
  <text x="1120" y="360" text-anchor="end" font-family="Tahoma, Arial" font-size="32" fill="#f6e2ea">والكبد والمناظير</text>

  <rect x="900" y="400" width="220" height="3" fill="#f5eefc" fill-opacity="0.4"/>
  <text x="1120" y="440" text-anchor="end" font-family="Tahoma, Arial" font-size="22" fill="#cbb8de">Dr. Mohamed Sami · dr-mohamedsami.com</text>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile("src/app/opengraph-image.png");

  // Favicon / app icons, generated from the same cropped logo mark.
  await sharp("public/images/logo-icon.png").resize(512, 512).png().toFile("src/app/icon.png");
  await sharp("public/images/logo-icon.png")
    .resize(180, 180)
    .flatten({ background: "#290b4c" })
    .png()
    .toFile("src/app/apple-icon.png");

  // Standalone PWA/manifest icons (public/, served as static files — distinct
  // from src/app/icon.png which Next turns into a generated /icon route).
  await sharp("public/images/logo-icon.png")
    .resize(192, 192)
    .flatten({ background: "#290b4c" })
    .png()
    .toFile("public/icons/icon-192.png");
  await sharp("public/images/logo-icon.png")
    .resize(512, 512)
    .flatten({ background: "#290b4c" })
    .png()
    .toFile("public/icons/icon-512.png");

  // favicon.ico: a minimal "PNG-in-ICO" container (supported by all modern
  // browsers/OS) — sharp/libvips has no native .ico encoder.
  const icoPng = await sharp("public/images/logo-icon.png").resize(64, 64).png().toBuffer();
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(64, 0); // width
  entry.writeUInt8(64, 1); // height
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bit count
  entry.writeUInt32LE(icoPng.length, 8); // bytes in resource
  entry.writeUInt32LE(22, 12); // offset (6 + 16)
  const fs = require("fs");
  fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, entry, icoPng]));

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
