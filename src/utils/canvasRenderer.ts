import QRCode from 'qrcode';
import { PosterConfig } from '../types';

export interface CanvasDimensions {
  width: number;
  height: number;
}

export function getDimensionsForFormat(format: PosterConfig['format']): CanvasDimensions {
  switch (format) {
    case 'a3':
      // A3 Portrait (297 × 420 mm - ISO 216 1:1.414 ratio)
      return { width: 848, height: 1200 };
    case 'a3_quad':
      // A3 Sheet containing 4 mini copies (2x2 grid for cutting - 297 × 420 mm)
      return { width: 848, height: 1200 };
    case 'a4_quad':
      // A4 Sheet containing 4 mini copies (2x2 grid for cutting - 210 × 297 mm)
      return { width: 848, height: 1200 };
    case 'a3_landscape':
      // A3 Landscape (420 × 297 mm - ISO 216 1.414:1 ratio)
      return { width: 1200, height: 848 };
    case 'a4':
      // A4 Portrait (210 × 297 mm - ISO 216 1:1.414 ratio)
      return { width: 848, height: 1200 };
    case 'a4_landscape':
    case 'landscape':
      // A4 Landscape / أفقي عريض (297 × 210 mm - ISO 216 1.414:1 ratio)
      return { width: 1200, height: 848 };
    case 'a5':
      // A5 Table Stand (148 × 210 mm)
      return { width: 800, height: 1130 };
    case 'square':
      // Square Table Sticker (1:1)
      return { width: 900, height: 900 };
    case 'badge':
      // Mini Counter Stand / Sticker (1:1)
      return { width: 800, height: 800 };
    default:
      return { width: 848, height: 1200 };
  }
}

// Helpers for canvas drawing
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill = true,
  stroke = false
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  fillColor: string
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
}

function draw4PointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx, cy, cx + size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + size);
  ctx.quadraticCurveTo(cx, cy, cx - size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawScanCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  bracketLen: number,
  color: string,
  lineWidth = 3
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(x, y + bracketLen);
  ctx.lineTo(x, y);
  ctx.lineTo(x + bracketLen, y);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(x + w - bracketLen, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + bracketLen);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - bracketLen);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + bracketLen, y + h);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(x + w - bracketLen, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - bracketLen);
  ctx.stroke();

  ctx.restore();
}

function drawDalilakSquircleBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.save();

  // 1. Outer Dark Squircle Container with Soft Golden Glow Rim
  const radius = size * 0.26;
  
  // Background gradient for squircle (Deep obsidian navy)
  const bgGrad = ctx.createLinearGradient(x, y, x + size, y + size);
  bgGrad.addColorStop(0, '#0c1220');
  bgGrad.addColorStop(1, '#050810');
  ctx.fillStyle = bgGrad;

  // Outer subtle golden border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = Math.max(1.8, size * 0.04);
  drawRoundRect(ctx, x, y, size, size, radius, true, true);

  // 2. Golden Location Pin Coordinates & Teardrop Curves
  const cx = x + size / 2;
  const cy = y + size / 2 + size * 0.01;
  const pinW = size * 0.72;
  const pinH = size * 0.82;
  const headRadius = pinW * 0.48;
  const headCenterY = cy - pinH * 0.14;
  const tipY = cy + pinH * 0.44;

  // Pin Golden Gradient (Bright Gold to Rich Warm Honey Amber)
  const pinGrad = ctx.createLinearGradient(cx - headRadius, headCenterY - headRadius, cx + headRadius, tipY);
  pinGrad.addColorStop(0, '#fcd34d'); // Bright light gold highlight at top
  pinGrad.addColorStop(0.35, '#f59e0b'); // Vibrant pure amber
  pinGrad.addColorStop(0.85, '#d97706'); // Deep golden amber
  pinGrad.addColorStop(1, '#b45309'); // Rich bronze base shadow

  ctx.fillStyle = pinGrad;
  ctx.beginPath();
  // Pin Head Arc
  ctx.arc(cx, headCenterY, headRadius, Math.PI * 0.82, Math.PI * 0.18, false);
  // Smooth curves down to the tip
  ctx.bezierCurveTo(
    cx + headRadius * 0.88, headCenterY + headRadius * 0.72,
    cx + headRadius * 0.38, tipY - pinH * 0.1,
    cx, tipY
  );
  ctx.bezierCurveTo(
    cx - headRadius * 0.38, tipY - pinH * 0.1,
    cx - headRadius * 0.88, headCenterY + headRadius * 0.72,
    cx - headRadius * Math.cos(Math.PI * 0.18), headCenterY + headRadius * Math.sin(Math.PI * 0.18)
  );
  ctx.closePath();
  ctx.fill();

  // Subtle outer edge stroke on pin for crisp contrast
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.lineWidth = Math.max(1, size * 0.02);
  ctx.stroke();

  // 3. Central Dark Circular Recess inside the Pin Head
  const recessRadius = headRadius * 0.62;
  ctx.fillStyle = '#070b14';
  ctx.beginPath();
  ctx.arc(cx, headCenterY, recessRadius, 0, Math.PI * 2);
  ctx.fill();

  // Inner subtle gold ring inside the recess
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 4. Modern 3D Silver Metallic Skyscraper / Skyline Emblem
  const bW = recessRadius * 1.05;
  const bH = recessRadius * 1.25;
  const bBaseY = headCenterY + recessRadius * 0.68;

  // -- Central High-Rise Tower --
  const cW = bW * 0.38;
  const cH = bH * 0.78;
  const cTopY = bBaseY - cH;
  const cLeft = cx - cW / 2;

  // Central Tower - Left Facet (Light Highlight)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cLeft, bBaseY);
  ctx.lineTo(cLeft, cTopY + cW * 0.25);
  ctx.lineTo(cx, cTopY);
  ctx.lineTo(cx, bBaseY);
  ctx.closePath();
  ctx.fill();

  // Central Tower - Right Facet (Silver Shaded)
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(cx, bBaseY);
  ctx.lineTo(cx, cTopY);
  ctx.lineTo(cLeft + cW, cTopY + cW * 0.25);
  ctx.lineTo(cLeft + cW, bBaseY);
  ctx.closePath();
  ctx.fill();

  // Central Tower - Vertical Center Bevel Spine & Windows
  ctx.strokeStyle = '#070b14';
  ctx.lineWidth = Math.max(0.75, size * 0.015);
  ctx.beginPath();
  ctx.moveTo(cx, cTopY);
  ctx.lineTo(cx, bBaseY);
  ctx.stroke();

  // Subtle glass floor divisions on central tower
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.lineWidth = Math.max(0.6, size * 0.012);
  for (let i = 1; i <= 3; i++) {
    const floorY = cTopY + (cH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(cLeft + 1, floorY + 1);
    ctx.lineTo(cx, floorY);
    ctx.lineTo(cLeft + cW - 1, floorY + 1);
    ctx.stroke();
  }

  // -- Left Flanking Building --
  const lW = bW * 0.26;
  const lH = cH * 0.65;
  const lTopY = bBaseY - lH;
  const lLeft = cLeft - lW * 0.95;

  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(lLeft, bBaseY);
  ctx.lineTo(lLeft, lTopY + lW * 0.3);
  ctx.lineTo(lLeft + lW, lTopY);
  ctx.lineTo(lLeft + lW, bBaseY);
  ctx.closePath();
  ctx.fill();

  // Left building shadow facet
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(lLeft + lW * 0.5, bBaseY);
  ctx.lineTo(lLeft + lW * 0.5, lTopY + lW * 0.15);
  ctx.lineTo(lLeft + lW, lTopY);
  ctx.lineTo(lLeft + lW, bBaseY);
  ctx.closePath();
  ctx.fill();

  // -- Right Flanking Building --
  const rW = bW * 0.26;
  const rH = cH * 0.65;
  const rTopY = bBaseY - rH;
  const rLeft = cLeft + cW - lW * 0.05;

  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(rLeft, bBaseY);
  ctx.lineTo(rLeft, rTopY);
  ctx.lineTo(rLeft + rW, rTopY + rW * 0.3);
  ctx.lineTo(rLeft + rW, bBaseY);
  ctx.closePath();
  ctx.fill();

  // Right building darker shadow facet
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(rLeft + rW * 0.5, bBaseY);
  ctx.lineTo(rLeft + rW * 0.5, rTopY + rW * 0.15);
  ctx.lineTo(rLeft + rW, rTopY + rW * 0.3);
  ctx.lineTo(rLeft + rW, bBaseY);
  ctx.closePath();
  ctx.fill();

  // -- Architectural Curved Base Footing --
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(lLeft - 1, bBaseY);
  ctx.lineTo(rLeft + rW + 1, bBaseY);
  ctx.lineTo(rLeft + rW + 1, bBaseY + Math.max(1.8, size * 0.035));
  ctx.lineTo(lLeft - 1, bBaseY + Math.max(1.8, size * 0.035));
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

const OFFICIAL_WHATSAPP_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%2325D366" d="M256 0C114.6 0 0 114.6 0 256c0 45.3 11.9 89.6 34.4 128.7L2.1 497.8c-2.6 7.6 3.8 15.3 11.7 14.1l117.8-17.7c37.7 20.3 80.3 31.8 124.4 31.8 141.4 0 256-114.6 256-256S397.4 0 256 0z"/><path fill="%23FFFFFF" d="M380.9 129.1C342.3 90.5 291 69.3 236.4 69.3c-112.5 0-204 91.5-204 204 0 35.9 9.4 71 27.2 102L32 480l108.2-28.4c29.8 16.3 63.3 24.8 96.2 24.8h.1c112.4 0 206-91.5 206-204 0-54.5-21.2-105.7-61.6-143.3zm-144.5 313.9c-30.5 0-60.4-8.2-86.4-23.6l-6.2-3.7-64.2 16.8 17.1-62.6-4.1-6.5c-17-27-26-58.2-26-90.3 0-93.5 76.1-169.6 169.7-169.6 45.3 0 87.9 17.6 119.9 49.7 32 32.1 49.6 74.7 49.5 120 0 93.6-78 169.6-171.3 169.6zm93-127c-5.1-2.6-30.2-14.9-34.9-16.5-4.7-1.7-8.1-2.6-11.5 2.6-3.4 5.1-13.1 16.5-16.2 20-3 3.4-6 3.9-11 1.3-30-15-49.6-26.7-69.4-60.7-5.2-9 5.2-8.4 15-27.9 1.7-3.4.8-6.3-.5-8.9-1.3-2.6-11.5-27.7-15.7-37.9-4.1-9.9-8.4-8.5-11.5-8.7-2.9-.2-6.3-.2-9.7-.2-3.4 0-8.9 1.3-13.6 6.3-4.7 5.1-17.8 17.4-17.8 42.5 0 25.1 18.3 49.4 20.8 52.8 2.6 3.4 35.9 54.9 87.1 77 32.4 14 45 15.2 61.2 12.8 9.8-1.5 30.2-12.3 34.4-24.3 4.2-12 4.2-22.1 3-24.3-1.3-2.2-4.7-3.5-9.8-6.1z"/></svg>`;

const OFFICIAL_PHONE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="%23f59e0b"/><path fill="%23070d18" d="M362.7 321.6c-15-4-30.3 3.4-35.6 17.4l-18 48c-84.5-42.3-152.1-109.9-194.4-194.4l48-18c14-5.3 21.4-20.6 17.4-35.6l-24-90c-4.3-16.1-19.1-27-35.8-27H64C46.3 22 32 36.3 32 54c0 237.5 192.5 430 430 430 17.7 0 32-14.3 32-32v-56.3c0-16.7-10.9-31.5-27-35.8l-90-24z"/></svg>`;

let cachedWhatsAppImg: HTMLImageElement | null = null;
let cachedPhoneImg: HTMLImageElement | null = null;

async function drawWhatsAppIcon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number
) {
  if (!cachedWhatsAppImg) {
    cachedWhatsAppImg = await loadImage(OFFICIAL_WHATSAPP_SVG);
  }
  if (cachedWhatsAppImg) {
    ctx.drawImage(cachedWhatsAppImg, cx - size / 2, cy - size / 2, size, size);
  }
}

async function drawPhoneIcon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number
) {
  if (!cachedPhoneImg) {
    cachedPhoneImg = await loadImage(OFFICIAL_PHONE_SVG);
  }
  if (cachedPhoneImg) {
    ctx.drawImage(cachedPhoneImg, cx - size / 2, cy - size / 2, size, size);
  }
}

async function drawCenterLogoInQr(
  ctx: CanvasRenderingContext2D,
  config: PosterConfig,
  boxCenterX: number,
  boxCenterY: number,
  qrInnerSize: number
) {
  if (!config.qrLogoCenter || config.qrCenterLogoType === 'none') {
    return;
  }

  const logoType = config.qrCenterLogoType || 'dalilak';
  const centerSize = Math.round(qrInnerSize * 0.24);
  const cx = boxCenterX;
  const cy = boxCenterY;

  if (logoType === 'dalilak') {
    ctx.save();
    const padSize = centerSize + 8;
    const padX = cx - padSize / 2;
    const padY = cy - padSize / 2;

    // Background isolation pad matching QR background with crisp shadow
    ctx.fillStyle = config.qrBgColor || '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 2;
    drawRoundRect(ctx, padX, padY, padSize, padSize, padSize * 0.28, true, false);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Draw the official Dalilak squircle badge inside the center
    drawDalilakSquircleBadge(ctx, cx - centerSize / 2, cy - centerSize / 2, centerSize);
    ctx.restore();
  } else if (logoType === 'google') {
    ctx.save();
    const padRadius = centerSize / 2 + 4;

    // White circle background with subtle shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, padRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Google G in center with clean multi-colored / official blue look
    ctx.strokeStyle = '#ea4335';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#4285F4';
    ctx.font = `900 ${Math.round(centerSize * 0.72)}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('G', cx, cy + 1);
    ctx.restore();
  } else if (logoType === 'whatsapp') {
    ctx.save();
    const padRadius = centerSize / 2 + 4;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    await drawWhatsAppIcon(ctx, cx, cy, padRadius * 2);
    ctx.restore();
  } else if (logoType === 'instagram') {
    ctx.save();
    const padSize = centerSize + 8;
    const padX = cx - padSize / 2;
    const padY = cy - padSize / 2;

    // Instagram Gradient Background
    const grad = ctx.createLinearGradient(padX, padY + padSize, padX + padSize, padY);
    grad.addColorStop(0, '#f58529');
    grad.addColorStop(0.5, '#dd2a7b');
    grad.addColorStop(1, '#8134af');
    ctx.fillStyle = grad;
    drawRoundRect(ctx, padX, padY, padSize, padSize, padSize * 0.28, true, false);

    // Camera white icon
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.4;
    const camSize = centerSize * 0.58;
    drawRoundRect(ctx, cx - camSize / 2, cy - camSize / 2, camSize, camSize, camSize * 0.28, false, true);

    // Lens circle
    ctx.beginPath();
    ctx.arc(cx, cy, camSize * 0.26, 0, Math.PI * 2);
    ctx.stroke();

    // Flash dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx + camSize * 0.26, cy - camSize * 0.26, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (logoType === 'snapchat') {
    ctx.save();
    const padSize = centerSize + 8;
    const padX = cx - padSize / 2;
    const padY = cy - padSize / 2;

    ctx.fillStyle = '#FFFC00'; // Snapchat Yellow
    drawRoundRect(ctx, padX, padY, padSize, padSize, padSize * 0.28, true, false);

    // Ghost emoji/text
    ctx.font = `${Math.round(centerSize * 0.65)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👻', cx, cy);
    ctx.restore();
  } else if (logoType === 'tiktok') {
    ctx.save();
    const padRadius = centerSize / 2 + 4;
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx, cy, padRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#25F4EE';
    ctx.font = `bold ${Math.round(centerSize * 0.72)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('♪', cx - 1, cy);

    ctx.fillStyle = '#FE2C55';
    ctx.fillText('♪', cx + 1, cy);

    ctx.fillStyle = '#ffffff';
    ctx.fillText('♪', cx, cy);
    ctx.restore();
  } else if (logoType === 'tripadvisor') {
    ctx.save();
    const padRadius = centerSize / 2 + 4;
    ctx.fillStyle = '#34E0A1';
    ctx.beginPath();
    ctx.arc(cx, cy, padRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = `${Math.round(centerSize * 0.65)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🦉', cx, cy);
    ctx.restore();
  } else if (logoType === 'apple') {
    ctx.save();
    const padRadius = centerSize / 2 + 4;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx, cy, padRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.round(centerSize * 0.68)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('', cx, cy);
    ctx.restore();
  } else if (logoType === 'star') {
    ctx.save();
    const padRadius = centerSize / 2 + 4;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, padRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = config.accentColor || '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    drawStar(ctx, cx, cy, 5, centerSize * 0.42, centerSize * 0.19, config.accentColor || '#f59e0b');
    ctx.restore();
  }
}

async function drawStyledQrBox(
  ctx: CanvasRenderingContext2D,
  config: PosterConfig,
  boxCenterX: number,
  boxCenterY: number,
  targetSize: number
) {
  const qrPadding = Math.max(14, Math.round(targetSize * 0.055));
  const cardSize = targetSize;
  const qrInnerSize = targetSize - qrPadding * 2;
  const cardX = boxCenterX - cardSize / 2;
  const cardY = boxCenterY - cardSize / 2;
  const qrX = cardX + qrPadding;
  const qrY = cardY + qrPadding;

  // 1. Soft Shadow for Card
  ctx.save();
  ctx.fillStyle = config.qrBgColor || '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  drawRoundRect(ctx, cardX, cardY, cardSize, cardSize, 20, true, false);
  ctx.restore();

  // 2. Card Background & Subtle Golden Accent Border
  ctx.save();
  ctx.fillStyle = config.qrBgColor || '#ffffff';
  ctx.strokeStyle = config.accentColor || '#f59e0b';
  ctx.lineWidth = 2.5;
  drawRoundRect(ctx, cardX, cardY, cardSize, cardSize, 20, true, true);
  ctx.restore();

  // 3. Four Stylish Viewfinder Scan Brackets
  drawScanCornerBrackets(
    ctx,
    cardX + 4,
    cardY + 4,
    cardSize - 8,
    cardSize - 8,
    Math.min(24, Math.round(cardSize * 0.08)),
    config.accentColor || '#f59e0b',
    3
  );

  // 4. Draw QR Content (Uploaded vs Generated)
  if (config.qrType === 'uploaded' && config.uploadedQrDataUrl) {
    const qrImg = await loadImage(config.uploadedQrDataUrl);
    if (qrImg) {
      // Calculate aspect-fit scaling to prevent any distortion
      const imgW = qrImg.width || 1;
      const imgH = qrImg.height || 1;
      const scale = Math.min(qrInnerSize / imgW, qrInnerSize / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = qrX + (qrInnerSize - drawW) / 2;
      const drawY = qrY + (qrInnerSize - drawH) / 2;

      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(qrImg, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Render center logo if enabled
      await drawCenterLogoInQr(ctx, config, boxCenterX, boxCenterY, qrInnerSize);
    }
  } else {
    // Check if QR URL is available
    if (!config.qrUrl || !config.qrUrl.trim()) {
      // Draw professional pending placeholder instead of deceptive generic QR code
      ctx.save();
      ctx.fillStyle = '#fefce8';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 5]);
      drawRoundRect(ctx, qrX, qrY, qrInnerSize, qrInnerSize, 14, true, true);
      ctx.setLineDash([]);

      const pCenterX = qrX + qrInnerSize / 2;
      const pCenterY = qrY + qrInnerSize / 2;

      // Icon circle
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath();
      ctx.arc(pCenterX, pCenterY - 26, 24, 0, Math.PI * 2);
      ctx.fill();

      // Warning exclamation mark
      ctx.fillStyle = '#b45309';
      ctx.font = 'bold 26px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('!', pCenterX, pCenterY - 25);

      // Warning primary text
      ctx.fillStyle = '#92400e';
      ctx.font = 'bold 13px "Cairo", sans-serif';
      ctx.fillText('بانتظار رابط موثق من Google', pCenterX, pCenterY + 16);

      // Secondary guidance text
      ctx.fillStyle = '#b45309';
      ctx.font = '10.5px "Cairo", sans-serif';
      ctx.fillText('لم يتم توليد رمز QR لعدم توفر رابط معتمد', pCenterX, pCenterY + 34);

      ctx.restore();
    } else {
      // Generate crisp QR code
      try {
        const qrDataUrl = await QRCode.toDataURL(config.qrUrl.trim(), {
          width: Math.round(qrInnerSize * 2.5),
          margin: 1,
          color: {
            dark: config.qrColor || '#000000',
            light: config.qrBgColor || '#ffffff'
          },
          errorCorrectionLevel: 'H'
        });
        const generatedQrImg = await loadImage(qrDataUrl);
        if (generatedQrImg) {
          ctx.save();
          ctx.imageSmoothingEnabled = false; // Keep QR pixels ultra-crisp
          ctx.drawImage(generatedQrImg, qrX, qrY, qrInnerSize, qrInnerSize);
          ctx.restore();

          // Render center logo (Dalilak, Google, WhatsApp, etc.)
          await drawCenterLogoInQr(ctx, config, boxCenterX, boxCenterY, qrInnerSize);
        }
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    }
  }
}

function drawDetailedCarIllustration(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: string,
  accentColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Base dimensions of the car canvas
  // Center is (0, 0), ground is at y = 30
  const groundY = 32;

  // 1. Ground Shadow Line (Tapered)
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-140, groundY);
  ctx.lineTo(-70, groundY);
  ctx.moveTo(-20, groundY);
  ctx.lineTo(45, groundY);
  ctx.moveTo(95, groundY);
  ctx.lineTo(140, groundY);
  ctx.stroke();

  // 2. Wheels
  const wheelRadius = 22;
  const rimRadius = 16;
  const frontWheelX = -65;
  const rearWheelX = 70;
  const wheelCenterY = groundY - wheelRadius + 3;

  const drawWheel = (wx: number, wy: number) => {
    // Outer Tire
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(wx, wy, wheelRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Rim circle
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(wx, wy, rimRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Brake Disc Ring
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(wx, wy, rimRadius * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    // 5-Star Luxury Alloy Rim Spokes
    ctx.lineWidth = 2.2;
    for (let i = 0; i < 5; i++) {
      const angle = (i * (Math.PI * 2)) / 5 - Math.PI / 2;
      const x1 = wx + Math.cos(angle) * (rimRadius * 0.2);
      const y1 = wy + Math.sin(angle) * (rimRadius * 0.2);
      const x2 = wx + Math.cos(angle) * (rimRadius * 0.95);
      const y2 = wy + Math.sin(angle) * (rimRadius * 0.95);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Split spoke detail
      const offsetAngle1 = angle + 0.15;
      const x3 = wx + Math.cos(offsetAngle1) * (rimRadius * 0.85);
      const y3 = wy + Math.sin(offsetAngle1) * (rimRadius * 0.85);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x3, y3);
      ctx.stroke();
    }

    // Center Hub Dot
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(wx, wy, 3.5, 0, Math.PI * 2);
    ctx.fill();
  };

  drawWheel(frontWheelX, wheelCenterY);
  drawWheel(rearWheelX, wheelCenterY);

  // 3. Main Car Body Outer Silhouette
  ctx.lineWidth = 3.8;
  ctx.beginPath();

  // Start at front splitter (left)
  ctx.moveTo(-132, groundY - 5);
  // Front lower chin & air intake
  ctx.lineTo(-136, groundY - 14);
  ctx.quadraticCurveTo(-138, groundY - 26, -130, -5); // Front nose / bumper
  // Front headlight & hood curve
  ctx.quadraticCurveTo(-118, -14, -90, -18); // Hood slope
  ctx.quadraticCurveTo(-65, -20, -42, -21);  // Base of windshield
  // A-pillar & Windshield
  ctx.quadraticCurveTo(-26, -38, -6, -45);   // Windshield rake
  // Sleek coupe roofline
  ctx.quadraticCurveTo(24, -47, 50, -43);    // Roof crown
  // Fastback slope & C-pillar
  ctx.quadraticCurveTo(80, -37, 105, -20);   // Rear window slope
  // Trunk lid & ducktail rear spoiler
  ctx.quadraticCurveTo(118, -17, 130, -16);  // Spoiler lip
  ctx.lineTo(132, -13);                      // Rear edge
  // Rear tail light & bumper down to rear diffuser
  ctx.quadraticCurveTo(134, 0, 126, 12);     // Rear bumper curve
  ctx.lineTo(122, groundY - 6);              // Lower rear valance
  // Rear wheel arch
  ctx.lineTo(rearWheelX + wheelRadius + 7, groundY - 6);
  ctx.arc(rearWheelX, wheelCenterY, wheelRadius + 6, 0.15, Math.PI - 0.15, true);
  ctx.lineTo(rearWheelX - wheelRadius - 7, groundY - 6);
  // Rocker panel / side skirt
  ctx.lineTo(frontWheelX + wheelRadius + 7, groundY - 6);
  // Front wheel arch
  ctx.arc(frontWheelX, wheelCenterY, wheelRadius + 6, 0.15, Math.PI - 0.15, true);
  ctx.lineTo(-132, groundY - 5);
  ctx.stroke();

  // 4. Windows & Cabin Pillars (Coupe Greenhouse)
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  // Front windshield line
  ctx.moveTo(-38, -19);
  ctx.lineTo(-6, -41);
  // Upper roof rail
  ctx.quadraticCurveTo(22, -43, 46, -39);
  // Rear quarter window
  ctx.quadraticCurveTo(72, -34, 94, -19);
  // Beltline (bottom of windows)
  ctx.quadraticCurveTo(30, -17, -38, -19);
  ctx.stroke();

  // B-Pillar & Window Divider
  ctx.beginPath();
  ctx.moveTo(14, -42);
  ctx.lineTo(16, -18);
  ctx.stroke();

  // Quarter glass frame divider
  ctx.beginPath();
  ctx.moveTo(56, -38);
  ctx.lineTo(60, -18);
  ctx.stroke();

  // 5. Aerodynamic Side Mirror
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-32, -20);
  ctx.lineTo(-38, -25);
  ctx.quadraticCurveTo(-44, -26, -42, -22);
  ctx.quadraticCurveTo(-38, -19, -32, -20);
  ctx.stroke();

  // 6. Character Lines & Sculpted Door Creases
  // Upper shoulder line (crease from front fender over door to rear haunch)
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-95, -12);
  ctx.quadraticCurveTo(-60, -14, -20, -13);
  ctx.quadraticCurveTo(20, -12, 65, -10);
  ctx.quadraticCurveTo(95, -8, 126, -12);
  ctx.stroke();

  // Door Shutlines
  ctx.beginPath();
  // Front door cutline
  ctx.moveTo(-34, -18);
  ctx.lineTo(-30, groundY - 7);
  // Rear door cutline
  ctx.moveTo(54, -18);
  ctx.quadraticCurveTo(56, 0, 52, groundY - 7);
  ctx.stroke();

  // Door Handle
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(24, -8);
  ctx.lineTo(38, -7.5);
  ctx.stroke();

  // Front Fender Side Vent / Air Extractor Gill
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-38, -8);
  ctx.quadraticCurveTo(-35, 2, -37, 12);
  ctx.moveTo(-42, -6);
  ctx.quadraticCurveTo(-39, 3, -41, 10);
  ctx.stroke();

  // Headlight Inner Projector Contour
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-128, -6);
  ctx.quadraticCurveTo(-116, -12, -100, -13);
  ctx.stroke();

  // Front Bumper Lower Air Dam Line
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-132, 2);
  ctx.lineTo(-102, 5);
  ctx.stroke();

  // 7. Gleam & Shine Sparkles (4-pointed Diamond Stars over the Hood)
  draw4PointStar(ctx, -108, -32, 11, accentColor);
  draw4PointStar(ctx, -124, -22, 6, accentColor);
  draw4PointStar(ctx, -82, -38, 7, accentColor);
  draw4PointStar(ctx, -55, -34, 4.5, color);

  // 8. Soap Suds & Wash Bubbles (Rising above roof and rear)
  const drawBubble = (bx: number, by: number, radius: number) => {
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(bx, by, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Bubble specular reflection arc
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(bx, by, radius * 0.7, -Math.PI * 0.8, -Math.PI * 0.3);
    ctx.stroke();
  };

  drawBubble(62, -54, 9);
  drawBubble(42, -58, 6.5);
  drawBubble(82, -49, 7.5);
  drawBubble(74, -66, 5);
  drawBubble(95, -60, 4);

  // Small "+" and "o" sparkles around bubbles
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = accentColor;
  // Plus sign 1
  ctx.beginPath();
  ctx.moveTo(30, -62);
  ctx.lineTo(30, -54);
  ctx.moveTo(26, -58);
  ctx.lineTo(34, -58);
  ctx.stroke();

  // Plus sign 2
  ctx.beginPath();
  ctx.moveTo(106, -50);
  ctx.lineTo(106, -44);
  ctx.moveTo(103, -47);
  ctx.lineTo(109, -47);
  ctx.stroke();

  // Dot accents
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(52, -67, 1.8, 0, Math.PI * 2);
  ctx.arc(88, -41, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCategoryIcon(
  ctx: CanvasRenderingContext2D,
  iconName: string,
  centerX: number,
  centerY: number,
  size: number,
  color: string,
  accentColor: string
) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const half = size / 2;

  switch (iconName) {
    case 'Car':
      // Calls our ultra-detailed luxury coupe car illustration engine
      drawDetailedCarIllustration(ctx, 0, 0, (size / 150) * 1.15, color, accentColor);
      break;

    case 'Coffee':
      // High-end Specialty Coffee Cup & Saucer with Latte Art & Steam Waves
      ctx.lineWidth = 3.2;
      // Saucer
      ctx.beginPath();
      ctx.ellipse(0, half * 0.6, half * 0.75, half * 0.18, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Cup Body
      ctx.beginPath();
      ctx.moveTo(-half * 0.52, -half * 0.15);
      ctx.quadraticCurveTo(-half * 0.5, half * 0.5, 0, half * 0.52);
      ctx.quadraticCurveTo(half * 0.5, half * 0.5, half * 0.52, -half * 0.15);
      ctx.closePath();
      ctx.stroke();

      // Cup Rim Ellipse
      ctx.beginPath();
      ctx.ellipse(0, -half * 0.15, half * 0.52, half * 0.15, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Cup Handle
      ctx.beginPath();
      ctx.arc(half * 0.55, half * 0.12, half * 0.22, -Math.PI * 0.45, Math.PI * 0.55);
      ctx.stroke();

      // Steam swirl lines
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(-half * 0.2, -half * 0.35);
      ctx.quadraticCurveTo(-half * 0.35, -half * 0.6, -half * 0.15, -half * 0.85);
      ctx.moveTo(0, -half * 0.38);
      ctx.quadraticCurveTo(half * 0.15, -half * 0.65, 0, -half * 0.9);
      ctx.moveTo(half * 0.2, -half * 0.35);
      ctx.quadraticCurveTo(half * 0.35, -half * 0.6, half * 0.2, -half * 0.85);
      ctx.stroke();

      // Sparkles
      draw4PointStar(ctx, half * 0.65, -half * 0.6, 6, accentColor);
      break;

    case 'Utensils':
      // Fine Dining Cloche Cover, Crossed Fork & Knife
      ctx.lineWidth = 3.2;
      // Cloche Platter Base
      ctx.beginPath();
      ctx.moveTo(-half * 0.75, half * 0.45);
      ctx.lineTo(half * 0.75, half * 0.45);
      ctx.stroke();

      // Cloche Dome
      ctx.beginPath();
      ctx.arc(0, half * 0.45, half * 0.58, Math.PI, 0, false);
      ctx.stroke();

      // Cloche Handle / Finial
      ctx.beginPath();
      ctx.arc(0, -half * 0.18, half * 0.09, 0, Math.PI * 2);
      ctx.fill();

      // Fork on Left
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-half * 0.5, half * 0.65);
      ctx.lineTo(-half * 0.5, -half * 0.4);
      ctx.moveTo(-half * 0.6, -half * 0.4);
      ctx.lineTo(-half * 0.6, -half * 0.75);
      ctx.moveTo(-half * 0.5, -half * 0.4);
      ctx.lineTo(-half * 0.5, -half * 0.75);
      ctx.moveTo(-half * 0.4, -half * 0.4);
      ctx.lineTo(-half * 0.4, -half * 0.75);
      ctx.moveTo(-half * 0.6, -half * 0.4);
      ctx.quadraticCurveTo(-half * 0.5, -half * 0.3, -half * 0.4, -half * 0.4);
      ctx.stroke();

      // Knife on Right
      ctx.beginPath();
      ctx.moveTo(half * 0.5, half * 0.65);
      ctx.lineTo(half * 0.5, -half * 0.75);
      ctx.quadraticCurveTo(half * 0.65, -half * 0.4, half * 0.5, -half * 0.15);
      ctx.stroke();

      // Golden Sparkle
      draw4PointStar(ctx, 0, -half * 0.5, 7, accentColor);
      break;

    case 'Stethoscope':
      // Medical Health Crest & Stethoscope
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      // Earpieces
      ctx.moveTo(-half * 0.35, -half * 0.65);
      ctx.lineTo(-half * 0.25, -half * 0.25);
      ctx.moveTo(half * 0.35, -half * 0.65);
      ctx.lineTo(half * 0.25, -half * 0.25);
      // U-tube
      ctx.arc(0, -half * 0.25, half * 0.25, 0, Math.PI, false);
      // Main tube loop
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(0, half * 0.5, half * 0.3, half * 0.45);
      ctx.arc(half * 0.3, half * 0.15, half * 0.16, Math.PI * 0.5, -Math.PI * 0.5, true);
      ctx.stroke();
      // Chest Piece Bell
      ctx.beginPath();
      ctx.arc(half * 0.3, -half * 0.05, half * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(half * 0.3, -half * 0.05, half * 0.06, 0, Math.PI * 2);
      ctx.fill();

      // Medical Plus Badge
      ctx.fillStyle = accentColor;
      ctx.fillRect(-half * 0.4, half * 0.1, half * 0.25, half * 0.08);
      ctx.fillRect(-half * 0.315, half * 0.015, half * 0.08, half * 0.25);
      break;

    case 'Scissors':
      // Barber Scissors, Comb & Crown
      ctx.lineWidth = 3.0;
      // Shear 1
      ctx.beginPath();
      ctx.arc(-half * 0.35, half * 0.45, half * 0.18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-half * 0.23, half * 0.32);
      ctx.lineTo(half * 0.35, -half * 0.65);
      ctx.stroke();

      // Shear 2
      ctx.beginPath();
      ctx.arc(half * 0.35, half * 0.45, half * 0.18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(half * 0.23, half * 0.32);
      ctx.lineTo(-half * 0.35, -half * 0.65);
      ctx.stroke();

      // Pivot screw
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Comb
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(-half * 0.55, -half * 0.1);
      ctx.lineTo(half * 0.55, -half * 0.1);
      for (let x = -half * 0.45; x <= half * 0.45; x += 6) {
        ctx.moveTo(x, -half * 0.1);
        ctx.lineTo(x, -half * 0.28);
      }
      ctx.stroke();
      break;

    case 'Sparkles':
      // Royal Diamond Gemstone with Radiance
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      // Gem top
      ctx.moveTo(-half * 0.45, -half * 0.2);
      ctx.lineTo(half * 0.45, -half * 0.2);
      // Gem facets
      ctx.lineTo(half * 0.65, 0);
      ctx.lineTo(0, half * 0.65);
      ctx.lineTo(-half * 0.65, 0);
      ctx.closePath();
      ctx.stroke();

      // Inner facet lines
      ctx.beginPath();
      ctx.moveTo(-half * 0.2, -half * 0.2);
      ctx.lineTo(-half * 0.3, 0);
      ctx.lineTo(0, half * 0.65);
      ctx.lineTo(half * 0.3, 0);
      ctx.lineTo(half * 0.2, -half * 0.2);
      ctx.moveTo(-half * 0.65, 0);
      ctx.lineTo(half * 0.65, 0);
      ctx.stroke();

      // Surrounding Stars
      draw4PointStar(ctx, -half * 0.55, -half * 0.45, 9, accentColor);
      draw4PointStar(ctx, half * 0.55, -half * 0.45, 7, accentColor);
      draw4PointStar(ctx, 0, -half * 0.55, 11, accentColor);
      break;

    case 'Wrench':
      // Crossed Wrench & Gear
      ctx.lineWidth = 3.0;
      // Central Gear
      ctx.beginPath();
      ctx.arc(0, 0, half * 0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, half * 0.16, 0, Math.PI * 2);
      ctx.stroke();

      // Wrench 1
      ctx.beginPath();
      ctx.moveTo(-half * 0.55, -half * 0.55);
      ctx.lineTo(half * 0.55, half * 0.55);
      ctx.stroke();
      // Wrench jaw head
      ctx.beginPath();
      ctx.arc(-half * 0.55, -half * 0.55, half * 0.18, Math.PI * 0.75, Math.PI * 2.25);
      ctx.stroke();
      break;

    case 'Crown':
      // 5-Point Imperial Crown with Jewels
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(-half * 0.65, half * 0.4);
      ctx.lineTo(half * 0.65, half * 0.4);
      ctx.lineTo(half * 0.55, -half * 0.25);
      ctx.lineTo(half * 0.28, half * 0.05);
      ctx.lineTo(0, -half * 0.45);
      ctx.lineTo(-half * 0.28, half * 0.05);
      ctx.lineTo(-half * 0.55, -half * 0.25);
      ctx.closePath();
      ctx.stroke();

      // Crown Headband
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(-half * 0.62, half * 0.25);
      ctx.lineTo(half * 0.62, half * 0.25);
      ctx.stroke();

      // Jewels on peaks
      ctx.fillStyle = accentColor;
      [-half * 0.55, -half * 0.28, 0, half * 0.28, half * 0.55].forEach((px, idx) => {
        const py = idx === 2 ? -half * 0.45 : idx % 2 === 0 ? -half * 0.25 : half * 0.05;
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case 'ShieldCheck':
      // Security Shield with Bold Checkmark & Laurels
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.6);
      ctx.lineTo(half * 0.55, -half * 0.4);
      ctx.quadraticCurveTo(half * 0.55, half * 0.2, 0, half * 0.65);
      ctx.quadraticCurveTo(-half * 0.55, half * 0.2, -half * 0.55, -half * 0.4);
      ctx.closePath();
      ctx.stroke();

      // Inner shield line
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.48);
      ctx.lineTo(half * 0.42, -half * 0.32);
      ctx.quadraticCurveTo(half * 0.42, half * 0.15, 0, half * 0.52);
      ctx.quadraticCurveTo(-half * 0.42, half * 0.15, -half * 0.42, -half * 0.32);
      ctx.closePath();
      ctx.stroke();

      // Center Checkmark
      ctx.lineWidth = 4.0;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(-half * 0.22, 0);
      ctx.lineTo(-half * 0.05, half * 0.18);
      ctx.lineTo(half * 0.26, -half * 0.18);
      ctx.stroke();
      break;

    case 'Building2':
      // Modern Architectural Skyline
      ctx.lineWidth = 3.0;
      // Main Center Tower
      ctx.strokeRect(-half * 0.22, -half * 0.6, half * 0.44, half * 1.15);
      // Spire
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.6);
      ctx.lineTo(0, -half * 0.85);
      ctx.stroke();
      // Left Building
      ctx.strokeRect(-half * 0.65, -half * 0.25, half * 0.38, half * 0.8);
      // Right Building
      ctx.strokeRect(half * 0.28, -half * 0.4, half * 0.38, half * 0.95);

      // Window Grids
      ctx.fillStyle = accentColor;
      for (let y = -half * 0.45; y < half * 0.35; y += 12) {
        ctx.fillRect(-half * 0.12, y, 6, 6);
        ctx.fillRect(half * 0.02, y, 6, 6);
      }
      break;

    case 'MapPin':
      // Google Maps Pin with Star
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(0, half * 0.65);
      ctx.quadraticCurveTo(-half * 0.55, 0, -half * 0.55, -half * 0.25);
      ctx.arc(0, -half * 0.25, half * 0.55, Math.PI, 0, false);
      ctx.quadraticCurveTo(half * 0.55, 0, 0, half * 0.65);
      ctx.stroke();

      // Inner Star
      drawStar(ctx, 0, -half * 0.25, 5, half * 0.24, half * 0.11, accentColor);
      break;

    case 'Droplets':
      // Car Wash Water Splash, Foam & Gloss Drops
      ctx.lineWidth = 3.0;
      // Main Center Drop
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.7);
      ctx.bezierCurveTo(half * 0.45, -half * 0.1, half * 0.45, half * 0.45, 0, half * 0.6);
      ctx.bezierCurveTo(-half * 0.45, half * 0.45, -half * 0.45, -half * 0.1, 0, -half * 0.7);
      ctx.closePath();
      ctx.stroke();

      // Left Small Drop
      ctx.beginPath();
      ctx.moveTo(-half * 0.45, -half * 0.1);
      ctx.bezierCurveTo(-half * 0.2, half * 0.2, -half * 0.3, half * 0.45, -half * 0.48, half * 0.45);
      ctx.bezierCurveTo(-half * 0.65, half * 0.45, -half * 0.7, half * 0.2, -half * 0.45, -half * 0.1);
      ctx.closePath();
      ctx.stroke();

      // Right Small Drop
      ctx.beginPath();
      ctx.moveTo(half * 0.45, -half * 0.1);
      ctx.bezierCurveTo(half * 0.7, half * 0.2, half * 0.65, half * 0.45, half * 0.48, half * 0.45);
      ctx.bezierCurveTo(half * 0.3, half * 0.45, half * 0.2, half * 0.2, half * 0.45, -half * 0.1);
      ctx.closePath();
      ctx.stroke();

      // Sparkles around drops
      draw4PointStar(ctx, half * 0.55, -half * 0.5, 7, accentColor);
      draw4PointStar(ctx, -half * 0.55, -half * 0.4, 5, accentColor);
      break;

    case 'Flame':
      // Multi-layer Energetic Hot Flame
      ctx.lineWidth = 3.2;
      // Outer Flame
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.75);
      ctx.bezierCurveTo(half * 0.35, -half * 0.35, half * 0.6, 0, half * 0.45, half * 0.4);
      ctx.bezierCurveTo(half * 0.3, half * 0.65, -half * 0.3, half * 0.65, -half * 0.45, half * 0.4);
      ctx.bezierCurveTo(-half * 0.6, 0, -half * 0.35, -half * 0.35, 0, -half * 0.75);
      ctx.closePath();
      ctx.stroke();

      // Inner Flame Core
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.15);
      ctx.bezierCurveTo(half * 0.2, half * 0.1, half * 0.25, half * 0.35, 0, half * 0.5);
      ctx.bezierCurveTo(-half * 0.25, half * 0.35, -half * 0.2, half * 0.1, 0, -half * 0.15);
      ctx.closePath();
      ctx.fill();
      break;

    case 'Cake':
      // Celebratory Patisserie Cake with Candles & Star
      ctx.lineWidth = 3.0;
      // Bottom Layer
      ctx.strokeRect(-half * 0.6, half * 0.1, half * 1.2, half * 0.4);
      // Top Layer
      ctx.strokeRect(-half * 0.4, -half * 0.25, half * 0.8, half * 0.35);
      // Candle
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.25);
      ctx.lineTo(0, -half * 0.5);
      ctx.stroke();
      // Candle Flame
      draw4PointStar(ctx, 0, -half * 0.65, 8, accentColor);
      break;

    case 'Tooth':
      // Dental Health & Bright Smile
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.35);
      ctx.bezierCurveTo(half * 0.2, -half * 0.6, half * 0.6, -half * 0.55, half * 0.5, -half * 0.15);
      ctx.bezierCurveTo(half * 0.45, half * 0.25, half * 0.35, half * 0.65, half * 0.2, half * 0.65);
      ctx.bezierCurveTo(half * 0.1, half * 0.65, half * 0.1, half * 0.1, 0, half * 0.1);
      ctx.bezierCurveTo(-half * 0.1, half * 0.1, -half * 0.1, half * 0.65, -half * 0.2, half * 0.65);
      ctx.bezierCurveTo(-half * 0.35, half * 0.65, -half * 0.45, half * 0.25, -half * 0.5, -half * 0.15);
      ctx.bezierCurveTo(-half * 0.6, -half * 0.55, -half * 0.2, -half * 0.6, 0, -half * 0.35);
      ctx.closePath();
      ctx.stroke();
      // Tooth Star Sparkle
      draw4PointStar(ctx, half * 0.45, -half * 0.45, 9, accentColor);
      break;

    case 'Flower2':
      // Spa Lotus Blossom & Wellness
      ctx.lineWidth = 3.0;
      // Center Petal
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.65);
      ctx.bezierCurveTo(half * 0.25, -half * 0.25, half * 0.25, half * 0.35, 0, half * 0.45);
      ctx.bezierCurveTo(-half * 0.25, half * 0.35, -half * 0.25, -half * 0.25, 0, -half * 0.65);
      ctx.closePath();
      ctx.stroke();

      // Left Petal
      ctx.beginPath();
      ctx.moveTo(0, half * 0.45);
      ctx.bezierCurveTo(-half * 0.35, half * 0.35, -half * 0.65, 0, -half * 0.55, -half * 0.35);
      ctx.bezierCurveTo(-half * 0.3, -half * 0.2, -half * 0.1, 0, 0, half * 0.45);
      ctx.stroke();

      // Right Petal
      ctx.beginPath();
      ctx.moveTo(0, half * 0.45);
      ctx.bezierCurveTo(half * 0.35, half * 0.35, half * 0.65, 0, half * 0.55, -half * 0.35);
      ctx.bezierCurveTo(half * 0.3, -half * 0.2, half * 0.1, 0, 0, half * 0.45);
      ctx.stroke();
      break;

    case 'Shirt':
      // Ironed Collared Shirt & Laundry Dry Clean
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      // Collar
      ctx.moveTo(0, -half * 0.35);
      ctx.lineTo(-half * 0.25, -half * 0.6);
      ctx.lineTo(half * 0.25, -half * 0.6);
      ctx.closePath();
      ctx.stroke();

      // Body & Sleeves
      ctx.beginPath();
      ctx.moveTo(-half * 0.25, -half * 0.6);
      ctx.lineTo(-half * 0.65, -half * 0.35);
      ctx.lineTo(-half * 0.45, -half * 0.15);
      ctx.lineTo(-half * 0.4, half * 0.6);
      ctx.lineTo(half * 0.4, half * 0.6);
      ctx.lineTo(half * 0.45, -half * 0.15);
      ctx.lineTo(half * 0.65, -half * 0.35);
      ctx.lineTo(half * 0.25, -half * 0.6);
      ctx.stroke();
      draw4PointStar(ctx, half * 0.5, -half * 0.5, 7, accentColor);
      break;

    case 'ShoppingBag':
      // Retail Fashion Shopping Bag
      ctx.lineWidth = 3.0;
      // Bag Body
      ctx.strokeRect(-half * 0.48, -half * 0.25, half * 0.96, half * 0.85);
      // Handles
      ctx.beginPath();
      ctx.arc(0, -half * 0.25, half * 0.25, Math.PI, 0, false);
      ctx.stroke();
      // Center Star Accent
      drawStar(ctx, 0, half * 0.18, 5, half * 0.18, half * 0.08, accentColor);
      break;

    case 'Dumbbell':
      // Heavy Gym Iron Dumbbell
      ctx.lineWidth = 3.2;
      // Center Handle
      ctx.beginPath();
      ctx.moveTo(-half * 0.45, 0);
      ctx.lineTo(half * 0.45, 0);
      ctx.stroke();

      // Left Plates
      ctx.strokeRect(-half * 0.58, -half * 0.45, half * 0.13, half * 0.9);
      ctx.strokeRect(-half * 0.72, -half * 0.35, half * 0.13, half * 0.7);

      // Right Plates
      ctx.strokeRect(half * 0.45, -half * 0.45, half * 0.13, half * 0.9);
      ctx.strokeRect(half * 0.59, -half * 0.35, half * 0.13, half * 0.7);

      // Center Grip detail
      ctx.fillStyle = accentColor;
      ctx.fillRect(-half * 0.15, -half * 0.06, half * 0.3, half * 0.12);
      break;

    case 'Hotel':
      // Grand Luxury Hotel Facade
      ctx.lineWidth = 3.0;
      // Main Building
      ctx.strokeRect(-half * 0.55, -half * 0.35, half * 1.1, half * 0.95);
      // Entrance Canopy
      ctx.beginPath();
      ctx.moveTo(-half * 0.25, half * 0.6);
      ctx.lineTo(-half * 0.25, half * 0.25);
      ctx.lineTo(half * 0.25, half * 0.25);
      ctx.lineTo(half * 0.25, half * 0.6);
      ctx.stroke();
      // 3 Stars above hotel
      drawStar(ctx, 0, -half * 0.58, 5, 6, 3, accentColor);
      drawStar(ctx, -half * 0.3, -half * 0.58, 5, 5, 2.5, accentColor);
      drawStar(ctx, half * 0.3, -half * 0.58, 5, 5, 2.5, accentColor);
      break;

    case 'GraduationCap':
      // Academic Mortarboard Cap & Diploma
      ctx.lineWidth = 3.0;
      // Cap Diamond
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.55);
      ctx.lineTo(half * 0.65, -half * 0.25);
      ctx.lineTo(0, 0.05);
      ctx.lineTo(-half * 0.65, -half * 0.25);
      ctx.closePath();
      ctx.stroke();

      // Skull cap underneath
      ctx.beginPath();
      ctx.moveTo(-half * 0.38, -half * 0.08);
      ctx.lineTo(-half * 0.38, half * 0.28);
      ctx.quadraticCurveTo(0, half * 0.45, half * 0.38, half * 0.28);
      ctx.lineTo(half * 0.38, -half * 0.08);
      ctx.stroke();

      // Tassel
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.25);
      ctx.lineTo(half * 0.55, 0);
      ctx.lineTo(half * 0.55, half * 0.4);
      ctx.stroke();
      break;

    case 'Briefcase':
      // Executive Leather Briefcase
      ctx.lineWidth = 3.0;
      // Bag Box
      ctx.strokeRect(-half * 0.6, -half * 0.2, half * 1.2, half * 0.75);
      // Flap crease
      ctx.beginPath();
      ctx.moveTo(-half * 0.6, half * 0.1);
      ctx.lineTo(half * 0.6, half * 0.1);
      ctx.stroke();
      // Handle
      ctx.beginPath();
      ctx.arc(0, -half * 0.2, half * 0.2, Math.PI, 0, false);
      ctx.stroke();
      // Metallic Lock
      ctx.fillStyle = accentColor;
      ctx.fillRect(-half * 0.08, half * 0.04, half * 0.16, half * 0.12);
      break;

    case 'Truck':
      // Commercial Logistics & Cargo Truck
      ctx.lineWidth = 3.0;
      // Cargo Box
      ctx.strokeRect(-half * 0.65, -half * 0.4, half * 0.75, half * 0.65);
      // Cabin
      ctx.beginPath();
      ctx.moveTo(half * 0.1, -half * 0.15);
      ctx.lineTo(half * 0.35, -half * 0.15);
      ctx.lineTo(half * 0.55, 0.05);
      ctx.lineTo(half * 0.55, half * 0.25);
      ctx.lineTo(half * 0.1, half * 0.25);
      ctx.closePath();
      ctx.stroke();
      // Wheels
      ctx.beginPath();
      ctx.arc(-half * 0.35, half * 0.35, half * 0.13, 0, Math.PI * 2);
      ctx.arc(half * 0.35, half * 0.35, half * 0.13, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'HeartHandshake':
      // Partnership & Customer Service Handshake
      ctx.lineWidth = 3.0;
      // Heart Outline
      ctx.beginPath();
      ctx.moveTo(0, half * 0.55);
      ctx.bezierCurveTo(-half * 0.65, half * 0.2, -half * 0.65, -half * 0.45, -half * 0.25, -half * 0.45);
      ctx.bezierCurveTo(-half * 0.1, -half * 0.45, 0, -half * 0.2, 0, -half * 0.1);
      ctx.bezierCurveTo(0, -half * 0.2, half * 0.1, -half * 0.45, half * 0.25, -half * 0.45);
      ctx.bezierCurveTo(half * 0.65, -half * 0.45, half * 0.65, half * 0.2, 0, half * 0.55);
      ctx.stroke();
      // Inner Clasp
      drawStar(ctx, 0, 0, 5, 8, 4, accentColor);
      break;

    case 'BadgeCheck':
      // Quality Badge Rosette with Checkmark
      ctx.lineWidth = 3.0;
      // Circle Badge
      ctx.beginPath();
      ctx.arc(0, -half * 0.1, half * 0.45, 0, Math.PI * 2);
      ctx.stroke();
      // Ribbon tails
      ctx.beginPath();
      ctx.moveTo(-half * 0.2, half * 0.25);
      ctx.lineTo(-half * 0.35, half * 0.65);
      ctx.lineTo(-half * 0.15, half * 0.55);
      ctx.lineTo(0, half * 0.65);
      ctx.lineTo(half * 0.15, half * 0.55);
      ctx.lineTo(half * 0.35, half * 0.65);
      ctx.lineTo(half * 0.2, half * 0.25);
      ctx.stroke();
      // Inner Checkmark
      ctx.lineWidth = 3.6;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(-half * 0.18, -half * 0.1);
      ctx.lineTo(-half * 0.05, half * 0.05);
      ctx.lineTo(half * 0.2, -half * 0.2);
      ctx.stroke();
      break;

    case 'Smartphone':
      // Smart Mobile Phone with Touch Display
      ctx.lineWidth = 3.0;
      // Phone Body
      drawRoundRect(ctx, -half * 0.32, -half * 0.6, half * 0.64, half * 1.2, 10, false, true);
      // Screen inner line
      ctx.lineWidth = 1.8;
      drawRoundRect(ctx, -half * 0.26, -half * 0.48, half * 0.52, half * 0.95, 6, false, true);
      // Top speaker notch
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(-half * 0.08, -half * 0.54);
      ctx.lineTo(half * 0.08, -half * 0.54);
      ctx.stroke();
      // Star on display
      draw4PointStar(ctx, 0, 0, 8, accentColor);
      break;

    case 'Star':
      // 5-Point Radiant Gold Award Star Cluster
      drawStar(ctx, 0, 0, 5, half * 0.58, half * 0.26, accentColor);
      draw4PointStar(ctx, -half * 0.55, -half * 0.35, 7, color);
      draw4PointStar(ctx, half * 0.55, half * 0.25, 7, color);
      break;

    case 'Pizza':
      // Artisan Italian Pizza Slice with Crust, Melting Cheese & Pepperoni
      ctx.lineWidth = 3.0;
      // Crust Arc
      ctx.beginPath();
      ctx.arc(0, -half * 0.65, half * 0.65, Math.PI * 0.15, Math.PI * 0.85, false);
      ctx.stroke();
      // Slice Triangle Body
      ctx.beginPath();
      ctx.moveTo(-half * 0.55, -half * 0.35);
      ctx.lineTo(0, half * 0.65);
      ctx.lineTo(half * 0.55, -half * 0.35);
      ctx.closePath();
      ctx.stroke();
      // Pepperoni Dots
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(-half * 0.18, -half * 0.05, 5, 0, Math.PI * 2);
      ctx.arc(half * 0.18, -half * 0.12, 4.5, 0, Math.PI * 2);
      ctx.arc(0, half * 0.25, 4, 0, Math.PI * 2);
      ctx.fill();
      draw4PointStar(ctx, half * 0.45, -half * 0.55, 6, accentColor);
      break;

    case 'Burger':
      // Gourmet Burger with Sesame Bun, Patty & Melting Cheese
      ctx.lineWidth = 3.0;
      // Top Bun Dome
      ctx.beginPath();
      ctx.arc(0, -half * 0.15, half * 0.52, Math.PI, 0, false);
      ctx.closePath();
      ctx.stroke();
      // Patty Layer
      ctx.lineWidth = 4.0;
      ctx.beginPath();
      ctx.moveTo(-half * 0.52, half * 0.05);
      ctx.lineTo(half * 0.52, half * 0.05);
      ctx.stroke();
      // Cheese Slice Fold
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(-half * 0.45, half * 0.15);
      ctx.lineTo(0, half * 0.35);
      ctx.lineTo(half * 0.45, half * 0.15);
      ctx.stroke();
      // Bottom Bun
      ctx.strokeStyle = color;
      ctx.lineWidth = 3.0;
      drawRoundRect(ctx, -half * 0.48, half * 0.35, half * 0.96, half * 0.22, 6, false, true);
      break;

    case 'IceCream':
      // Waffle Cone Gelato & Swirl
      ctx.lineWidth = 3.0;
      // Cone Triangle
      ctx.beginPath();
      ctx.moveTo(-half * 0.35, 0);
      ctx.lineTo(0, half * 0.7);
      ctx.lineTo(half * 0.35, 0);
      ctx.closePath();
      ctx.stroke();
      // Waffle grid lines
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-half * 0.18, half * 0.15);
      ctx.lineTo(half * 0.18, half * 0.5);
      ctx.moveTo(half * 0.18, half * 0.15);
      ctx.lineTo(-half * 0.18, half * 0.5);
      ctx.stroke();
      // Scoop 1 & 2
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.arc(0, -half * 0.18, half * 0.38, Math.PI, 0, false);
      ctx.stroke();
      // Cherry / Star on top
      drawStar(ctx, 0, -half * 0.58, 5, 6, 3, accentColor);
      break;

    case 'Fish':
      // Fresh Seafood / Fish Silhouette
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(-half * 0.65, 0);
      ctx.quadraticCurveTo(-half * 0.2, -half * 0.55, half * 0.35, 0);
      ctx.lineTo(half * 0.65, -half * 0.35);
      ctx.lineTo(half * 0.52, 0);
      ctx.lineTo(half * 0.65, half * 0.35);
      ctx.lineTo(half * 0.35, 0);
      ctx.quadraticCurveTo(-half * 0.2, half * 0.55, -half * 0.65, 0);
      ctx.stroke();
      // Eye & Gills
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(-half * 0.42, -half * 0.08, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-half * 0.2, 0, half * 0.18, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();
      break;

    case 'Glasses':
      // Luxury Eyewear & Sunglasses
      ctx.lineWidth = 3.2;
      // Left Frame
      drawRoundRect(ctx, -half * 0.65, -half * 0.25, half * 0.55, half * 0.5, 8, false, true);
      // Right Frame
      drawRoundRect(ctx, half * 0.1, -half * 0.25, half * 0.55, half * 0.5, 8, false, true);
      // Bridge
      ctx.beginPath();
      ctx.moveTo(-half * 0.1, -half * 0.05);
      ctx.quadraticCurveTo(0, -half * 0.18, half * 0.1, -half * 0.05);
      ctx.stroke();
      // Temple arms
      ctx.beginPath();
      ctx.moveTo(-half * 0.65, -half * 0.15);
      ctx.lineTo(-half * 0.8, -half * 0.35);
      ctx.moveTo(half * 0.65, -half * 0.15);
      ctx.lineTo(half * 0.8, -half * 0.35);
      ctx.stroke();
      draw4PointStar(ctx, -half * 0.38, 0, 6, accentColor);
      break;

    case 'Eye':
      // Clinical Eye Ophthalmology & Laser
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(-half * 0.7, 0);
      ctx.quadraticCurveTo(0, -half * 0.55, half * 0.7, 0);
      ctx.quadraticCurveTo(0, half * 0.55, -half * 0.7, 0);
      ctx.closePath();
      ctx.stroke();
      // Iris & Pupil
      ctx.beginPath();
      ctx.arc(0, 0, half * 0.26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(0, 0, half * 0.12, 0, Math.PI * 2);
      ctx.fill();
      draw4PointStar(ctx, half * 0.55, -half * 0.45, 6, accentColor);
      break;

    case 'Plane':
      // Aviation Travel Jet Aircraft
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      // Fuselage
      ctx.moveTo(0, -half * 0.75);
      ctx.quadraticCurveTo(half * 0.15, -half * 0.2, half * 0.15, half * 0.35);
      // Right Wing
      ctx.lineTo(half * 0.75, half * 0.15);
      ctx.lineTo(half * 0.75, half * 0.3);
      ctx.lineTo(half * 0.15, half * 0.45);
      // Right Tail
      ctx.lineTo(half * 0.15, half * 0.65);
      ctx.lineTo(half * 0.35, half * 0.75);
      ctx.lineTo(half * 0.35, half * 0.85);
      ctx.lineTo(0, half * 0.75);
      // Left Tail
      ctx.lineTo(-half * 0.35, half * 0.85);
      ctx.lineTo(-half * 0.35, half * 0.75);
      ctx.lineTo(-half * 0.15, half * 0.65);
      // Left Wing
      ctx.lineTo(-half * 0.15, half * 0.45);
      ctx.lineTo(-half * 0.75, half * 0.3);
      ctx.lineTo(-half * 0.75, half * 0.15);
      ctx.lineTo(-half * 0.15, half * 0.35);
      ctx.quadraticCurveTo(-half * 0.15, -half * 0.2, 0, -half * 0.75);
      ctx.closePath();
      ctx.stroke();
      draw4PointStar(ctx, half * 0.55, -half * 0.55, 7, accentColor);
      break;

    case 'Camera':
      // Professional DSLR / Mirrorless Camera & Flash
      ctx.lineWidth = 3.0;
      // Camera Body
      drawRoundRect(ctx, -half * 0.65, -half * 0.3, half * 1.3, half * 0.85, 10, false, true);
      // Pentaprism Flash Top
      ctx.beginPath();
      ctx.moveTo(-half * 0.25, -half * 0.3);
      ctx.lineTo(-half * 0.15, -half * 0.55);
      ctx.lineTo(half * 0.15, -half * 0.55);
      ctx.lineTo(half * 0.25, -half * 0.3);
      ctx.closePath();
      ctx.stroke();
      // Big Lens
      ctx.beginPath();
      ctx.arc(0, half * 0.12, half * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(0, half * 0.12, half * 0.14, 0, Math.PI * 2);
      ctx.fill();
      draw4PointStar(ctx, half * 0.55, -half * 0.55, 7, accentColor);
      break;

    case 'Music':
      // Musical Clef / Beamed Eighth Notes
      ctx.lineWidth = 3.2;
      // Left Note Head
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(-half * 0.45, half * 0.4, half * 0.18, half * 0.14, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Right Note Head
      ctx.beginPath();
      ctx.ellipse(half * 0.25, half * 0.25, half * 0.18, half * 0.14, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Stems
      ctx.beginPath();
      ctx.moveTo(-half * 0.3, half * 0.4);
      ctx.lineTo(-half * 0.3, -half * 0.45);
      ctx.moveTo(half * 0.4, half * 0.25);
      ctx.lineTo(half * 0.4, -half * 0.6);
      ctx.stroke();
      // Beam
      ctx.lineWidth = 5.0;
      ctx.beginPath();
      ctx.moveTo(-half * 0.32, -half * 0.4);
      ctx.lineTo(half * 0.42, -half * 0.55);
      ctx.stroke();
      draw4PointStar(ctx, -half * 0.55, -half * 0.5, 7, accentColor);
      break;

    case 'Palette':
      // Artist Paint Palette & Brush
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.65);
      ctx.bezierCurveTo(half * 0.65, -half * 0.65, half * 0.75, half * 0.1, half * 0.5, half * 0.45);
      ctx.bezierCurveTo(half * 0.3, half * 0.7, -half * 0.2, half * 0.65, -half * 0.45, half * 0.45);
      ctx.bezierCurveTo(-half * 0.75, half * 0.2, -half * 0.75, -half * 0.4, 0, -half * 0.65);
      ctx.closePath();
      ctx.stroke();
      // Thumb hole
      ctx.beginPath();
      ctx.arc(half * 0.25, half * 0.25, half * 0.1, 0, Math.PI * 2);
      ctx.stroke();
      // Paint Drops
      ctx.fillStyle = accentColor;
      [-half * 0.35, -half * 0.15, 0.1].forEach((px, idx) => {
        ctx.beginPath();
        ctx.arc(px, -half * 0.35 + idx * 8, 4.5, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case 'Home':
      // Architecture Villa & Interior Home
      ctx.lineWidth = 3.0;
      // Roof Triangle
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.7);
      ctx.lineTo(half * 0.65, -half * 0.15);
      ctx.lineTo(-half * 0.65, -half * 0.15);
      ctx.closePath();
      ctx.stroke();
      // Building Walls
      ctx.strokeRect(-half * 0.52, -half * 0.15, half * 1.04, half * 0.8);
      // Door
      ctx.fillStyle = accentColor;
      ctx.fillRect(-half * 0.18, half * 0.2, half * 0.36, half * 0.45);
      break;

    case 'Key':
      // Vintage Golden Key / Automotive Key
      ctx.lineWidth = 3.2;
      // Key Head Ring
      ctx.beginPath();
      ctx.arc(-half * 0.35, 0, half * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      // Inner Star in head
      drawStar(ctx, -half * 0.35, 0, 4, 6, 3, accentColor);
      // Shaft
      ctx.beginPath();
      ctx.moveTo(-half * 0.05, 0);
      ctx.lineTo(half * 0.65, 0);
      // Teeth
      ctx.moveTo(half * 0.45, 0);
      ctx.lineTo(half * 0.45, half * 0.25);
      ctx.moveTo(half * 0.6, 0);
      ctx.lineTo(half * 0.6, half * 0.35);
      ctx.stroke();
      break;

    case 'Gift':
      // Luxury Present Box with Satin Ribbon & Bow
      ctx.lineWidth = 3.0;
      // Box Bottom
      ctx.strokeRect(-half * 0.5, -half * 0.1, half * 1.0, half * 0.7);
      // Box Lid
      ctx.strokeRect(-half * 0.55, -half * 0.3, half * 1.1, half * 0.2);
      // Vertical Ribbon
      ctx.fillStyle = accentColor;
      ctx.fillRect(-half * 0.1, -half * 0.3, half * 0.2, half * 0.9);
      // Bow
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.arc(-half * 0.2, -half * 0.45, half * 0.16, 0, Math.PI * 2);
      ctx.arc(half * 0.2, -half * 0.45, half * 0.16, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'Watch':
      // Chronograph Luxury Wristwatch
      ctx.lineWidth = 3.0;
      // Strap Top & Bottom
      ctx.strokeRect(-half * 0.22, -half * 0.75, half * 0.44, half * 0.4);
      ctx.strokeRect(-half * 0.22, half * 0.35, half * 0.44, half * 0.4);
      // Case Circle
      ctx.beginPath();
      ctx.arc(0, 0, half * 0.48, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
      // Hands
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -half * 0.26);
      ctx.moveTo(0, 0);
      ctx.lineTo(half * 0.2, 0);
      ctx.stroke();
      break;

    case 'Gem':
      // Brilliant Cut Faceted Diamond
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(-half * 0.45, -half * 0.4);
      ctx.lineTo(half * 0.45, -half * 0.4);
      ctx.lineTo(half * 0.65, -half * 0.1);
      ctx.lineTo(0, half * 0.65);
      ctx.lineTo(-half * 0.65, -half * 0.1);
      ctx.closePath();
      ctx.stroke();
      // Facet Lines
      ctx.beginPath();
      ctx.moveTo(-half * 0.25, -half * 0.4);
      ctx.lineTo(-half * 0.35, -half * 0.1);
      ctx.lineTo(0, half * 0.65);
      ctx.lineTo(half * 0.35, -half * 0.1);
      ctx.lineTo(half * 0.25, -half * 0.4);
      ctx.moveTo(-half * 0.65, -half * 0.1);
      ctx.lineTo(half * 0.65, -half * 0.1);
      ctx.stroke();
      draw4PointStar(ctx, half * 0.55, -half * 0.55, 9, accentColor);
      break;

    case 'Shield':
      // Heavy Armor Shield & Ceramic Coat
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.65);
      ctx.lineTo(half * 0.58, -half * 0.4);
      ctx.quadraticCurveTo(half * 0.58, half * 0.2, 0, half * 0.7);
      ctx.quadraticCurveTo(-half * 0.58, half * 0.2, -half * 0.58, -half * 0.4);
      ctx.closePath();
      ctx.stroke();
      // Inner Star
      drawStar(ctx, 0, 0, 5, half * 0.28, half * 0.12, accentColor);
      break;

    case 'Fuel':
      // Petrol Gas Pump & High Octane
      ctx.lineWidth = 3.0;
      // Pump Main Body
      drawRoundRect(ctx, -half * 0.45, -half * 0.55, half * 0.75, half * 1.2, 8, false, true);
      // Meter Display
      ctx.strokeRect(-half * 0.32, -half * 0.4, half * 0.5, half * 0.3);
      // Nozzle Hose
      ctx.beginPath();
      ctx.moveTo(half * 0.3, -half * 0.2);
      ctx.quadraticCurveTo(half * 0.65, -half * 0.1, half * 0.65, half * 0.25);
      ctx.lineTo(half * 0.5, half * 0.5);
      ctx.stroke();
      draw4PointStar(ctx, -half * 0.07, -half * 0.25, 6, accentColor);
      break;

    case 'BookOpen':
      // Open Education Book & Knowledge
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.25);
      ctx.quadraticCurveTo(-half * 0.35, -half * 0.5, -half * 0.65, -half * 0.4);
      ctx.lineTo(-half * 0.65, half * 0.4);
      ctx.quadraticCurveTo(-half * 0.35, half * 0.3, 0, half * 0.55);
      ctx.quadraticCurveTo(half * 0.35, half * 0.3, half * 0.65, half * 0.4);
      ctx.lineTo(half * 0.65, -half * 0.4);
      ctx.quadraticCurveTo(half * 0.35, -half * 0.5, 0, -half * 0.25);
      ctx.stroke();
      // Spine
      ctx.beginPath();
      ctx.moveTo(0, -half * 0.25);
      ctx.lineTo(0, half * 0.55);
      ctx.stroke();
      draw4PointStar(ctx, 0, -half * 0.55, 7, accentColor);
      break;

    case 'Laptop':
      // Modern Ultra-slim Laptop & Code
      ctx.lineWidth = 3.0;
      // Screen Lid
      drawRoundRect(ctx, -half * 0.55, -half * 0.55, half * 1.1, half * 0.75, 6, false, true);
      // Base Keyboard Deck
      ctx.beginPath();
      ctx.moveTo(-half * 0.75, half * 0.35);
      ctx.lineTo(half * 0.75, half * 0.35);
      ctx.lineTo(half * 0.65, half * 0.55);
      ctx.lineTo(-half * 0.65, half * 0.55);
      ctx.closePath();
      ctx.stroke();
      // Code brackets on screen
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('< / >', 0, -half * 0.18);
      break;

    default:
      // Star Sparkles Cluster
      drawStar(ctx, 0, 0, 5, half * 0.55, half * 0.25, accentColor);
      drawStar(ctx, -half * 0.55, -half * 0.35, 4, half * 0.25, half * 0.09, color);
      drawStar(ctx, half * 0.55, half * 0.25, 4, half * 0.22, half * 0.08, color);
      break;
  }

  ctx.restore();
}

function isDarkColor(colorHex: string): boolean {
  if (!colorHex) return false;
  let hex = colorHex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 135;
}

// Load image asynchronously
export function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn('Image failed to load:', src);
      resolve(null);
    };
    img.src = src;
  });
}

// Main Render Poster onto HTMLCanvasElement
export async function renderPosterToCanvas(
  canvas: HTMLCanvasElement,
  config: PosterConfig,
  scale = 1
): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore
    }
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const baseDims = getDimensionsForFormat(config.format);
  const width = baseDims.width * scale;
  const height = baseDims.height * scale;

  canvas.width = width;
  canvas.height = height;

  // Scale context for high-DPI rendering
  ctx.save();
  ctx.scale(scale, scale);

  const baseWidth = baseDims.width;
  const baseHeight = baseDims.height;

  // SPECIAL HANDLING: A3 / A4 Sheet with 4 mini copies (2x2 grid for mass printing & cutting)
  if (config.format === 'a3_quad' || config.format === 'a4_quad') {
    // 1. Render single unit on offscreen canvas in A4 format with matching scale for high-DPI
    const singleCanvas = document.createElement('canvas');
    await renderPosterToCanvas(singleCanvas, { ...config, format: 'a4' }, Math.max(scale, 1.5));

    // 2. Draw sheet background (clean print paper)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // Subtle paper edge border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, baseWidth - 12, baseHeight - 12);

    // 3. Grid Coordinates
    const margin = 16;
    const gap = 16;
    const cardW = (baseWidth - (2 * margin) - gap) / 2; // 400px
    const cardH = (baseHeight - (2 * margin) - gap) / 2; // 576px

    const positions = [
      { col: 0, row: 0, x: margin, y: margin },
      { col: 1, row: 0, x: margin + cardW + gap, y: margin },
      { col: 0, row: 1, x: margin, y: margin + cardH + gap },
      { col: 1, row: 1, x: margin + cardW + gap, y: margin + cardH + gap },
    ];

    // 4. Draw each of the 4 cards
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];

      // Card shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = '#ffffff';
      drawRoundRect(ctx, pos.x, pos.y, cardW, cardH, 12, true, false);
      ctx.shadowColor = 'transparent';

      // Draw poster content inside card
      ctx.save();
      drawRoundRect(ctx, pos.x, pos.y, cardW, cardH, 12, false, false);
      ctx.clip();
      ctx.drawImage(singleCanvas, 0, 0, singleCanvas.width, singleCanvas.height, pos.x, pos.y, cardW, cardH);
      ctx.restore();

      // Card outline
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 1.2;
      drawRoundRect(ctx, pos.x, pos.y, cardW, cardH, 12, false, true);

      // Card Number Badge
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      drawRoundRect(ctx, pos.x + cardW - 32, pos.y + 8, 24, 20, 6, true, false);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, pos.x + cardW - 20, pos.y + 18);
    }

    // 5. Professional Cutting Lines & Crop Marks
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);

    // Center Vertical Line
    const centerX = baseWidth / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, 10);
    ctx.lineTo(centerX, baseHeight - 10);
    ctx.stroke();

    // Center Horizontal Line
    const centerY = baseHeight / 2;
    ctx.beginPath();
    ctx.moveTo(10, centerY);
    ctx.lineTo(baseWidth - 10, centerY);
    ctx.stroke();

    ctx.setLineDash([]); // Reset dash

    // 6. Central Scissor Cutting Badge
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#334155';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✂', centerX, centerY);

    // 7. Corner Crop Marks (Standard Printer L-marks)
    const corners = [
      [[4, 16], [16, 16], [16, 4]],
      [[baseWidth - 4, 16], [baseWidth - 16, 16], [baseWidth - 16, 4]],
      [[4, baseHeight - 16], [16, baseHeight - 16], [16, baseHeight - 4]],
      [[baseWidth - 4, baseHeight - 16], [baseWidth - 16, baseHeight - 16], [baseWidth - 16, baseHeight - 4]],
    ];

    corners.forEach((pts) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      ctx.lineTo(pts[1][0], pts[1][1]);
      ctx.lineTo(pts[2][0], pts[2][1]);
      ctx.stroke();
    });

    ctx.restore();
    return;
  }

  // 1. Background Fill
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, baseWidth, baseHeight);

  // 2. Background Texture
  if (config.bgTexture === 'paper') {
    // Subtle paper grain
    ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
    for (let i = 0; i < 4000; i++) {
      const rx = (Math.sin(i * 997) * 0.5 + 0.5) * baseWidth;
      const ry = (Math.cos(i * 1031) * 0.5 + 0.5) * baseHeight;
      ctx.fillRect(rx, ry, 1.5, 1.5);
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 2000; i++) {
      const rx = (Math.sin(i * 613) * 0.5 + 0.5) * baseWidth;
      const ry = (Math.cos(i * 709) * 0.5 + 0.5) * baseHeight;
      ctx.fillRect(rx, ry, 2, 2);
    }
  } else if (config.bgTexture === 'noise') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let i = 0; i < 3000; i++) {
      const rx = (Math.sin(i * 443) * 0.5 + 0.5) * baseWidth;
      const ry = (Math.cos(i * 887) * 0.5 + 0.5) * baseHeight;
      ctx.fillRect(rx, ry, 1.5, 1.5);
    }
  } else if (config.bgTexture === 'gradient') {
    const radialGrad = ctx.createRadialGradient(
      baseWidth / 2,
      baseHeight * 0.45,
      50,
      baseWidth / 2,
      baseHeight * 0.45,
      baseWidth * 0.8
    );
    radialGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
    radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, baseWidth, baseHeight);
  } else if (config.bgTexture === 'dots') {
    ctx.fillStyle = 'rgba(150, 150, 150, 0.08)';
    const spacing = 30;
    for (let x = 20; x < baseWidth; x += spacing) {
      for (let y = 20; y < baseHeight; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 3. Decorative Outer Borders
  if (config.borderStyle === 'thin-gold') {
    ctx.strokeStyle = config.accentColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, baseWidth - 40, baseHeight - 40);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.strokeRect(26, 26, baseWidth - 52, baseHeight - 52);
  } else if (config.borderStyle === 'double-frame') {
    ctx.strokeStyle = config.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, baseWidth - 44, baseHeight - 44);
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, baseWidth - 60, baseHeight - 60);

    // Corner diamond accents
    const corners = [
      [22, 22],
      [baseWidth - 22, 22],
      [22, baseHeight - 22],
      [baseWidth - 22, baseHeight - 22]
    ];
    ctx.fillStyle = config.accentColor;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (config.borderStyle === 'ornament-corners') {
    const cornerSize = 45;
    ctx.strokeStyle = config.accentColor;
    ctx.lineWidth = 3;
    // Top Left
    ctx.beginPath();
    ctx.moveTo(25, 25 + cornerSize);
    ctx.lineTo(25, 25);
    ctx.lineTo(25 + cornerSize, 25);
    ctx.stroke();
    // Top Right
    ctx.beginPath();
    ctx.moveTo(baseWidth - 25 - cornerSize, 25);
    ctx.lineTo(baseWidth - 25, 25);
    ctx.lineTo(baseWidth - 25, 25 + cornerSize);
    ctx.stroke();
    // Bottom Left
    ctx.beginPath();
    ctx.moveTo(25, baseHeight - 25 - cornerSize);
    ctx.lineTo(25, baseHeight - 25);
    ctx.lineTo(25 + cornerSize, baseHeight - 25);
    ctx.stroke();
    // Bottom Right
    ctx.beginPath();
    ctx.moveTo(baseWidth - 25 - cornerSize, baseHeight - 25);
    ctx.lineTo(baseWidth - 25, baseHeight - 25);
    ctx.lineTo(baseWidth - 25, baseHeight - 25 - cornerSize);
    ctx.stroke();
  }

  // 4. Footer Positioning
  const isLandscape = config.format === 'landscape' || config.format === 'a3_landscape' || config.format === 'a4_landscape';
  const isSquare = config.format === 'square' || config.format === 'badge';
  const footerHeight = config.showFooter ? (isSquare ? 110 : isLandscape ? 120 : 145) : 0;
  const footerY = baseHeight - footerHeight;

  if (isLandscape) {
    // -------------------------------------------------------------
    // DYNAMIC TWO-COLUMN FLOW (Landscape Layout - A3/A4 Landscape)
    // -------------------------------------------------------------
    const leftColWidth = baseWidth * 0.38;
    const leftColCenterX = leftColWidth / 2 + 25;
    const rightColStartX = leftColWidth + 35;
    const rightColWidth = baseWidth - rightColStartX - 35;
    const rightColCenterX = rightColStartX + rightColWidth / 2;
    const rightColMaxW = rightColWidth - 20;

    const availableRightHeight = footerY - 50;
    const lines = (config.mainText || '').split('\n').filter(l => l.trim().length > 0);
    const lineCount = Math.max(1, lines.length);

    const hasBadge = !!config.showGoogleBadge;
    const hasSubtitle = !!config.businessSubtitle;
    const hasActivityNumber = !!(config.activityNumber && config.activityNumber.trim() !== '');
    const hasLogo = (config.logoType === 'upload' && !!config.uploadedLogoDataUrl) || (config.logoType === 'icon' && !!config.selectedIcon);
    const hasSecondaryText = !!config.secondaryText;
    const isCar = config.selectedIcon === 'Car';

    // Measure raw estimated height for right column
    const rawRightH =
      (hasBadge ? 42 : 0) +
      46 +
      (hasSubtitle ? 26 : 0) +
      (hasActivityNumber ? 44 : 0) +
      (hasLogo ? (isCar ? 75 : 55) : 0) +
      (lineCount * 38) +
      48 + // stars
      (hasSecondaryText ? 28 : 0);

    const landscapeScale = Math.min(1.0, Math.max(0.65, availableRightHeight / Math.max(1, rawRightH)));

    const badgeH = Math.round(32 * landscapeScale);
    const badgeW = Math.round(230 * landscapeScale);
    const badgeSpacing = Math.round(10 * landscapeScale);
    
    const titleFontSize = Math.max(26, Math.round(42 * landscapeScale));
    const subtitleFontSize = Math.max(13, Math.round(16 * landscapeScale));
    
    const actPillH = Math.max(30, Math.round(38 * landscapeScale));
    const numFontSize = Math.max(16, Math.round(20 * landscapeScale));
    
    const iconBaseSize = isCar ? 85 : 60;
    const iconSize = Math.max(32, Math.round(iconBaseSize * (config.logoScale || 1) * landscapeScale));
    
    const mainFontSize = Math.max(19, Math.round(28 * landscapeScale));
    const starSize = Math.max(16, Math.round(22 * landscapeScale));
    const secFontSize = Math.max(13, Math.round(16 * landscapeScale));
    const rGap = Math.max(5, Math.round(10 * landscapeScale));

    // QR in left column: Perfectly proportioned (never oversized)
    const qrMaxTarget = Math.min(340, leftColWidth - 60, footerY - (config.showNfcBadge ? 100 : 50));
    const qrTargetSize = Math.max(180, Math.round(qrMaxTarget * (config.qrScale || 1.0)));
    const qrCenterY = (footerY - (config.showNfcBadge ? 25 : 0)) / 2;

    // Center the right column content vertically relative to QR
    const totalActualRightH =
      (hasBadge ? badgeH + badgeSpacing : 0) +
      titleFontSize +
      (hasSubtitle ? subtitleFontSize + rGap : 0) +
      (hasActivityNumber ? actPillH + rGap : 0) +
      (hasLogo ? iconSize + rGap : 0) +
      (lineCount * mainFontSize * 1.30) +
      (starSize * 2 + rGap) +
      (hasSecondaryText ? secFontSize + rGap : 0);

    let rightY = Math.max(25, Math.round((footerY - totalActualRightH) / 2));

    // Google Badge (Top Right)
    if (hasBadge) {
      const badgeX = rightColCenterX - badgeW / 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      drawRoundRect(ctx, badgeX, rightY, badgeW, badgeH, badgeH / 2, true, false);

      ctx.font = `bold ${Math.round(11.5 * landscapeScale)}px '${config.fontFamily}', sans-serif`;
      const bTextStr = 'تقييمات خرائط Google المعتمدة';
      const bTextW = ctx.measureText(bTextStr).width;
      const gW = 16 * landscapeScale;
      const bContentW = gW + 6 + bTextW;
      const bStartX = rightColCenterX - bContentW / 2;

      ctx.fillStyle = '#4285F4';
      ctx.font = `bold ${Math.round(14 * landscapeScale)}px Arial`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('G', bStartX, rightY + badgeH / 2);

      ctx.fillStyle = '#1e293b';
      ctx.font = `bold ${Math.round(11.5 * landscapeScale)}px '${config.fontFamily}', sans-serif`;
      ctx.fillText(bTextStr, bStartX + gW + 6, rightY + badgeH / 2);

      rightY += badgeH + badgeSpacing;
    }

    // Business Name (Arabic)
    ctx.fillStyle = config.textColor;
    ctx.font = `900 ${titleFontSize}px '${config.fontFamily}', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const titleText = config.businessName || 'اسم النشاط التجاري';
    const measured = ctx.measureText(titleText);
    let finalTitleSize = titleFontSize;
    if (measured.width > rightColMaxW) {
      finalTitleSize = Math.max(22, Math.floor(titleFontSize * (rightColMaxW / measured.width)));
      ctx.font = `900 ${finalTitleSize}px '${config.fontFamily}', sans-serif`;
    }
    ctx.fillText(titleText, rightColCenterX, rightY);
    rightY += finalTitleSize * 0.95 + Math.round(rGap * 0.7);

    // Business Subtitle
    if (hasSubtitle && config.businessSubtitle) {
      ctx.font = `800 ${subtitleFontSize}px 'Outfit', 'Tajawal', sans-serif`;
      ctx.fillStyle = config.accentColor;
      ctx.letterSpacing = '1.5px';
      ctx.fillText(config.businessSubtitle.toUpperCase(), rightColCenterX, rightY);
      ctx.letterSpacing = '0px';
      rightY += subtitleFontSize + rGap;
    }

    // Official Business/Activity Code Badge (WhatsApp only icon)
    if (hasActivityNumber && config.activityNumber) {
      const cleanNum = config.activityNumber.trim();
      ctx.font = `900 ${numFontSize}px 'Outfit', 'Tajawal', sans-serif`;
      ctx.letterSpacing = '0px';
      const textW = ctx.measureText(cleanNum).width;

      const showWa = config.activityShowWhatsAppIcon !== false;
      const actIconSize = Math.round(22 * landscapeScale);
      const spacingBetween = showWa ? 10 : 0;
      const totalContentW = textW + spacingBetween + (showWa ? actIconSize : 0);
      const pillW = Math.max(160, totalContentW + Math.round(36 * landscapeScale));
      const pillX = rightColCenterX - pillW / 2;
      const pillCenterY = rightY + actPillH / 2;

      const isDarkTheme = isDarkColor(config.bgColor || '#ffffff');
      const badgeBg = isDarkTheme ? 'rgba(15, 23, 42, 0.94)' : 'rgba(255, 255, 255, 0.95)';
      const badgeText = isDarkTheme ? '#ffffff' : '#0f172a';

      ctx.fillStyle = badgeBg;
      ctx.strokeStyle = config.accentColor || '#e5a82e';
      ctx.lineWidth = 2.0;
      drawRoundRect(ctx, pillX, rightY, pillW, actPillH, actPillH / 2, true, true);

      let curX = rightColCenterX - totalContentW / 2;
      ctx.fillStyle = badgeText;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(cleanNum, curX, pillCenterY + 1);

      if (showWa) {
        curX += textW + spacingBetween;
        await drawWhatsAppIcon(ctx, curX + actIconSize / 2, pillCenterY, actIconSize);
      }

      rightY += actPillH + rGap;
    }

    // Logo / Category & Car Icon
    if (config.logoType === 'upload' && config.uploadedLogoDataUrl) {
      const logoImg = await loadImage(config.uploadedLogoDataUrl);
      if (logoImg) {
        const maxLogoW = 220 * (config.logoScale || 1) * landscapeScale;
        const maxLogoH = 75 * (config.logoScale || 1) * landscapeScale;
        let lw = logoImg.width;
        let lh = logoImg.height;
        const ratio = Math.min(maxLogoW / lw, maxLogoH / lh);
        lw = lw * ratio;
        lh = lh * ratio;
        ctx.drawImage(logoImg, rightColCenterX - lw / 2, rightY, lw, lh);
        rightY += lh + rGap;
      }
    } else if (config.logoType === 'icon' && config.selectedIcon) {
      drawCategoryIcon(
        ctx,
        config.selectedIcon,
        rightColCenterX,
        rightY + iconSize / 2,
        iconSize,
        config.textColor,
        config.accentColor
      );
      rightY += iconSize + rGap;
    }

    // Main Review Text
    ctx.fillStyle = config.textColor;
    ctx.font = `900 ${mainFontSize}px '${config.fontFamily}', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const lineHeight = mainFontSize * 1.30;
    for (const line of lines) {
      ctx.fillText(line, rightColCenterX, rightY, rightColMaxW);
      rightY += lineHeight;
    }

    // Stars Rating
    rightY += Math.round(rGap * 0.6);
    const starGap = Math.max(6, Math.round(10 * landscapeScale));
    const totalStarsWidth = (starSize * 2 * config.starCount) + (starGap * (config.starCount - 1));
    const startStarX = rightColCenterX - totalStarsWidth / 2 + starSize;
    for (let s = 0; s < config.starCount; s++) {
      const cx = startStarX + s * (starSize * 2 + starGap);
      drawStar(ctx, cx, rightY + starSize, 5, starSize, starSize * 0.48, config.accentColor);
    }
    rightY += starSize * 2 + Math.round(rGap * 0.7);

    // Secondary Text
    if (hasSecondaryText && config.secondaryText) {
      ctx.font = `600 ${secFontSize}px '${config.fontFamily}', sans-serif`;
      ctx.fillStyle = config.textColor;
      ctx.globalAlpha = 0.9;
      ctx.fillText(config.secondaryText, rightColCenterX, rightY, rightColMaxW);
      ctx.globalAlpha = 1.0;
    }

    // Draw QR Box in Left Column
    await drawStyledQrBox(ctx, config, leftColCenterX, qrCenterY, qrTargetSize);

    // NFC badge under QR in landscape
    if (config.showNfcBadge) {
      const nfcPillW = Math.min(260, qrTargetSize);
      const nfcPillH = 30;
      const nfcPillX = leftColCenterX - nfcPillW / 2;
      const nfcPillY = qrCenterY + qrTargetSize / 2 + 10;
      ctx.fillStyle = config.accentColor;
      drawRoundRect(ctx, nfcPillX, nfcPillY, nfcPillW, nfcPillH, 15, true, false);
      ctx.fillStyle = '#0f172a';
      ctx.font = `bold 12px '${config.fontFamily}', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(config.nfcText || 'امسح بالكاميرا أو مرر بطاقة NFC', leftColCenterX, nfcPillY + nfcPillH / 2);
    }

  } else {
    // -------------------------------------------------------------
    // DYNAMIC AUTO-BALANCED VERTICAL FLOW (Portrait A4, A3, A5, Square, Badge)
    // -------------------------------------------------------------
    const availableVerticalHeight = footerY - 40;
    
    // 1. Pre-calculate line breaks and elements
    const lines = (config.mainText || '').split('\n').filter(l => l.trim().length > 0);
    const lineCount = Math.max(1, lines.length);

    const hasBadge = !!config.showGoogleBadge;
    const hasSubtitle = !!config.businessSubtitle;
    const hasActivityNumber = !!(config.activityNumber && config.activityNumber.trim() !== '');
    const hasLogoOrIcon = (config.logoType === 'upload' && !!config.uploadedLogoDataUrl) || (config.logoType === 'icon' && !!config.selectedIcon);
    const hasSecondaryText = !!config.secondaryText;
    const hasNfcBadge = !!config.showNfcBadge;

    // Estimate base required height
    const baseEstimatedTextHeight =
      (hasBadge ? 44 : 0) +
      56 + // Title
      (hasSubtitle ? 28 : 0) +
      (hasActivityNumber ? 48 : 0) +
      (hasLogoOrIcon ? 80 : 0) +
      (lineCount * 44) + // Main text
      50 + // Stars
      (hasSecondaryText ? 32 : 0);

    // Dynamic Scale Factor based on available vertical space & format
    const targetTextBudget = isSquare ? availableVerticalHeight * 0.48 : availableVerticalHeight * 0.55;
    const scaleFactor = Math.min(1.0, Math.max(0.68, targetTextBudget / Math.max(1, baseEstimatedTextHeight)));

    // Scaled dynamic sizes
    const badgeW = Math.round(230 * scaleFactor);
    const badgeH = Math.round(34 * scaleFactor);
    
    const titleBaseSize = isSquare ? 40 : (baseHeight > 1150 ? 50 : 44);
    const titleFontSize = Math.max(26, Math.round(titleBaseSize * scaleFactor));
    
    const subtitleFontSize = Math.max(13, Math.round(17 * scaleFactor));
    const pillH = Math.max(34, Math.round(42 * scaleFactor));
    const numFontSize = Math.max(17, Math.round(23 * scaleFactor));
    
    const iconBaseSize = isSquare ? 58 : 72;
    const iconSize = Math.max(36, Math.round(iconBaseSize * (config.logoScale || 1.0) * scaleFactor));
    
    const mainBaseSize = isSquare ? 28 : 36;
    const mainFontSize = Math.max(20, Math.round(mainBaseSize * scaleFactor));
    
    const starSize = Math.max(17, Math.round(25 * scaleFactor));
    const starGap = Math.max(8, Math.round(12 * scaleFactor));
    
    const secondaryFontSize = Math.max(13, Math.round(17 * scaleFactor));
    
    const gap = Math.max(6, Math.round(13 * scaleFactor));

    let currentY = isSquare ? Math.round(32 * scaleFactor) : Math.round(46 * scaleFactor);

    // 1. Google Badge (Exact mathematical symmetry on center)
    if (hasBadge) {
      const badgeX = (baseWidth - badgeW) / 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      drawRoundRect(ctx, badgeX, currentY, badgeW, badgeH, badgeH / 2, true, false);

      ctx.font = `bold ${Math.round(12 * scaleFactor)}px '${config.fontFamily}', sans-serif`;
      const badgeTextStr = 'تقييمات خرائط Google المعتمدة';
      const badgeTextW = ctx.measureText(badgeTextStr).width;
      const gIconW = 18 * scaleFactor;
      const badgeContentW = gIconW + 7 + badgeTextW;
      const badgeStartX = (baseWidth - badgeContentW) / 2;

      ctx.fillStyle = '#4285F4';
      ctx.font = `bold ${Math.round(15 * scaleFactor)}px Arial`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('G', badgeStartX, currentY + badgeH / 2);

      ctx.fillStyle = '#1e293b';
      ctx.font = `bold ${Math.round(12 * scaleFactor)}px '${config.fontFamily}', sans-serif`;
      ctx.fillText(badgeTextStr, badgeStartX + gIconW + 7, currentY + badgeH / 2);

      currentY += badgeH + gap;
    }

    // 2. Business Title (Perfect Center)
    ctx.fillStyle = config.textColor;
    ctx.font = `900 ${titleFontSize}px '${config.fontFamily}', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const maxTitleWidth = baseWidth - 100;
    const titleText = config.businessName || 'اسم النشاط التجاري';
    const measuredTitle = ctx.measureText(titleText);
    let finalTitleFontSize = titleFontSize;
    if (measuredTitle.width > maxTitleWidth) {
      finalTitleFontSize = Math.max(22, Math.floor(titleFontSize * (maxTitleWidth / measuredTitle.width)));
      ctx.font = `900 ${finalTitleFontSize}px '${config.fontFamily}', sans-serif`;
    }
    ctx.fillText(titleText, baseWidth / 2, currentY);
    currentY += finalTitleFontSize * 0.95 + Math.round(gap * 0.7);

    // 3. Business Subtitle (Perfect Center)
    if (hasSubtitle && config.businessSubtitle) {
      ctx.font = `800 ${subtitleFontSize}px 'Outfit', 'Tajawal', sans-serif`;
      ctx.fillStyle = config.accentColor;
      ctx.letterSpacing = '1.5px';
      ctx.fillText(config.businessSubtitle.toUpperCase(), baseWidth / 2, currentY);
      ctx.letterSpacing = '0px';
      currentY += subtitleFontSize + gap;
    }

    // 4. Activity Number / Phone Pill (Perfect Center, WhatsApp Icon Only)
    if (hasActivityNumber && config.activityNumber) {
      const cleanNum = config.activityNumber.trim();
      ctx.font = `900 ${numFontSize}px 'Outfit', 'Cairo', 'Tajawal', sans-serif`;
      ctx.letterSpacing = '0px';
      const textW = ctx.measureText(cleanNum).width;
      
      const showWa = config.activityShowWhatsAppIcon !== false;
      const actIconSize = Math.round(25 * scaleFactor);
      const spacingBetween = showWa ? 10 : 0;
      
      const totalContentW = textW + spacingBetween + (showWa ? actIconSize : 0);
      const pillW = Math.max(170, totalContentW + Math.round(38 * scaleFactor));
      const pillX = (baseWidth - pillW) / 2;
      const pillCenterY = currentY + pillH / 2;

      // Theme-adaptive background
      const isDarkTheme = isDarkColor(config.bgColor || '#ffffff');
      const badgeBg = isDarkTheme ? 'rgba(15, 23, 42, 0.94)' : 'rgba(255, 255, 255, 0.95)';
      const badgeText = isDarkTheme ? '#ffffff' : '#0f172a';

      ctx.fillStyle = badgeBg;
      ctx.strokeStyle = config.accentColor || '#e5a82e';
      ctx.lineWidth = 2.0;
      drawRoundRect(ctx, pillX, currentY, pillW, pillH, pillH / 2, true, true);

      let curX = (baseWidth - totalContentW) / 2;
      ctx.fillStyle = badgeText;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(cleanNum, curX, pillCenterY + 1);

      if (showWa) {
        curX += textW + spacingBetween;
        await drawWhatsAppIcon(ctx, curX + actIconSize / 2, pillCenterY, actIconSize);
      }

      currentY += pillH + gap;
    }

    // 5. Logo / Icon (Perfect Center)
    if (config.logoType === 'upload' && config.uploadedLogoDataUrl) {
      const logoImg = await loadImage(config.uploadedLogoDataUrl);
      if (logoImg) {
        const maxLogoW = (isSquare ? 190 : 240) * (config.logoScale || 1) * scaleFactor;
        const maxLogoH = (isSquare ? 70 : 90) * (config.logoScale || 1) * scaleFactor;
        let lw = logoImg.width;
        let lh = logoImg.height;
        const ratio = Math.min(maxLogoW / lw, maxLogoH / lh);
        lw = lw * ratio;
        lh = lh * ratio;
        ctx.drawImage(logoImg, (baseWidth - lw) / 2, currentY, lw, lh);
        currentY += lh + gap;
      }
    } else if (config.logoType === 'icon' && config.selectedIcon) {
      drawCategoryIcon(
        ctx,
        config.selectedIcon,
        baseWidth / 2,
        currentY + iconSize / 2,
        iconSize,
        config.textColor,
        config.accentColor
      );
      currentY += iconSize + gap;
    }

    // 6. Main Review CTA Text (Perfect Center)
    ctx.fillStyle = config.textColor;
    ctx.font = `bold ${mainFontSize}px '${config.fontFamily}', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const lineHeight = mainFontSize * 1.30;
    for (const line of lines) {
      ctx.fillText(line, baseWidth / 2, currentY, baseWidth - 80);
      currentY += lineHeight;
    }

    // 7. Stars Rating (Perfect Center)
    currentY += Math.round(gap * 0.6);
    const totalStarsWidth = (starSize * 2 * config.starCount) + (starGap * (config.starCount - 1));
    const startStarX = (baseWidth - totalStarsWidth) / 2 + starSize;
    for (let s = 0; s < config.starCount; s++) {
      const cx = startStarX + s * (starSize * 2 + starGap);
      drawStar(ctx, cx, currentY + starSize, 5, starSize, starSize * 0.48, config.accentColor);
    }
    currentY += starSize * 2 + Math.round(gap * 0.7);

    // 8. Secondary Slogan Subtext (Perfect Center)
    if (hasSecondaryText && config.secondaryText) {
      ctx.font = `500 ${secondaryFontSize}px '${config.fontFamily}', sans-serif`;
      ctx.fillStyle = config.textColor;
      ctx.globalAlpha = 0.90;
      ctx.fillText(config.secondaryText, baseWidth / 2, currentY, baseWidth - 80);
      ctx.globalAlpha = 1.0;
      currentY += secondaryFontSize + gap + 4;
    }

    // 9. QR Code Box & Guarantee of Non-Overlapping Position
    const nfcReservedHeight = hasNfcBadge ? 44 : 0;
    const remainingSpaceForQr = footerY - currentY - nfcReservedHeight - 16;
    
    const qrBaseMax = isSquare ? 260 : (baseHeight > 1150 ? 360 : 310);
    const qrTargetSize = Math.max(140, Math.min(baseWidth - 120, Math.min(qrBaseMax * (config.qrScale || 1.0), remainingSpaceForQr)));
    
    // Center the QR in the actual remaining space below the texts
    const qrCenterY = currentY + 8 + (remainingSpaceForQr - nfcReservedHeight) / 2;

    await drawStyledQrBox(ctx, config, baseWidth / 2, qrCenterY, qrTargetSize);

    // 10. NFC Badge strictly below QR
    if (hasNfcBadge) {
      const nfcPillW = Math.min(270, qrTargetSize);
      const nfcPillH = 30;
      const nfcPillX = (baseWidth - nfcPillW) / 2;
      const nfcPillY = qrCenterY + qrTargetSize / 2 + 8;
      ctx.fillStyle = config.accentColor;
      drawRoundRect(ctx, nfcPillX, nfcPillY, nfcPillW, nfcPillH, 15, true, false);
      ctx.fillStyle = '#0f172a';
      ctx.font = `bold 12px '${config.fontFamily}', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(config.nfcText || 'امسح بالكاميرا أو مرر بطاقة NFC', baseWidth / 2, nfcPillY + nfcPillH / 2);
    }
  }

  // 13. Footer Section (Branding & Contact - Dalilak Official Format)
  if (config.showFooter && footerHeight > 0) {
    // Footer Background (Deep Dark Slate / Navy)
    ctx.fillStyle = config.footerBgColor || '#070d18';
    ctx.fillRect(0, footerY, baseWidth, footerHeight);

    // Accent line at top of footer (Crisp Golden Bar)
    ctx.fillStyle = config.footerAccentColor || '#e5a82e';
    ctx.fillRect(0, footerY, baseWidth, 4);

    const footerContentCenterY = footerY + footerHeight / 2 + 2;

    // Fixed Dalilak Official Phone Number: Always 01556221141
    const phoneToDisplay = '01556221141';

    // Left Side: Phone / Contact Pill with Gold Outline (WhatsApp icon only)
    const iconSize = 30;
    const fontSize = isLandscape ? 24 : 25;
    ctx.font = `900 ${fontSize}px 'Outfit', 'Tajawal', Arial, sans-serif`;
    const textMetrics = ctx.measureText(phoneToDisplay);
    const textWidth = textMetrics.width;

    // Snug, compact and perfectly balanced pill dimensions
    const padX = 14;
    const iconTextGap = 8;
    const phonePillW = Math.round(textWidth + iconSize + iconTextGap + padX * 2);
    const phonePillH = isLandscape ? 40 : 42;
    const phonePillX = 30;
    const phonePillY = footerContentCenterY - phonePillH / 2;

    // Golden Pill Outline
    ctx.strokeStyle = config.footerAccentColor || '#e5a82e';
    ctx.lineWidth = 2.0;
    drawRoundRect(ctx, phonePillX, phonePillY, phonePillW, phonePillH, phonePillH / 2, false, true);

    // WhatsApp Icon (Placed cleanly inside right side of pill)
    const iconCenterX = phonePillX + phonePillW - padX - iconSize / 2;
    await drawWhatsAppIcon(ctx, iconCenterX, footerContentCenterY, iconSize);

    // Phone Number Text (Enlarged, crisp & bold typography)
    const textCenterX = phonePillX + padX + textWidth / 2;
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 ${fontSize}px 'Outfit', 'Tajawal', Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(phoneToDisplay, textCenterX, footerContentCenterY);

    // Right Side: Dalilak Official Branding & Golden Pin Lockup (Exact Reference match)
    if (config.showDalilakBranding) {
      const badgeSize = isLandscape ? 60 : isSquare ? 58 : 66;
      const badgeX = baseWidth - 32 - badgeSize;
      const badgeY = footerContentCenterY - badgeSize / 2 - (isLandscape ? 2 : 6);

      // 1. Draw Official Dalilak 3D App Icon Squircle
      drawDalilakSquircleBadge(ctx, badgeX, badgeY, badgeSize);

      // 2. Texts directly to the left of the icon
      const textEndX = badgeX - 16;
      const dalilakWord = config.dalilakText || 'دليلك';
      const dalilakSub = config.dalilakSubtext || 'المنصة الشاملة لإدارة وتوثيق الأنشطة والخدمات الميدانية';
      const websiteText = config.footerWebsite || 'www.dalilaak.com';

      // Top Line: "دليلك" (Fixed Official Brand Font - Cairo Bold 900)
      const topLineY = badgeY + (isLandscape ? 11 : 13);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = `900 ${isLandscape ? 24 : 27}px 'Cairo', 'Tajawal', sans-serif`;
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(dalilakWord, textEndX, topLineY);

      // Middle Line: Platform Description (Fixed Official Brand Typography)
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${isLandscape ? 13 : 13.5}px 'Tajawal', 'Cairo', sans-serif`;
      ctx.fillStyle = '#f1f5f9';
      const line1Y = topLineY + 22;
      ctx.fillText(dalilakSub, textEndX, line1Y);

      // Bottom Line: Enlarge Website URL (prominent, high-contrast, gold typography)
      const line2Y = line1Y + 22;
      ctx.save();
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = "900 18px 'Outfit', 'Tajawal', sans-serif";
      ctx.fillStyle = '#fbbf24';
      ctx.letterSpacing = '1.2px';
      ctx.fillText(websiteText, textEndX, line2Y);
      ctx.restore();
    }
  }

  ctx.restore();
}

// Export high resolution PNG (2x or 3x for 300 DPI print quality)
export async function generateHighResBlob(
  config: PosterConfig,
  scaleMultiplier = 3
): Promise<Blob | null> {
  const offscreen = document.createElement('canvas');
  await renderPosterToCanvas(offscreen, config, scaleMultiplier);
  return new Promise((resolve) => {
    offscreen.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
}
