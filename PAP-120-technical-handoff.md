# PAP-120 · Technische Übergabe der One-Page-Preview

**Status:** interne Preview-Arbeitsgrundlage · keine Produktion · keine Nora-QA

## Vorschau und betroffene Bereiche

- Kanonische Seite: `pilot-website/index.html`
- Gemeinsame Shell und Interaktionen: `pilot-website/styles.css`, `pilot-website/site.js`
- Separate Pflichtseiten: `pilot-website/impressum.html`, `pilot-website/datenschutz.html`
- Alte Marketingpfade als noindex-Kompatibilitätsziele: `leistungen.html`, `ablauf.html`, `ueber-nexus.html`, `kontakt.html`
- Technischer Einstieg/Alias: `nexus-vorschau-standalone.html`
- Pages-Workflow und Browserprüfung: `.github/workflows/pages.yml`, `.github/preview-browser-qa.mjs`

## Umgesetzt

- Eine kanonische One-Page mit acht semantischen Abschnitten: Start, Leistungen, Ablauf, Pakete, Konzeptarbeiten, FAQ, Über Nexus und Kontakt.
- `#proof` durch den kompatiblen Anker `#referenzen` für den sichtbaren Abschnitt „Konzeptarbeiten“ ersetzt; Pakete und FAQ als sichtbare Abschnitte ergänzt.
- Alle Marketingnavigationen, Inline-Links und Footer-Ziele auf die One-Page-Anker ausgerichtet; nur Impressum und Datenschutz bleiben separat.
- Mobiles Menü mit `aria-expanded`, Fokus beim Öffnen, Escape-Rückgabe und Link-Schließen beibehalten/geschärft.
- Aktive Hashroute über `aria-current="location"`; separate Rechtstexte verwenden `aria-current="page"` nur in ihrer Rechtliches-Navigation.
- Preview-Banner und Footer-Status sichtbar gemacht; `noindex,nofollow,noarchive` und Status-/Rechtehinweise erhalten.
- Floating-Glass-Richtung, Tokens, Typografie, Radius und reduzierte Bewegung erhalten; Desktop-Rail auf acht Ziele erweitert und vom Inhaltsraster abgerückt.
- Keine Formulare, Tracker, externen Assets oder erfundenen Kundenreferenzen ergänzt; die bestätigten Paketeinstiegspreise und Kontaktdaten stehen ausschließlich auf der kanonischen One-Page.

## Lokal nachvollziehbare Prüfung

```sh
cd pilot-website
python3 -m http.server 8766
```

Statisch:

```sh
node --check pilot-website/site.js
git diff --check
```

Der GitHub-Pages-Workflow prüft nach dem Preview-Deployment per Playwright die sieben echten Seiten bei 375, 768, 1024 und 1440 Pixeln. Der Workflow ist aktualisiert auf die acht Zielanker, neue CTA-Ziele, sichtbare Statusgates und die abgeschaltete Legacy-Marketingnavigation.

## Bekannte Restpunkte / offene Entscheidungen

- Der aktuelle Stand bleibt wegen ungeklärter Marken-, Zielgruppen-, Leistungs- und Rechtsfreigaben eine interne Preview.
- Paketkarten zeigen die bestätigten Einstiegspreise ab 790 €, 1.490 € und 2.490 €; der genaue Projektumfang bleibt abhängig von den Anforderungen.
- Konzeptarbeiten sind Arbeitsproben und keine Kundenreferenzen.
- Legacy-Dateien bleiben vorerst als noindex-Aliase für alte lokale Pfade bestehen; die spätere Entfernung ist eine separate technische Entscheidung.
- Ein lokaler Browserlauf gilt nur bei verfügbarer Playwright-/Chromium-Umgebung als PASS. Nicht ausgeführte visuelle, Fokus- oder Screenshot-Prüfungen bleiben NOT RUN.

## Punkte für eine spätere Prüfung

- Hashnavigation und Sticky-Offset an allen acht Abschnitten sowie `#kontakt-status`.
- Menü-Zustände, Tastaturfokus, Escape und sichtbare Fokus-Ringe bei 375/768/1024/1440 Pixeln.
- Keine horizontale Überbreite; Statusbanner und Footerstatus vollständig lesbar.
- Desktop-Rail außerhalb des Inhalts ohne Überdeckung; Reduced-Motion-Zustand.
- Preview-Schutz, fehlende externe Requests und getrennte Rechtstexte.

Diese Liste ist eine Übergabe der Prüfziele und kein unabhängiger Nora-QA-Lauf.
