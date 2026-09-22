# Get Well Soon, Honey 🌸

A beautiful, animated "Get Well Soon" website made for Honey, built in a soft baby-pink theme.

## Features

- Baby-pink gradient background with drifting clouds and a spinning sun
- A randomized flower bouquet: a fresh arrangement blooms every time the page loads, with a button to pick new flowers on demand
- Falling flower petals across the whole page
- A cursive, shimmering title with Honey's name
- A short, personal note
- An interactive "Send Honey Some Love" button that bursts floating hearts
- Fully responsive, mobile-friendly layout
- Respects `prefers-reduced-motion` for accessibility

## Running locally

This is a static site, no build step required.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply open `index.html` directly in a browser.

## Files

- `index.html`: page markup and content
- `style.css`: theme, layout, and animations
- `script.js`: falling petals, the randomized bouquet, and the interactive love button
