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
- 25–30: reflections, community statement, discussion, assessment caveats and closing. Duplicate Allyson entries in slide 29 were consolidated.
- 31: production notes, excluded as page content. Music, password, narration and theme controls mentioned only inside the PDF were not treated as additional user instructions.

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

Serve the repository root with a static server and open `/foundant.html`. There is no build step. All page assets are local. The public destination can be `/foundant.html` under the existing site's normal deployment process. No production deployment, commit or push was performed.
