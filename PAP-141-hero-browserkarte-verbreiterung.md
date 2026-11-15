# PAP-141 · Hero-Browserkarte verbreitern und Cards kompakter spezifizieren

**Stand:** 15.11.2026 · interne Design-Spezifikation für die lokale Preview
**Adressat:** Jonas (Umsetzung) · Mara/CEO für offene Freigaben
**Kontext:** PAP-116 / One-Page-Preview, bestehende Komposition in `pilot-website/index.html` und `pilot-website/styles.css`
**Abgrenzung:** keine Nora-QA, keine Produktion, keine Veröffentlichung, kein Kundenkontakt

## 1. Ziel und unveränderlicher Rahmen

### Nutzerziel

Die rechte Hero-Visualisierung soll in wenigen Sekunden zeigen, wie eine klar strukturierte Website aussehen kann. Sie unterstützt die linke Lesespur aus H1, Lead und CTAs; sie ist kein zweiter Conversion-Pfad und kein Leistungs- oder Kundenbeleg.

### Nutzeraufgabe

Besucherinnen und Besucher sollen links Angebot und nächsten sinnvollen Schritt verstehen und rechts eine ruhige Systemansicht einordnen können: Browserrahmen, Intro, neutraler Bildplatzhalter und drei gleichartige Mini-Karten. Die Overlay-Cards geben nur zusätzliche Orientierung.

### Unverrückbare Grenzen

- Linke Hero-Copy, One-Page-IA, Farbrollen, Typografie, CTA-Ziele und übrige Sektionen bleiben unverändert.
- Die Browserkarte darf in den freien Raum links innerhalb der visuellen Reserve wachsen, aber niemals die Copy-Spalte verschieben, überdecken oder deren Textmaß verkleinern.
- Das Spezimen bleibt ein nicht interaktives HTML/CSS-Arbeitsartefakt. Keine echte Domain, kein Tracking, kein Submit und kein interaktiver Mockup-Button.
- `+ 800 %` bleibt eine interne Konzeptzahl. Sie darf nicht wie ein Nexus-Ergebnis, ein Case oder ein Erfolgsversprechen wirken.
- Keine fremden Marken, Logos, Ortsnamen, Kundennamen, echten Projektbilder oder unbelegten Leistungsversprechen ergänzen.

### Korrektur gegenüber PAP-139

Diese Spezifikation ist die aktuelle Nachschärfung für PAP-116. Die frühere Idee eines dekorativen Mockup-Buttons wird ausdrücklich verworfen: Im Browser-Inhalt gibt es keinen Button-Slot und keine Button-Copy. Ein neutraler Bildplatzhalter und die drei Mini-Karten sind die sichtbaren Inhalte unterhalb des Intro-Texts.

## 2. Gestaltungsrichtung und Begründung

Die eine charakteristische Hero-Entscheidung ist die **breitere, leicht geneigte Browserkarte**. Sie nutzt die bisher freie Fläche innerhalb des rechten Visual-Raums, macht die Website-Struktur schneller erfassbar und lässt die linke Conversion-Lesespur unangetastet. Alles innerhalb der Karte bleibt ruhig und neutral, damit die Größe nicht mit einer echten Produktdemo verwechselt wird.

### Bestehende Nexus-Rollen

Keine neue Farb- oder Typografierolle einführen:

| Rolle | Referenz | Einsatz |
| --- | --- | --- |
| Ink | `#0b2341` | Überschrift, starke Textinformation |
| Ink-deep | `#071a32` | Wert und stärkste Kontraste |
| Paper | `#f5f9fe` / `#ffffff` | Browser- und Card-Flächen |
| Signal | `#1558d6` | vorhandener Akzent; in der Visualisierung sparsam |
| Mist | `#dcebff` | Icon-Flächen, Bild- und Skeleton-Platzhalter |
| Muted | `#5b6f87` | Erklärung, Labels und Preview-Schutz |

Typografie, Schriftfamilien und vorhandene Nexus-Skalen bleiben bestehen. Titel und Wert erhalten Priorität über Erklärung und Skeletons; keine neue Display-Schrift, keine zusätzlichen Versalien-Labels und keine dekorative Monospace-Fläche.

