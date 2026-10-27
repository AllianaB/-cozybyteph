# CozyByte — Software & Web Solutions

A six-page static marketing website for a Philippines-based development studio. Includes a custom botanical computer mascot, a bracket-and-sprout SVG logo, subtle falling petals with a pause control and reduced-motion support, and three clearly labelled interactive concept projects.

## Stack and local development

Node.js 20+ and standard HTML, CSS and JavaScript. The repository was empty. A dependency-free static generator keeps this content-focused website portable, fast to build and straightforward to maintain. No framework runtime, tracking scripts, remote fonts or API secrets are shipped to the browser.

```sh
npm run build
npm run check
npx serve dist
```

The development server is optional; any static HTTP server that serves directory index files will work. Build output is `dist/`; edit `src.mjs`, `public/style.css` and `public/app.js`. The generator shares navigation, footer and metadata across all pages. `public/assets` contains the favicon, mascot and social image.

## Deployment

Deploy `dist/` to a static host after review. Use `npm run build` as the build command, `dist` as output, and Node.js 20+. No production deployment is automated. The Sites manifest identifies the saved Site and static output; it does not publish on its own. Do not enable deployment workflows until hosting and privacy details are approved.

Set `SITE_URL` to the real HTTPS origin (no path), then rebuild. Only then will canonical links, absolute Open Graph sharing assets, sitemap.xml and an indexable robots.txt be generated. Until a domain is confirmed, pages carry noindex/nofollow and robots.txt blocks indexing. Verify public-host access controls independently; robots directives are not access control.

## Contact form configuration

Delivery is disabled by default. The visible setup notice explains this and valid submissions show an honest not-sent message. Inputs are not stored locally. Never use a mail provider API key in browser code.

Configure `CONTACT_ENDPOINT` at build time with the HTTPS URL of a secure server-side enquiry handler, and rebuild. The endpoint URL is public; it must not contain a token or secret. The handler must:

- accept POST JSON fields `name`, `email`, `company`, `service`, `summary`, `budget`, `timeline` and honeypot `website`;
- validate field types and limits on the server, reject the honeypot, sanitize content and reject header injection;
- restrict CORS to the approved website origin, enforce request size limits and rate limits, and protect delivery against abuse;
- use server-side secrets for the mail provider; send only to the verified business inbox;
- return HTTP 2xx with `{"success":true}` only after accepting the enquiry for delivery; return an error status otherwise;
- disclose actual providers, retention and processing practices in the reviewed privacy notice, and avoid logging message bodies unnecessarily.

The UI handles validation, loading, a 15-second timeout, explicit success and network/service error states. A 2xx response without `success: true` is treated as failure. Confirm delivery in a real inbox before enabling the public form. No endpoint or business email has been supplied, so no production email integration is claimed.

## Content and privacy

All three portfolio entries — Bloom Studio, Littleleaf and Daylight — are fictional concept projects. Interactions do not create bookings, purchases or persistent task records. No employer/client assets, testimonials, client logos, personal biography, analytics or nonessential tracking are included.

The privacy notice is explicitly a draft. Before public launch, confirm the responsible business details where required, business inbox, actual hosting and form provider, applicable processing basis, storage, retention and rights-request process. Do not add unverified registration or certification claims.

## Verification

`npm run check` checks all generated pages, links, assets and anchors, one H1 per page, metadata, concept labelling, contact setup messaging, motion preference support and main text colour contrast (minimum 4.5:1). Browser review covers desktop, constrained mobile view, navigation, keyboard focus, FAQ, demo controls and contact validation. No real email is sent during tests.

## Artwork

`public/assets/mascot.webp` was created with the built-in image-generation tool and optimised to WebP. Brief: a cute sage-green retro computer with cream smiling screen, tiny feet, leaf antenna and pink sakura blossom, botanical island, restrained cherry blossom branch, warm ivory background, soft editorial gouache texture, forest/sage/sakura palette, no text. The social sharing image is derived from that asset. Logo and concept UI illustrations are original SVG/CSS.
