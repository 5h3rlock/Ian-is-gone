# Simple frontend image page

This is a static frontend-only page.

## Run locally

Because this is a static site, you can open `index.html` directly in your browser.
For a local server:

```bash
python3 -m http.server 5173
```

Then visit: `http://localhost:5173`

## Image file

Place your image file at the project root with this exact name:

`IMG-20260307-WA0000.jpg`

## Netlify deployment

1. Create a new Netlify site.
2. Set **Build command** to _empty_ (no build needed).
3. Set **Publish directory** to the project root (the folder containing `index.html`).

Alternatively, use Netlify Drop: drag the project folder into the deploy area.