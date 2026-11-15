# PAP-119 · Stiltreue und responsive Designprüfung

**Stand:** 15.11.2026
**Verantwortung:** Lea · UI/UX und Brand-Design
**Adressat:** Jonas · Umsetzung; Mara/CEO · Preview-Entscheidung und interne Abnahme
**Scope:** interne `pilot-website`-Vorschau im Preview-Repository
**Status:** Arbeitsgrundlage, keine Veröffentlichung und keine Abnahmefreigabe

## Ergebnis

Die bestehende visuelle Richtung **Light Signal / Floating Glass** ist als System schlüssig: helle Papierflächen, semantisches Blau, dunkle Kontrastinseln, eine schwebende Header-Shell, statische Unterstreichung für aktive Routenlinks und klare 44px-Ziele. Der Radius der Header-Shell entspricht mit `1.25rem` der Hero-Card; das ist mit PAP-114 konsistent. Die Unterstreichungslogik folgt PAP-112.

Eine stilistische und responsive Übergabefreigabe ist für den aktuellen Arbeitsbaum noch offen. Zwei Integrationsabweichungen haben Priorität:

1. Der neu eingefügte Preview-Banner und das Footer-Statusband werden durch `styles.css:1681–1684` global mit `display: none` ausgeblendet. Damit ist der interne Status visuell nicht erkennbar.
2. Der laufende Preview-Stand mischt interne Vorschaucopy auf Start/Kontakt/Rechtstexten mit öffentlicher Marketingcopy auf Leistungen, Ablauf und Über Nexus. Banner, `noindex` und Wortmarkenstatus sind nicht auf allen sieben echten Seiten gleich.

Die Content-Integration aus PAP-118 ist inzwischen als Commit `8ca94a4` gesichert. Die Prüfung bewertet diesen Preview-Stand; die parallele Parent-Arbeit wurde nicht überschrieben. Die offenen Shell-Abweichungen bleiben trotz des stabilen Commits bestehen.

## Quellenlage und Grenzen

Geprüfte Grundlagen:

- `pilot-website/UI-UX-SPEZIFIKATION-GLAS-MENUE.md` · Light-Signal-Tokens, Komponenten, Breakpoints und bestehende Review-Kriterien.
- `pilot-website/UEBERGABE-v3.md` · Shell, Menülogik, Glas-Fallback, Right-Rail und bekannte offene Punkte.
- `PAP-118-content-integration.md` · bestätigte One-Page-/Kontaktstatus-Copy und der explizite Hinweis auf ältere Migrationsseiten.
- `pilot-website/styles.css`, `pilot-website/site.js` und die sieben HTML-Seiten im aktuellen Preview-Arbeitsbaum.
- PAP-112 · Navigation ohne Flächen, animierte Unterstreichung.
- PAP-114 · Header-Radius als Hero-Card-Radius.

### Nachtrag zur neuesten Quellenanforderung

Die im aktuellen Wake-Kommentar genannten Dateien `Mara-Umsetzungsbrief` (`3ad14e15-db39-483e-a21d-bb13b6a1f871`) und `Nexus-Website-Konzept` (`b3b6f73e-d396-4835-bd8b-cddcbb184417`) liegen unter `.paperclip-inbound/process-7-1794632295-1d75-acd6-e2a5-4af2-9744-b4e281b7c557/` im Task-Workspace. Beide Dateien wurden geprüft, enthalten aktuell jedoch 0 Bytes und damit keine lesbaren, bestätigten Inhalte. Aus Dateinamen oder Pfaden wurden keine Aussagen abgeleitet; diese Revision bleibt auf den oben genannten lesbaren Grundlagen und dem Preview-Code beschränkt. Für eine inhaltliche Nachschärfung anhand dieser Briefings müssen die Quellen mit ihren tatsächlichen Bytes erneut staged werden.

