# Nexus Website · lokale Preview

**Status: INTERNE VORSCHAU – NICHT VERÖFFENTLICHEN**

`index.html` ist die einzige kanonische Marketingseite. Die durchgehende Lesespur nutzt die stabilen Anker `#start`, `#leistungen`, `#ablauf`, `#pakete`, `#referenzen`, `#faq`, `#ueber-nexus` und `#kontakt`; `#kontakt-status` bleibt der statische Unteranker ohne Datenübertragung. `impressum.html` und `datenschutz.html` sind die einzigen separaten Pflichtseiten und bleiben rechtlich ungeprüfte Platzhalter.

Die visuelle Richtung **Light Signal / Floating Glass** bleibt erhalten: Papierflächen, semantische Blautokens, schwebende Header-Shell, statische Unterstreichung und klare Touch-Ziele. Die Vorschau verwendet keine externen Assets, Fonts, Tracker, Formulare, `mailto:`- oder Telefonlinks.

## Lokal starten

```sh
cd pilot-website
python3 -m http.server 8766
```

Danach `http://127.0.0.1:8766/index.html` öffnen. Der Server ist ausschließlich für die lokale Prüfung gedacht. Die Legacy-Dateien `leistungen.html`, `ablauf.html`, `ueber-nexus.html` und `kontakt.html` sind noindex-Kompatibilitätsziele und führen auf die passenden One-Page-Anker zurück. `nexus-vorschau-standalone.html` bleibt ein technischer Redirect-Alias.

## Statische Prüfungen

```sh
node --check pilot-website/site.js
git diff --check
```

Der GitHub-Pages-Workflow liegt unter `.github/workflows/pages.yml`. Er baut ausschließlich den Inhalt von `pilot-website` im Preview-Repository auf `main`; ein Produktions-Repository ist nicht Bestandteil dieses Workflows.

## Browserprüfung

Der Workflow installiert Playwright/Chromium in CI und prüft die sieben echten Seiten bei 375, 768, 1024 und 1440 Pixeln. Geprüft werden unter anderem:

- acht kanonische Abschnitte und vollständige Hashnavigation;
- mobiles Menü, Fokus beim Öffnen, Escape-Rückgabe und Link-Schließen;
- sichtbarer Preview-Banner/Footerstatus, `noindex` und keine Legacy-Marketinglinks;
- horizontale Überbreite, Desktop-Schnellnavigation, `aria-current` und Reduced Motion;
- Browserkonsole, Page Errors, Request Failures und Screenshots.

Der lokale Browserlauf ist nur dann als PASS zu dokumentieren, wenn Playwright/Chromium in der Umgebung tatsächlich verfügbar ist. Eine nicht ausgeführte visuelle oder Tastaturprüfung bleibt **NOT RUN**.

## Offene Freigaben

Markenname und Logo, finale Zielgruppe/Region, fachlich bestätigte Bausteine und Pakete, echte Referenzen mit Quellen/Rechten, ein realer Kontaktweg sowie rechtlich geprüfte Fassungen von Impressum und Datenschutz sind weiterhin offen. Bis dahin bleiben Preview-Banner, Statuslabels, Platzhalter und `noindex,nofollow,noarchive` aktiv.
