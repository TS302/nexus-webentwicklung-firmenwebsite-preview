# UI/UX-Spezifikation · Light Signal / Floating Glass

| Feld | Wert |
| --- | --- |
| Aufgabe | PAP-62 / PAP-60 |
| Verantwortung | Lea · UI/UX und Brand-Design |
| Version | 1.0 · 13.11.2026 |
| Status | interne Designübergabe für Jonas, nicht veröffentlicht |

Diese Spezifikation übersetzt den PAP-60-Brief in umsetzbare Regeln für die lokale Nexus-Vorschau. Das prägende Element ist ein dauerhaft sichtbares, schwebendes Glas-Pill-Menü. Die Oberfläche wird insgesamt heller und blau geführt. Die Spezifikation ist keine technische Implementierung, keine Markenfreigabe und keine Veröffentlichungsabnahme.

## 1. Geltungsbereich und Quellenlage

### Bestätigt

- Die Oberfläche soll heller werden.
- Blau ist das gewünschte Primärsignal.
- Die Hauptnavigation soll wie im Referenzimpuls als schwebendes Menü mit Glasoptik gestaltet werden.
- Das Menü bleibt beim Scrollen sichtbar.
- Auf Desktop ist zusätzlich eine kleine Schnellnavigation am rechten Rand gewünscht.
- Die Vorschau bleibt lokal und nichtöffentlich.

### Arbeitsgrundlage, nicht freigegeben

- Die vorhandene sieben Seiten umfassende Pilot-IA: Start, Leistungen, Ablauf, Über Nexus, Kontakt sowie Impressum und Datenschutz als Platzhalter.
- Die aktuellen Texte, Wortmarke, N-Signet, UI-Spezimen, Proof-Slots und Statushinweise im Ordner `pilot-website/`.
- `README.md` und `UEBERGABE-v3.md` als technische Arbeitsdokumente.

Die Seitenhierarchie wird hier nicht stillschweigend verändert. Tessa muss die Navigationsbezeichnungen und Abschnittsziele bestätigen; Mila muss die Copy und alle Platzhalter ersetzen oder freigeben. Die synthetische Pilotcopy ist kein Beleg, keine Kundenstimme und keine Markenbotschaft.

### Offen

- Exakte Markenblauwerte, Logo, Schriftlizenz und verbindliche Tonalität.
- Ob der Preview-Banner in einer späteren internen Abnahmefassung sichtbar bleibt.
- Echte Cases, Stimmen, Bilder, Rechte, Kontaktdaten, Kontaktverarbeitung sowie rechtlich geprüfte Texte.
- Pixelgenaue Abnahme gegen das Referenzbild. Verbindlich ist hier das Formprinzip (Floating Glass, sticky, Desktop-Right-Rail), nicht eine ungeprüfte Kopie fremder Markenwerte.

## 2. Designentscheidung in einem Satz

**Ein helles, ruhiges Informationssystem mit einer einzigen starken Geste: einer translucent blau markierten Glas-Pill, die Orientierung und nächsten Schritt dauerhaft am oberen Rand verankert.**

Das dient dem Nutzerziel: Die Person erkennt sofort, wo sie ist, kann ohne Rücksprung zwischen den vier Kernseiten wechseln und erreicht mit „Projekt skizzieren“ die primäre nächste Aktion. Die helle Fläche verbessert Lesbarkeit und Vertrauen; Blau wird als Orientierung eingesetzt, nicht als dekorativer Farbverlauf.

## 3. Designplan und Selbstprüfung

### Kompaktes Token-System

Die sechs Kernfarben bleiben bewusst klein. Semantische Tokens dürfen daraus mit Transparenz abgeleitet werden.

| Token | Wert | Aufgabe |
| --- | --- | --- |
| `ink` | `#0B2341` | Überschriften, dunkle Flächen, stärkster Kontrast |
| `text` | `#2E4A68` | Fließtext und sekundäre Navigation |
| `paper` | `#F5F9FE` | helle Seitenbasis |
| `surface` | `#FFFFFF` | Inhaltsflächen und Glas-Fallback |
| `signal-blue` | `#1558D6` | Primäraktion, aktive Navigation, Links |
| `mist-blue` | `#DCEBFF` | aktive Flächen, Statusflächen, weiche Trennung |

Abgeleitete Regeln:

