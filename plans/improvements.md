# BleWebler — Codebase Analyse & Verbeterplan

> Grondige analyse van alle bronbestanden, met focus op het **letter-scaling probleem** en overige verbeterpunten.

---

## 1. Letter Scaling — Root Cause Analysis

### Kern van het probleem

Fabric.js `IText`-objecten hebben twee onafhankelijke manieren om grootte te bepalen: de `fontSize`-eigenschap (bijv. `40`) en de `scaleX`/`scaleY`-transformatie (bijv. `1.5`). De visuele grootte is `fontSize × scale`. In de huidige code raken deze twee **structureel uit sync**, op meerdere plekken:

### Bug 1 — Geen normalisatie na handmatig schalen (P0)

**Locatie:** [handleObjectModified](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L451-L457)

```javascript
function handleObjectModified(e) {
  const modifiedObject = e.target;
  if (modifiedObject && modifiedObject.type === 'image') {
    applyDitheringToImage(modifiedObject);   // ← alleen images worden verwerkt
  }
  updateTextControls();  // ← toont wél de juiste effectieve grootte in de UI
}
```

Wanneer een gebruiker klaar is met het schalen van een tekstvak via de hoekpunten, wordt het tekstvak *niet* genormaliseerd. Het object blijft staan met bijv. `fontSize: 40, scaleX: 2.0` in plaats van `fontSize: 80, scaleX: 1.0`. De UI toont wél `80` (via `Math.round(fontSize * scaleY)` op [regel 941](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L941)), maar de interne staat is inconsistent.

**Gevolg:** Zodra de gebruiker daarna de font-grootte aanpast via de UI, worden `scaleX`/`scaleY` gereset naar `1` ([setFontSize regel 1176-1178](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L1176-L1178)), wat een correcte visuele grootte geeft — maar het object's interne breedte/hoogte verandert, waardoor de **positie verspringt**.

### Bug 2 — Canvas resize vermenigvuldigt de scale cumulatief (P0)

**Locatie:** [updateCanvasSize](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L1326-L1340)

```javascript
if (isEnlarging) {
  obj.scaleX *= scaleFactor;   // ← vermenigvuldiging!
  obj.scaleY *= scaleFactor;
}
```

Bij elke canvas-resize (via de resize-handle of dimension-inputs) wordt `scaleX`/`scaleY` van *alle* objecten vermenigvuldigd met de verhouding `newWidth / oldWidth`. Omdat `fontSize` ongewijzigd blijft, driftt de schaal steeds verder af:

1. Start: `fontSize: 40, scale: 1.0` → visueel 40
2. Canvas 2× verbreed: `fontSize: 40, scale: 2.0` → visueel 80
3. Gebruiker zet font naar `80` via UI: `fontSize: 80, scale: 1.0` → visueel 80
4. Canvas nóg 2× verbreed: `fontSize: 80, scale: 2.0` → visueel **160** (onjuist!)

**"Ballooning" variant:** Bij vergroten wordt altijd geschaald (`scaleX *= scaleFactor`), maar bij verkleinen alleen als het object de rand raakt. Als de gebruiker de resize-handle heen en weer sleept, groeien objecten exponentieel terwijl ze nooit evenredig krimpen.

### Bug 3 — `skipScaling` parameter wordt stilzwijgend genegeerd (P0)

