# ericedstrom.com

Author site for [Eric Kent Edstrom](https://www.ericedstrom.com). Static [Astro](https://astro.build) build, meant for Cloudflare Pages before DNS cutover from Bluehost WordPress.

The visual design is new (clean, literary). Public URLs from the WordPress site are preserved.

## Preview locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Open the URL Astro prints (usually `http://localhost:4321/`).

```bash
npm run build    # writes static HTML to dist/
npm run preview  # serve dist/ locally
```

## Project structure

```
src/content/pages/     Markdown pages (newsletter, contact, Kit thank-yous, …)
src/content/books/     One Markdown file per book (cover, blurb, retailer links)
src/content.config.ts  Collection schemas
src/pages/index.astro  Home
src/pages/[...slug].astro  Routes every pages collection entry
src/components/        Header, footer, catalog cards, Kit embeds
public/_redirects      Cloudflare Pages redirects
public/images/         Map, covers, homepage art
```

Routes are trailing-slash URLs (`/buy-my-books/`, not `/buy-my-books`). `astro.config.mjs` sets `trailingSlash: 'always'` and `output: 'static'`. No Cloudflare adapter is required for a static site.

## Add a page

1. Create `src/content/pages/your-slug.md`.
2. Frontmatter:

   ```yaml
   ---
   title: Page title
   description: Used for the meta description.
   # optional:
   template: page          # page | catalog | map | form
   cover: /images/….jpg
   kit:
     type: landing         # or form
     id: "356631"
     uid: e97979a7ce       # required for type: form
   ---
   ```

3. Write the body in Markdown. The file `your-slug.md` becomes `/your-slug/`.
4. If the new path should redirect from a slashless URL on Cloudflare Pages, add a line to `public/_redirects`.

## Add a book

1. Create `src/content/books/short-slug.md`.
2. Frontmatter:

   ```yaml
   ---
   title: "Book title"
   series: starside-saga   # starside-saga | starside-tales | scion-chronicles | bigfoot-galaxy | sal-van-sleen
   seriesName: "Starside Saga"
   seriesOrder: 1          # sort order inside the series (0 = boxed set)
   catalogOrder: 2
   genres:
     - Fantasy
   price: "$0.99"          # optional
   cover: /images/covers/short-slug.jpg
   retailers:
     - name: Amazon
       url: https://www.amazon.com/dp/…
   ---
   ```

3. Put the short catalog blurb in the Markdown body.
4. Drop the cover image in `public/images/covers/`.

The catalog at `/buy-my-books/` reads this collection and groups by series. There are no per-book public routes in v1 (same as the WordPress catalog page).

## Kit forms (temporary)

Forms stay on Kit until the ESP migration (before November 2026). Do not invent replacement forms.

| Page | Kit object |
| --- | --- |
| `/free-starside-story/` | Form `776916` / uid `e97979a7ce` (`ck.5.js` HTML embed) |
| `/newsletter/` | Landing page `356631` (`CKJS4.js` + `api.kit.com/landing_pages/…/subscribe`) |
| `/free-starside-saga-ebook/` | Landing page `355116` |
| `/audiobook-notification-list/` | Landing page `366354` |

## Deploy to Cloudflare Pages

1. Connect this GitHub repo to Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Framework preset: Astro (or None — static output is enough)
5. `public/_redirects` is copied into `dist/` and applied by Pages.

Redirects included:

- `/contact` → `/contact-me/`
- `/got-it/` → `/thank-you/`
- `/newsletter-sign-up/` → `/newsletter/`
- slashless paths → trailing slash for the public routes

Do not change DNS, Bluehost, or Kit account settings from this repo.

## Notes

- Blog posts are out of scope for v1.
- `/starside-saga-synopses/` 404s on the live WordPress site; this repo ships a short placeholder so the URL exists.
- `/thank-you-for-supporting-your-libary/` keeps the live typo slug.
- Catalog retailer links were reconstructed from the live MyBookTable catalog (covers + blurbs from WordPress; Amazon / Books2Read / Smashwords where a public URL was known). Tighten individual store URLs in each book file when you have the exact listing.