- Linien: `rgb(11 35 65 / 0.16)` auf hellen Flächen, `rgb(255 255 255 / 0.28)` auf dunklen Flächen.
- Glas: `rgb(255 255 255 / 0.76)` mit weißer 1px-Kante; ohne `backdrop-filter` als `rgb(255 255 255 / 0.96)` rendern.
- Fokus hell: `#0B49B7`; Fokus dunkel: `#BFD7FF`. Der Ring muss auf dem jeweiligen Untergrund sichtbar bleiben.
- Dunkle Flächen sind Kontrastinseln für Hero, Prozess oder CTA, nicht die Grundstimmung der Website.
- Blau nicht ausschließlich über Farbe kommunizieren: aktive Navigation erhält zusätzlich Markierung und `aria-current`; Status erhält Text.

### Typografie

- Display und Navigation: `Avenir Next`, danach `Segoe UI`, danach system sans-serif. Keine externe Font-Abhängigkeit in der lokalen Vorschau.
- Fließtext: dieselbe Familie für Ruhe und kurze Ladewege; Gewicht 400–600.
- H1: `clamp(2.75rem, 7vw, 6.5rem)`, Zeilenhöhe ca. 0.96, maximal ca. 9–11 Zeichen pro Zeilegruppe.
- H2: `clamp(2rem, 4vw, 4rem)`, Zeilenhöhe ca. 1.02, maximal ca. 15 Zeichen pro Zeilegruppe.
- H3: 1.25–1.5rem, Zeilenhöhe ca. 1.15.
- Fließtext: mindestens 1rem, Zeilenhöhe 1.55–1.65, bevorzugt unter 75 Zeichen pro Zeile.
- Systemlabels dürfen klein und monospace sein, aber nur für Status, Abschnittsindex und technische Preview-Information. Keine langen Nutzertexte in Versalien.
- Satzschreibung verwenden. Nummern nur dort, wo wirklich eine Reihenfolge besteht: im Ablauf, nicht als Dekoration auf jeder Karte.

### Layoutprinzipien

- Maximalbreite Inhalt: 72–78rem; Außenabstand `clamp(1rem, 4vw, 4rem)`.
- Desktop: 12-Spalten-Raster, 1–1,5rem Spaltenabstand; Hero etwa 7/5 für Copy und UI-Spezimen.
- Mobile: eine Spalte; kein horizontales Scrollen als Ersatz für eine nicht gelöste Navigation.
- Abstände auf einer 4er-/8er-Basis; Abschnittsabstand `clamp(4rem, 9vw, 8rem)`.
- Vollständig runde Formen sind für die Floating-Navigation, kleine Status-Chips und gegebenenfalls die primäre Aktion reserviert. Inhaltsbereiche bleiben überwiegend flach, gerahmt oder über Regeln getrennt. So entsteht kein austauschbares SaaS-Kartenraster.
- Schatten nur für die schwebende Navigation, das Hero-Spezimen und eindeutig erhöhte CTA-/Statusflächen. Keine Schatten auf jeder Karte.

### Wireframe-Idee

Desktop:

```text
Preview-Banner (nur interne Vorschau)

          [ N  Nexus ] [ Start  Leistungen  Ablauf  Über Nexus ] [ Projekt skizzieren ]
                                      sticky Glass-Pill

      [ H1 + Nutzen + primäre Aktion       |  UI-Spezimen / freigegebenes Bild ]
      [ drei Signalbegriffe                |  keine erfundene Proof-Zahl       ]

      [ Abschnitt: Leistung als gerasterte, ruhige Zeilen ]          [01]
      [ Abschnitt: Proof / Status-Slots   ]                           [02]  rechte
      [ Abschnitt: Ablauf als echte Folge ]                           [03]  Schnellnav
      [ Abschnitt: Prinzipien / Passung  ]                             [04]
      [ CTA-Band: nächster Schritt       ]                             [05]
```

Mobil:

```text
[ N Nexus                                      Menü ]  <- gleiche Glass-Pill
┌ geöffnet: Start / Leistungen / Ablauf / Über Nexus ┐
└            Projekt skizzieren                       ┘

[ H1 ]
[ Nutzen ]
[ primäre Aktion ] [ sekundäre Aktion ]
[ UI-Spezimen oder Bildplatzhalter ]
[ Abschnitte linear, ohne rechte Schnellnavigation ]
```

### Selbstkritik vor Umsetzung

Der Plan wurde gegen generische Web-SaaS-Muster geprüft und an drei Stellen bewusst geschärft:

