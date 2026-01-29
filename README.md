# he's gone.com countdown

Single-page countdown site targeting **8:00 PM on February 4th (Europe/Dublin)**.

## Run locally

Because this is a static site, you can open `index.html` directly in your browser.
For a local server (recommended so scripts load consistently):

```bash
python3 -m http.server 5173
```

Then visit: `http://localhost:5173`

## Netlify deployment

1. Create a new Netlify site.
2. Set **Build command** to _empty_ (no build needed).
3. Set **Publish directory** to the project root (the folder containing `index.html`).

Alternatively, use Netlify Drop: drag the project folder into the deploy area.