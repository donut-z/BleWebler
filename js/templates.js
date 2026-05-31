/**
 * BleWebler - Template & GitHub Gist Integration
 * Allows storing, loading, and syncing label templates using GitHub Gists or local fallback.
 */

const DEFAULT_GIST_FILENAME = 'blewebler-templates.json';

// In-memory list of templates
let customTemplates = [];
let defaultTemplates = [];

// GitHub Sync configuration
let githubSettings = {
  pat: '',
  gistId: ''
};

// Initialize Templates
document.addEventListener("DOMContentLoaded", () => {
  loadGithubSettings();
  initDefaultTemplates();
  initTemplateUI();
  
  // Initial fetch of custom templates
  fetchTemplates();
});

// Update GitHub icon color based on connection status
function updateGithubIconStatus() {
  const headerGithubIcon = document.getElementById('headerGithubIcon');
  if (!headerGithubIcon) return;
  
  if (githubSettings.pat && githubSettings.gistId) {
    headerGithubIcon.classList.remove('disconnected');
    headerGithubIcon.classList.add('connected');
  } else {
    headerGithubIcon.classList.remove('connected');
    headerGithubIcon.classList.add('disconnected');
  }
}

// Load settings from localStorage
function loadGithubSettings() {
  const saved = localStorage.getItem('blewebler_github_settings');
  if (saved) {
    githubSettings = JSON.parse(saved);
  }
  updateGithubIconStatus();
}

// Save settings to localStorage
function saveGithubSettings(pat, gistId) {
  githubSettings.pat = pat ? pat.trim() : '';
  githubSettings.gistId = gistId ? gistId.trim() : '';
  localStorage.setItem('blewebler_github_settings', JSON.stringify(githubSettings));
  updateGithubIconStatus();
}

// Built-in default templates (empty by user request)
function initDefaultTemplates() {
  defaultTemplates = [];
}