Die aktuelle Richtlinie „keine Nora-QA; PAP-121 ist cancelled“ ist berücksichtigt: Dieses Dokument beauftragt keinen Nora-QA-Lauf, führt PAP-121 nicht als Restarbeit und behauptet keine visuelle oder responsive Freigabe. Der frühere Browserlauf gegen den Arbeitsbaum konnte wegen der fehlenden Systembibliothek `libglib-2.0.so.0` nicht gestartet werden; ältere Browsermetriken stammen aus einem anderen Arbeitsstand und werden nicht als aktuelle visuelle Freigabe verwendet. Statische Checks sind belastbar; Screenshot-, Fokus- und echte Bounding-Box-Befunde sind in diesem Review nicht ausgeführt.

## 1. Designsystem als verbindliche Leitplanke

| Bereich | Aktuelle Leitplanke | Prüfbare Absicht |
| --- | --- | --- |
| Farbrollen | `ink #0B2341`, `text #2E4A68`, `paper #F5F9FE`, `surface #FFFFFF`, `signal-blue #1558D6`, `signal-blue-dark #0B49B7`, `mist-blue #DCEBFF` | Blau führt Orientierung und Aktion; Status wird zusätzlich textlich benannt. |
| Typografie | Avenir Next → Segoe UI → System Sans; Fließtext mindestens 1rem und ca. 1.55–1.65 Zeilenhöhe | Lesbarkeit und lokale Vorschau ohne externe Font-Abhängigkeit. |
| Homepage-H1 | `font-weight: 700`, `clamp(2.75rem, 3.5vw, 3.5rem)`, `max-width: 22ch`; der globale H1-Standard bleibt für Unterseiten bestehen | Die Startseite erhält eine ruhigere Lesespur; keine globale Typografieänderung ohne Mara-/CEO-Entscheidung. |
| Raster | Inhalt maximal 77rem, Gutter `clamp(1rem, 4vw, 4rem)`, 4er-/8er-Abstände | Wiederholung ohne starres Kartenraster. |
| Shell | Header-Shell und Hero-Card `border-radius: 1.25rem`; einzelne Links, CTA und Status-Chips bleiben pillenförmig | Eine erkennbare Containerform, keine zusätzliche Capsule-Dekoration. |
| Bewegung | Unterstreichung und dezente Farbwechsel; keine Geometrieänderung bei Hover; Reduced Motion setzt Scrollen, Transitionen und Animationen praktisch auf null | Orientierung darf nicht von Bewegung oder Hover abhängen. |
| Fokus und Ziele | sichtbarer `:focus-visible`-Ring, 3px Offset; interaktive Ziele mindestens 44×44px | Tastatur- und Touchbedienung bleibt gleichwertig. |

## 2. Priorisierte Abweichungen