1. Die Glas-Pill ist die eine erinnerbare Geste. Zusätzliche Glows, viele Gradients, animierte Karten und dekorative Nummern werden gestrichen.
2. Die bestehende Capability-Zeile darf beim Hover nicht durch `padding` ihre Geometrie verschieben. Die Interaktion erhält höchstens Farbe, Unterstreichung oder eine ruhige Hintergrundfläche.
3. Der aktuelle Tokenname `lime` passt nach der hellblauen Richtung nicht mehr. Jonas soll semantische Namen wie `signal-blue`, `mist-blue`, `focus-light` verwenden, damit keine veraltete Farblogik weiterlebt.

## 4. Responsive Verhalten und Breakpoints

| Bereich | Breite | Hauptregeln |
| --- | --- | --- |
| Großdesktop | ab 1280px | volle Pill, rechte Schnellnavigation, 12-Spalten-Hero |
| Desktop kompakt | 1024–1279px | volle Pill mit engeren Abständen; rechte Schnellnavigation nur, wenn sie nicht in den Inhalt ragt |
| Tablet | 768–1023px | keine feste rechte Schiene; Abschnittslinks inline im Hero oder über dem ersten Abschnitt; Header bleibt Glass-Pill |
| Mobil | 480–767px | Pill fast vollbreit; Navigation über zugänglichen Menü-Button und aufklappbares Panel; CTA volle Breite im Panel |
| Klein mobil | unter 480px | gleiche Regeln, aber einspaltige Aktionen und flexible Preview-Banner-Zeilen |

Der Breakpoint ist funktional, nicht gerätebezogen: Sobald die fünf Hauptziele nicht mehr in einer Zeile mit ausreichenden Touch-Zielen Platz haben, wird das Menü geöffnet statt gequetscht oder in eine schwer lesbare Zweizeilen-Navigation verwandelt.

## 5. Globale Shell und Komponenten

### 5.1 Interner Preview-Banner

**Ziel:** Interne Betrachter dürfen die Vorschau nicht mit einer veröffentlichten Website verwechseln.

- **Layout:** volle Breite, dunkler Navy-Hintergrund; Statuspunkt und „INTERNE VORSCHAU – NICHT VERÖFFENTLICHEN“ links, kurze Erläuterung daneben.
- **Desktop:** mindestens 44px hoch, Inhalt auf dieselbe Maximalbreite wie die Seite begrenzen.
- **Mobil:** Inhalt darf auf zwei Zeilen umbrechen; keine abgeschnittene Warnung.
- **Zustände:** normal; bei Fokus des Skip-Links darf der Banner nicht darüber liegen; kein Hover- oder Ladezustand.
- **Inhalt:** bestehende Statuscopy ist Platzhalter und muss vor späterer Veröffentlichung durch eine menschliche Entscheidung ersetzt oder entfernt werden.
- **Accessibility:** Kontrast mindestens 4.5:1; Status nicht nur über den Punkt vermitteln; kein `role=alert`, da es keine zeitkritische Meldung ist.
- **Prüfung:** bei 375px vollständig lesbar, kein Overflow, keine falsche Live-Anmutung.

### 5.2 Floating-Glass-Hauptnavigation

**Ziel:** Nutzeraufgabe „Wo bin ich, wohin kann ich als Nächstes und wie starte ich?“ in jedem Scrollzustand beantworten.

- **Semantik:** `header` mit `nav aria-label="Hauptnavigation"`; Wortmarke ist Link zur Startseite; aktuelle Route mit `aria-current="page"`.
- **Position:** im Dokumentenfluss unter dem Preview-Banner, danach `sticky`; `top` ca. 12–16px plus Safe-Area. Beim Scrollen bleibt die Pill an derselben oberen Stelle, nicht nur die Links.
- **Desktopgröße:** Zielhöhe 68–76px; maximal ca. 70rem Breite; horizontaler Innenabstand 12–16px; Abstand zum Viewportrand mindestens 16px.
- **Form:** Radius 999px, weiß-transluzente Fläche, feine helle Kante, dezenter blauer Schatten, `backdrop-filter: blur(...) saturate(...)` nur als Verstärkung. Der Fallback muss ohne Blur gleich verständlich sein.
- **Desktopinhalt:** links Wortmarke, danach die vier bestätigten Pilotziele „Start“, „Leistungen“, „Ablauf“, „Über Nexus“, rechts die primäre Aktion „Projekt skizzieren“.
- **Aktiv:** `aria-current`, Mist-Blau-Hintergrund und zusätzliche 2px-Unterkante oder sichtbarer Marker. Kein alleiniger Farbwechsel.
- **Hover:** leicht blauer Hintergrund und Signalblau; keine Bewegung, die die Pillbreite verändert.
- **Pressed:** dunkleres Blau oder kurze optische Kompression bis maximal 1–2px; Aktion muss immer lesbar bleiben.
- **Focus:** 3px Fokus-Ring außerhalb der Pill, mindestens 3px Abstand. Der Ring darf nicht vom Glasrand verschluckt werden.
- **Mobile geschlossen:** Wortmarke plus Button „Menü“, mindestens 44×44px. Der Button hat `aria-expanded="false"` und `aria-controls`.
- **Mobile geöffnet:** Panel bleibt Teil der Pill oder hängt direkt darunter als zusammenhängende Glasfläche; die Links sind in Lesereihenfolge erreichbar, CTA zuletzt und vollbreit. `aria-expanded="true"`; Escape schließt; Fokus kehrt zum Menü-Button zurück.
- **Scroll:** Öffnen/Schließen reagiert auf die Nutzeraktion. Kein automatisches Ein-/Ausblenden der sticky Navigation, weil die Briefanforderung dauerhaft sichtbare Orientierung ist.
- **Anchor:** Alle Abschnittsziele erhalten `scroll-margin-block-start` für die Pillhöhe plus Sicherheitsabstand.
- **Reduced motion:** keine gleitende Menüanimation; bei `prefers-reduced-motion: reduce` sofortiger Zustandswechsel.

