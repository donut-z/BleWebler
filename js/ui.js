function toggleAdvanced() {
  const section = document.getElementById("advancedSection");
  const toggleButton = document.getElementById("advancedToggleBtn");
  const chevron = toggleButton.querySelector(".chevron-icon");

  const isHidden = section.style.display === "none" || section.style.display === "";
  
  if (isHidden) {
    section.style.display = "block";
    toggleButton.querySelector(".toggle-text").textContent = _t("hide_advanced");
    if (chevron) chevron.style.transform = "rotate(180deg)";
  } else {
    section.style.display = "none";
    toggleButton.querySelector(".toggle-text").textContent = _t("show_advanced");
    if (chevron) chevron.style.transform = "rotate(0deg)";
  }
}


function setVerticalAlign(alignment) {
  if (window.fabricEditor) {
    window.fabricEditor.setVerticalAlign(alignment);
  }
}

// Function to update the font family in fabric editor
function updateFontFamily(fontFamily) {
  if (window.fabricEditor) {
    window.fabricEditor.setFontFamily(fontFamily);
  }
}

// Function to update the font size in fabric editor
function updateFontSize(fontSize) {
  if (window.fabricEditor) {
    window.fabricEditor.setFontSize(fontSize);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".label-type-btn");
  const fontFamilyInput = document.getElementById("fontFamilyInput");
  const loadSystemFontsBtn = document.getElementById("loadSystemFontsBtn");
  const fontSizeInput = document.getElementById("fontSize");
  const noBluetoothModal = document.getElementById("noBluetoothModal");

  // Check for Web Bluetooth support
  if (!navigator.bluetooth) {
    if (noBluetoothModal) {
      noBluetoothModal.classList.add("show");
    }
  }

  const dismissBluetoothModalBtn = document.getElementById("dismissBluetoothModalBtn");
  if (dismissBluetoothModalBtn && noBluetoothModal) {
    dismissBluetoothModalBtn.addEventListener("click", () => {
      noBluetoothModal.classList.remove("show");
    });
  }

  // Basic web-safe and Google fonts
  const basicFonts = [
    // Google Fonts (labelprinter-vriendelijk & universeel consistent)
    "Inter", "Roboto", "Roboto Mono", "Noto Sans", "DM Sans", "Barlow", "Barlow Condensed", "Open Sans", "Montserrat",
    // Web-safe (altijd beschikbaar op desktop, fallback op mobiel)
    "Arial", "Arial Rounded MT Bold", "Verdana", "Tahoma", "Trebuchet MS", "Impact", "Courier New"
  ];

  // Metadata with uniformity and width indicators for the datalist options
  const fontMetadata = {
    "Inter": "uniform",
    "Roboto": "uniform",
    "Roboto Mono": "monospace & uniform",
    "Noto Sans": "uniform",
    "DM Sans": "uniform",
    "Barlow": "uniform",
    "Barlow Condensed": "condensed & uniform",
    "Courier New": "monospace & uniform",
    "Arial": "uniform",
    "Verdana": "uniform"
  };

  // Event listeners for toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const property = button.dataset.property;
      if (window.fabricEditor) {
        const isActive = window.fabricEditor.toggleStyle(property);
        button.classList.toggle('active', isActive);
      }
    });
  });

  function populateFontDropdown(fonts) {
    fontFamilyInput.innerHTML = ""; // Clear existing options in select element
    fonts.forEach(font => {
      const option = document.createElement("option");
      option.value = font;
      if (fontMetadata[font]) {
        option.textContent = `${font} (${fontMetadata[font]})`;
      } else {
        option.textContent = font;
      }
      fontFamilyInput.appendChild(option);
    });
    // Set initial value
    if (window.fabricEditor && window.fabricEditor.getActiveObject()) {
      fontFamilyInput.value = window.fabricEditor.getActiveObject().fontFamily;
    } else {
      fontFamilyInput.value = "Inter"; // Default
    }
  }

  // Populate with basic fonts on load
  populateFontDropdown(basicFonts);

  // Event listener for font family change
  fontFamilyInput.addEventListener("change", (event) => {
    updateFontFamily(event.target.value);
  });

  // Event listener for font size change
  if (fontSizeInput) {
    fontSizeInput.addEventListener("change", (event) => {
      updateFontSize(parseInt(event.target.value, 10));
    });
  }

  // Event listener for loading system fonts
  if (loadSystemFontsBtn) {
    // Hide button if API not supported
    if (!('queryLocalFonts' in window)) {
      loadSystemFontsBtn.style.display = 'none';
    }

    loadSystemFontsBtn.addEventListener("click", async () => {
      if ('queryLocalFonts' in window) {
        try {
          const systemFonts = await window.queryLocalFonts();
          const fontNames = systemFonts.map(font => font.family).filter((value, index, self) => self.indexOf(value) === index); // Get unique font names
          populateFontDropdown([...basicFonts, ...fontNames].filter((value, index, self) => self.indexOf(value) === index).sort()); // Merge, make unique, sort, and repopulate
          loadSystemFontsBtn.style.display = 'none'; // Hide button after successful load
        } catch (err) {
          console.error("Error querying local fonts:", err);
          alert("Failed to load system fonts. Please check console for details.");
        }
      } else {
        alert("Your browser does not support the Local Font Access API.");
        loadSystemFontsBtn.style.display = 'none';
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;

      // Set active class
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Hide all option divs
      const textDiv = document.getElementById("textOptions");
      const infoDiv = document.getElementById("infoOptions");

      if (!textDiv || !infoDiv) {
        console.error("Option divs not found!");
        return;
      }

      textDiv.style.display = "none";
      infoDiv.style.display = "none";

      // Show selected option
      if (type === "text") textDiv.style.display = "block";
      else if (type === "info") {
        infoDiv.style.display = "block";
        handleInfoTab();
      }
    });
  });

  async function handleInfoTab() {
    const infoDisplay = document.getElementById("printerInfoDisplay");
    infoDisplay.textContent = _t("status_bt_connecting");

    try {
      // Ensure connectPrinter is available globally or imported
      if (typeof connectPrinter === 'function') {
        const printer = await connectPrinter();
        if (printer) {
          infoDisplay.textContent = _t("status_bt_retrieving");
          const info = await printer.getPrinterInfo();
          infoDisplay.innerHTML = info;
        } else {
          infoDisplay.textContent = _t("status_bt_failed");
        }
      } else {
        infoDisplay.textContent = _t("status_bt_err_func_not_found");
      }
    } catch (err) {
      infoDisplay.textContent = _t("status_bt_error") + err.message;
    }
  }

  const refreshInfoBtn = document.getElementById("refreshInfoBtn");
  if (refreshInfoBtn) {
    refreshInfoBtn.addEventListener("click", handleInfoTab);
  }

  // Set initial state
  const activeBtn = document.querySelector(".label-type-btn.active");
  if (activeBtn) activeBtn.click(); // Triggers display of text options

  // Add event listener for the print button
  const printButton = document.getElementById("printButton");
  if (printButton) {
    printButton.addEventListener("click", printLabel);
  }

  // Live Preview Logic (Standard Behavior)
  let previewCanvasElement = null;

  function initLivePreview() {
    // 1. Initial Render
    updatePreview();

    // 2. Add Listeners for Live Update
    const fabricCanvas = window.getFabricCanvas();
    if (fabricCanvas) {
      fabricCanvas.on('object:modified', updatePreview);
      fabricCanvas.on('object:added', updatePreview);
      fabricCanvas.on('object:removed', updatePreview);
      fabricCanvas.on('selection:updated', updatePreview);
      fabricCanvas.on('selection:created', updatePreview);
      fabricCanvas.on('selection:cleared', updatePreview);
      fabricCanvas.on('canvas:resized', updatePreview);

      // Debounce text changes
      let timeout;
      fabricCanvas.on('text:changed', () => {
        clearTimeout(timeout);
        timeout = setTimeout(updatePreview, 100);
      });
    }
  }

  // Initialize preview when scripts are ready
  // A simple timeout or event hook might be needed if fabric canvas isn't ready immediately.
  // Assuming fabric_editor.js runs before or initLivePreview can safely bind active listeners.
  // Since we use window.getFabricCanvas(), we can try running it.
  // Better yet, wait a moment or check if fabricCanvas is available.
  if (window.getFabricCanvas()) {
    initLivePreview();
  } else {
    // Wait for DOMContentLoaded or similar if needed, or just try to hook
    window.addEventListener('load', initLivePreview);
  }

  function updatePreview() {
    const fabricCanvas = window.getFabricCanvas();
    if (!fabricCanvas) return;

    // Auto-hide preview if an object is selected
    if (fabricCanvas.getActiveObject()) {
      if (previewCanvasElement) {
        previewCanvasElement.style.display = 'none';
      }
      return;
    }

    // 1. Generate Bitmap
    const printerSelect = document.getElementById("printerSelect");
    const supportedPrinters = window.supportedPrinters;

    // Handle case where vars might not be ready yet
    if (!printerSelect || !supportedPrinters) return;

    // Safety check for printer selection
    const printerIndex = printerSelect.value;
    if (!supportedPrinters[printerIndex]) return;

    const printerPx = supportedPrinters[printerIndex].px;

    let heightToUse = printerPx;
    if (window.fabricEditor) {
      heightToUse = printerPx;
    }

    const infinitePaperCheckbox = document.getElementById("infinitePaperCheckbox");
    const isInfinitePaper = infinitePaperCheckbox ? infinitePaperCheckbox.checked : false;

    // Use constructBitmap ensuring 1 copy
    const bitmap = constructBitmap(heightToUse, 1, isInfinitePaper, true);

    if (!bitmap || bitmap.length === 0) return;

    const bitmapHeight = bitmap.length;
    const bitmapWidth = bitmap[0].length;

    // 2. Create/Update Preview Canvas
    if (!previewCanvasElement) {
      previewCanvasElement = document.createElement("canvas");
      // Style for overlay
      previewCanvasElement.style.position = "absolute";
      previewCanvasElement.style.top = "0";
      previewCanvasElement.style.left = "0";

      // Crucial: Pointer events NONE allows clicks to pass through to the upper-canvas (selection handles)
      previewCanvasElement.style.pointerEvents = "none";

      previewCanvasElement.style.backgroundColor = "white";
      previewCanvasElement.style.imageRendering = "pixelated";
      previewCanvasElement.className = "preview-canvas";

      // We need to insert this BEFORE the upper-canvas but AFTER the lower-canvas
      const fabricCanvas = window.getFabricCanvas();
      if (fabricCanvas) {
        const upperCanvas = fabricCanvas.upperCanvasEl;
        const container = upperCanvas.parentNode;
        // Insert before upper canvas
        container.insertBefore(previewCanvasElement, upperCanvas);
      }
    }

    // 3. Draw Binary Data to Preview Canvas
    previewCanvasElement.width = bitmapWidth;
    previewCanvasElement.height = bitmapHeight;
    const ctx = previewCanvasElement.getContext("2d");

    const previewData = ctx.createImageData(bitmapWidth, bitmapHeight);
    const pData = previewData.data;

    for (let y = 0; y < bitmapHeight; y++) {
      const rowString = bitmap[y];
      for (let x = 0; x < bitmapWidth; x++) {
        const char = rowString[x];
        const pixelColor = (char === '1') ? 0 : 255;

        const index = (y * bitmapWidth + x) * 4;
        pData[index] = pixelColor;     // R
        pData[index + 1] = pixelColor; // G
        pData[index + 2] = pixelColor; // B
        pData[index + 3] = 255;        // Alpha
      }
    }

    ctx.putImageData(previewData, 0, 0);
    previewCanvasElement.style.display = "block";
  }

  // --- Printer Selection Modal Logic ---
  const startupModal = document.getElementById("startupModal");
  const printerSelect = document.getElementById("printerSelect");
  const startBtn = document.getElementById("startBtn");
  const paperWidthInput = document.getElementById("paperWidth");
  const paperWidthContainer = document.getElementById("paperWidthContainer");
  const paperHeightInput = document.getElementById("paperHeight");
  const settingsBtn = document.getElementById("settingsBtn");
  const infinitePaperCheckbox = document.getElementById("infinitePaperCheckbox");

  const resizeHandle = document.getElementById("resizeHandle");
  const canvasWrapper = document.getElementById("canvasWrapper");
  const homeTitle = document.getElementById("homeTitle");

  // Resize Handle Logic
  let isDragging = false;
  let startX;
  let startWidth;
  let currentPrinterDpm = 8; // Default dpm, will be updated when printer is selected
  const dimensionControls = document.getElementById("dimensionControls");
  const widthInput = document.getElementById("widthInput");
  const heightInput = document.getElementById("heightInput");

  // Function to get current printer dpm
  const getCurrentPrinterDpm = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlPrinter = urlParams.get('printer');
    if (urlPrinter !== null && typeof supportedPrinters !== 'undefined') {
      const pIndex = parseInt(urlPrinter);
      if (!isNaN(pIndex) && supportedPrinters[pIndex]) {
        return supportedPrinters[pIndex].dpm;
      }
    }
    return currentPrinterDpm; // Fallback to stored value
  };
  window.getCurrentPrinterDpm = getCurrentPrinterDpm;

  // Function to update dimension inputs from canvas
  const updateDimensionInputs = () => {
    const canvas = window.getFabricCanvas();
    if (canvas && widthInput && heightInput) {
      currentPrinterDpm = getCurrentPrinterDpm();
      const widthMm = canvas.getWidth() / currentPrinterDpm;
      const heightMm = canvas.getHeight() / currentPrinterDpm;
      widthInput.value = widthMm.toFixed(1);
      heightInput.value = heightMm.toFixed(1);
    }
  };

  // Function to update canvas from dimension inputs
  const updateCanvasFromInputs = () => {
    const canvas = window.getFabricCanvas();
    if (canvas && widthInput && heightInput) {
      currentPrinterDpm = getCurrentPrinterDpm();
      const widthMm = parseFloat(widthInput.value);
      const heightMm = parseFloat(heightInput.value);

      if (!isNaN(widthMm) && widthMm > 0 && !isNaN(heightMm) && heightMm > 0) {
        const widthPx = Math.round(widthMm * currentPrinterDpm);
        const heightPx = Math.round(heightMm * currentPrinterDpm);
        if (window.fabricEditor) {
          window.fabricEditor.updateCanvasSize(widthPx, heightPx);
        }
        if (window.saveCurrentSettings) window.saveCurrentSettings();
      }
    }
  };

  if (resizeHandle) {
    const startDrag = (clientX) => {
      isDragging = true;
      startX = clientX;
      resizeHandle.classList.add('active');
      // Update dpm from current printer
      currentPrinterDpm = getCurrentPrinterDpm();
      if (window.fabricEditor && window.fabricEditor.getActiveObject) {
        // Get current canvas width
        const canvas = window.getFabricCanvas();
        if (canvas) {
          startWidth = canvas.getWidth();
        }
      }
    };

    const onDrag = (clientX) => {
      if (!isDragging) return;
      
      // Stop drag if width is locked
      const wLockBtn = document.getElementById("widthLockBtn");
      if (wLockBtn && wLockBtn.classList.contains("locked")) return;

      const dx = clientX - startX;
      const newWidth = startWidth + dx;

      if (newWidth > 50) { // Minimum width
        if (window.fabricEditor) {
          // We only want to update width, keep height same.
          const canvas = window.getFabricCanvas();
          if (canvas) {
            window.fabricEditor.updateCanvasSize(newWidth, canvas.getHeight());
            // Update width input
            updateDimensionInputs();
          }
        }
      }
    };

    const endDrag = () => {
      isDragging = false;
      resizeHandle.classList.remove('active');
      if (window.saveCurrentSettings) window.saveCurrentSettings();
    };

    // Mouse events
    resizeHandle.addEventListener('mousedown', (e) => {
      startDrag(e.clientX);
      e.preventDefault(); // Prevent text selection
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        onDrag(e.clientX);
      }
    });

    window.addEventListener('mouseup', endDrag);

    // Touch events
    resizeHandle.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        startDrag(e.touches[0].clientX);
        e.preventDefault(); // Prevent scrolling
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length > 0) {
        onDrag(e.touches[0].clientX);
      }
    });

    window.addEventListener('touchend', endDrag);
  }

  // Flag to prevent update loops
  let isUpdatingFromInputs = false;

  // Dimension input handlers
  if (widthInput) {
    widthInput.addEventListener('input', () => {
      updateCanvasFromInputs();
    });
  }

  if (heightInput) {
    heightInput.addEventListener('input', () => {
      updateCanvasFromInputs();
    });
  }

  // Update dimension inputs when canvas size changes (but not when updating from inputs)
  if (window.fabricEditor) {
    const originalUpdateCanvasSize = window.fabricEditor.updateCanvasSize;
    if (originalUpdateCanvasSize) {
      window.fabricEditor.updateCanvasSize = function (width, height) {
        originalUpdateCanvasSize.call(this, width, height);
        if (!isUpdatingFromInputs) {
          updateDimensionInputs();
        }
      };
    }
  }

  // Helper to update resize handle visually if both dimensions are locked
  function updateResizeHandleState() {
    window.updateResizeHandleState = updateResizeHandleState;
    const wLockBtn = document.getElementById("widthLockBtn");
    const hLockBtn = document.getElementById("heightLockBtn");
    const resizeHandle = document.getElementById("resizeHandle");
    
    if (!resizeHandle) return;
    
    const isWidthLocked = wLockBtn && wLockBtn.classList.contains("locked");
    const isHeightLocked = hLockBtn && hLockBtn.classList.contains("locked");
    
    if (isWidthLocked && isHeightLocked) {
      resizeHandle.classList.add("disabled");
      resizeHandle.title = "Zowel Width als Height zijn vergrendeld";
    } else {
      resizeHandle.classList.remove("disabled");
      resizeHandle.title = "Sleep om breedte aan te passen";
    }
  }

  // Height Lock Toggle Logic
  window.toggleHeightLock = function() {
    const hInput = document.getElementById("heightInput");
    const lockBtn = document.getElementById("heightLockBtn");
    if (!hInput || !lockBtn) return;
    const lockIcon = lockBtn.querySelector("path");
    
    const isLocked = lockBtn.classList.contains("locked");
    
    if (isLocked) {
      // Unlock
      lockBtn.classList.remove("locked");
      lockBtn.classList.add("unlocked");
      lockBtn.title = "Lock Height";
      hInput.disabled = false;
      // SVG path for unlocked
      lockIcon.setAttribute("d", "M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5-2.28 0-4.27 1.54-4.84 3.59.04.13.11.23.23.28l1.3.43c.12.04.25.02.34-.06.28-.24.59-.44.93-.57.65-.24 1.35-.26 2.04-.05 1.11.35 1.94 1.3 2.13 2.46.06.39.06.77.01 1.15H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM6 20V10h12v10H6z");
    } else {
      // Lock
      lockBtn.classList.add("locked");
      lockBtn.classList.remove("unlocked");
      lockBtn.title = "Unlock Height";
      hInput.disabled = true;
      // SVG path for locked
      lockIcon.setAttribute("d", "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z");
    }
    updateResizeHandleState();
  };

  // Width Lock Toggle Logic
  window.toggleWidthLock = function() {
    const wInput = document.getElementById("widthInput");
    const lockBtn = document.getElementById("widthLockBtn");
    if (!wInput || !lockBtn) return;
    const lockIcon = lockBtn.querySelector("path");
    
    const isLocked = lockBtn.classList.contains("locked");
    
    if (isLocked) {
      // Unlock
      lockBtn.classList.remove("locked");
      lockBtn.classList.add("unlocked");
      lockBtn.title = "Lock Width";
      wInput.disabled = false;
      // SVG path for unlocked
      lockIcon.setAttribute("d", "M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5-2.28 0-4.27 1.54-4.84 3.59.04.13.11.23.23.28l1.3.43c.12.04.25.02.34-.06.28-.24.59-.44.93-.57.65-.24 1.35-.26 2.04-.05 1.11.35 1.94 1.3 2.13 2.46.06.39.06.77.01 1.15H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM6 20V10h12v10H6z");
    } else {
      // Lock
      lockBtn.classList.add("locked");
      lockBtn.classList.remove("unlocked");
      lockBtn.title = "Unlock Width";
      wInput.disabled = true;
      // SVG path for locked
      lockIcon.setAttribute("d", "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z");
    }
    updateResizeHandleState();
  };

  if (startupModal && printerSelect && startBtn) {
    // 1. Populate Printer List
    if (typeof supportedPrinters !== 'undefined') {
      supportedPrinters.forEach((printer, index) => {
        const option = document.createElement("option");
        option.value = index; // Use index to easily retrieve printer object later
        option.textContent = printer.name;
        printerSelect.appendChild(option);
      });
    }

    // Function to apply settings
    const applyPrinterSettings = (printerIndex, widthMm, heightMm, isInfinite, paddingTopMm = 0, paddingBottomMm = 0, paddingLeftMm = 0, paddingRightMm = 0) => {
      if (typeof supportedPrinters !== 'undefined' && supportedPrinters[printerIndex]) {
        const printer = supportedPrinters[printerIndex];
        const dpm = printer.dpm;
        // Store dpm for resize handle
        currentPrinterDpm = dpm;

        // Calculate pixels
        let widthPx = Math.round(widthMm * dpm);
        let heightPx = Math.round(heightMm * dpm);

        // Cap height at printer's max printable height
        if (heightPx > printer.px) {
          heightPx = printer.px;
        }

        // Update Canvas
        if (window.fabricEditor && window.fabricEditor.updateCanvasSize) {
          window.fabricEditor.updateCanvasSize(widthPx, heightPx);
          // Update dimension inputs after canvas is updated
          setTimeout(updateDimensionInputs, 0);
        }

        // Apply padding (convert mm to pixels)
        if (window.fabricEditor && window.fabricEditor.setPadding) {
          const paddingTopPx = Math.round(paddingTopMm * dpm);
          const paddingBottomPx = Math.round(paddingBottomMm * dpm);
          const paddingLeftPx = Math.round(paddingLeftMm * dpm);
          const paddingRightPx = Math.round(paddingRightMm * dpm);
          window.fabricEditor.setPadding(paddingTopPx, paddingBottomPx, paddingLeftPx, paddingRightPx);
        }

        // Hide Modal
        startupModal.classList.remove("show");
      }
    };
    window.applyPrinterSettings = applyPrinterSettings;

    // Get padding inputs
    const paddingTopInput = document.getElementById('paddingTop');
    const paddingBottomInput = document.getElementById('paddingBottom');
    const paddingLeftInput = document.getElementById('paddingLeft');
    const paddingRightInput = document.getElementById('paddingRight');

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlPrinter = urlParams.get('printer');
    const urlWidth = urlParams.get('width');
    const urlHeight = urlParams.get('height');
    const urlInfinite = urlParams.get('infinite') === 'true';
    const urlPaddingTop = urlParams.get('paddingTop');
    const urlPaddingBottom = urlParams.get('paddingBottom');
    const urlPaddingLeft = urlParams.get('paddingLeft');
    const urlPaddingRight = urlParams.get('paddingRight');

    // Helper to programmatically set width lock state
    const setWidthLockState = (isInfinite) => {
      const widthLockBtn = document.getElementById("widthLockBtn");
      const wInput = document.getElementById("widthInput");
      if (widthLockBtn && wInput) {
        if (isInfinite) {
          widthLockBtn.classList.remove("locked");
          widthLockBtn.classList.add("unlocked");
          wInput.disabled = false;
        } else {
          widthLockBtn.classList.add("locked");
          widthLockBtn.classList.remove("unlocked");
          wInput.disabled = true;
        }
        updateResizeHandleState();
      }
    };

    // Global function to preserve settings automatically
    window.saveCurrentSettings = () => {
      const printerIndex = printerSelect.value;
      const widthLockBtn = document.getElementById("widthLockBtn");
      const infinite = widthLockBtn ? !widthLockBtn.classList.contains("locked") : true;
      const dpm = getCurrentPrinterDpm();
      const canvas = window.getFabricCanvas();
      if (!canvas) return;
      
      const widthMm = parseFloat(widthInput.value) || (canvas.getWidth() / dpm);
      const heightMm = parseFloat(heightInput.value) || (canvas.getHeight() / dpm);
      
      const paddingTopMm = paddingTopInput ? parseFloat(paddingTopInput.value) || 0 : 0;
      const paddingBottomMm = paddingBottomInput ? parseFloat(paddingBottomInput.value) || 0 : 0;
      const paddingLeftMm = paddingLeftInput ? parseFloat(paddingLeftInput.value) || 0 : 0;
      const paddingRightMm = paddingRightInput ? parseFloat(paddingRightInput.value) || 0 : 0;
      
      // Keep startup modal inputs synchronized with current editor values
      if (paperWidthInput) paperWidthInput.value = widthMm.toFixed(1);
      if (paperHeightInput) paperHeightInput.value = heightMm.toFixed(1);
      
      // Update URL search parameters
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('printer', printerIndex);
      newUrl.searchParams.set('width', widthMm.toFixed(1));
      newUrl.searchParams.set('height', heightMm.toFixed(1));
      newUrl.searchParams.set('infinite', infinite);
      newUrl.searchParams.set('paddingTop', paddingTopMm);
      newUrl.searchParams.set('paddingBottom', paddingBottomMm);
      newUrl.searchParams.set('paddingLeft', paddingLeftMm);
      newUrl.searchParams.set('paddingRight', paddingRightMm);
      window.history.replaceState({}, '', newUrl);
      
      // Save settings in localStorage
      localStorage.setItem('blewebler_settings', JSON.stringify({
        printer: printerIndex,
        width: widthMm,
        height: heightMm,
        infinite: infinite,
        paddingTop: paddingTopMm,
        paddingBottom: paddingBottomMm,
        paddingLeft: paddingLeftMm,
        paddingRight: paddingRightMm
      }));
    };

    if (urlPrinter !== null && urlWidth !== null && urlHeight !== null) {
      // Apply settings from URL
      const pIndex = parseInt(urlPrinter);
      const w = parseFloat(urlWidth);
      const h = parseFloat(urlHeight);

      if (!isNaN(pIndex) && !isNaN(w) && !isNaN(h)) {
        // Update inputs to match URL (so if they open settings later, it's correct)
        printerSelect.value = pIndex;
        paperWidthInput.value = w;
        paperHeightInput.value = h;
        setWidthLockState(urlInfinite);

        // Update padding inputs from URL
        const pTop = urlPaddingTop !== null ? parseFloat(urlPaddingTop) : 0;
        const pBottom = urlPaddingBottom !== null ? parseFloat(urlPaddingBottom) : 0;
        const pLeft = urlPaddingLeft !== null ? parseFloat(urlPaddingLeft) : 0;
        const pRight = urlPaddingRight !== null ? parseFloat(urlPaddingRight) : 0;

        if (paddingTopInput) paddingTopInput.value = pTop;
        if (paddingBottomInput) paddingBottomInput.value = pBottom;
        if (paddingLeftInput) paddingLeftInput.value = pLeft;
        if (paddingRightInput) paddingRightInput.value = pRight;

        applyPrinterSettings(pIndex, w, h, urlInfinite, pTop, pBottom, pLeft, pRight);
      } else {
        // Invalid params, show modal
        startupModal.classList.add("show");
      }
    } else {
      // Probeer localStorage
      const saved = localStorage.getItem('blewebler_settings');
      if (saved) {
        const s = JSON.parse(saved);
        printerSelect.value = s.printer;
        paperWidthInput.value = s.width;
        paperHeightInput.value = s.height;
        setWidthLockState(s.infinite);
        if (paddingTopInput) paddingTopInput.value = s.paddingTop;
        if (paddingBottomInput) paddingBottomInput.value = s.paddingBottom;
        if (paddingLeftInput) paddingLeftInput.value = s.paddingLeft;
        if (paddingRightInput) paddingRightInput.value = s.paddingRight;
        applyPrinterSettings(s.printer, s.width, s.height, s.infinite,
          s.paddingTop, s.paddingBottom, s.paddingLeft, s.paddingRight);
      } else {
        // Eerste keer, toon modal en ontgrendel breedte standaard
        setWidthLockState(true);
        startupModal.classList.add("show");
      }
    }

    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        startupModal.classList.add("show");
      });
    }

    // Close settings modal
    const closeSettingsModal = document.getElementById("closeSettingsModal");
    if (closeSettingsModal && startupModal) {
      closeSettingsModal.addEventListener("click", () => {
        startupModal.classList.remove("show");
      });

      // Close modal when clicking outside
      startupModal.addEventListener("click", (e) => {
        if (e.target === startupModal) {
          startupModal.classList.remove("show");
        }
      });
    }

    // Home title click handler removed as title is no longer clickable

    // Function to update padding from inputs
    const updatePaddingFromInputs = () => {
      if (!window.fabricEditor || !window.fabricEditor.setPadding) return;

      const dpm = getCurrentPrinterDpm();
      const paddingTopMm = paddingTopInput ? parseFloat(paddingTopInput.value) || 0 : 0;
      const paddingBottomMm = paddingBottomInput ? parseFloat(paddingBottomInput.value) || 0 : 0;
      const paddingLeftMm = paddingLeftInput ? parseFloat(paddingLeftInput.value) || 0 : 0;
      const paddingRightMm = paddingRightInput ? parseFloat(paddingRightInput.value) || 0 : 0;

      // Convert mm to pixels
      const paddingTopPx = Math.round(paddingTopMm * dpm);
      const paddingBottomPx = Math.round(paddingBottomMm * dpm);
      const paddingLeftPx = Math.round(paddingLeftMm * dpm);
      const paddingRightPx = Math.round(paddingRightMm * dpm);

      window.fabricEditor.setPadding(paddingTopPx, paddingBottomPx, paddingLeftPx, paddingRightPx);

      // Update URL
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('paddingTop', paddingTopMm);
      newUrl.searchParams.set('paddingBottom', paddingBottomMm);
      newUrl.searchParams.set('paddingLeft', paddingLeftMm);
      newUrl.searchParams.set('paddingRight', paddingRightMm);
      window.history.replaceState({}, '', newUrl);
    };

    // Add event listeners to padding inputs for real-time updates
    if (paddingTopInput) {
      paddingTopInput.addEventListener('change', updatePaddingFromInputs);
      paddingTopInput.addEventListener('blur', updatePaddingFromInputs);
    }
    if (paddingBottomInput) {
      paddingBottomInput.addEventListener('change', updatePaddingFromInputs);
      paddingBottomInput.addEventListener('blur', updatePaddingFromInputs);
    }
    if (paddingLeftInput) {
      paddingLeftInput.addEventListener('change', updatePaddingFromInputs);
      paddingLeftInput.addEventListener('blur', updatePaddingFromInputs);
    }
    if (paddingRightInput) {
      paddingRightInput.addEventListener('change', updatePaddingFromInputs);
      paddingRightInput.addEventListener('blur', updatePaddingFromInputs);
    }

    // 3. Handle Start Button Click
    startBtn.addEventListener("click", () => {
      const selectedPrinterIndex = printerSelect.value;
      const widthMm = parseFloat(paperWidthInput.value);
      const heightMm = parseFloat(paperHeightInput.value);
      const isInfinite = infinitePaperCheckbox ? infinitePaperCheckbox.checked : false;
      const paddingTopMm = paddingTopInput ? parseFloat(paddingTopInput.value) || 0 : 0;
      const paddingBottomMm = paddingBottomInput ? parseFloat(paddingBottomInput.value) || 0 : 0;
      const paddingLeftMm = paddingLeftInput ? parseFloat(paddingLeftInput.value) || 0 : 0;
      const paddingRightMm = paddingRightInput ? parseFloat(paddingRightInput.value) || 0 : 0;

      applyPrinterSettings(selectedPrinterIndex, widthMm, heightMm, isInfinite,
        paddingTopMm, paddingBottomMm, paddingLeftMm, paddingRightMm);

      // Update URL
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('printer', selectedPrinterIndex);
      newUrl.searchParams.set('width', widthMm);
      newUrl.searchParams.set('height', heightMm);
      newUrl.searchParams.set('infinite', isInfinite);
      newUrl.searchParams.set('paddingTop', paddingTopMm);
      newUrl.searchParams.set('paddingBottom', paddingBottomMm);
      newUrl.searchParams.set('paddingLeft', paddingLeftMm);
      newUrl.searchParams.set('paddingRight', paddingRightMm);
      window.history.replaceState({}, '', newUrl);

      // Sla instellingen op in localStorage
      localStorage.setItem('blewebler_settings', JSON.stringify({
        printer: selectedPrinterIndex, width: widthMm, height: heightMm,
        infinite: isInfinite, paddingTop: paddingTopMm, paddingBottom: paddingBottomMm,
        paddingLeft: paddingLeftMm, paddingRight: paddingRightMm
      }));
    });
  }
});