| ID | Priorität | Befund / Beleg | Nutzerwirkung | Konkrete Korrektur und Zuständigkeit |
| --- | --- | --- | --- | --- |
| D-01 | P0 | `index.html:13–18` und die bereits ergänzten Footer-Statusbänder werden durch `styles.css:1681–1684` versteckt. | Eine interne Vorschau kann wie eine veröffentlichte Website wirken; Vertrauen und Scope-Grenze sind unklar. | Jonas: die globale Ausblendung entfernen oder auf einen bewusst freigegebenen Zustand begrenzen. Banner und Footer-Status auf allen echten Preview-Seiten sichtbar halten; bei 375px umbrechen lassen, nicht abschneiden. Sichtbarkeit und Kontrast sind als Akzeptanzkriterium zu prüfen, hier aber nicht als ausgeführt behauptet. |
| D-02 | P0 | `index.html`/`kontakt.html`/Rechtstexte tragen interne Previewcopy; `leistungen.html`, `ablauf.html` und `ueber-nexus.html` tragen im Arbeitsbaum weiter `Webagentur`-/Marketingcopy und keinen Preview-Banner. Auf drei Inhaltsseiten fehlt außerdem `meta name="robots"`. | Header, Footer, CTA-Ton und Status wechseln beim Seitenwechsel. Nutzer können nicht sicher unterscheiden, was Pilotannahme und was freigegebene Aussage ist. | Mara/CEO entscheiden den Preview-Scope; empfohlen ist eine einheitliche interne Shell auf allen sieben echten Seiten. Jonas übernimmt Banner, `noindex,nofollow,noarchive`, Wortmarken-Meta und Statuscopy erst nach dieser Entscheidung. Mila liefert/prüft die Copy; Tessa prüft Labels und Abschnittsnamen. |
| D-03 | P1 | Der feste Right-Rail ist bei `min-width:1440px` 10rem breit und beginnt bei 1440px rechnerisch bei ca. x=1264. Der angepasste Hauptcontainer reicht mit `calc(77rem - 3rem)` bis ca. x=1312 (`styles.css:1412–1425`). | Rail und Hero-/Inhaltsfläche können sich um ca. 48px überlagern; Fokus, Text oder UI-Spezimen können unter der Schiene liegen. | Jonas: Rail als reservierte Außenspalte oder mit ausreichendem Content-Reserve-Raum umsetzen. Akzeptanzkriterium: bei 1440px mindestens 16px Abstand zwischen Rail und jeder Inhalts-/Fokusbox; bei 1280px/1024px keine sichtbare Rail. Die Messung ist in diesem Review nicht ausgeführt. |
| D-04 | P1 | Die Arbeitscopy setzt auf Start/Kontakt `Kontaktstatus öffnen`, während Leistungen/Ablauf/Über Nexus noch `Projekt besprechen` verwenden. | Ein scheinbarer Kontakt-CTA kann eine Verarbeitung versprechen, die im Pilot bewusst nicht existiert. | Bis zur Kontaktfreigabe nur `Kontaktstatus öffnen` beziehungsweise einen gleichwertigen Status-Link verwenden. Keine Formular-, Mail- oder Versandaktion ergänzen. Verantwortlich: Mila für Copy, Mara/CEO für Freigabe, Jonas für konsistente Einbindung. |
| D-05 | P1 | `nexus-vorschau-standalone.html` ist ein Redirect ohne `h1`, `main` oder Footer; das ist in der statischen Seitenzählung eine bewusste Ausnahme. | Ein generischer „jede HTML-Datei braucht H1“-Test meldet einen falschen Fehler oder prüft den Redirect nicht. | QA-Regel explizit als Redirect-Ausnahme dokumentieren: HTTP/Meta-Redirect, Ziel `index.html`, `noindex` und keine doppelte Shell prüfen. Keine zweite Standalone-IA erzeugen. |
| D-06 | P1 | Browser-/Screenshot-/echter Tastaturlauf für den aktuellen Arbeitsbaum ist wegen fehlender Systembibliothek **NOT RUN**. | Responsive und visuelle Übergabereife sind nicht belegt, auch wenn statische CSS-Regeln plausibel sind. | Die untenstehenden Browserkriterien bleiben als spätere interne Validierung dokumentiert. In diesem Auftrag wird kein Nora-QA-Lauf beauftragt oder als erledigt behauptet. |

## 3. Komponenten-Spezifikation

### C-01 · Preview-Shell, Banner und Footer-Status