### 5.3 Rechte Desktop-Schnellnavigation

**Ziel:** Auf langen Seiten direkt zu den fünf Hauptabschnitten springen, ohne die Hauptnavigation zu überladen.

- **Sichtbarkeit:** ab dem funktionalen Desktopbereich, empfohlen ab 1280px; auf Tablet nicht fest an den Rand drücken. Nur anzeigen, wenn mindestens drei echte Abschnittsziele existieren.
- **Layout:** vertikale, schmale Glas-Pill rechts, vertikal zentriert, außerhalb des Inhaltsrasters; Label „Abschnitte“ oder ein bestätigtes Äquivalent; darunter 3–5 Links.
- **Linkinhalt:** nicht nur „01“ als sichtbare Information. Nummern dürfen visuell bleiben, `aria-label` muss den Abschnitt nennen, z. B. „Zum Abschnitt Angebot“.
- **Touchziel:** jeder Link mindestens 44×44px; Abstand zwischen Links mindestens 4px.
- **Aktiv:** `aria-current="location"`, blauer Punkt oder gefüllte Fläche und sichtbarer Text/Tooltip bei Hover. Das aktive Ziel wird beim Scrollen nachvollziehbar, ohne dass der Nutzer eine Farbe interpretieren muss.
- **Hover/Focus/Pressed:** Signalblau, klarer Fokus-Ring, keine Verschiebung in den Seiteninhalt.
- **Zustände:** normal, aktiver Abschnitt, Fokus, keine Schiene bei weniger als drei Zielen.
- **Tablet/Mobil:** aufklappbare/inline Abschnittslinks direkt im Inhaltsfluss; auf Mobil keine fixe Schiene.
- **Accessibility:** zweite Navigation erhält eigenes `aria-label`; Zielüberschriften und IDs sind eindeutig; `position: fixed` darf keine Inhalte oder Fokusziele verdecken.

### 5.4 Skip-Link, Seitenrahmen und Footer

- Skip-Link „Zum Inhalt springen“ vor dem Header, bei Fokus vollständig sichtbar.
- Jede Seite: genau eine H1, `main` mit stabilem Ziel, `footer` und logisch benannte Überschriften.
- Der Footer bleibt dunkel, aber kompakt: Wortmarke, Seitenlinks, offene Pflichtseiten. Er ist Kontrastabschluss, keine zweite Marketingfläche.
- Footer-Ziele mindestens 44×44px inklusive logischem Padding; sichtbare Hover-, Active- und Focus-Zustände.
- Rechtstexte bleiben klar als Platzhalter markiert, bis Mara/CEO eine geprüfte Fassung liefern.

### 5.5 Buttons und Textlinks

**Primäraktion:** „Projekt skizzieren“; Signalblau mit weißem Text, mindestens 44px Höhe, sichtbarer Hover-, Pressed- und Fokuszustand. Der Text beschreibt die tatsächliche Aktion.

**Sekundäraktion:** ruhige Outline oder Textlink, z. B. „Leistungen ansehen“; nicht gleich laut wie die Primäraktion.

**Regeln:**

