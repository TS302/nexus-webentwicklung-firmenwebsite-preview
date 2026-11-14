# Übergabe · Nexus Website / Light Signal · Floating Glass

> **Historischer Stand:** Die aktuelle One-Page-Übergabe mit stabilen Marketing-Ankern, Testbefunden und Nora-Prüfliste steht in [`PAP-97-technical-handoff.md`](../PAP-97-technical-handoff.md). Dieses Dokument beschreibt den vorherigen Mehrseiten-Shell-Stand.

**Arbeitsstand:** lokale Vorschau, nicht veröffentlicht
**Technische Umsetzung:** PAP-63 / PAP-60
**Prüfdatum:** 2026-11-13

## Ergebnis

Die sieben lokalen HTML-Seiten verwenden jetzt eine gemeinsame, helle Shell mit semantischem Blau als Primärsignal. Die Hauptnavigation ist eine zusammenhängende, sticky Glas-Pill und bleibt beim Scrollen sichtbar. Auf Seiten mit mindestens drei echten Abschnittszielen erscheint ab 1440px eine beschriftete rechte Schnellnavigation, sobald sie außerhalb des Inhaltsrasters Platz hat; auf Kontakt, Impressum und Datenschutz wird sie gemäß Spezifikation nicht gerendert.

## Änderungen

- `styles.css` wurde als konsistente v4-Quelle neu strukturiert: `ink`, `text`, `paper`, `surface`, `signal-blue`, `mist-blue`, Fokus-Tokens, Glas-Fallback ohne Blur sowie Responsive-Regeln.
- Dark-Surface-CTAs verwenden jetzt helle Vordergrund-/Randfarben mit kontrastkonformen Hover-/Active-Zuständen; die Nummern dunkler QA-Karten verwenden `mist-blue` statt Signalblau.
- Header, Schnellnavigation und UI-Spezimen starten mit einem expliziten `rgb(255 255 255 / 0.96)`-Fallback und erhalten die translucent Glasfläche nur innerhalb eines `backdrop-filter`-Supports-Blocks. Die Schnellnavigation hält bei 1440px mindestens 1rem Abstand zum Viewportrand.
- Alle sieben Seiten und `nexus-vorschau-standalone.html` verwenden dieselbe Navigation, `meta description`, fokussierbares `main#main`, gemeinsame `styles.css`-/`site.js`-Quelle und die aktuelle interne Vorschaukennzeichnung.
- `site.js` ergänzt das mobile Menü für Viewports bis 900px: `aria-expanded`, öffnender Fokus auf den ersten Link, Escape-Schließen und Fokus-Rückgabe an den Menübutton. Linkklicks schließen das Menü; die Navigation wird nicht automatisch beim Scrollen ausgeblendet.
- Die rechte Schnellnavigation zeigt Abschnittsnummer und Abschnittsname, setzt `aria-current="location"` und aktualisiert den aktiven Abschnitt bei sichtbaren Zielen.
- Leistungszeilen verändern ihre Geometrie bei Hover nicht; Hover färbt nur die gleich große Fläche.
- Die Standalone-Datei enthält keinen veralteten eingebetteten v3-CSS-Abzweig mehr, sondern nutzt die gemeinsame lokale CSS-/JS-Quelle.
- `qa_preview.py` prüft zusätzlich Menübutton, `aria-expanded`, Escape-Fokus, die fokussierbare Skip-Link-Zielseite, vier Viewports (375/768/1024/1440), Rail-Ziele/Sichtbarkeit, Sticky-Verhalten, Reduced Motion, statische Kontrastpaare und den Glas-Fallback.

## Betroffene Seiten und Komponenten

- Shell: Preview-Banner, Skip-Link, Wortmarke, Floating-Glass-Navigation, mobile Disclosure und Footer auf allen sieben Seiten.
- Schnellnavigation: `index.html`, `leistungen.html`, `ablauf.html`, `ueber-nexus.html`.
- Startseite: Hero/UI-Spezimen, Angebot, Proof-Platzhalter, Prozess, Passung und Kontakt-CTA.
- Inhaltsseiten: Leistungszeilen, Prozess-Rail, Prinzipien, Statusflächen und Kontakt-/Rechtsplatzhalter.
- Gemeinsame Dateien: [`styles.css`](styles.css), [`site.js`](site.js), [`qa_preview.py`](../qa_preview.py).

## Testschritte und Befund

1. Server starten: `python3 -m http.server 8766 --directory pilot-website`.
2. Lokale Dateien über `http://127.0.0.1:8766/` öffnen.
3. `python3 qa_preview.py --base-url http://127.0.0.1:8766 --screenshot-dir .qa-screenshots` aus dem Projektverzeichnis ausführen, sobald Playwright/Chromium verfügbar ist.

Aktueller Befund:

- Statischer Shell-/Link-/Fragment-Check für sieben Seiten plus Standalone: **PASS**.
- Statischer CSS-/Kontrast-/Fallback-Check einschließlich Dark-CTA, QA-Kartennummer, Rail-Text und 1rem Rail-Inset: **PASS**.
- HTTP-Smoke-Test für zehn lokale HTML-/CSS-/JS-Dateien: **PASS**.
- `node --check pilot-website/site.js`: **PASS**.
- Browser-, Screenshot- und echter Tastaturtest: **NOT RUN**, weil in dieser Sandbox das Python-Modul `playwright` und ein Chromium-Binary fehlen. Dieser Befund ist offen und nicht als Browserfreigabe zu lesen.

## Bekannte Restpunkte

- Finale Markenfarbe, Logo, Schriftlizenz und verbindliche Tonalität sind nicht freigegeben.
- Die vorhandene Copy, Proof-Slots und Statusformulierungen bleiben synthetische Platzhalter.
- Kontaktweg, reale Kontaktdaten und Datenverarbeitung sind nicht freigegeben; es gibt bewusst kein Formular und keinen Versand.
- Impressum und Datenschutz sind rechtlich ungeprüfte Platzhalter.
- Die Standalone-Datei ist ein lokaler Startseiten-Einstieg mit gemeinsamer CSS-/JS-Quelle, keine vollständig eingebettete Ein-Datei-Auslieferung.

## Offene Entscheidungen

- Tessa: finale Navigations- und Abschnittsbezeichnungen.
- Mila: freigegebene Copy, Cases, Stimmen, Quellen und Rechte.
- Mara/CEO: Markenwerte, Logo, Bilder und spätere Preview-Banner-Entscheidung.
- Zuständige menschliche Stelle: Kontaktverarbeitung sowie rechtlich geprüfte Pflichtseiten.

## Nora soll prüfen

- Header-Pill bei 375px, 768px, 1024px und 1440px; Sticky-Verhalten nach mindestens zwei Viewporthöhen.
- Mobile Menübedienung per Tastatur, `aria-expanded`, Escape und Fokus-Rückgabe.
- Right-Rail-Sichtbarkeit erst ab funktionaler Desktopbreite, echte Ziel-IDs, `aria-current="location"` und keine Überdeckung von Inhalt/Fokus.
- Glas-Fallback ohne `backdrop-filter`, Kontrast/Fokus auf hellen und dunklen Flächen, Reduced Motion und 44px Touch-Ziele.
- Keine horizontale Überbreite, keine abgeschnittenen Banner-/Statushinweise, keine externen Requests und keine erfundenen Kontakt-/Proof-/Rechtsangaben.

**Empfohlene nächste Rolle:** Nora für unabhängige visuelle, responsive und barrierearme QA. Keine Veröffentlichung oder Kundenabnahme aus diesem Dokument ableiten.
