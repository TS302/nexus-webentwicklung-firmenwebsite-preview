# Nexus Website · lokale Vorschau

**Status: INTERNE VORSCHAU – NICHT VERÖFFENTLICHEN**

Der statische, synthetische Pilotstand setzt Leas Richtung **Light Signal / Floating Glass** um: helle Papierflächen, semantische Blautokens, eine sticky Glas-Pill-Navigation und eine dezente Desktop-Schnellnavigation. Die Vorschau ist eine lokale Arbeitsgrundlage – keine Marken-, Inhalts-, Rechts- oder Veröffentlichungsfreigabe.

## Lokal starten

Die Startseite kann direkt geöffnet werden:

```text
pilot-website/index.html
```

Die alternative Startseiten-Datei `nexus-vorschau-standalone.html` verwendet dieselbe lokale `styles.css` und `site.js` wie die Mehrseiten-Vorschau. Dadurch gibt es eine gemeinsame visuelle und interaktive Quelle statt eines veralteten eingebetteten CSS-Abzweigs.

Für einen lokalen HTTP-Smoke-Test aus dem Projektverzeichnis:

```sh
cd pilot-website
python3 -m http.server 8080
```

Danach `http://127.0.0.1:8080/` öffnen. Der Server ist ausschließlich für die lokale Prüfung gedacht; es gibt kein Deployment und keine Veröffentlichung.

## Seiten und lokale Ziele

| Seite | Zweck |
| --- | --- |
| `index.html` | Positionierung, UI-Spezimen, Leistungszeilen, Proof-Slots, Prozess und CTA |
| `leistungen.html` | Leistungsbausteine und Scope-Abgrenzung |
| `ablauf.html` | Vier Schritte und lokale Prüfspur |
| `ueber-nexus.html` | Arbeitsannahmen, Prinzipien und offene Markenfragen |
| `kontakt.html#kontakt-status` | statischer Kontaktstatus ohne Formular oder Versand |
| `impressum.html` | rechtlich ungeprüfter Platzhalter |
| `datenschutz.html` | rechtlich ungeprüfter Platzhalter |

Alle Ziele bleiben relativ und zeigen ausschließlich auf die sieben lokalen HTML-Seiten oder vorhandene Anker. Es gibt keine externen Assets, Fonts, Tracker, `mailto:`-/Telefonlinks oder Netzwerkabhängigkeiten. `site.js` steuert ausschließlich das lokale Menü und die lokale Abschnittsmarkierung.

## Prüfschritte

Die reproduzierbare Prüfroutine liegt in [`qa_preview.py`](../qa_preview.py):

```sh
python3 qa_preview.py --base-url http://127.0.0.1:8766 --screenshot-dir .qa-screenshots
```

Sie prüft die sieben Seiten bei 375px, 768px, 1024px und 1440px, lokale Ziele, Shell-Semantik, Fokus, Touch-Ziele, horizontale Überbreite, Sticky-Header, Schnellnavigation, Reduced Motion, Browserfehler und externe Requests. Statische CSS-Prüfungen decken die Dark-Surface-Kontraste, den opaken Glas-Fallback und den sicheren Rail-Abstand ab. Der Browserlauf benötigt Playwright/Chromium. In der aktuellen Sandbox war das Modul nicht installiert; deshalb ist der Browserbefund hier **NOT RUN** und nicht als bestanden zu verstehen.

Zusätzlich geprüft:

- statischer Shell-/Link-/Fragment-Check für sieben Seiten plus Standalone-Datei: **PASS**;
- statische Dark-Surface-/Glas-Fallback-/Rail-Kontrastprüfung: **PASS**;
- HTTP-Smoke-Test für zehn lokale HTML-/CSS-/JS-Dateien: **PASS**;
- `node --check pilot-website/site.js`: **PASS**.

## Offene Freigaben

Vor Veröffentlichung oder verbindlicher Abnahme fehlen weiterhin: finales Logo und Markenwerte, fachlich freigegebene Copy, echte Cases oder Stimmen mit Quellen und Rechten, reale Kontaktdaten und ein geprüfter Kontaktweg, rechtlich geprüfte Fassungen von Impressum und Datenschutz sowie die separate menschliche Veröffentlichungsentscheidung.