- keine Pfeilzeichen als bloße Dekoration am Ende jedes Textes; ein Pfeil nur, wenn er für Richtung oder externes Ziel semantisch sinnvoll ist;
- Buttons nicht als Fake-Links und Links nicht als Fake-Buttons verwenden;
- auf Mobil bei zwei Aktionen erst Primär-, dann Sekundäraktion; unter 480px volle Breite;
- `:focus-visible` immer vor `:hover` berücksichtigen; aktive Zustände dürfen den Fokus nicht entfernen.

### 5.6 Leistungszeilen, Status- und Proof-Flächen

**Ziel:** Angebot und Belege schnell vergleichbar machen, ohne erfundene Fakten zu erzeugen.

- Leistungen als drei ruhige, horizontal durch Regeln getrennte Zeilen: Richtung, Interface, Übergabe. Nummerierung ist hier eine Inhaltsordnung und bleibt zulässig.
- Desktopspalten: Nummer / Name / Erklärung / Status / Link. Mobil: Nummer und Name oben; Erklärung, Status und Link darunter in derselben Reihenfolge.
- Kein Layoutshift beim Hover; Hintergrund kann sich leicht färben, die Maße bleiben gleich.
- Proof-Flächen zeigen Typ, Status, Titel und kurze Erklärung. Fehlende Inhalte werden mit `[PLATZHALTER …]` oder einem verständlichen Status genannt, niemals mit erfundenen Cases, Logos, Zahlen oder Stimmen.
- Status-Chip erhält Text wie „Offen“ oder „Im Pilot sichtbar“ plus Farbe/Form. Farbe allein reicht nicht.
- Wenn echte Bilder später freigegeben werden: feste Seitenverhältnisse, `object-fit: cover`, alternative Beschreibung und Quellen-/Rechtehinweis im redaktionellen Datensatz; keine Stockbilder ohne Freigabe.

### 5.7 Prozess-Rail

**Ziel:** Die vier Schritte als echte Abfolge verstehen.

- Reihenfolge: Einordnen → Strukturieren → Systematisieren → Übergeben.
- Desktop als horizontale Linie mit vier Stationen; Mobil als vertikale Linie mit verbundenen Stationen.
- Nummern und Linie sind hier semantisch gerechtfertigt.
- Keine automatische Schrittanimation; Nutzer kann die Inhalte sofort lesen.
- Aktiver Schritt nur verwenden, wenn es tatsächlich eine Interaktion oder aktuelle Phase gibt; sonst statischer Prozess.

### 5.8 Kontakt- und Formularkomponente

Im aktuellen Pilot ist **kein Formular und kein Versandweg freigegeben**. Die Kontaktseite bleibt daher ein Status- und Orientierungsbereich. Jonas soll keinen scheinbar funktionierenden Submit-Flow ergänzen.

Für eine spätere freigegebene Form gelten als Designvorgabe: sichtbare Labels, Pflichtfeldhinweise vor dem Absenden, Inline-Fehler am Feld mit Text, zusammenfassende Fehlerüberschrift, Tastaturreihenfolge, Erfolgsmeldung mit gleicher Aktionssprache und Link zur geprüften Datenschutzerklärung. E-Mail, Telefon, Speicher- oder Trackingverhalten erst nach menschlicher Freigabe ergänzen.

## 6. Seitenspezifikationen

### 6.1 Startseite · `index.html`

**Ziel:** In wenigen Sekunden Positionierung und nächsten sinnvollen Schritt verstehen; danach Angebot, Vertrauensstatus und Vorgehen prüfen.

**Nutzeraufgaben:**

1. „Passt dieses Studio-/Systemversprechen zu meinem Bedarf?“
2. „Welche Leistungen und welcher Ablauf sind gemeint?“
3. „Welche Belege sind real und was ist noch offen?“
4. „Wie komme ich zum nächsten Projektgespräch?“

**Layoutfluss:** Preview-Banner → Floating-Pill → Hero → Angebot → Proof/Status → Prozess → Prinzipien/Passung → CTA-Band → Footer.

**Hero:** links H1 und kurzer Nutzen, primäre Aktion „Projekt skizzieren“, sekundäre Aktion „Leistungen ansehen“; rechts UI-Spezimen oder später freigegebenes Bild. Das aktuelle UI-Spezimen bleibt als interner Platzhalter gekennzeichnet und darf nicht wie ein Kundenprojekt aussehen.

**Visuelle Hierarchie:** H1 zuerst; CTA-Gruppe zweitens; UI-Spezimen als unterstützendes Signal, nicht als Konkurrenz zur H1. Die drei Arbeitsfelder darunter als kleine Orientierung, nicht als vierte Navigation.