// Fetch templates from LocalStorage or GitHub Gist
async function fetchTemplates() {
  updateSyncStatus('status_sync_loading');
  
  if (githubSettings.pat && githubSettings.gistId) {
    try {
      const response = await fetch(`https://api.github.com/gists/${githubSettings.gistId}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubSettings.pat}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const gist = await response.json();
      const file = gist.files[DEFAULT_GIST_FILENAME];
      
      if (file && file.content) {
        customTemplates = JSON.parse(file.content);
        // Save copy to local storage as fallback
        localStorage.setItem('blewebler_local_templates', JSON.stringify(customTemplates));
        updateSyncStatus('status_sync_success', 'success');
      } else {
        customTemplates = [];
        updateSyncStatus('status_sync_empty', 'info');
      }
    } catch (err) {
      console.error("Gist fetch error, falling back to local:", err);
      loadLocalFallbackTemplates();
      updateSyncStatus('status_sync_failed_local', 'warning');
    }
  } else {
    loadLocalFallbackTemplates();
    updateSyncStatus('status_sync_offline', 'info');
  }
  
  renderTemplatesLists();
}

function loadLocalFallbackTemplates() {
  const saved = localStorage.getItem('blewebler_local_templates');
  if (saved) {
    customTemplates = JSON.parse(saved);
  } else {
    customTemplates = [];
  }
}

// Save templates to local storage and Gist
async function saveTemplates() {
  // Save local fallback copy first
  localStorage.setItem('blewebler_local_templates', JSON.stringify(customTemplates));
  
  if (githubSettings.pat && githubSettings.gistId) {
    updateSyncStatus('status_sync_saving');
    try {
      const response = await fetch(`https://api.github.com/gists/${githubSettings.gistId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'Authorization': `token ${githubSettings.pat}`
        },
        body: JSON.stringify({
          files: {
            [DEFAULT_GIST_FILENAME]: {
              content: JSON.stringify(customTemplates, null, 2)
            }
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      updateSyncStatus('status_sync_saved', 'success');
    } catch (err) {
      console.error("Gist save error:", err);
      updateSyncStatus('status_sync_saved_local_warn', 'warning');
      alert(_t("alert_failed_github") + err.message + _t("alert_saved_local_fallback"));
    }
  } else {
    updateSyncStatus('status_sync_saved', 'success');
  }
  
  renderTemplatesLists();
}

// Add current canvas as a new template
window.saveCurrentAsTemplate = function() {
  const canvas = window.getFabricCanvas();
  if (!canvas) {
    alert(_t("alert_no_canvas"));
    return;
  }
  
  const name = prompt(_t("prompt_template_name"));
  if (!name || !name.trim()) return;
  
  // Calculate current actual dimensions in mm
  const dpm = window.getCurrentPrinterDpm ? window.getCurrentPrinterDpm() : 8;
  const widthMm = canvas.getWidth() / dpm;
  const heightMm = canvas.getHeight() / dpm;
  
  const widthLockBtn = document.getElementById('widthLockBtn');
  const infinite = widthLockBtn ? !widthLockBtn.classList.contains("locked") : true;
  const paddingTopInput = document.getElementById('paddingTop');
  const paddingBottomInput = document.getElementById('paddingBottom');
  const paddingLeftInput = document.getElementById('paddingLeft');
  const paddingRightInput = document.getElementById('paddingRight');
  
  const template = {
    id: 'custom-' + Date.now(),
    name: name.trim(),
    width: parseFloat(widthMm.toFixed(1)),
    height: parseFloat(heightMm.toFixed(1)),
    infinite: infinite,
    padding: {
      top: paddingTopInput ? parseFloat(paddingTopInput.value) || 0 : 0,
      bottom: paddingBottomInput ? parseFloat(paddingBottomInput.value) || 0 : 0,
      left: paddingLeftInput ? parseFloat(paddingLeftInput.value) || 0 : 0,
      right: paddingRightInput ? parseFloat(paddingRightInput.value) || 0 : 0
    },
    canvasWidth: canvas.getWidth(),
    canvasHeight: canvas.getHeight(),
    canvas: JSON.stringify(canvas.toJSON())
  };
  
  customTemplates.unshift(template);
  saveTemplates();
};

// Load template onto the canvas
window.loadTemplate = function(templateId, isDefault = false) {
  const templateList = isDefault ? defaultTemplates : customTemplates;
  const template = templateList.find(t => t.id === templateId);
  if (!template) {
    alert(_t("confirm_load_template")); // Let's use alert_no_template or template not found
    return;
  }
  
  const canvas = window.getFabricCanvas();
  if (!canvas) return;
  
  // Ask for confirmation if there are objects on canvas
  if (canvas.getObjects().length > 0) {
    if (!confirm(_t("confirm_load_template"))) {
      return;
    }
  }
  
  // 1. Get current printer index
  const printerSelect = document.getElementById('printerSelect');
  let selectedPrinterIndex = printerSelect ? parseInt(printerSelect.value, 10) : 0;
  if (isNaN(selectedPrinterIndex)) selectedPrinterIndex = 0;
  
  // 2. Set dimensions and padding in the modal and editor inputs
  const paperWidthInput = document.getElementById('paperWidth');
  const paperHeightInput = document.getElementById('paperHeight');
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const paddingTopInput = document.getElementById('paddingTop');
  const paddingBottomInput = document.getElementById('paddingBottom');
  const paddingLeftInput = document.getElementById('paddingLeft');
  const paddingRightInput = document.getElementById('paddingRight');
  
  if (paperWidthInput) paperWidthInput.value = template.width;
  if (paperHeightInput) paperHeightInput.value = template.height;
  if (widthInput) widthInput.value = template.width.toFixed(1);
  if (heightInput) heightInput.value = template.height.toFixed(1);
  
  const widthLockBtn = document.getElementById('widthLockBtn');
  const heightLockBtn = document.getElementById('heightLockBtn');
  const hInput = document.getElementById('heightInput');
  const wInput = document.getElementById('widthInput');
  
  if (widthLockBtn && wInput) {
    if (template.infinite) {
      widthLockBtn.classList.remove("locked");
      widthLockBtn.classList.add("unlocked");
      wInput.disabled = false;
    } else {
      widthLockBtn.classList.add("locked");
      widthLockBtn.classList.remove("unlocked");
      wInput.disabled = true;
    }
  }
  
  if (heightLockBtn && hInput) {
    // Sjablonen hebben standaard de hoogte vergrendeld
    heightLockBtn.classList.add("locked");
    heightLockBtn.classList.remove("unlocked");
    hInput.disabled = true;
  }
  
  if (window.updateResizeHandleState) {
    window.updateResizeHandleState();
  }
  
  if (paddingTopInput) paddingTopInput.value = template.padding.top;
  if (paddingBottomInput) paddingBottomInput.value = template.padding.bottom;
  if (paddingLeftInput) paddingLeftInput.value = template.padding.left;
  if (paddingRightInput) paddingRightInput.value = template.padding.right;
  
  // 3. Apply printer settings (which sizes the canvas to the correct DPI/DPM)
  if (window.applyPrinterSettings) {
    window.applyPrinterSettings(
      selectedPrinterIndex, 
      template.width, 
      template.height, 
      template.infinite,
      template.padding.top,
      template.padding.bottom,
      template.padding.left,
      template.padding.right
    );
  }
  
  // Store target width and height in pixels (the actual size we want now)
  const targetWidthPx = canvas.getWidth();
  const targetHeightPx = canvas.getHeight();
  
  // 4. Temporarily resize canvas to original pixel size in the template
  canvas.setWidth(template.canvasWidth);
  canvas.setHeight(template.canvasHeight);
  
  // 5. Load the canvas layout after ensuring all fonts are ready
  const canvasData = typeof template.canvas === 'string' ? JSON.parse(template.canvas) : template.canvas;
  
  const renderCanvas = () => {
    canvas.loadFromJSON(canvasData, () => {
      // 6. Scale the loaded objects to fit the actual target size perfectly
      if (window.fabricEditor && window.fabricEditor.updateCanvasSize) {
        window.fabricEditor.updateCanvasSize(targetWidthPx, targetHeightPx);
      }
      
      // Clear selection
      canvas.discardActiveObject();
      canvas.renderAll();
      
      // Auto-save the freshly loaded template settings in URL and localStorage
      if (window.saveCurrentSettings) {
        window.saveCurrentSettings();
      }
      
      // Switch to Text mode tab so they can start editing the loaded template
      const textTabButton = document.querySelector('.label-type-btn[data-type="text"]');
      if (textTabButton) textTabButton.click();
    });
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(renderCanvas);
  } else {
    renderCanvas();
  }
};

// Delete a custom template
window.deleteTemplate = function(templateId, e) {
  if (e) e.stopPropagation(); // Prevent loading template on click
  
  if (!confirm(_t("confirm_delete_template"))) return;
  
  customTemplates = customTemplates.filter(t => t.id !== templateId);
  saveTemplates();
};

// Helper for UI Sync Status
function updateSyncStatus(text, type = 'info') {
  const syncStatusEl = document.getElementById('syncStatusText');
  if (!syncStatusEl) return;
  
  syncStatusEl.textContent = window._t ? window._t(text) : text;
  syncStatusEl.className = 'sync-status-badge ' + type;
}

// Render the grids of templates
function renderTemplatesLists() {
  const customList = document.getElementById('customTemplatesList');
  
  if (customList) {
    if (customTemplates.length === 0) {
      if (githubSettings.pat && githubSettings.gistId) {
        customList.innerHTML = `
          <div class="empty-state" style="grid-column: span 2; text-align: center; padding: var(--spacing-lg); border: 2px dashed var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-muted);">
            ${_t("templates_empty_gist")}
          </div>
        `;
      } else {
        customList.innerHTML = `
          <div class="empty-state" style="grid-column: span 2; text-align: center; padding: var(--spacing-lg); border: 2px dashed var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-muted);">
            ${_t("templates_empty_offline")}
          </div>
        `;
      }
    } else {
      customList.innerHTML = customTemplates.map(t => `
        <div class="template-card custom" onclick="loadTemplate('${t.id}', false)">
          <div class="template-title">${t.name}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <span class="template-meta">${t.width}x${t.height}mm</span>
            <button class="btn-delete-template" onclick="deleteTemplate('${t.id}', event)" title="Verwijder sjabloon">
              ×
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

// Initialise template event listeners and UI elements
function initTemplateUI() {
  const saveAsTemplateBtn = document.getElementById('saveAsTemplateBtn');
  if (saveAsTemplateBtn) {
    saveAsTemplateBtn.addEventListener('click', window.saveCurrentAsTemplate);
  }
  
  // Sync now button
  const syncBtn = document.getElementById('syncTemplatesBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', fetchTemplates);
    if (githubSettings.pat && githubSettings.gistId) {
      syncBtn.style.display = 'inline-flex';
    }
  }

  // GitHub Modal Setup
  const githubModal = document.getElementById('githubModal');
  const githubSettingsBtn = document.getElementById('githubSettingsBtn');
  const headerGithubSettingsBtn = document.getElementById('headerGithubSettingsBtn');
  const closeGithubModal = document.getElementById('closeGithubModal');
  const saveGithubSettingsBtn = document.getElementById('saveGithubSettingsBtn');
  const createGistBtn = document.getElementById('createGistBtn');
  
  const githubPatInput = document.getElementById('githubPat');
  const githubGistIdInput = document.getElementById('githubGistId');

  const openGithubModal = () => {
    if (githubPatInput) githubPatInput.value = githubSettings.pat || '';
    if (githubGistIdInput) githubGistIdInput.value = githubSettings.gistId || '';
    
    // Toggle create Gist button visibility
    if (createGistBtn) {
      createGistBtn.style.display = (githubSettings.pat && !githubSettings.gistId) ? 'inline-flex' : 'none';
    }
    
    githubModal.classList.add('show');
  };

  if (githubSettingsBtn && githubModal) {
    githubSettingsBtn.addEventListener('click', openGithubModal);
  }
  
  if (headerGithubSettingsBtn && githubModal) {
    headerGithubSettingsBtn.addEventListener('click', openGithubModal);
  }
  
  if (closeGithubModal && githubModal) {
    closeGithubModal.addEventListener('click', () => {
      githubModal.classList.remove('show');
    });
    githubModal.addEventListener('click', (e) => {
      if (e.target === githubModal) {
        githubModal.classList.remove('show');
      }
    });
  }
  
  // Monitor PAT input to show "Create Gist" button
  if (githubPatInput && createGistBtn) {
    githubPatInput.addEventListener('input', () => {
      const pat = githubPatInput.value.trim();
      createGistBtn.style.display = (pat && !githubGistIdInput.value.trim()) ? 'inline-flex' : 'none';
    });
  }
  if (githubGistIdInput && createGistBtn) {
    githubGistIdInput.addEventListener('input', () => {
      const gistId = githubGistIdInput.value.trim();
      const pat = githubPatInput ? githubPatInput.value.trim() : '';
      createGistBtn.style.display = (pat && !gistId) ? 'inline-flex' : 'none';
    });
  }
  
  // Create Private Gist Automatically!
  if (createGistBtn) {
    createGistBtn.addEventListener('click', async () => {
      const pat = githubPatInput.value.trim();
      if (!pat) {
        alert(_t("alert_enter_pat"));
        return;
      }
      
      createGistBtn.disabled = true;
      createGistBtn.textContent = _t("btn_creating");
      
      try {
        const response = await fetch('https://api.github.com/gists', {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'Authorization': `token ${pat}`
          },
          body: JSON.stringify({
            description: 'BleWebler Label Templates',
            public: false,
            files: {
              [DEFAULT_GIST_FILENAME]: {
                content: JSON.stringify(customTemplates, null, 2)
              }
            }
          })
        });
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const gist = await response.json();
        githubGistIdInput.value = gist.id;
        createGistBtn.style.display = 'none';
        alert(_t("alert_gist_created"));
      } catch (err) {
        console.error("Gist creation failed:", err);
        alert(_t("alert_gist_creation_failed") + err.message);
      } finally {
        createGistBtn.disabled = false;
        createGistBtn.textContent = _t("btn_create_gist");
      }
    });
  }
  
  if (saveGithubSettingsBtn && githubModal) {
    saveGithubSettingsBtn.addEventListener('click', async () => {
      const pat = githubPatInput ? githubPatInput.value.trim() : '';
      let gistId = githubGistIdInput ? githubGistIdInput.value.trim() : '';
      
      if (pat && !gistId) {
        // Try to auto-discover an existing Gist containing our templates
        try {
          const response = await fetch('https://api.github.com/gists', {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `token ${pat}`
            }
          });
          if (response.ok) {
            const gists = await response.json();
            const existingGist = gists.find(g => g.files && g.files[DEFAULT_GIST_FILENAME]);
            if (existingGist) {
              gistId = existingGist.id;
              if (githubGistIdInput) githubGistIdInput.value = gistId;
              alert(_t("alert_existing_gist_found"));
            }
          }
        } catch (err) {
          console.error("Auto-discovery failed:", err);
        }
      }
      
      saveGithubSettings(pat, gistId);
      githubModal.classList.remove('show');
      
      // Update Sync button visibility
      if (syncBtn) {
        syncBtn.style.display = (pat && gistId) ? 'inline-flex' : 'none';
      }
      
      // Reload templates with new settings
      await fetchTemplates();
    });
  }
}