| Kriterium | Vorgabe |
| --- | --- |
| Ziel / Nutzeraufgabe | Der interne Betrachter erkennt vor jeder Bewertung: „Das ist eine nichtöffentliche, synthetische Arbeitsgrundlage.“ |
| Layoutstruktur | Banner im Dokumentenfluss vor Skip-Link und Header; Footer-Status als letzte Statuszeile nach den Footer-Navigationen. Beide nutzen dieselbe Inhaltsbreite wie `.container`. |
| Visuelle Hierarchie | Dunkles Navy für die Grenze, helle Statusschrift, Statuspunkt nur als Zusatz. Der Banner ist Information, kein Marketing-CTA. |
| Breakpoints | Desktop mindestens 44px; unter 480px maximal zwei lesbare Zeilen, flexible Höhe, kein `white-space: nowrap`, kein Abschneiden. Footer-Status darf auf Mobil vollständig umbrechen. |
| Zustände | Normal sichtbar; kein `role="alert"`, kein Hover, kein Loading. Der Status bleibt auch bei Fokus des Skip-Links verständlich. |
| Inhalt / Platzhalter | `INTERNE VORSCHAU – NICHT VERÖFFENTLICHEN` plus `Synthetischer Pilotstand · lokale Arbeitsgrundlage`. Reale Marke, Kontaktdaten und Rechtstexte bleiben separate Freigaben. |
| Accessibility | Kontrast mindestens 4.5:1; Status nicht nur über den Punkt vermitteln; DOM-Reihenfolge vor Header und Footer-Linkgruppen logisch halten. |
| Offene Entscheidung | Mara/CEO entscheiden, wann Banner und `noindex` für eine spätere Abnahmefassung entfernt werden dürfen. |
| Checkliste | [ ] sichtbar auf allen sieben echten Seiten · [ ] vollständig lesbar bei 375px · [ ] keine Überlagerung durch sticky Header · [ ] Footer-Status nicht global versteckt. |

### C-02 · Floating-Glass-Header und Hauptnavigation

| Kriterium | Vorgabe |
| --- | --- |
| Ziel / Nutzeraufgabe | Standort, nächste Route und primäre Aktion in jedem Scrollzustand erkennen. |
| Layoutstruktur | Wortmarke links, vier Routenlinks, separate CTA rechts; `.header-inner` sticky, `1.25rem` Radius, opaker Fallback plus Glasverstärkung in `@supports`. |
| Visuelle Hierarchie | Wortmarke → Routenlinks mit Unterstreichung → gefüllte CTA. Routenlinks erhalten keine zusätzliche hellblaue Zustandsfläche; die CTA bleibt gefüllt. |
| Breakpoints | Ab 901px horizontale Navigation. Bis 900px Disclosure-Button; geöffnetes Panel in zwei Spalten, CTA volle Reihe. Bis 480px einspaltige Links und volle CTA-Breite. |
| Zustände | Default, Hover, `aria-current="page"`, `:focus-visible`, Pressed; mobil geschlossen/geöffnet. Escape schließt und gibt Fokus an den Button zurück; Linkklick schließt mobil. |
| Inhalt / Platzhalter | Aktuell bestätigte Labels: `Start`, `Leistungen`, `Ablauf`, `Über Nexus`; CTA bis Kontaktfreigabe `Kontaktstatus öffnen`. |
| Accessibility | `header`/`nav aria-label`, `aria-current`, `aria-expanded`, `aria-controls`, sichtbarer Fokus, Mindesthöhe 44px. Skip-Link muss vor dem Header erreichbar sein. |
| Offene Entscheidung | Tessa bestätigt finale Routenlabels; keine stille Umbenennung oder neue Hauptnavigation. |
| Checkliste | [ ] Radius auf allen Breakpoints 20px · [ ] keine Link-Geometrieänderung bei Hover · [ ] Fokus nicht geclippt · [ ] Menüstatus korrekt angesagt · [ ] CTA-Ziel entspricht Status. |

### C-03 · Hero, UI-Spezimen und CTA