**Breakpoints:**

- ab 1024px: 7/5-Raster, Spezimen rechts; Hero nicht höher als ungefähr ein Viewport, damit der nächste Abschnitt sichtbar angeteasert wird;
- 768–1023px: einspaltig, Copy vor Spezimen; Aktionen bleiben nebeneinander, wenn beide mindestens 44px Höhe behalten;
- unter 768px: H1 maximal ca. 3–5 Zeilen; Spezimen unter den Aktionen; Aktionen stapeln unter 480px;
- rechte Schnellnavigation zeigt auf `start`, `angebot`, `proof`, `vorgehen`, `kontakt` und bleibt nur auf großem Desktop fest.

**Zustände und Inhalte:** normaler Pilotstatus; Proof-Slots „Offen“; kein Testimonial oder Projektbild ergänzen, bis Mila Quellen und Rechte liefert. Der CTA darf im Pilot nur zur Kontakt-Statusseite führen.

**Accessibility:** H1 als `aria-labelledby` für Hero; dekorative Ringe/Specimenlinien `aria-hidden`; alle CTA-Texte eindeutig; Abschnitts-IDs stabil; Kontrast der hellen Hero-Copy prüfen.

**Prüfliste:** H1 ohne Umweg verständlich; eine klare Primäraktion; keine erfundenen Belege; Hero und Navigation bleiben bei 375/768/1440px lesbar; nach Scroll bleibt die Pill sichtbar.

### 6.2 Leistungen · `leistungen.html`

**Ziel:** Leistungsumfang vergleichen und Abgrenzung verstehen, ohne Preis- oder Ergebnisversprechen zu erfinden.

**Nutzeraufgabe:** Einordnen, ob Richtung, Interface und Übergabe zum Bedarf gehören; danach zum Ablauf oder zur Kontakt-Statusseite weitergehen.

**Layout:** Page-Hero mit H1 und kurzer Einordnung → drei Leistungszeilen → „Was enthalten / nicht enthalten“ als klare Gegenüberstellung → nächster Schritt.

**Hierarchie:** Leistungsname und konkrete Erklärung vor Statuslabel; die Abgrenzung ist Vertrauensinformation, kein Kleingedrucktes.

**Breakpoints:** Desktop fünf Spalten in den Zeilen; Tablet zwei Ebenen; Mobil Nummer/Name, Erklärung, Status und Link untereinander. Gegenüberstellung auf Mobil untereinander statt zwei zu schmaler Spalten.

**Zustände:** Hover verändert nur Fläche oder Linkfarbe; offene Punkte bleiben mit Text sichtbar. Kein Preisfeld und keine automatische Auswahl, solange Mila keine freigegebene Angebotslogik liefert.

**Accessibility:** `article`-Überschriften in H3-Reihenfolge; Links beschreiben Ziel; Status-Chips werden als Text gelesen; Tabellenwirkung nicht mit reinem CSS simulieren, wenn echte tabellarische Daten hinzukommen.

**Prüfliste:** drei Leistungen in gleicher Struktur; Scope-Abgrenzung im ersten Scan auffindbar; CTA nur mit realer Zielseite; auf Mobil keine horizontalen Rows.

### 6.3 Ablauf · `ablauf.html`

**Ziel:** Vorgehen transparent machen und Unsicherheit durch sichtbare Prüfspur reduzieren.

**Nutzeraufgabe:** Reihenfolge und Übergabepunkte verstehen; erkennen, was lokal geprüft ist und was menschliche Freigabe benötigt.

**Layout:** Page-Hero → Prozess-Rail mit vier echten Schritten → Prüfspur (Links, Zustände, Freigaben) → Übergabe/Restpunkte → CTA.

**Breakpoints:** horizontale Prozesslinie ab 768px; vertikale Linie darunter; Nummern bleiben lesbar, aber nicht als alleinige Bezeichnung.

**Zustände:** statische Schritte; „Für QA bereit“ und „Noch offen“ als klarer Status. Kein animierter Fortschrittsbalken und kein falscher „abgeschlossen“-Status.

**Accessibility:** `ol` für die Reihenfolge; jede Station mit H3; Statuskarten als `article` oder `aside` mit verständlicher Überschrift; Fokusreihenfolge folgt der visuellen Prozessrichtung.

**Prüfliste:** vier Schritte sind eindeutig; Unterschied zwischen statischem QA-Befund und offenem Browser-/Freigabestatus bleibt sichtbar; keine verbindliche Abnahme formuliert.

