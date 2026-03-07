// ColinVisual.ts
// Visual rendering for Colin the space worm

// note that this file can be deleted at a later date since we should be using ColinVisual.tsx

import { ColinEntity } from "./ColinEntity";

/**
 * Draws Colin's visual representation on the canvas.
 * @param ctx CanvasRenderingContext2D
 * @param colin ColinEntity instance
 */
export function drawColinVisual(ctx: CanvasRenderingContext2D, colin: ColinEntity) {
  ctx.save();
  // Draw segments
  for (const seg of colin.segments) {
    ctx.beginPath();
    ctx.arc(seg.x, seg.y, seg.r, 0, 2 * Math.PI);
    ctx.fillStyle = colin.color;
    ctx.shadowColor = colin.color;
    ctx.shadowBlur = 12;
    ctx.globalAlpha = 0.95;
    ctx.fill();
  }
  // Draw face on the first segment
  const head = colin.segments[0];
  // Eyes
  ctx.beginPath();
  ctx.arc(head.x - 5, head.y - 5, 3, 0, 2 * Math.PI);
  ctx.arc(head.x + 5, head.y - 5, 3, 0, 2 * Math.PI);
  ctx.fillStyle = colin.eyeColor;
  ctx.globalAlpha = 1.0;
  ctx.shadowBlur = 0;
  ctx.fill();
  // Mouth
  ctx.beginPath();
  ctx.arc(head.x, head.y + 6, 7, 0, Math.PI, false);
  ctx.lineWidth = 2;
  ctx.strokeStyle = colin.mouthColor;
  ctx.stroke();
  // Teeth (simple triangles)
  ctx.beginPath();
  ctx.moveTo(head.x - 4, head.y + 6);
  ctx.lineTo(head.x - 2, head.y + 10);
  ctx.lineTo(head.x, head.y + 6);
  ctx.lineTo(head.x + 2, head.y + 10);
  ctx.lineTo(head.x + 4, head.y + 6);
  ctx.strokeStyle = colin.teethColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}