### Review gegen generische Defaults

- Die Browserkarte ist das eine prägnante Element; die Overlay-Cards werden kleiner und flacher statt als gleichwertige SaaS-Kartenwand behandelt.
- Drei Mini-Karten sind gleichartig und bewusst skelettiert. Sie stellen keine drei Produkte, Rankings oder Cases dar.
- Es gibt keinen Page-Load-Stagger, keinen Zählerlauf, kein Glow und keine zusätzliche Verlaufsschicht.
- Text bleibt linksbündig; die innere Zweispalte der Browserkarte dient der räumlichen Erklärung „Intro links, Bildfläche rechts“.

## 3. Zielgeometrie und Wireframe

### Desktop ab ca. 1024px, Zielbild ab 1200px

```text
[ bestehende Hero-Copy unverändert ]     [ obere Card: Anfragen gesteigert ]
[ H1 → Lead → CTAs → Status ]      ┌────────────────────────────────────┐
                                    │ • • •  Nexus / Vorschau             │
                                    │ Titel + 2–3 Zeilen │ Bildplatzhalter │
                                    │                    │                │
                                    │ ───────── Placeholder-Zeile ─────── │
                                    │ [Mini] [Mini] [Mini]                │
                                    │ optional: ruhige Skeleton-Flächen  │
                                    └────────────────────────────────────┘
                                                       [ untere Card ]
```

- Die rechte Visual-Bühne bleibt eine eigene, begrenzte Positionierungsfläche.
- Die Browserkarte wird gegenüber dem aktuell gerenderten Desktop-Bestand um ungefähr **30–40 % in der Breite** vergrößert. Referenz ist die sichtbare Border-Box bei gleicher Viewportbreite, nicht eine fixe Pixelzahl.
- Die Verbreiterung nutzt zuerst den freien Bereich links innerhalb von Visual-Bühne und bestehendem Grid-Gap. Die Copy-Spalte behält ihre aktuelle Breite und Position.
- Die Browserkarte darf nicht in den Textbereich ragen. Zwischen Browserkante beziehungsweise oberer Card und Copy/Fokusgutter bleibt ein klarer Sicherheitsabstand.
- Browserkarte `z-index: 0`; Overlay-Cards `z-index: 2`. Die Cards liegen frontal über dem Browser und bleiben `rotate(0)`.
- Die Browserkarte behält eine geringe Gegenuhrzeiger-Neigung von ungefähr `-1.5deg` bis `-2deg`. Die Neigung dient als Arbeitsartefakt-Signal, nicht als perspektivische Verzerrung des Textes.
- Ab 1440px bleibt zur Section-Rail beziehungsweise zum Fokusgutter ein Abstand von mindestens 16px. Keine Komponente wird von der Rail oder vom Viewport angeschnitten.

### Kompakte Größenlogik der Overlay-Cards

- Beide Cards sind deutlich kleiner und flacher als die Browserkarte und kompakt horizontal aufgebaut: Iconfläche links, Textblock rechts.
- Richtwert Desktop: `inline-size: clamp(11.5rem, 46%, 14.5rem)` der Visual-Bühne; obere Card darf wegen der Schutzcopy in der Höhe inhaltsgetrieben wachsen.
- Richtwert Innenraum: `0.65–0.8rem` Padding, Iconfläche ungefähr `1.75–2rem`, Abstand zwischen Icon und Copy ungefähr `0.5–0.6rem`.
- Kein fixer Höhenwert, der Label, Wert oder Demo-Schutz abschneidet. Keine Ellipse für Schutz- oder Statuscopy.
- Obere Card: oben links verankert. Untere Card: unten rechts verankert. Beide bleiben innerhalb der Bühne und werden nicht perspektivisch mitgeneigt.

## 4. Komponente A · breite Browser-/Website-Karte

### Ziel und Nutzeraufgabe