### 6.4 Über Nexus · `ueber-nexus.html`

**Ziel:** Arbeitsprinzipien und Grenzen des Piloten erklären, ohne eine nicht freigegebene Marke oder Referenz zu behaupten.

**Nutzeraufgabe:** Haltung und Arbeitsweise bewerten; erkennen, welche Aussagen Annahmen sind.

**Layout:** Page-Hero → Prinzipien → Passung/Arbeitsannahmen → offener Marken-/Proof-/Release-Status → Footer-CTA.

**Visuelle Hierarchie:** Prinzipien über konkrete Claims; Statuskarten sind nüchtern und dürfen nicht wie Testimonials wirken.

**Breakpoints:** drei Prinzipien als Raster ab 768px, einspaltig darunter; dunkler Statusbereich höchstens als kurzer Kontrastabschluss.

**Zustände/Inhalte:** Wortmarke und N-Signet als „interne Text-/CSS-Darstellung“ markieren; keine „wir haben“-Aussagen ohne Freigabe; offene Fragen direkt benennen.

**Accessibility:** Status nicht nur durch blau/dunkel unterscheiden; Links für weitere Informationen mit Ziel benennen; ausreichender Kontrast im dunklen Statusbereich.

**Prüfliste:** keine implizite Kundenreferenz; Annahmen und Fakten getrennt; Seite wirkt trotz Platzhaltern bewusst und vertrauenswürdig.

### 6.5 Kontakt · `kontakt.html`

**Ziel:** Den nächsten Schritt zeigen, ohne eine nicht existente Kontaktverarbeitung vorzutäuschen.

**Nutzeraufgabe:** verstehen, dass die Stelle im Pilot vorbereitet, aber nicht aktiv ist; zurück zu Leistungen oder Ablauf navigieren.

**Layout:** Page-Hero → prominente Statusfläche `#kontakt-status` → Orientierung mit Leistungen/Ablauf → Footer.

**Zustände:** Status „Kontaktstelle im Pilot bewusst offen“; kein Submit-, Lade-, Erfolgs- oder Fehlzustand, weil keine Form existiert. Der Button muss „Kontakt-Platzhalter öffnen“ oder einen entsprechend freigegebenen Text tragen, nicht „Absenden“.

**Accessibility:** Statusfläche als `aside`/`role="note"` mit H2; keine deaktivierte Fake-Schaltfläche; sichtbare Links zu den nächsten Informationsseiten.

**Prüfliste:** kein Formular, keine E-Mail-/Telefonerfindung, kein Tracker, kein Versand; Status bei jedem Viewport lesbar.

### 6.6 Impressum und Datenschutz · `impressum.html`, `datenschutz.html`

**Ziel:** Informationsarchitektur vollständig verlinkt halten, ohne ungeprüfte Rechtsinhalte als fertig auszugeben.

**Layout:** Page-Hero mit „Pflichtseite · offen“ → Statuskarte → kurzer interner Hinweis → jeweils andere Pflichtseite/Startseite.

**Visuelle Hierarchie:** Platzhalterstatus zuerst; kein dekoratives Marketingbild; Links zu rechtlichen Seiten im Footer sichtbar, aber mit „Platzhalter“ benannt.

**Breakpoints:** Standard-Page-Hero und eine Spalte auf Mobil; keine rechte Schnellnavigation, wenn weniger als drei sinnvolle Abschnittsziele vorhanden sind.

**Accessibility:** klare H1, `role="note"` nur für den Status, keine vorgetäuschte Einwilligung oder Rechtsberatung; Links mit vollständigem Zieltext.

**Prüfliste:** keine erfundenen Unternehmens-, Hosting-, Verarbeitungs- oder Kontaktdaten; deutliche Nichtveröffentlichungsgrenze; Fokus und Kontrast wie im Rest der Shell.

## 7. Priorisierte Übergabe an Jonas

### P0 · Muss vor technischer Übergabe erfüllt sein

1. Floating-Pill als ein zusammenhängendes, sticky Element umsetzen; Top-Offset, z-index, Safe-Area und Anchor-Offset dokumentieren.
2. Glasoptik mit sichtbarem Fallback ohne Blur; Kontrast nicht von Transparenz abhängig machen.
3. Desktop-Right-Rail ab funktionaler Breite mit mindestens 44px Zielen, verständlichen Labels und aktivem Abschnittszustand.
4. Mobile Navigation als zugängliche Disclosure statt gequetschter oder unbedienbarer Zweizeilen-Pill; Escape, Fokus-Rückgabe und `aria-expanded` berücksichtigen.
5. Primärfarbe über semantische Blue-Tokens führen; alte `lime`-Bezeichnungen und doppelte v3/v4-Tokenüberschreibungen bereinigen.
6. Keine Layoutverschiebung bei Hover; besonders die aktuelle horizontale Padding-Animation der Leistungszeilen entfernen oder durch eine maßgleiche Fläche ersetzen.

