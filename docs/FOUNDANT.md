# Foundant — Brand Foundations

Entry point: `foundant.html`. Buildless HTML, scoped stylesheet and plain JavaScript. No changes to the existing homepage or shared portfolio styles.

## Content map

- 1: introduction with animated wave lines.
- 2: six interactive dimensions using the user's replacement titles and descriptions.
- 3–6: six evidence rows; each expands into its corresponding opportunity and concept.
- 7, 12, 21, 24: chapter transitions.
- 8–11: foundations, photographic statements and the six-to-one connection diagram.
- 13–19: tensions, adapted four-step visitor journey, social channels, story structure, three photography critiques and animated questions.
- 20: intentionally omitted.
- 22–23: website initiative and animated six-month path. The three phase descriptions were read visually from slide 23 because PDF text extraction omitted them.
- 25–30: reflections, community statement, discussion, assessment caveats and closing. The five people in slide 29 follow the user’s requested order.
- 31: production notes, excluded as page content. Its general functions were implemented after the user explicitly requested applying these notes across sections; see the revision notes below.

The content remains in English. Figures are attributed to the supplied October 2026 assessment; they should not be read as live metrics. The 4,900+ figure and the deck's dated 6,347 snapshot are explicitly distinguished.

## Interactions

- Orbit: six photo faces, hover/focus labels, click selection and pause, accessible fixed dimension buttons, resume.
- Evidence: native keyboard-accessible details/summary disclosures and animated counters.
- Journey: four steps, previous/next controls, play/pause, stops at the end and when the document becomes hidden.
- Motion: global pause including the background video; system reduced-motion preference supported.
- Chapter navigation, reading progress, photographic word reveals, flowing connection lines, question highlights and roadmap light.

## Assets and provenance

- `fonts/Lato-Foundant.woff2`: the Lato font embedded in the user-provided journey HTML.
- `images/foundant/human-connection.webp`: edited from the supplied Frame 1707482386 photograph using the built-in image generation tool.
- `images/foundant/collaboration.jpg`, `support.jpg`, `expertise.jpg`, `success.jpg`, `community.jpg`: official Foundant photography from https://www.foundant.com/about/the-foundant-approach/ (2024/09 image directory).
- `videos/foundant-fluid.mp4`: the exact Webflow CDN video supplied in the request, used in the central motion element. No external video dependency at runtime.
- Logo shape and six dimension icons: inline SVG based on the supplied icon references.

### Image edit prompt

Edit this photograph for a website. Remove the cream knitted beanie from the man seated in the middle left and give him natural short dark hair. Change only his casual white t-shirt to a tasteful light cream collared casual shirt, a little less informal. Preserve both men's identities, facial features, pose, environment, framing, foreground plants and natural photographic texture. Add a very subtle green color grade while retaining natural colors. No text. Save the edited asset for use in the website project.

## Local review

Serve the repository root with a static server and open `/foundant.html`. There is no build step. Page assets are local, except the optional, user-opened Spotify player. The public destination can be `/foundant.html` under the existing site's normal deployment process. No production deployment, commit or push was performed.

## October 12 revision

The current published HTML was compared with the local file before editing; the two matched. The existing header and the user's other edits were retained.

- Restored the motion control and orbit resume control, resolving the JavaScript initialization failure that also disabled the journey.
- The orbit has a light center without its previous tagline. Its six selections retain the supplied descriptions.
- Replaced repeated editorial images with distinct, 2000-pixel stock photographs. Stock imagery is illustrative, not evidence of a Foundant event. The requested community photograph and the Summit 2024 photograph remain authentic Foundant assets; their available originals are only 388 × 238 and 476 × 317 pixels. No artificial upscaling was represented as recovered detail.
- Corrected the evidence-row alignment, small Compass snapshot note, humane interview wording, red/green comparison labels, line wrapping, and outside-in/planning caveats.
- The diagram uses measured SVG paths from the actual node boundaries, recalculated by ResizeObserver and after fonts load.
- The five supplied portraits appear once, in the requested order: Teresa, Kristin, Lauren, Allyson, Ann. The small screenshot portraits retain their original detail; larger originals would be needed for genuinely sharper close-ups.
- Slide 31 is now explicitly authorized as general functionality: section numbering, English synthesized narration with visible captions, light/dark theme, motion pause, back-to-top, and an optional Spotify player for “Glide.” The player is loaded only when opened; closing removes it. Spotify controls the actual track playback and account/region availability. No password gate was inferred from the ambiguous note about going to the top.
- A downloadable, editable 31-slide PowerPoint includes Andreia's introduction on slide 2 and a clickable portfolio link. Original slide 20 and production-notes slide 31 are omitted. Interactive content is expanded into static, readable sequences.