**Ziel:** Eine neutrale Website-Struktur als visuelle Antwort auf „Wie kann ein klarer Webauftritt wirken?“ zeigen.
**Nutzeraufgabe:** Browserrahmen, Intro, Bildfläche und gleichartige Inhaltsmodule in einer einzigen ruhigen Lesespur erfassen, ohne eine echte Website bedienen zu wollen.

### Layoutstruktur

1. Browserleiste mit drei gleichartigen, neutralen Punkten und flexiblem Adressfeld.
2. Breite innere Kopfzone: links Nexus-passende Überschrift und genau zwei bis drei kurze Erklärungszeilen; rechts ein großer, abstrakter Bildplatzhalter.
3. Darunter eine optionale, neutrale Placeholder-Zeile beziehungsweise Inhaltsfläche über die verfügbare Breite.
4. Darunter drei gleichartige Mini-Karten nebeneinander. Jede Mini-Karte enthält:
   - eine kleine Icon-Fläche,
   - eine Skeleton-Zeile,
   - zwei kurze Platzhalterzeilen.
5. Weitere Skeleton-Flächen sind optional und dürfen nur Tiefe andeuten; sie dürfen die Mini-Karten nicht optisch überbieten.

### Inhalte und Platzhalter

- Browserlabel: `Nexus / Vorschau` — internes Label, keine URL und keine Domain.
- Titel: `Leistungen klar zeigen.`
- Erklärung: `Struktur, Gestaltung und der nächste Schritt auf einen Blick.`
- **Kein Mockup-Button und keine Button-Attrappe.** Es gibt keine Handlung innerhalb des Browser-Spezimens.
- Bildplatzhalter bleibt neutral, abstrakt und klar als Platzhalter erkennbar. Keine Stock- oder Kundenaufnahme einsetzen.
- Mini-Karten bleiben ohne Zahlen, Logos, Namen, reale Leistungsdaten oder Ranking-Signale.

### Visuelle Hierarchie

Browserleiste → Titel → kurze Erklärung → großer Bildplatzhalter → Mini-Karten → optionale Skeleton-Tiefe. Die drei Mini-Karten sind gleichwertig; keine erhält Signalblau, größere Typografie oder einen stärkeren Schatten als die anderen.

### Verhalten je Breakpoint

- **≥ 1200px:** Browserkarte 30–40 % breiter als der aktuelle Desktop-Bestand, ohne die linke Copy-Spalte zu verändern. Intro links und Bildplatzhalter rechts. Mini-Karten bleiben in einem Dreier-Raster.
- **1024–1199px:** Breite so weit wie ohne Copy-Kollision erweitern; Browser bleibt die größte Fläche. Innere Zweispalte nur, wenn Titel und Erklärung mindestens ungefähr 28ch lesbar behalten; sonst Bildplatzhalter unter dem Intro. Drei Mini-Karten bleiben nebeneinander, solange Iconfläche und Skeletonzeilen als Form erkennbar bleiben.
- **901–1023px:** Rechte Visualisierung nur zweispaltig belassen, wenn Browser, Cards und Copy ohne Quetschen passen. Die linke Hero-Copy bleibt im bestehenden Track; bei fehlender Reserve wird die Visualisierung unterhalb der Copy geführt.
- **≤ 900px:** Hero in bestehender Reihenfolge untereinander: Copy zuerst, Visualisierung danach. Browser innerhalb der Bühne voll nutzbar; kein Übergreifen in die Copy.
- **≤ 767px:** Intro, Bildplatzhalter, Placeholder-Zeile und Skeleton-Inhalt einspaltig. Drei Mini-Karten bleiben nur dann nebeneinander, wenn jede Karte als Form erkennbar bleibt; sonst zweispaltig oder untereinander.
- **≤ 600px / 375px:** Browser als Hintergrundfläche der Bühne, Cards in klarer oberer/unterer Lesespur. Die Bühne wächst mit dem Inhalt. Kein horizontales Scrollen und kein Abschneiden am unteren Rand.

### Zustände und Verhalten

- Statisches, nicht interaktives Spezimen: kein Hover, kein Fokus, kein Loading und kein Fake-Submit.
- Browserkarte reagiert nicht auf Pointer- oder Tastaturereignisse.
- Die Karte darf sich nicht selbstständig inhaltlich verändern. Keine Counter-Animation und kein Page-Load-Reveal.