### P1 · Muss vor Nora-QA vorliegen

1. Alle sieben Seiten verwenden dieselbe Shell und dieselbe Navigationsreihenfolge.
2. Right-Rail-Ziele stimmen je Seite mit tatsächlichen IDs überein; bei weniger als drei Zielen wird sie nicht gerendert.
3. CTA-Texte und Statuscopy sind auf eine Handlung bzw. einen Status begrenzt.
4. Preview-Banner, Platzhalter, fehlende Proofs, Kontaktstatus und Rechtstexte bleiben eindeutig gekennzeichnet.
5. `prefers-reduced-motion`, sichtbare `:focus-visible`-Ringe, `aria-current`, Skip-Link und 44px Touch-Ziele sind implementiert.

### P2 · Nach Inhalts- und Markenfreigabe

1. Logo, finale Blautöne, Schrift und Bildbehandlung ersetzen die Arbeitsannahmen.
2. Mila ersetzt synthetische Copy; Proof-Assets werden nur mit Quelle und Recht eingesetzt.
3. Kontaktformular/Versandweg wird separat spezifiziert und rechtlich geprüft.

## 8. Prüfkriterien für Nora

Nora prüft unabhängig in einer lokalen Vorschau bei mindestens 375px, 768px, 1024px und 1440px:

- Header ist im ersten Viewport sichtbar und nach mindestens zwei Viewporthöhen Scrollweg weiterhin am gleichen oberen Ort sichtbar.
- Pill bleibt zusammenhängend; Glas-Fallback ist bei deaktiviertem Blur verständlich; kein Text liegt unter dem Header.
- Right-Rail erscheint nur im Desktopbereich, ragt nicht in den Inhalt und verdeckt keine Fokusziele.
- Mobile Menübutton ist mindestens 44×44px, per Tastatur bedienbar, benennt geöffnet/geschlossen korrekt und gibt Fokus nach Escape zurück.
- Keine horizontale Überbreite, keine abgeschnittenen Preview-/Statushinweise, keine unlesbaren zweizeiligen Nav-Labels.
- Fokus ist auf hellen, blauen und dunklen Flächen sichtbar; Tastaturreihenfolge folgt der Inhaltsreihenfolge.
- Link- und CTA-Ziele sind lokal vorhanden; Abschnittslinks führen zu echten IDs und berücksichtigen die sticky Pill.
- Textkontrast und UI-Kontrast werden mit den final verwendeten Farben geprüft; Farbe ist nie der einzige Statusindikator.
- Reduced Motion deaktiviert unnötige Übergänge; Hover ist kein notwendiger Bedienweg.
- Keine externen Assets, Tracker, Formulare oder Veröffentlichungsaktionen in dieser Vorschau.
- Inhaltliche QA trennt bestätigte Angaben, Arbeitsannahmen, Platzhalter und offene Freigaben sichtbar.

## 9. Offene Entscheidungen und Zuständigkeiten

| Entscheidung | Benötigte Stelle | Auswirkung |
| --- | --- | --- |
| Finale Navigation und Abschnittsnamen | Tessa | Labels, Right-Rail-Ziele und Anker |
| Freigegebene Copy | Mila | H1, CTA, Status- und Proof-Texte |
| Markenblau, Logo, Schrift, Bilder | Mara / CEO | Tokenwerte, Wortmarke, Asset-Freigabe |
| Kontaktweg und Datenverarbeitung | Mara / zuständige menschliche Stelle | Formular-, Erfolgs-, Fehler- und Rechtstexte |
| Impressum und Datenschutz | zuständige menschliche Stelle | Veröffentlichungsfähigkeit |
| Technische Umsetzung | Jonas | HTML/CSS/Interaktion nach dieser Spezifikation |
| Unabhängige Prüfung | Nora | visuelle, responsive und barrierearme Übergabereife |

**Empfohlene nächste Rolle:** Jonas übernimmt die technische Umsetzung dieser Spezifikation in der lokalen Vorschau. Danach Nora mit den Kriterien aus Abschnitt 8. Keine Veröffentlichung und keine Kundenkommunikation aus diesem Dokument ableiten.