| Kriterium | Vorgabe |
| --- | --- |
| Ziel / Nutzeraufgabe | In wenigen Sekunden Angebot, Arbeitsannahme und nächsten sicheren Schritt verstehen. |
| Layoutstruktur | Eyebrow → H1 → Nutzenlead → Primär-/Sekundäraktion → Pilotstatus → Arbeitsfelder; UI-Spezimen rechts auf breiten Viewports, darunter auf Mobil. |
| Visuelle Hierarchie | H1 zuerst; signalblaue Aktion zweitens; Spezimen unterstützt nur die Erklärung und darf nicht als Kundenprojekt gelesen werden. Kreislinien und UI-Regeln sind dekorativ. |
| Breakpoints | Ab 1200px zweispaltiger Hero; 901–1199px weiterhin zweispaltig, aber kompakter; bis 900px einspaltig; bis 480px Aktionen vertikal und vollbreit. H1 bei 375px maximal 3–5 Zeilen. |
| Zustände | Normaler Pilotstatus, kein Fake-Submit, kein Bild-/Proof-Ladezustand. Hover verändert nur Farbe/Fläche; keine Größenverschiebung. |
| Inhalt / Platzhalter | Aktuelle H1 bleibt unverändert. `Kontaktstatus öffnen` führt zu `kontakt.html#kontakt-status`; UI-Spezimen bleibt als Beispiel beschriftet. Mila ersetzt Arbeitscopy erst nach Freigabe. |
| Accessibility | `aria-labelledby="hero-title"`; Spezimen als beschreibendes `aside`, dekorative Linien `aria-hidden`; CTA-Ziele eindeutig und lokal vorhanden. |
| Offene Entscheidung | Mara/CEO bestätigen finale H1, Marke, Bilder und CTA-Tonalität; die H1-Gewicht-Änderung bleibt homepage-spezifisch. |
| Checkliste | [ ] CTA im ersten Viewport · [ ] nächste Sektion wird auf Desktop angeteasert · [ ] Spezimen überdeckt keinen Text · [ ] keine horizontale Überbreite · [ ] Previewstatus sichtbar. |

### C-04 · Right-Rail und Abschnittsziele

| Kriterium | Vorgabe |
| --- | --- |
| Ziel / Nutzeraufgabe | Auf langen Seiten schnell zwischen echten Hauptabschnitten wechseln, ohne die Hauptnavigation zu überladen. |
| Layoutstruktur | Beschriftete, vertikale Glas-Schiene außerhalb des Inhaltsrasters; jeder Link enthält Nummer und sichtbaren Namen. Auf `index.html`: `start`, `leistungen`, `ablauf`, `ueber-nexus`, `kontakt`; `proof` bleibt bewusst untergeordnet. |
| Visuelle Hierarchie | Aktiver Abschnitt erhält Fläche und `aria-current="location`; Namen bleiben sichtbar, Nummern sind Zusatzinformation. |
| Breakpoints | Nur bei funktionaler Breite ab 1440px; auf 1024px, 768px und 375px keine fixe Schiene. Kein Ersatz durch horizontales Scrollen. |
| Zustände | Default, Hover, Fokus, aktiver Abschnitt, Hash-Navigation und Scroll-Observer. Bei weniger als drei echten Zielen keine Rail. |
| Accessibility | Zweite Navigation mit eigenem Label; 44px pro Link; Ziel-ID eindeutig; Fokus und Inhalt dürfen nicht unter der fixed Rail liegen. |
| Offene Entscheidung | Tessa bestätigt, ob `Proof/Nutzen` dauerhaft untergeordnet bleibt; keine neue Hauptsektion nur aus der Rail ableiten. |
| Checkliste | [ ] keine Überlagerung bei 1440px · [ ] `aria-current` folgt Klick und Scroll · [ ] alle IDs existieren · [ ] Rail verschwindet unter dem Schwellenwert · [ ] Fokusgutter 16px. |

### C-05 · Leistungszeilen, Proof, Prozess, Status und Footer