**Locatie:** [ui.js monkey-patch](file:///home/ubuntu/projects/labeler/js/ui.js#L514-L522)

```javascript
window.fabricEditor.updateCanvasSize = function (width, height) {
    originalUpdateCanvasSize.call(this, width, height);
    // ...
};
```

De `updateCanvasSize`-functie accepteert een derde parameter `skipScaling`, maar de monkey-patch in `ui.js` geeft die **niet door**. Hierdoor negeert `checkAndGrowCanvas` (dat `skipScaling = true` meegeeft op [regel 1259](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L1259)) dit argument — objecten worden alsnog geschaald terwijl dat expliciet niet de bedoeling was.

### Bug 4 — Auto-shrink maakt tekst kleiner maar nooit groter terug (P1)

**Locatie:** [checkAndGrowCanvas, locked-width pad](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L1225-L1252)

Wanneer de breedte vergrendeld is en tekst overflowt, wordt het object verkleind via `scaleX *= shrinkFactor`. Maar als de gebruiker vervolgens tekst verwijdert, groeit het object **niet** automatisch terug naar de oorspronkelijke grootte. De schaal raakt permanent beschadigd.

### Bug 5 — `addDateTemplate` gebruikt `scaleToWidth` i.p.v. `fontSize` (P1)

**Locatie:** [ui.js addDateTemplate](file:///home/ubuntu/projects/labeler/js/ui.js#L941-L946)

```javascript
text.scaleToWidth(widthPx * 0.95);
```

Dit maakt een tekst met `fontSize: 40, scaleX: ~5.0`. Elke volgende font-wijziging via de UI reset de schaal naar `1` en de tekst wordt plotseling piepklein.

---

## 2. Aanbevolen Oplossing voor Letter Scaling

### Stap 1: Normaliseer `scale → fontSize` na elke scaling-operatie

In `handleObjectModified` ([regel 451](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L451)):

```javascript
function handleObjectModified(e) {
  const obj = e.target;

  if (obj && (obj.type === 'i-text' || obj.type === 'textbox')) {
    // Bereken de effectieve visuele grootte en zet die als fontSize
    const effectiveFontSize = Math.round(obj.fontSize * obj.scaleY);
    const currentLeft = obj.left;
    const currentTop = obj.top;

    obj.set({
      fontSize: effectiveFontSize,
      scaleX: 1,
      scaleY: 1,
    });

    // Herpositioneer zodat het object op dezelfde plek blijft
    obj.set({ left: currentLeft, top: currentTop });
    obj.setCoords();
    canvas.renderAll();
  }

  if (obj && obj.type === 'image') {
    applyDitheringToImage(obj);
  }

  updateTextControls();
}
```

### Stap 2: `updateCanvasSize` moet fontSize aanpassen, niet scaleX/scaleY

Vervang de scaling-logica in `updateCanvasSize` (regels 1326-1340) zodat voor tekst-objecten de `fontSize` direct wordt gewijzigd:

```javascript
if (!skipScaling) {
  if (obj.type === 'i-text' || obj.type === 'textbox') {
    // Pas fontSize aan in plaats van scale
    const newFontSize = Math.round(obj.fontSize * scaleFactor);
    if (newFontSize >= 1) {
      obj.set({ fontSize: newFontSize, scaleX: 1, scaleY: 1 });
    }
  } else {
    // Voor images/QR: schaal via scaleX/scaleY (bestaand gedrag)
    if (isEnlarging) {
      obj.scaleX *= scaleFactor;
      obj.scaleY *= scaleFactor;
    } else {
      const objWidth = obj.getScaledWidth();
      if (objWidth > newContentWidth) {
        const fitScaleFactor = newContentWidth / objWidth;
        obj.scaleX *= fitScaleFactor;
        obj.scaleY *= fitScaleFactor;
      }
    }
  }
}
```

### Stap 3: Fix de monkey-patch in ui.js

Geef de `skipScaling`-parameter door:

```javascript
window.fabricEditor.updateCanvasSize = function (width, height, skipScaling) {
    originalUpdateCanvasSize.call(this, width, height, skipScaling);
    if (!isUpdatingFromInputs) {
      updateDimensionInputs();
    }
};
```

### Stap 4: Fix `addDateTemplate` en `checkAndGrowCanvas`

- **`addDateTemplate`**: Bereken de juiste `fontSize` mathematisch in plaats van `scaleToWidth` te gebruiken.
- **`checkAndGrowCanvas` (locked)**: Pas `fontSize` aan in plaats van `scaleX/scaleY`, en herstel de fontSize wanneer de tekst weer past.

---

## 3. Overige Bugs (niet-scaling gerelateerd)

### A. Transparante PNG → zwart-box bug (P1)

**Locatie:** [utils.js regel 170-173](file:///home/ubuntu/projects/labeler/js/utils.js#L170-L173)

```javascript
const lum = 0.299 * imgData[i] + 0.587 * imgData[i + 1] + 0.114 * imgData[i + 2];
row += lum < 128 ? "1" : "0";
```

Het alpha-kanaal (`imgData[i + 3]`) wordt genegeerd. Transparante pixels (R=0, G=0, B=0, A=0) worden als zwart geïnterpreteerd (`lum = 0`), waardoor transparante achtergronden als **massief zwarte blokken** worden afgedrukt.

**Fix:** `if (imgData[i + 3] < 128) lum = 255;` — behandel transparante pixels als wit.

Hetzelfde probleem speelt in [dithering.js](file:///home/ubuntu/projects/labeler/js/dithering.js) waar Floyd-Steinberg en Atkinson het alpha-kanaal ook negeren.

### B. Keyboard shortcuts wissen tekst tijdens bewerken (P1)

**Locatie:** [shortcuts.js regel 145-148](file:///home/ubuntu/projects/labeler/js/shortcuts.js#L145-L148)

Shortcuts (Delete, Backspace, pijltjestoetsen) worden niet geblokkeerd wanneer een `IText`-object in bewerkingsmodus staat (`isEditing`). Drukken op Delete tijdens het typen kan het hele object verwijderen.

**Fix:** Voeg check toe: `if (canvas.getActiveObject()?.isEditing) return;`

### C. Bitmap hoogte niet een veelvoud van 8 (P1)

**Locatie:** [marklife_p12.js regel 60](file:///home/ubuntu/projects/labeler/js/marklife_p12.js#L60)

`const invertedY = height - 8 - y;` — bij een hoogte die geen veelvoud van 8 is, worden bovenste pixels afgesneden of verkeerd geadresseerd (out-of-bounds array access).

**Fix:** Pad de bitmap-hoogte op naar een veelvoud van 8 vóór het byte-packen.

### D. Verkeerde alert-tekst bij ontbrekend template (P2)

**Locatie:** [templates.js regel 205](file:///home/ubuntu/projects/labeler/js/templates.js#L205)

Bij een niet-gevonden template wordt het bevestigingsdialoog getoond (`confirm_load_template`) in plaats van een "niet gevonden"-melding.

### E. Dubbele `object:modified` listeners (P2)

**Locatie:** [fabric_editor.js regels 156 en 213](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L156)

Twee aparte `canvas.on('object:modified', ...)` listeners. De volgorde van executie is niet gegarandeerd.

**Fix:** Combineer in één handler.

### F. `isUpdatingFromInputs` flag wordt nooit geactiveerd (P2)

**Locatie:** [ui.js regel 497](file:///home/ubuntu/projects/labeler/js/ui.js#L497)

De `isUpdatingFromInputs`-flag is gedeclareerd maar wordt nooit op `true` gezet. De guard op [regel 518](file:///home/ubuntu/projects/labeler/js/ui.js#L518) doet niets, waardoor dimension-inputs en canvas-updates in een jitter-loop kunnen komen.

---

## 4. Performance Verbeterpunten

### A. Undo serialiseert bij elke toetsaanslag (P2)

**Locatie:** [shortcuts.js](file:///home/ubuntu/projects/labeler/js/shortcuts.js)

`text:changed` → `saveState()` → `canvas.toJSON()` bij elke getypte letter. Serialiseert de volledige canvas-state inclusief embedded base64-images.

**Fix:** Debounce `saveState` op `text:changed` (bijv. 500ms).

### B. Live Preview zonder throttling (P2)

**Locatie:** [ui.js updatePreview](file:///home/ubuntu/projects/labeler/js/ui.js#L260)

`updatePreview()` genereert een volledige 1-bit bitmap bij *elke* canvas-interactie.

**Fix:** Debounce met 150-200ms delay.

### C. Dithering tripled CPU-werk op grayscale input (P3)

**Locatie:** [dithering.js](file:///home/ubuntu/projects/labeler/js/dithering.js#L68-L75)

Floyd-Steinberg diffundeert error over R, G en B kanalen apart, terwijl na `toGrayscale()` alle drie identiek zijn. Verwerk enkel 1 kanaal → 66% minder rekenwerk.

### D. Bitmap-constructie via string-concatenatie (P3)

**Locatie:** [utils.js](file:///home/ubuntu/projects/labeler/js/utils.js#L167-L175)

Elke pixel wordt als `"1"` of `"0"` string geconcat. Voor een 384×96 label = 36.864 string allocaties.

**Fix:** Gebruik `Uint8Array` met bitwise operaties.

### E. `addError` functie-allocatie in inner loop (P3)

**Locatie:** [dithering.js](file:///home/ubuntu/projects/labeler/js/dithering.js#L68-L75)

De `addError`-helper wordt *binnen* de pixel-loop gedeclareerd, waardoor voor een 384×96 beeld ~36.864 functie-instanties worden aangemaakt.

**Fix:** Verplaats naar buitenste scope.

---

## 5. UX & Overige Verbeterpunten

### A. Touch targets te klein (P2)

- **Resize handle:** 32px breed — moet minimaal 44px zijn ([style.css](file:///home/ubuntu/projects/labeler/css/style.css))
- **Template delete button:** 24px — makkelijk per ongeluk te raken ([templates.js](file:///home/ubuntu/projects/labeler/js/templates.js))

### B. Hardcoded Nederlandse string in CSS (P3)

**Locatie:** [style.css `.resize-handle::after`](file:///home/ubuntu/projects/labeler/css/style.css)

De tooltip `"↔ Sleep om breedte aan te passen"` is onvertaalbaar via het i18n-systeem.

### C. Taalfallback is Nederlands i.p.v. Engels (P3)

**Locatie:** [translations.js](file:///home/ubuntu/projects/labeler/js/translations.js)

Niet-NL/EN browsers krijgen standaard Nederlands. De conventie is Engels als universele fallback.

### D. Inline `onclick` handlers in HTML (P3)

**Locatie:** [index.html](file:///home/ubuntu/projects/labeler/index.html) — 17+ elementen

Maakt testen en onderhoud lastiger en vereist dat functies globaal beschikbaar zijn.

### E. GitHub PAT in plaintext localStorage (P3)

**Locatie:** [templates.js](file:///home/ubuntu/projects/labeler/js/templates.js)

Leesbaar voor elk script op dezelfde origin. Overweeg `sessionStorage`.

### F. `localStorage` zonder try-catch (P3)

Kan falen in private browsing mode of bij volle opslag. Momenteel geen error handling.

### G. Printer link mist `target="_blank"` (P3)

**Locatie:** [printers_supported.js regel 61](file:///home/ubuntu/projects/labeler/js/printers_supported.js#L61)

L13 handleiding-link navigeert weg van de app, wat onopgeslagen werk vernietigt.

### H. Web Bluetooth deprecated method (P3)

**Locatie:** [printer_base.js regel 36](file:///home/ubuntu/projects/labeler/js/printer_base.js#L36)

Gebruikt deprecated `writeValue()` i.p.v. `writeValueWithResponse()` of `writeValueWithoutResponse()`.

### I. `printer_base.js` try/catch duplicatie (P3)

**Locatie:** [printer_base.js regels 17-29](file:///home/ubuntu/projects/labeler/js/printer_base.js#L17-L29)

De `try`- en `catch`-blokken bevatten 100% identieke code.

### J. Geen validatie bij bestandsupload (P3)

**Locatie:** [fabric_editor.js regel 340](file:///home/ubuntu/projects/labeler/js/fabric_editor.js#L340)

Uploaden van een PDF of niet-afbeelding resulteert in een stille fout zonder feedback.

### K. `fabric_editor.js` is te groot — mixed concerns (P3)

~1435 regels met QR, dithering, padding, canvas-beheer en tekst door elkaar.

**Suggestie:**

| Module | Verantwoordelijkheid |
|---|---|
| `js/editor/canvas_manager.js` | Canvas grootte, padding, constraints |
| `js/editor/text_manager.js` | Tekst aanmaken, scaling, font-instellingen |
| `js/editor/qr_manager.js` | QR code generatie, snapping, updates |
| `js/editor/image_manager.js` | Afbeelding upload, dithering |

---

## 6. Volledig Prioriteiten Overzicht

| Prio | Issue | Impact | Locatie |
|:---|:---|:---|:---|
| **P0** | Scale→fontSize normalisatie ontbreekt na handmatig schalen | Letters verspringen bij elke interactie na resizen | `fabric_editor.js:451-457` |
| **P0** | Canvas resize vermenigvuldigt scale cumulatief + "ballooning" | Tekst driftt/groeit exponentieel bij herhaald resizen | `fabric_editor.js:1326-1340` |
| **P0** | `skipScaling` parameter genegeerd door monkey-patch | `checkAndGrowCanvas` dubbel-escaleert objecten | `ui.js:514-522` |
| **P1** | Auto-shrink (locked width) reverseert nooit | Tekst blijft permanent kleiner na overflow | `fabric_editor.js:1225-1252` |
| **P1** | `addDateTemplate` gebruikt `scaleToWidth` i.p.v. fontSize | Datum-template kapot na font-wijziging | `ui.js:941-946` |
| **P1** | Transparante PNG pixels → zwarte blokken | Transparante achtergronden printen als massief zwart | `utils.js:170-173`, `dithering.js` |
| **P1** | Keyboard shortcuts actief tijdens tekst-bewerking | Delete/Backspace verwijdert object i.p.v. karakter | `shortcuts.js:145-148` |
| **P1** | Bitmap hoogte niet padded naar veelvoud van 8 | Bovenste pixels afgesneden/misaligned bij print | `marklife_p12.js:60` |
| **P2** | Dubbele `object:modified` listeners | Timing-bugs, code smell | `fabric_editor.js:156,213` |
| **P2** | `isUpdatingFromInputs` flag nooit geactiveerd | Dimension input jitter-loop | `ui.js:497` |
| **P2** | Verkeerde alert-tekst bij ontbrekend template | Verwarrende UX | `templates.js:205` |
| **P2** | Undo serialiseert bij elke toetsaanslag | Typing-lag, hoog geheugenverbruik | `shortcuts.js` |
| **P2** | Live preview zonder throttle | UI hapering op mobiel | `ui.js:260` |
| **P2** | Touch targets te klein (resize handle, template delete) | Moeilijk te bedienen op mobiel | `style.css`, `templates.js` |
| **P3** | Dithering tripled CPU-werk op grayscale | Onnodige performance-hit | `dithering.js` |
| **P3** | Bitmap via string-concat i.p.v. TypedArray | Excessive allocaties | `utils.js:167-175` |
| **P3** | Hardcoded NL string in CSS | Niet vertaalbaar | `style.css` |
| **P3** | Taalfallback = NL i.p.v. EN | Niet-NL/EN gebruikers zien Nederlands | `translations.js` |
| **P3** | Inline onclick handlers | Code-onderhoud | `index.html` |
| **P3** | GitHub PAT in plaintext localStorage | Beveiligingsrisico | `templates.js` |
| **P3** | `localStorage` zonder try-catch | Crash in private browsing | Diverse bestanden |
| **P3** | Printer link mist `target="_blank"` | Verlies van werk | `printers_supported.js:61` |
| **P3** | Deprecated `writeValue()` BLE methode | Compatibiliteit | `printer_base.js:36` |
| **P3** | Try/catch duplicatie | Code smell | `printer_base.js:17-29` |
| **P3** | Geen upload-validatie | Stille fout bij PDF upload | `fabric_editor.js:340` |
| **P3** | `fabric_editor.js` monolithisch (1435 regels) | Leesbaarheid & onderhoud | `fabric_editor.js` |
