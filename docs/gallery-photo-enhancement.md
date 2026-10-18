# Gallery photo enhancement

Mode: built-in GPT image editing tool (`image_gen`), using the original supplied photo as the edit target for each of three separate edits. No API key or fallback CLI was used.

These are AI-enhanced interpretations for clarity, not exact recoveries of missing image detail. Some fine details may be reconstructed. Original photographs remain unchanged and are linked from the gallery viewer.

## Saved files

| Original                                         | Enhanced gallery asset                                    |
| ------------------------------------------------ | --------------------------------------------------------- |
| `public/images/gallery/ac-servicing.png`         | `public/images/gallery/ac-servicing-enhanced.png`         |
| `public/images/gallery/indoor-unit-cleaning.png` | `public/images/gallery/indoor-unit-cleaning-enhanced.png` |
| `public/images/gallery/our-technician.png`       | `public/images/gallery/our-technician-enhanced.png`       |

## Final prompt used for each photo

Use case: identity-preserve. Edit target: the supplied original photograph, not a style reference. Primary request: conservative photographic restoration to make this real technician photo clearer for a business gallery. Reduce haze, compression noise and mild camera blur; gently recover local contrast, natural color balance, fabric edges and visible AC/tool edges. Preserve exactly the same person, facial identity, face shape, expression, skin tone, age, body proportions, pose, striped blue shirt, cap, trousers, hands, tools, AC cleaning cover, room, background objects, cables, lighting direction and all composition. Preserve the original tall portrait aspect ratio, complete uncropped framing and black edge bars. Keep a realistic smartphone photograph, not an illustration or glossy advertising shot. Do not beautify, restyle, change the technician, reconstruct a new face, replace the background, change the scene or add text. Where details are genuinely obscured by blur, leave them gently soft rather than inventing new anatomy, lettering or equipment details. Output one enhanced version of this photograph.