| Kriterium | Vorgabe |
| --- | --- |
| Leistungszeilen | Desktop: Nummer / Name / Erklärung / Status / Link. Tablet: drei Ebenen mit Status und Link darunter. Mobil: Nummer/Name, Erklärung, Status, Link; Hover darf Maße nicht verändern. |
| Proof-/Statusflächen | Fehlende Cases, Stimmen und Bilder mit verständlichem Platzhalterstatus; keine erfundenen Zahlen, Logos, Personen oder Ergebnisse. Status immer als Text plus Farbe/Form. |
| Prozess | `ol` mit vier echten Stationen; horizontal ab 901px, vertikal bis 900px. Keine automatische Fortschritts- oder Abschlussanimation. |
| CTA-Band | Dunkle Kontrastinsel, eine klare Statusaktion und sekundärer Ablauf-Link; kein Submit-, Erfolg- oder Fehlerzustand ohne freigegebenen Kontaktweg. |
| Footer | Wortmarke, Seitenlinks, Pflichtseiten und Preview-Status in dieser Reihenfolge. Links mindestens 44px; Rechtstexte bleiben als Platzhalter benannt. |
| Accessibility | Überschriftenhierarchie, logische Reihenfolge, Status nicht nur farblich, sichtbarer Fokus, keine Tabellenwirkung allein durch CSS. |
| Offene Entscheidung | Mila liefert finale Leistungs-/Proof-Copy; zuständige menschliche Stelle liefert rechtliche Texte und Kontaktverarbeitung. |
| Checkliste | [ ] gleiche Struktur pro Zeile · [ ] Mobil einspaltig · [ ] Prozessnummern nicht alleinige Bedeutung · [ ] Footerstatus sichtbar · [ ] kein Fake-Formular. |

## 4. Seitenprüfung und Zielbild

### Start · `index.html`

**Ziel:** Positionierung und nächsten sicheren Schritt verstehen; anschließend Leistungsrahmen, Belegstatus und Ablauf prüfen.
**Nutzeraufgabe:** „Passt die Arbeitsrichtung?“ und „Was kann ich als Nächstes gefahrlos ansehen?“
**Layout:** Preview-Shell → Floating-Header → Hero → Leistungen → Proof/Status → Ablauf → Über Nexus → Kontaktstatus → Footer.
**Responsive:** 375px einspaltig mit gestapelten Aktionen; 768px einspaltig mit nebeneinanderliegenden Aktionen, sofern 44px bleiben; 1024px kompakter Zweispalter; 1440px Hero plus Rail ohne Überdeckung.
**Offen:** `#proof` bleibt kein Hauptnavigationsziel, solange Tessa/Mara nichts anderes freigeben.
**Prüfliste:** [ ] H1 unverändert und verständlich · [ ] eine Primäraktion · [ ] Proof nur als Platzhalter · [ ] `#kontakt-status` lokal erreichbar · [ ] Banner sichtbar.

### Leistungen · `leistungen.html`

**Ziel:** Richtung, Interface und Übergabe vergleichen, ohne Preis- oder Ergebnisversprechen.
**Nutzeraufgabe:** Umfang einordnen und danach Ablauf oder Kontaktstatus wählen.
**Layout:** Page-Hero → drei Leistungszeilen → Einsatzbereich/Abgrenzung → Qualität/Status → CTA.
**Responsive:** Desktop fünf Spalten; Tablet Status und Link unter der Hauptzeile; Mobil Nummer/Name, Erklärung, Status, Link untereinander.
**Aktueller Integrationsbefund:** Im Arbeitsbaum noch öffentliche Meta-/Footer-/CTA-Copy und kein Preview-Banner/`noindex`; das ist D-02/D-04, kein Anlass für eine stille IA-Änderung.
**Accessibility:** H3 pro Baustein, Status textlich, Links mit Zieltext, keine Fake-Tabelle.
**Prüfliste:** [ ] gleiche Preview-Shell wie Start · [ ] `Projekt besprechen` bis Freigabe ersetzt · [ ] keine horizontale Zeile auf Mobil · [ ] Rail nur bei drei echten Zielen.

### Ablauf · `ablauf.html`

