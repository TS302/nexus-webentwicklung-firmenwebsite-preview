# PAP-144 · Routen-Neutralisierung

## Scope-Entscheidung

Alle erreichbaren HTML-Routen des Preview-Repositories gehören zum sichtbaren Scope. Die vier Marketing-Aliase (`leistungen.html`, `ablauf.html`, `ueber-nexus.html`, `kontakt.html`) bleiben als noindex-Weiterleitungen auf die jeweiligen Abschnitte der Startseite bestehen, führen aber mit neutraler Copy und ohne interne Statussprache dorthin. `impressum.html` und `datenschutz.html` bleiben als rechtliche Zielseiten erhalten; ihre Angaben bleiben bis zur Ergänzung der vollständigen Unternehmens- und Datenschutzinformationen bewusst allgemein und enthalten keine erfundenen Daten. Der zusätzliche Standalone-Einstieg ist ebenfalls neutralisiert.

Die noindex-/nofollow-Sperre bleibt für die nichtöffentliche Vorschau erhalten. Es wurde kein Produktions-Release vorgenommen.

## Betroffene Routen und Komponenten

- Alias-Fallbacks: `leistungen.html`, `ablauf.html`, `ueber-nexus.html`, `kontakt.html`
- Rechtliche Zielseiten: `impressum.html`, `datenschutz.html`
- Weiterleitungs-Fallback: `nexus-vorschau-standalone.html`
- QA: `.github/preview-browser-qa.mjs` scannt jetzt Quelltext und gerenderte Copy aller ausgelieferten Routen auf interne Marker.

## Prüfung und Übergabe

- Statische HTML-, JavaScript- und Copy-Prüfungen sowie HTTP-Smoke-Tests für alle Routen ausführen.
- Pages-Workflow und gerenderte Preview nach dem Push prüfen.
- Nora prüft in einer lauffähigen Browserumgebung Screenshots, Tastaturfokus, Overflow/Clipping und `prefers-reduced-motion` für Startseite, Aliase und Rechtstexte.
- Offener Inhaltspunkt: Die vollständigen Impressums- und Datenschutzangaben müssen vor einem öffentlichen Release ergänzt und rechtlich geprüft werden.