function setTextAlign(alignment) {
  if (window.fabricEditor) {
    window.fabricEditor.setTextAlign(alignment);
  }
}

function setVerticalAlign(alignment) {
  if (window.fabricEditor) {
    window.fabricEditor.setVerticalAlign(alignment);
  }
}

window.addDateTemplate = function() {
  console.log("addDateTemplate called");
  if (!window.fabricEditor) {
    console.error("fabricEditor not found");
    return;
  }

  const canvas = window.getFabricCanvas();
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  const widthPx = canvas.getWidth();
  const heightPx = canvas.getHeight();

  const now = new Date();
  const d = String(now.getDate()).padStart(2, '0');
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const y = String(now.getFullYear()).slice(-2);
  const dateString = `${d}-${m}-${y}`;

  canvas.clear();

  const text = new fabric.IText(dateString, {
    left: 0,
    top: 0,
    fontFamily: 'Verdana',
    fontSize: 40, // Start grootte, wordt hieronder geschaald
    fontWeight: 'bold',
    fill: '#000000',
    lockUniScaling: true
  });

  text.setControlsVisibility({
    mt: false, mb: false, ml: false, mr: false, mtr: true
  });

  // Schaal naar breedte (met 5% marge aan de zijkanten)
  text.scaleToWidth(widthPx * 0.95);

  // Als de tekst nu te hoog is voor het label, schaal dan naar de hoogte
  if (text.getScaledHeight() > heightPx * 0.95) {
    text.scaleToHeight(heightPx * 0.95);
  }

  canvas.add(text);
  text.center(); // Centreer op het huidige canvas
  text.set({ alignment: 'center', verticalAlignment: 'middle' });
  canvas.setActiveObject(text);

  // Support mobile selection menu
  if (text.hiddenTextarea) {
    text.hiddenTextarea.setAttribute('spellcheck', 'true');
    text.hiddenTextarea.style.userSelect = 'text';
    text.hiddenTextarea.style.webkitUserSelect = 'text';
  }

  canvas.renderAll();
  console.log("Date added and scaled to fit current label.");
}

window.toggleTemplatesAccordion = function(event) {
  // If the user clicked on an action button (or an icon inside it) in the header, ignore the toggle!
  if (event && (event.target.closest('#headerSaveTemplateBtn') || event.target.closest('#headerGithubSettingsBtn'))) {
    return;
  }
  const container = document.getElementById('templatesAccordion');
  const content = document.getElementById('templatesAccordionContent');
  if (!container || !content) return;
  
  const isOpen = container.classList.contains('active');
  if (isOpen) {
    container.classList.remove('active');
    content.style.display = 'none';
  } else {
    container.classList.add('active');
    content.style.display = 'block';
  }
};