**Ziel:** Reihenfolge, Übergabepunkte und offene Prüfungen transparent machen.
**Nutzeraufgabe:** Einordnen → Strukturieren → Systematisieren → Übergeben als Folge verstehen.
**Layout:** Page-Hero → `ol.process-rail` → Prüfspur/Restpunkte → Kontaktstatus.
**Responsive:** Horizontale Linie ab 901px, vertikale Linie bis 900px; die Schritttexte bleiben direkt lesbar.
**Aktueller Integrationsbefund:** Öffentliche H1-/Footer-/CTA-Tonalität und fehlender Banner/`noindex` stehen neben internem Start/Kontakt; D-02/D-04 zuerst lösen.
**Accessibility:** `ol`, H3 je Station, Fokus in visueller Reihenfolge, kein animierter Abschlussstatus.
**Prüfliste:** [ ] vier Schritte eindeutig · [ ] QA-Befund und offene Freigabe getrennt · [ ] `#prozess` als Ziel vorhanden · [ ] keine Abnahmebehauptung.

### Über Nexus · `ueber-nexus.html`

**Ziel:** Prinzipien und Grenzen des Piloten erklären, ohne ungeprüfte Marken- oder Referenzclaims.
**Nutzeraufgabe:** Arbeitsweise bewerten und Annahmen von Fakten unterscheiden.
**Layout:** Page-Hero → Prinzipien → Passung/Arbeitsannahmen → Status/CTA.
**Responsive:** Drei Prinzipien ab 768px als Raster, darunter einspaltig; Statusfläche als kurzer Kontrastabschluss.
**Aktueller Integrationsbefund:** Arbeitet im Arbeitsbaum noch mit öffentlicher „Webagentur“-Tonalität, ohne Preview-Shell; D-02.
**Accessibility:** Status zusätzlich textlich; Links mit Ziel; dunkle Fläche kontrastgeprüft.
**Prüfliste:** [ ] keine implizite Kundenreferenz · [ ] Annahmen markiert · [ ] gleiche Wortmarken-Meta und Footerstatus · [ ] keine neue Markenbehauptung ohne Mara/CEO.

### Kontakt · `kontakt.html`

**Ziel:** Den vorbereiteten, aber nicht aktiven Kontaktstatus verständlich machen.
**Nutzeraufgabe:** Erkennen, dass kein Klick Daten versendet, und zu Leistung/Ablauf zurückkehren.
**Layout:** Preview-Shell → Page-Hero → `#kontakt-status` als prominente Statuskarte → Orientierung → Footer.
**Responsive:** Statuskarte und Orientierung einspaltig auf Mobil; keine abgeschnittenen Platzhalter.
**Zustände:** Nur statischer Status; kein Submit, Loading, Erfolg oder Fehler.
**Accessibility:** `role="note"` mit H2; keine deaktivierte Fake-Schaltfläche; Links zu Leistungen und Ablauf sichtbar.
**Prüfliste:** [ ] keine Mail-/Telefonerfindung · [ ] kein Formular/Tracker · [ ] CTA benennt Status · [ ] Banner sichtbar.

### Impressum / Datenschutz · `impressum.html`, `datenschutz.html`

**Ziel:** Pflichtseiten in der IA verlinkt halten, ohne ungeprüfte Rechtsinhalte vorzutäuschen.
**Nutzeraufgabe:** Offenheitsstatus verstehen und zwischen beiden Platzhaltern navigieren.
**Layout:** Preview-Shell → Page-Hero „Pflichtseite · offen“ → Statuskarte → nächster Platzhalter → Footer.
**Responsive:** Eine Spalte; keine Rail bei weniger als drei echten Zielen; Platzhaltertext darf nicht gekürzt werden.
**Accessibility:** klare H1, Status als Note, keine Rechtsberatung/Einwilligung, vollständige Linktexte.
**Prüfliste:** [ ] keine erfundenen Unternehmens-/Hosting-/Verarbeitungsdaten · [ ] `noindex` · [ ] Previewstatus sichtbar · [ ] Fokus und Kontrast wie in der Shell.

### Standalone · `nexus-vorschau-standalone.html`

