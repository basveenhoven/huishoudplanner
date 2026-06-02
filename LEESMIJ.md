# Huishoudplanner — installeerbare web-app (PWA)

Dit is je weekendplanner als installeerbare app. Eenmaal online gezet kun je hem
op je telefoon op het beginscherm zetten; daarna opent hij fullscreen met een eigen
icoon en werkt hij ook offline.

## Wat zit erin

- `index.html` — de app zelf
- `manifest.webmanifest` — naam, kleuren en iconen voor de installatie
- `service-worker.js` — zorgt dat de app offline blijft werken
- `icons/` — het app-icoon (192 en 512 px) + bron-SVG

## Belangrijk

Een PWA installeert alleen vanaf een echte `https://`-website, niet vanaf een los
bestand op je telefoon. Je moet de bestanden dus eerst online zetten. Twee opties:

### Optie A — GitHub Pages (gratis)

1. Maak een nieuwe repository aan op GitHub, bijvoorbeeld `huishoudplanner`.
2. Upload de hele inhoud van deze map (dus `index.html`, `manifest.webmanifest`,
   `service-worker.js` en de map `icons/`) naar de repository.
3. Ga in de repository naar Settings > Pages.
4. Kies bij "Source" de branch `main` en de map `/ (root)`. Klik Save.
5. Na een minuut staat je app op `https://<jouw-gebruikersnaam>.github.io/huishoudplanner/`.

### Optie B — Je eigen hosting

Upload de bestanden naar een map op je server (met behoud van de map `icons/`)
en open die map via `https://`.

## Op je telefoon installeren

- **iPhone (Safari):** open de URL, tik op het deel-icoon, kies
  "Zet op beginscherm".
- **Android (Chrome):** open de URL, tik op het menu (drie puntjes), kies
  "App installeren" of "Toevoegen aan startscherm".

## Goed om te weten

- Je gegevens worden lokaal op je telefoon bewaard (in de browseropslag van de app).
  Ze synchroniseren niet automatisch met je laptop.
- Werk je de app bij, verhoog dan `CACHE_NAME` in `service-worker.js` (bijv. naar
  `huishoudplanner-v2`), anders blijft de oude versie in de cache hangen.
