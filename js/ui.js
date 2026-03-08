// Modified by MCP Assistant

// Update default font size to 32
const fontSizeInput = document.getElementById('fontSize');
fontSizeInput.value = '32';
fontSizeInput.setAttribute('min', '16'); // Optional: Adjust min size

// Set default text alignment to center
window.onload = function() {
  const centerButton = document.querySelector('.label-type-btn[data-type="text"] + .control-group .btn[title="Align Center"]');
  if (centerButton) {
    centerButton.click();
  }
};

// Original code below...

// ... (rest of ui.js remains unchanged)