**Ziel:** Einen alten Einstieg kontrolliert auf die zentrale Preview-IA führen.
**Nutzeraufgabe:** Ohne doppelte Inhaltsquelle bei `index.html` ankommen.
**Verhalten:** Meta-Refresh und sichtbarer Fallback-Link bleiben; keine zweite Navigation, kein zweiter H1-Scan.
**Prüfliste:** [ ] Ziel `index.html` · [ ] `noindex` · [ ] Redirect-Ausnahme im QA dokumentiert.

## 5. Offene Entscheidungen und Übergabe

| Entscheidung | Zuständigkeit | Warum sie vor der internen Preview-Entscheidung nötig ist |
| --- | --- | --- |
| Preview-Banner, Footerstatus und `noindex` auf allen sieben Seiten | Mara / CEO + Jonas | Sonst ist die interne Grenze visuell und technisch uneinheitlich. |
| Finale Navigation und Rail-Ziele | Tessa | Labels, IDs und Haupt-/Nebenhierarchie dürfen nicht still wechseln. |
| Finale Copy, Proofs, Quellen und Rechte | Mila | Platzhalter und Arbeitsannahmen müssen von Behauptungen getrennt bleiben. |
| Logo, Blautöne, Schrift, Bilder, Tonalität | Mara / CEO | Aktuelle Tokens sind Arbeitsannahmen, keine Markenfreigabe. |
| Kontaktweg und Datenverarbeitung | Mara / zuständige menschliche Stelle | Erst danach sind echte Formular-, Erfolg- und Fehlerzustände spezifizierbar. |

## 6. Prüfliste für Jonas und interne Designprüfung

### Statisch

- [ ] `node --check pilot-website/site.js` bleibt fehlerfrei.
- [ ] `git diff --check` bleibt fehlerfrei.
- [ ] Alle sieben echten Seiten haben `lang="de"`, genau eine H1, `main#main` und einen Footer.
- [ ] Alle sieben echten Seiten haben nach der Preview-Entscheidung denselben sichtbaren Banner, Statusstil und `noindex`.
- [ ] Standalone wird als Redirect geprüft, nicht als achte Inhaltsseite.
- [ ] Lokale Links, Fragmente und CSS-/JS-Pfade lösen auf.

### Browser / visuelle Kriterien (nicht ausgeführt)

- [ ] 375×812, 768×900, 1024×900 und 1440×900: kein horizontaler Overflow und keine abgeschnittene Statuscopy.
- [ ] Header vor und nach mindestens zwei Viewporthöhen sticky sichtbar; kein Text unter der Shell.
- [ ] 1440px: Right-Rail außerhalb des Inhalts, mindestens 16px Clearance, kein Überdecken von UI-Spezimen, Text oder Fokus.
- [ ] 900px/768px: Menübutton sichtbar, `aria-expanded` korrekt, Fokus wandert beim Öffnen in den Linkbereich, Escape gibt Fokus zurück.
- [ ] Hover, Focus, Pressed und `aria-current` bleiben ohne Layoutshift; Hover ist kein notwendiger Bedienweg.
- [ ] `prefers-reduced-motion: reduce`: kein Smooth Scroll, keine wahrnehmbare Übergangsanimation.
- [ ] Glas-Fallback ohne `backdrop-filter` bleibt opak, kontrastreich und verständlich.
- [ ] Konsole, Page Errors und Request Failures bleiben leer; keine externen Assets, Tracker oder Versandpfade.

**Übergabestatus:** Die Designrichtung ist als Arbeitsannahme brauchbar. D-01 und D-02 blockieren eine belastbare interne Preview-Abnahme; D-03 bis D-06 bleiben als offene Integrations- beziehungsweise Validierungshinweise dokumentiert und müssen vor einer internen Preview-Entscheidung geschlossen oder ausdrücklich akzeptiert werden. Keine Nora-QA, keine PAP-121-Fortsetzung, keine Veröffentlichung, kein Kundenkontakt und keine Produktionsänderung aus diesem Dokument ableiten.