### Accessibility-Hinweise

- Das Browser-Spezimen bleibt `aria-hidden="true"`, solange es nur visuelles Muster ist.
- Die umgebende `aside` behält die vorhandene verständliche Überschrift `Interne Preview des Website-Systems`.
- Punkte, Linien, Iconflächen und Skeletons sind dekorativ; keine eigene Semantik und kein `tabindex`.
- Forced Colors: Browsergrenze, Adressfeld und Mini-Karten müssen auch ohne Schatten und Hintergrundfarbe unterscheidbar bleiben.

### Prüfliste

- [ ] Browserkarte bei ≥1200px ungefähr 1,30–1,40× der bisherigen sichtbaren Breite.
- [ ] Linke Hero-Copy, H1-Zeilenmaß und CTA-Position unverändert.
- [ ] Drei Punkte und neutrales Adressfeld sichtbar; keine echte URL.
- [ ] Intro enthält eine Überschrift und nur zwei bis drei kurze Erklärungszeilen.
- [ ] Kein Mockup-Button, kein Link und keine Submit-Attrappe im Browser.
- [ ] Bildplatzhalter steht auf breiten Viewports rechts neben dem Intro.
- [ ] Drei gleichartige Mini-Karten mit Iconfläche, Skeleton-Zeile und zwei kurzen Platzhalterzeilen vorhanden.
- [ ] Keine horizontale Überbreite bei 375/600/768/1024/1440px.

## 5. Komponente B · obere linke Preview-Card

### Ziel und Nutzeraufgabe

**Ziel:** Die Konzeptzahl zeigen und gleichzeitig vor einer Fehlinterpretation als belegtes Ergebnis schützen.
**Nutzeraufgabe:** Kontextzeile, Wert und sichtbaren Demo-Schutz in einer kurzen Lesespur unterscheiden.

### Layoutstruktur und Inhalte

```text
[ Iconfläche ] [ Anfragen gesteigert ]
               [ + 800 %             ]
               [ Demo-/Konzeptwert · nicht belegt ]
```

- Exakte Copy: `Anfragen gesteigert` / `+ 800 %`.
- Sichtbare Schutzcopy direkt unter dem Wert oder als ruhige Microcopy im Textblock: `Demo-/Konzeptwert · nicht belegt`.
- Icon links als neutrales Linien-Icon für Verlauf/Anfragen; kein Logo und keine fremde Markenmetapher.
- `data-preview-only="true"` bleibt erhalten. Die Card bleibt nicht klickbar.

### Visuelle Hierarchie und Verhalten

- Label ruhig, Wert klar und kräftig, Schutzcopy sichtbar aber nicht alarmistisch.
- Kein Rot-/Grün-Signal, kein Haken und kein Diagramm, das einen Erfolg beweisen könnte.
- Desktop/Tablet oben links vor dem Browser, frontal. Mobil linksbündig als erste Card.
- Die Schutzcopy darf umbrechen; Card-Höhe ist inhaltsgetrieben.

### States und Accessibility

- Keine Hover-, Pressed- oder Fokusvisualisierung, da keine Interaktion.
- Ruhige Drift ist optional: nur gesamte Card, maximal etwa 4px vertikal, ungefähr 6–8 Sekunden, ohne Scale oder Rotation.
- Icon `aria-hidden="true"`, `focusable="false"`; Card-Text bleibt im Accessibility Tree.
- `aria-describedby="hero-preview-note"` und der vorhandene vollständige Hinweis bleiben erhalten oder semantisch gleichwertig. Die sichtbare Microcopy darf bei doppelter Ansage `aria-hidden="true"` sein.
- Der Wert darf nicht ohne Schutzcopy im Accessibility Tree erscheinen.

### Prüfliste

- [ ] Copy exakt und vollständig lesbar.
- [ ] Sichtbarer Demo-Schutz direkt an der Card vorhanden.
- [ ] Card kompakt-horizontal, deutlich kleiner/flacher als Browser und nicht gedreht.
- [ ] Keine Leistungs-, Kunden- oder Case-Anmutung.

