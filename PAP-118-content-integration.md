# PAP-118 · Content-Integration für die Nexus-One-Page

**Status:** interne Preview-Arbeitsgrundlage · 15.11.2026 · keine Veröffentlichungsfreigabe
**Quelle:** vorgegebene Arbeitscopy aus PAP-93/PAP-95 und der bestehende Preview-Stand
**Scope:** `pilot-website/index.html` sowie der verlinkte Kontaktstatus `pilot-website/kontakt.html`

Dieses Übergabedokument beschreibt die integrierte Sie-Ansprache, die SEO-Basis, die Mediengrenzen und die offenen Prüfungen. „Nexus“ bleibt ein Arbeitsname. Es wurden keine Preise, Kundennamen, Referenzen, Bewertungen, Kontaktdaten, Standorte, Öffnungszeiten oder rechtlichen Aussagen ergänzt.

## 1. Integrierte Abschnitte

| Abschnitt | Ziel und Zielgruppe | Integrierte Arbeitscopy | Nächste Handlung |
| --- | --- | --- | --- |
| `#start` | Lokale Unternehmen und Anbieter einfacher Firmenwebsites/Landingpages in wenigen Sekunden einordnen | H1 `Websites und Landingpages, die lokale Angebote klar zeigen.`; Lead zu Leistungen, Ablauf und nächstem Schritt | `Kontaktstatus öffnen` → `kontakt.html#kontakt-status`; alternativ `Leistungen ansehen` |
| `#leistungen` | Leistungsrahmen und Grenzen prüfen, ohne ein freigegebenes Angebot vorzutäuschen | `Ein System, das Richtung zeigt.` mit den Arbeitsbegriffen Richtung, Interface und Übergabe; Abgrenzung des Piloten | `Prinzipien prüfen`, `Ablauf öffnen` oder Kontaktstatus |
| `#proof` | Vertrauen nur über belegbare Inhalte behandeln | Projektbild- und Stimmen-Slot bleiben als `PLATZHALTER`/`RECHTE OFFEN` sichtbar; Arbeitsartefakte werden ausdrücklich nicht als Kundenbeleg bezeichnet | Keine Proof-Handlung; zuerst Quelle, Rechte und Freigabe liefern |
| `#ablauf` | Möglichen Weg vor einer späteren Anfrage nachvollziehen | Vier Schritte: Einordnen, Strukturieren, Systematisieren, Übergeben | `Kontaktstatus öffnen`; keine Dauer-, Budget- oder Abnahmezusage |
| `#ueber-nexus` | Arbeitsrichtung und Passung prüfen, ohne Biografie, Standort oder Marke zu erfinden | `Klarheit vor Dekoration.`; Zielsegmente als Arbeitsannahmen markiert | Leistungsrahmen oder Kontaktstatus prüfen |
| `#kontakt` | Kontaktstatus eindeutig machen, ohne Verarbeitung zu simulieren | `Eine klare Richtung ist der nächste Schritt.`; keine aktive Kontaktverarbeitung | Statusseite öffnen; kein Formular, kein Versand, kein `mailto:` |

Alle Marketing-CTAs der One-Page verwenden im Pilot einheitlich `Kontaktstatus öffnen`. Die Kontaktseite selbst nennt ausschließlich den offenen Status und enthält keine reale Ansprechstelle.

## 2. SEO-Übergabe

### Aktuell im Pilot integriert

- `title`: `Nexus – Websites mit Haltung · interne Vorschau`
- `meta description`: `Interne Nexus-Vorschau für Websites und Landingpages mit klarer Struktur, blauem Signal und prüfbarer Übergabe.`
- `robots`: `noindex,nofollow,noarchive` auf One-Page, Kontaktstatus und Standalone-Einstieg.
- Eine H1 auf der One-Page; die H2/H3-Reihenfolge folgt den fünf Marketingzielen und dem nachgeordneten Proof-Abschnitt.
- Stabile Anker: `#start`, `#leistungen`, `#proof`, `#ablauf`, `#ueber-nexus`, `#kontakt`, `#kontakt-status`.

### Öffentliche SEO-Fassung bleibt zurückgestellt

Erst nach menschlicher Freigabe von Markenname, Zielregion, priorisierten Branchen, tatsächlichem Leistungsumfang, Domain und Kontaktweg dürfen öffentliche Title-/Description-Texte, Canonical, Open Graph, Sitemap, strukturierte Daten und Indexierung gesetzt werden. Bis dahin keine Orts- oder Branchenbegriffe ergänzen und keine `Organization`-, `LocalBusiness`- oder `Review`-Daten aus Platzhaltern erzeugen.

Die öffentliche Arbeitsrichtung aus dem Brief lautet weiterhin:

- Title-Entwurf: `Nexus | Websites und Landingpages für lokale Angebote`
- Description-Entwurf: `Nexus entwickelt einfache Websites und Landingpages für lokale Angebote – klar strukturiert, verständlich geführt und auf den nächsten Schritt ausgerichtet.`

Diese beiden Zeilen sind Entwürfe und dürfen den Pilotstatus nicht ersetzen.

## 3. Medien-, Alttext- und Rechtebriefing

| Einsatz | Aktueller Stand | Falls später freigegeben | Alt-Text / Status |
| --- | --- | --- | --- |
| Hero-Systemansicht | HTML/CSS-Spezimen, kein externes Bild | Optional `nexus-system-hero.webp`, 1600×1000 px, responsive Varianten | Informativ: `Abstrakte Systemansicht mit nummeriertem Inhalts- und Statusraster`; rein dekorativ: `alt=""` · Quelle nicht erforderlich bei HTML/CSS |
| Proof-Projektbild | Nicht eingebunden; Slot bleibt offen | `case-[projekt-slug]-01.webp`, 1600×1067 oder 1600×1200 px, WebP/AVIF, lazy below the fold | `Ansicht des freigegebenen Projekts [Projektname] mit [konkret sichtbarem Informationswert]` · Quelle, Nutzungsumfang, Crop und Aussage fehlen |
| Kundenstimme/Portrait | Nicht eingebunden; Stimmen-Slot bleibt offen | `testimonial-[slug].webp`, optional 1200×1200 px, nur bei eigenem Informationswert | `[Name/Funktion] von [Unternehmen]` nur mit Einwilligung; ein Zitat ohne Portrait ist zu bevorzugen, wenn das Bild keinen Mehrwert liefert |
| Kontakt/Standort | Kein Bild und keine Karte | Standortkarte nur nach bestätigtem Standort und Technik-/Datenschutzprüfung | `Karte mit Standort von [freigegebenem Unternehmen]` · aktuell nicht angefordert |

Keine Bilder aus Suche, Stockbibliothek, Kundenprojekt oder Social Media übernehmen, solange Quelle, Urheber/Anbieter, Nutzungsumfang, gegebenenfalls Laufzeit/Region, Einwilligungen, Projektzuordnung, Dateiname, Crop und Alttext nicht im Asset-Register stehen. Im aktuellen Auftrag werden keine Bilder gekauft oder extern beschafft.

## 4. Offene Restpunkte für Jonas

1. Die One-Page und der Kontaktstatus sind redaktionell auf Pilotstatus und Sie-Ansprache ausgerichtet. Die bestehenden Migrationsseiten `leistungen.html`, `ablauf.html` und `ueber-nexus.html` enthalten noch ältere, aktivere Copy und haben nicht überall den integrierten `noindex`-/Preview-Banner-Stand. Vor einer gemeinsamen Preview-Abnahme entweder angleichen oder ausdrücklich als historische Migration kennzeichnen.
2. Bei jeder weiteren CTA-Änderung den Wortlaut `Kontaktstatus öffnen` und das Ziel `kontakt.html#kontakt-status` gemeinsam prüfen. Kein `Projekt besprechen`, `Gespräch beginnen`, `Anfrage`, `Absenden` oder `mailto:` im Pilot ergänzen.
3. `noindex,nofollow,noarchive` bis zur menschlichen Veröffentlichungsentscheidung beibehalten. Keine Canonical-/OG-/Schema-Daten mit ungeklärten Marken- oder Standortwerten ergänzen.
4. Bei späteren Bildänderungen `alt`, `width`, `height`, responsive Quelle, `loading`, Quelle und Rechte gemeinsam dokumentieren. Ein generisches Agentur-, Laptop-, Handschlag- oder Foodbild ist kein Ersatz für einen belegten Case.
5. Nach der Inhaltsintegration statischen Link-/Fragment-Check und den vorgesehenen Browser-/Keyboard-Retest durchführen. Einen nicht ausgeführten Browserlauf nicht als bestanden ausgeben.

## 5. Freigabe-Gates für Nora und die zuständige menschliche Stelle

- Markenname, Logo, Farben, Typografie und Tonalität bestätigen.
- Zielgruppe, Region und tatsächlichen Leistungsumfang bestätigen; `Richtung`, `Interface` und `Übergabe` als Leistungen oder Phasen einordnen.
- Projektbild, Stimmen, Logos und sonstige Proofs mit Quelle, Rechten und Einwilligungen liefern oder Slots entfernen.
- Realen Kontaktkanal, Empfänger, Datenumfang, Erfolg-/Fehlerzustände und geprüfte Datenschutzfassung liefern.
- Impressum und Datenschutz rechtlich prüfen.
- Browser-, Screenshot-, Tastatur- und responsive Befunde separat von Inhalts-, Rechts- und Veröffentlichungsfreigabe bewerten.