### Stock-image sources

The following image IDs are served by `https://images.unsplash.com/`; each was requested at width 2000 with quality 88. The filename-to-source mapping is:

| Local image | Unsplash image ID |
|---|---|
| editorial-01.jpg | photo-1521737711867-e3b97375f902 |
| editorial-02.jpg | photo-1522071820081-009f0129c71c |
| editorial-03.jpg | photo-1517245386807-bb43f82c33c4 |
| editorial-04.jpg | photo-1522202176988-66273c2fd55f |
| editorial-05.jpg | photo-1556761175-b413da4baf72 |
| editorial-06.jpg | photo-1517486808906-6ca8b3f04846 |
| editorial-07.jpg | photo-1531482615713-2afd69097998 |
| editorial-08.jpg | photo-1542744173-8e7e53415bb0 |
| editorial-09.jpg | photo-1552664730-d307ca884978 |
| editorial-10.jpg | photo-1556761175-5973dc0f32e7 |
| editorial-11.jpg | photo-1511632765486-a01980e01a18 |
| editorial-12.jpg | photo-1531206715517-5c0ba140b2b8 |
| editorial-13.jpg | photo-1529156069898-49953e39b3ac |
| editorial-14.jpg | photo-1515187029135-18ee286d815b |
| editorial-15.jpg | photo-1543269865-cbf427effbad |
| editorial-16.jpg | photo-1516321318423-f06f85e504b3 |
| editorial-17.jpg | photo-1497366754035-f200968a6e72 |
| editorial-18.jpg | photo-1551836022-d5d88e9218df |
| editorial-19.jpg | photo-1528605248644-14dd04022da1 |
| editorial-20.jpg | photo-1523240795612-9a054b0db644 |

### Validation and limits

JavaScript syntax checks passed. A DOM-stub behavior test verified all six dimension selections, resume, all four journey steps, previous/next boundaries, and motion pause. Static HTML checks found no missing local assets, repeated image files, or duplicate IDs. These checks do not substitute for a real browser layout test: browser automation was blocked by the tool's URL-security policy, and no alternative browser route was attempted.

All original 30 slide previews were rendered and visually reviewed. The PowerPoint package, geometry, requested Georgia/Lato font policy, and Artifact Tool reimport checks passed. The private builder, previews, and receipts are in the ignored `.foundant-build` directory. No production deployment, commit, or push was performed in this revision.

## October 13 additions

Navigation now labels 1 Strengths, 2 Opportunities, 3 Approach, and 4 Reflection. The video-story section ends with “Human stories need authenticity,” linking to the Vimeo URL explicitly supplied by the user. A success-measures section follows the six-month roadmap, using the supplied client clarity, team adoption, and brand consistency text. “For discussion” now uses the October 13 screenshot copy and two discussion prompts. The downloadable deck includes these revisions and has 31 slides; its finalizer receipt is `.foundant-build/validation-v3.json`.

## Latest page-only refinements

Removed the download control, narration, captions, and repeated section identifiers. Restored the requested center photograph in the story gallery and used distinct 2000px conversation/workshop photographs at its sides. Changed the center logo to #97D700, standardized portrait clipping, adjusted line breaks and labels, moved planning caveats below the team, and reduced the footer to the requested credit. The Spotify popup is removed. A native audio toggle is wired but disabled until a playable audio source is supplied. The two requested Magnific screenshots have not been substituted for clean originals, and the requested authentic collaboration photo is retained at its source resolution. The existing downloadable PowerPoint is retained on disk; it has not been regenerated for these page-only refinements.

The two clean full-resolution photographs supplied October 13 are now installed: `brand-system-team.png` in section 22, and `shared-practice.png` in section 26. Originals were copied without re-encoding or upscaling. The panoramic image retains its full composition; the conversation background favors the subject on the right.