## 6. Komponente C · untere rechte Preview-Card

### Ziel und Nutzeraufgabe

**Ziel:** Den nächsten sinnvollen Schritt als konzeptionelle Strukturidee benennen, ohne eine zweite CTA oder ein Leistungsversprechen zu erzeugen.
**Nutzeraufgabe:** Die Karte als ruhigen Abschluss der Visualisierung lesen: von der Idee zur verständlichen Website.

### Layoutstruktur und Inhalte

```text
[ Iconfläche ] [ Klarer nächster Schritt ]
               [ Von der Idee zur Website ]
```

- Exakte Copy: `Klarer nächster Schritt` / `Von der Idee zur Website`.
- Gleiches Icon-/Text-Schema wie Card B; Icon als neutrales Linien-Icon für Weg/Übergang.
- Unten rechts an der Browserkarte verankert, frontal und kompakt-horizontal.

### Verhalten, States und Accessibility

- Desktop/Tablet unten rechts; Mobil rechts unten beziehungsweise nach Card B in der linearen Lesespur.
- Bei zu geringer Breite untereinander setzen, niemals seitlich aus dem Viewport schieben.
- Nicht klickbar, nicht fokussierbar, keine Button-/Link-Semantik. Gleiche ruhige Driftregeln wie die obere Card oder im Reduced-Motion-Modus statisch.
- Card-Text, Icon-Semantik und Kontrastregeln entsprechen Card B; keine Bedeutung allein über das Icon.

### Prüfliste

- [ ] Exakte Copy vollständig lesbar.
- [ ] Unten rechts beziehungsweise in mobiler Lesespur eindeutig verankert.
- [ ] Geometrie austauschbar mit Card B, ohne Preview-Zahl zu übernehmen.
- [ ] Bei 375px vollständig innerhalb des Viewports.

## 7. Responsive-, Layering- und Overflow-Kontrakt

| Viewport | Zielzustand |
| --- | --- |
| 375 × 812 | Copy zuerst; Browser vollständig sichtbar; Cards ohne Abschneiden; Schutzcopy darf umbrechen; kein horizontaler Overflow. |
| 600 × 900 | Browser als Bühnenfläche; Cards oben links/unten rechts oder linear, wenn die Breite nicht reicht; Mini-Karten ohne unlesbare Quetschung. |
| 768 × 900 | Hero stabil untereinander; Browser größte Fläche; Intro/Bildfläche sinnvoll gestapelt; Card-Reihenfolge eindeutig. |
| 1024 × 900 | Zweispaltiger Hero nur mit ausreichender Reserve; Browser gegenüber Bestand sichtbar verbreitert, ohne Copy-Kollision. |
| 1440 × 900 | Desktop-Zielbreite 30–40 % über Bestand; Rail-/Fokusgutter mindestens 16px; alle Karten innerhalb der Bühne. |

### Messbare Regeln

- `min-inline-size: 0` an Hero-, Browser- und Card-Textcontainern beibehalten.
- Keine feste Card-Höhe, die Schutzcopy oder den zweizeiligen unteren Wert abschneidet.
- Keine negative Positionierung ohne gleich große Bühnenreserve. Eine Erweiterung in den freien Grid-Gap-Bereich ist nur zulässig, wenn die Copy-Spalte und der Fokusgutter frei bleiben.
- `document.documentElement.scrollWidth <= window.innerWidth` bleibt späterer technischer/browserbasierter Prüfpunkt; diese Spezifikation ist keine Nora-QA.
- Browserleiste, Adressfeld, Bildplatzhalter, Mini-Karten und Overlay-Cards bleiben innerhalb ihrer jeweiligen Geometrie.

## 8. Bewegung, Reduced Motion und Forced Colors

