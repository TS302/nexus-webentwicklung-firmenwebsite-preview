# Nexus Website · lokale Vorschau

**Status: INTERNE VORSCHAU – NICHT VERÖFFENTLICHEN**

Der statische, synthetische Pilotstand setzt Leas Richtung **Light Signal / Floating Glass** um: helle Papierflächen, semantische Blautokens, eine sticky Glas-Pill-Navigation und eine dezente Desktop-Schnellnavigation. `index.html` ist die zentrale One-Page mit den stabilen Marketingzielen `#start`, `#leistungen`, `#ablauf`, `#ueber-nexus` und `#kontakt`. Die Vorschau ist eine lokale Arbeitsgrundlage – keine Marken-, Inhalts-, Rechts- oder Veröffentlichungsfreigabe.

**Visuelle Test-Vorschau:** [One-Page im HTML-Preview-Renderer öffnen](https://htmlpreview.github.io/?https://raw.githubusercontent.com/TS302/nexus-webentwicklung-firmenwebsite/c710a2efa98995af1dd2e7bf81966fb9e5e82e90/pilot-website/index.html) · externer Renderer für den Teststand, nicht die Produktionsdomain.

Die technische Übergabe mit Änderungen, Befunden, Restpunkten und Nora-Prüfliste liegt in [`PAP-97-technical-handoff.md`](../PAP-97-technical-handoff.md).

## Lokal starten

Die zentrale Vorschau kann direkt geöffnet werden:

```text
pilot-website/index.html
```

Die alternative Einstiegdatei `nexus-vorschau-standalone.html` verwendet dieselbe lokale `styles.css` und `site.js` und führt ebenfalls über stabile One-Page-Ziele. Die Pflichtseiten bleiben als separate, klar markierte Platzhalter erreichbar.

Für einen lokalen HTTP-Smoke-Test aus dem Projektverzeichnis:

```sh
cd pilot-website
python3 -m http.server 8080
```

Danach `http://127.0.0.1:8080/` öffnen. Der Server ist ausschließlich für die lokale Prüfung gedacht; es gibt kein Deployment und keine Veröffentlichung.

## Seiten und lokale Ziele

| Seite | Zweck |
| --- | --- |
| `index.html` | zentrale One-Page: Positionierung, Leistungen, Proof, Ablauf, Über Nexus und Kontaktstatus |
| `leistungen.html` | lokale Detail-/Migrationsansicht für Leistungsbausteine und Scope-Abgrenzung |
| `ablauf.html` | lokale Detail-/Migrationsansicht für vier Schritte und Prüfspur |
| `ueber-nexus.html` | lokale Detail-/Migrationsansicht für Arbeitsannahmen und offene Markenfragen |
| `kontakt.html#kontakt-status` | statischer Kontaktstatus ohne Formular oder Versand |
| `impressum.html` | rechtlich ungeprüfter Platzhalter |
| `datenschutz.html` | rechtlich ungeprüfter Platzhalter |

Die Hauptnavigation von `index.html` bleibt vollständig auf der One-Page; Impressum und Datenschutz sind die einzigen separaten Pflichtseiten in der Footer-Navigation. Detailseiten bleiben für die lokale Migration erreichbar und verweisen für Marketingziele zurück auf die stabilen One-Page-Anker. Es gibt keine externen Assets, Fonts, Tracker, `mailto:`-/Telefonlinks oder Netzwerkabhängigkeiten. `site.js` steuert ausschließlich das lokale Menü und die lokale Abschnittsmarkierung.

## Prüfschritte

Die reproduzierbare Prüfroutine liegt in [`qa_preview.py`](../qa_preview.py):

```sh
python3 qa_preview.py --base-url http://127.0.0.1:8766 --mode preview
```

Sie prüft die sieben lokalen Seiten bei 375px, 768px, 1024px und 1440px, die One-Page-Ziele, Shell-Semantik, Fokus, Touch-Ziele, horizontale Überbreite, Sticky-Header, Schnellnavigation, Reduced Motion, Browserfehler und externe Requests. Statische CSS-Prüfungen decken die Dark-Surface-Kontraste, den opaken Glas-Fallback und den sicheren Rail-Abstand ab. Der Browserlauf benötigt Playwright/Chromium. In der aktuellen Sandbox war das Python-Modul nicht installiert; deshalb ist der Browserbefund hier **NOT RUN** und nicht als bestanden zu verstehen.

Zusätzlich geprüft:

- statischer Shell-/Link-/Fragment-Check für sieben Seiten plus Standalone-Datei: **PASS**;
- One-Page-Struktur, fünf stabile Marketingziele und Hash-Navigation auf `index.html`: **PASS**;
- statische Dark-Surface-/Glas-Fallback-/Rail-Kontrastprüfung: **PASS**;
- HTTP-Smoke-Test für zehn lokale HTML-/CSS-/JS-Dateien: **PASS**;
- `node --check pilot-website/site.js`: **PASS**.

## Offene Freigaben

Vor Veröffentlichung oder verbindlicher Abnahme fehlen weiterhin: finales Logo und Markenwerte, fachlich freigegebene Copy, echte Cases oder Stimmen mit Quellen und Rechten, reale Kontaktdaten und ein geprüfter Kontaktweg, rechtlich geprüfte Fassungen von Impressum und Datenschutz sowie die separate menschliche Veröffentlichungsentscheidung.
