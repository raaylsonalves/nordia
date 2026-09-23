# Wemotion: measured reference

Measured in the browser at 1280 × 720, 2026-09-22. Source: https://www.wemotionistanbul.com/.

The reference's opening uses Rethink Sans Semibold (identified in computed font-family), 116px display type. The BRANDS heading's rendered rectangle is x=198.22, y=52.97, w=454, h=151. Black text is rgb(0,0,0). The visible light-gray opening ground is sampled as #f0f0f0; body is transparent, so use the rendered section rather than body to measure it. The media is approximately 64% of the desktop viewport on entry and opens toward the viewport edge during scroll. Navigation is compact and unboxed.

Secondary heading: 64px, line-height 53.12px, rectangle x=19, y=327.09, w=454, h=159.33 in the sampled scrolled frame. Tight optical line-height makes the type read as a graphic unit. Body and small labels create strong scale contrast. Depth comes from media scale and overlapping type, not card shadows.

## Direction: connection in motion

- Raw palette: #f0f0f0 canvas, #000 text, #fff paper, #f74b01 Nordia accent, #585858 secondary text, #c8c8c8 rules.
- Semantic roles: canvas, surface, ink, muted, accent, line. One Rethink Sans family with 400 and 600 weights, locally hosted under its OFL license.
- Media corners remain square. Utility buttons are pill-shaped like the reference. No general-purpose elevated cards.
- Spacing: 4px rhythm, page edge 24-64px depending on viewport, section breaks 80-144px, title/description gaps 24-32px.
- Typography is imagery; offset lines establish the opening. The image sits centrally beneath the title and becomes the visual peak. Body copy remains in normal document flow.
- Functional mobile composition: smaller offset headline, full-width media, stacked illustrations, native details controls. No horizontal rail.

## Lab acceptance

The isolated `/design-lab.html` tested exact font size and color values before the home route changed. Its computed gray canvas was `rgb(240, 240, 240)`, ink `rgb(0, 0, 0)` and display size `116px` at 1280px. The production page adapts the proportions to Portuguese copy and uses the same font family with Nordia's own words and imagery. Pixel identity of content or Wemotion brand assets is not an acceptance criterion.

## Verification

- Desktop at 1280px: title, central image, about, capabilities, process, contact and footer checked visually; image scale increased from `.66` to approximately `.98` after 560px of scrolling.
- Mobile at 390px and 360px, tablet at 768px: no horizontal overflow. The menu closes after selecting a link; native service disclosures switch the open item; the movement control removes the image transform.
- Both generated images loaded, production build completed, and the browser showed no warning, error or framework overlay after the final configuration change.