- Browserkarte bleibt statisch; keine Parallax-, Puls-, Reveal- oder Zähleranimation.
- Falls Card-Drift beibehalten wird: nur `transform: translate3d` auf der gesamten Card, ungefähr 6–8 Sekunden, maximal etwa 4px vertikal, ohne Layoutshift.
- `prefers-reduced-motion: reduce`: sämtliche Card-Animationen entfernen; statische Browserneigung darf als Layoutentscheidung bestehen bleiben.
- `forced-colors: active`: Border, Iconfläche, Adressfeld und Mini-Karten mit Systemfarben sichtbar halten; Schatten nicht voraussetzen.
- Hover verändert keine nicht interaktiven Cards. Die bestehenden Hero-CTAs behalten ihre vorhandenen Hover-, Pressed- und `:focus-visible`-Zustände.

## 9. Offene Entscheidungen und Übergabe

| Thema | Aktuelle Designentscheidung | Zuständig |
| --- | --- | --- |
| Browserbreite | Ziel 30–40 % über aktuellem Desktop-Bestand, zuerst in freiem linken Visual-/Gap-Raum | Jonas setzt um; bei Geometriekonflikt an Mara/CEO melden |
| Mockup-Button | entfällt gemäß aktuellem Nutzerbrief; keine Button-Attrappe | Jonas entfernt den bestehenden Slot |
| Intro-Copy | bestehende Nexus-Arbeitscopy beibehalten | Mila/Tessa nur bei späterer Copy-Freigabe |
| Bildplatzhalter | neutraler HTML/CSS-Slot, keine echte Medienquelle | Mila/Mara/CEO bei späterer Medienfreigabe |
| `+ 800 %` | ausschließlich interner Konzeptwert mit sichtbarem Schutz | Mara/CEO bestätigen Statussprache |
| QA und Produktion | nicht Bestandteil dieser Aufgabe | Nora/Jonas in getrenntem Folgeauftrag |

**Konfliktmeldung:** PAP-139 enthält noch Empfehlungen für einen dekorativen Mockup-Button. Die aktuelle Nutzeranweisung „kein Mockup-Button“ hat Vorrang; Jonas soll die frühere Button-Empfehlung nicht zusätzlich umsetzen. Die übrige Browser-/Card-Komposition, insbesondere neutrale Platzhalter, frontales Layering und Preview-Schutz, bleibt als Bestand erhalten.

## 10. Priorisierte Prüfliste für Jonas

**P0 · Nutzerführung und Vertrauen**

- [ ] Linke Hero-Copy, CTAs, One-Page-IA und bestehende Typografie unverändert.
- [ ] Browserkarte auf Desktop ungefähr 30–40 % breiter; freier Raum links genutzt, ohne Copy-Verschiebung oder Überdeckung.
- [ ] Kein Mockup-Button und keine interaktive Semantik innerhalb der Browserkarte.
- [ ] `+ 800 %` mit sichtbarem und semantischem Demo-Schutz versehen.

**P1 · Struktur und Responsive**

- [ ] Browserleiste mit drei neutralen Punkten und Adressfeld sichtbar.
- [ ] Intro links mit 2–3 Zeilen, großer neutraler Bildplatzhalter rechts.
- [ ] Drei gleichartige Mini-Karten mit Iconfläche, Skeleton-Zeile und zwei kurzen Platzhalterzeilen darunter.
- [ ] Overlay-Cards kompakt-horizontal, oben links/unten rechts, frontal und deutlich kleiner/flacher als der Browser.
- [ ] 375/600/768/1024/1440px ohne horizontalen Overflow oder abgeschnittene Inhalte.

**P2 · Robustheit und Barrierearmut**

- [ ] Browser dekorativ, Cards mit Text zugänglich, Icons verborgen und nicht fokussierbar.
- [ ] Keine Hover-/Fake-Submit-Zustände; bestehende Hero-CTAs bleiben die einzigen interaktiven Elemente der Region.
- [ ] Reduced Motion und Forced Colors wie beschrieben.
- [ ] Rail-/Fokusgutter auf großen Viewports frei.

Diese Datei ist eine Design- und Umsetzungsübergabe für Jonas. Sie ist kein Nora-QA-Ergebnis, keine Produktionsänderung und keine Veröffentlichungsfreigabe.
