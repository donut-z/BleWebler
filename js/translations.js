/**
 * BleWebler - Translation Module
 * Handles bilingual (NL/EN) support for static UI text, tooltips, placeholders, and dynamic JS dialogs.
 */

const translations = {
  nl: {
    // Header & Navigation
    "app_title": "Label Printer",
    "app_subtitle": "Open source",
    "tooltip_shortcuts": "Sneltoetsen",
    "tooltip_settings": "Papierinstellingen",
    "tooltip_language": "Taal wijzigen (NL / EN)",
    
    // Tabs
    "tab_text": "Tekst",
    "tab_info": "Info",
    
    // Templates Accordion
    "accordion_templates": "Sjablonen",
    "tooltip_save_template": "Huidig ontwerp opslaan als sjabloon",
    "tooltip_github_settings": "GitHub Sync Instellingen",
    "templates_saved_title": "Opgeslagen Sjablonen",
    "btn_sync": "Sync Nu",
    "templates_empty_gist": "Nog geen sjablonen opgeslagen. Klik hierboven op het diskette-icoon om te beginnen.",
    "templates_empty_offline": "Geen lokale sjablonen. Klik hierboven op het diskette-icoon om je ontwerp lokaal op te slaan.",
    
    // Dimension Controls
    "lbl_height": "Hoogte:",
    "lbl_width": "Breedte:",
    "tooltip_unlock_height": "Hoogte ontgrendelen",
    "tooltip_lock_height": "Hoogte vergrendelen",
    "tooltip_unlock_width": "Breedte ontgrendelen",
    "tooltip_lock_width": "Breedte vergrendelen",
    
    // Main Action Buttons
    "tooltip_add_date": "Datum-sjabloon invoegen",
    "tooltip_add_text": "Tekst toevoegen",
    "tooltip_upload_image": "Afbeelding uploaden",
    "tooltip_add_qr": "QR-code toevoegen",
    "btn_print": "Label printen",
    "btn_connect": "Verbind printer",
    "btn_disconnect": "Verbinding verbreken",
    
    // Formatting & Alignment Controls
    "tooltip_font_size": "Lettergrootte",
    "placeholder_font_family": "Lettertype",
    "tooltip_bold": "Vet",
    "tooltip_italic": "Cursief",
    "tooltip_underline": "Onderstreept",
    "tooltip_align_left": "Links uitlijnen",
    "tooltip_align_center": "Centreren",
    "tooltip_align_right": "Rechts uitlijnen",
    "tooltip_align_top": "Boven uitlijnen",
    "tooltip_align_middle": "Midden uitlijnen",
    "tooltip_align_bottom": "Onder uitlijnen",
    "tooltip_load_system_fonts": "Systeemlettertypen laden",
    "btn_delete_object": "Verwijderen",
    
    // Settings Modal
    "settings_modal_title": "Papierinstellingen",
    "settings_modal_printer": "Printer Model",
    "settings_modal_width": "Papier Breedte (mm)",
    "settings_modal_height": "Papier Hoogte (mm)",
    "settings_modal_infinite": "Doorlopende rol (variabele lengte)",
    "settings_modal_padding": "Marge (mm)",
    "settings_modal_padding_top": "Boven",
    "settings_modal_padding_bottom": "Onder",
    "settings_modal_padding_left": "Links",
    "settings_modal_padding_right": "Rechts",
    "settings_modal_btn_apply": "Instellingen toepassen",
    
    // Bluetooth Modal
    "bt_modal_title": "Web Bluetooth niet ondersteund",
    "bt_modal_p1": "Je browser ondersteunt de Web Bluetooth API niet. Dit is vereist om direct verbinding te maken en te printen via bluetooth.",
    "bt_modal_p2": "Gebruik een ondersteunde browser (zoals Google Chrome, Microsoft Edge of Opera) op een apparaat met Bluetooth.",
    "bt_modal_btn_close": "Sluiten",
    
    // GitHub Gist Modal
    "gh_modal_title": "GitHub Gist Synchronisatie",
    "gh_modal_p1": "Sla je sjablonen veilig op in een GitHub Gist om ze te synchroniseren tussen je computer en telefoon.",
    "gh_modal_pat_label": "GitHub Personal Access Token (classic met 'gist' scope)",
    "gh_modal_pat_placeholder": "ghp_...",
    "gh_modal_gist_label": "Gist ID (optioneel, leeglaten om een nieuwe te maken)",
    "gh_modal_gist_placeholder": "Laat leeg voor nieuwe Gist",
    "gh_modal_btn_save": "GitHub Koppelen",
    "gh_modal_btn_disconnect": "Koppeling verbreken",
    "gh_modal_btn_close": "Sluiten",
    "gh_modal_pat_desc": "Maak een token aan met de 'gist' scope. Klik op de link hierboven om deze direct met de juiste instellingen aan te maken op GitHub.",
    "gh_modal_btn_create": "Gist Aanmaken",
    
    // Keyboard Shortcuts Modal
    "shortcuts_modal_title": "Sneltoetsen",
    "shortcut_del": "Delete / Backspace",
    "shortcut_del_desc": "Geselecteerd object verwijderen",
    "shortcut_arrows": "Pijltjestoetsen",
    "shortcut_arrows_desc": "Object 1px verplaatsen",
    "shortcut_shift_arrows": "Shift + Pijltjestoetsen",
    "shortcut_shift_arrows_desc": "Object 10px verplaatsen",
    "shortcut_ctrl_z": "Ctrl + Z / Cmd + Z",
    "shortcut_ctrl_z_desc": "Ongedaan maken (Undo)",
    "shortcut_ctrl_y": "Ctrl + Y / Cmd + Y",
    "shortcut_ctrl_y_desc": "Opnieuw uitvoeren (Redo)",
    "shortcut_ctrl_c": "Ctrl + C / Cmd + C",
    "shortcut_ctrl_c_desc": "Object kopiëren",
    "shortcut_ctrl_v": "Ctrl + V / Cmd + V",
    "shortcut_ctrl_v_desc": "Object plakken",
    "shortcut_escape": "Escape",
    "shortcut_escape_desc": "Selectie opheffen",
    "shortcuts_modal_btn_close": "Sluiten",

    // Advanced Section
    "show_advanced": "Geavanceerd tonen",
    "hide_advanced": "Geavanceerd verbergen",

    // Printer Info Panel & Copies
    "info_header": "Printer Informatie",
    "info_click_to_fetch": "Klik om info op te halen...",
    "btn_refresh": "Vernieuwen",
    "lbl_copies": "Aantal kopieën:",
    "settings_modal_p1": "Je selecties worden opgeslagen in de URL.",

    // Shortcuts Dynamic List
    "Rotate selected object left": "Geselecteerd object linksom draaien",
    "Rotate selected object right": "Geselecteerd object rechtsom draaien",
    "Delete selected object": "Geselecteerd object verwijderen",
    "Deselect object": "Selectie opheffen",
    "Move selected object left": "Geselecteerd object naar links verplaatsen",
    "Move selected object right": "Geselecteerd object naar rechts verplaatsen",
    "Move selected object up": "Geselecteerd object omhoog verplaatsen",
    "Move selected object down": "Geselecteerd object omlaag verplaatsen",
    "Move selected object left (fine)": "Geselecteerd object naar links verplaatsen (fijn)",
    "Move selected object right (fine)": "Geselecteerd object naar rechts verplaatsen (fijn)",
    "Move selected object up (fine)": "Geselecteerd object omhoog verplaatsen (fijn)",
    "Move selected object down (fine)": "Geselecteerd object omlaag verplaatsen (fijn)",

    // Dynamic Javascript Strings (Dialogs & Alerts)
    "confirm_load_template": "Weet je zeker dat je dit sjabloon wilt laden? Je huidige ontwerp wordt overschreven.",
    "alert_no_template": "Sjabloon niet gevonden.",
    "prompt_template_name": "Voer een naam in voor dit sjabloon:",
    "confirm_delete_template": "Weet je zeker dat je dit sjabloon wilt verwijderen?",
    "alert_no_canvas": "Geen canvas gevonden.",
    "alert_no_template": "Sjabloon niet gevonden.",
    "alert_failed_github": "Fout bij synchroniseren met GitHub Gist: ",
    "alert_saved_local_fallback": "\n\nJe templates zijn wel lokaal in je browser opgeslagen.",
    "alert_enter_pat": "Vul eerst je GitHub PAT (Personal Access Token) in.",
    "alert_gist_created": "Succesvol een private Gist aangemaakt op GitHub!\nKlik nu op 'Opslaan & Verbinden' om te voltooien.",
    "alert_gist_creation_failed": "Fout bij het aanmaken van de Gist: ",
    "alert_existing_gist_found": "Bestaand sjablonenbestand gevonden op GitHub en automatisch gekoppeld!",
    "btn_creating": "Aanmaken...",
    "btn_create_gist": "Gist aanmaken",
    "status_sync_loading": "Laden...",
    "status_sync_success": "Gesynchroniseerd met GitHub Gist",
    "status_sync_empty": "Gist leeg, nog geen templates",
    "status_sync_failed_local": "GitHub Sync mislukt, lokale back-up geladen",
    "status_sync_offline": "Offline (geen GitHub gekoppeld)",
    "status_sync_saving": "Opslaan op GitHub...",
    "status_sync_saved": "Opgeslagen op GitHub Gist",
    "status_sync_saved_local_warn": "Lokaal opgeslagen, GitHub sync mislukt",
    "status_sync_saved_local": "Lokaal opgeslagen",
    "status_bt_connecting": "Verbinden...",
    "status_bt_retrieving": "Informatie ophalen...",
    "status_bt_failed": "Kan geen verbinding maken met printer.",
    "status_bt_err_func_not_found": "Fout: connectPrinter functie niet gevonden.",
    "status_bt_connected": "Verbonden met printer",
    "status_bt_disconnected": "Printer verbinding verbroken",
    "status_bt_error": "Verbindingsfout: ",
    "alert_load_fonts_failed": "Systeemlettertypen konden niet worden geladen. Bekijk de console voor details.",
    "alert_no_font_access_api": "Je browser ondersteunt de Local Font Access API niet.",
    "date_added_log": "Datum toegevoegd en passend gemaakt voor huidige label."
  },
  en: {
    // Header & Navigation
    "app_title": "Label Printer",
    "app_subtitle": "Open source",
    "tooltip_shortcuts": "Keyboard Shortcuts",
    "tooltip_settings": "Paper Settings",
    "tooltip_language": "Change Language (NL / EN)",
    
    // Tabs
    "tab_text": "Text",
    "tab_info": "Info",
    
    // Templates Accordion
    "accordion_templates": "Templates",
    "tooltip_save_template": "Save current design as template",
    "tooltip_github_settings": "GitHub Sync Settings",
    "templates_saved_title": "Saved Templates",
    "btn_sync": "Sync Now",
    "templates_empty_gist": "No templates saved yet. Click the disk icon above to begin.",
    "templates_empty_offline": "No local templates. Click the disk icon above to save your design locally.",
    
    // Dimension Controls
    "lbl_height": "Height:",
    "lbl_width": "Width:",
    "tooltip_unlock_height": "Unlock Height",
    "tooltip_lock_height": "Lock Height",
    "tooltip_unlock_width": "Unlock Width",
    "tooltip_lock_width": "Lock Width",
    
    // Main Action Buttons
    "tooltip_add_date": "Insert Date Template",
    "tooltip_add_text": "Add Text",
    "tooltip_upload_image": "Upload Image",
    "tooltip_add_qr": "Add QR Code",
    "btn_print": "Print Label",
    "btn_connect": "Connect Printer",
    "btn_disconnect": "Disconnect",
    
    // Formatting & Alignment Controls
    "tooltip_font_size": "Font Size",
    "placeholder_font_family": "Font Family",
    "tooltip_bold": "Bold",
    "tooltip_italic": "Italic",
    "tooltip_underline": "Underline",
    "tooltip_align_left": "Align Left",
    "tooltip_align_center": "Align Center",
    "tooltip_align_right": "Align Right",
    "tooltip_align_top": "Align Top",
    "tooltip_align_middle": "Align Middle",
    "tooltip_align_bottom": "Align Bottom",
    "tooltip_load_system_fonts": "Load System Fonts",
    "btn_delete_object": "Delete",
    
    // Settings Modal
    "settings_modal_title": "Paper Settings",
    "settings_modal_printer": "Printer Model",
    "settings_modal_width": "Paper Width (mm)",
    "settings_modal_height": "Paper Height (mm)",
    "settings_modal_infinite": "Continuous Roll (variable length)",
    "settings_modal_padding": "Padding (mm)",
    "settings_modal_padding_top": "Top",
    "settings_modal_padding_bottom": "Bottom",
    "settings_modal_padding_left": "Left",
    "settings_modal_padding_right": "Right",
    "settings_modal_btn_apply": "Apply Settings",
    
    // Bluetooth Modal
    "bt_modal_title": "Web Bluetooth Not Supported",
    "bt_modal_p1": "Your browser does not support the Web Bluetooth API. This is required to connect directly and print via Bluetooth.",
    "bt_modal_p2": "Please use a supported browser (such as Google Chrome, Microsoft Edge, or Opera) on a device with Bluetooth enabled.",
    "bt_modal_btn_close": "Close",
    
    // GitHub Gist Modal
    "gh_modal_title": "GitHub Gist Synchronization",
    "gh_modal_p1": "Safely store your templates in a GitHub Gist to synchronize them between your computer and mobile phone.",
    "gh_modal_pat_label": "GitHub Personal Access Token (classic with 'gist' scope)",
    "gh_modal_pat_placeholder": "ghp_...",
    "gh_modal_gist_label": "Gist ID (optional, leave blank to generate a new one)",
    "gh_modal_gist_placeholder": "Leave empty for new Gist",
    "gh_modal_btn_save": "Link GitHub",
    "gh_modal_btn_disconnect": "Unlink GitHub",
    "gh_modal_btn_close": "Close",
    "gh_modal_pat_desc": "Create a token with the 'gist' scope. Click the link above to create it directly with the correct settings on GitHub.",
    "gh_modal_btn_create": "Create Gist",
    
    // Keyboard Shortcuts Modal
    "shortcuts_modal_title": "Keyboard Shortcuts",
    "shortcut_del": "Delete / Backspace",
    "shortcut_del_desc": "Delete selected object",
    "shortcut_arrows": "Arrow Keys",
    "shortcut_arrows_desc": "Move object by 1px",
    "shortcut_shift_arrows": "Shift + Arrow Keys",
    "shortcut_shift_arrows_desc": "Move object by 10px",
    "shortcut_ctrl_z": "Ctrl + Z / Cmd + Z",
    "shortcut_ctrl_z_desc": "Undo action",
    "shortcut_ctrl_y": "Ctrl + Y / Cmd + Y",
    "shortcut_ctrl_y_desc": "Redo action",
    "shortcut_ctrl_c": "Ctrl + C / Cmd + C",
    "shortcut_ctrl_c_desc": "Copy object",
    "shortcut_ctrl_v": "Ctrl + V / Cmd + V",
    "shortcut_ctrl_v_desc": "Paste object",
    "shortcut_escape": "Escape",
    "shortcut_escape_desc": "Deselect active object",
    "shortcuts_modal_btn_close": "Close",

    // Advanced Section
    "show_advanced": "Show Advanced",
    "hide_advanced": "Hide Advanced",

    // Printer Info Panel & Copies
    "info_header": "Printer Information",
    "info_click_to_fetch": "Click to fetch info...",
    "btn_refresh": "Refresh",
    "lbl_copies": "Copies:",
    "settings_modal_p1": "Your selections will be saved in the URL.",

    // Shortcuts Dynamic List
    "Rotate selected object left": "Rotate selected object left",
    "Rotate selected object right": "Rotate selected object right",
    "Delete selected object": "Delete selected object",
    "Deselect object": "Deselect active object",
    "Move selected object left": "Move selected object left",
    "Move selected object right": "Move selected object right",
    "Move selected object up": "Move selected object up",
    "Move selected object down": "Move selected object down",
    "Move selected object left (fine)": "Move selected object left (fine)",
    "Move selected object right (fine)": "Move selected object right (fine)",
    "Move selected object up (fine)": "Move selected object up (fine)",
    "Move selected object down (fine)": "Move selected object down (fine)",

    // Dynamic Javascript Strings (Dialogs & Alerts)
    "confirm_load_template": "Are you sure you want to load this template? Your current design will be overwritten.",
    "prompt_template_name": "Enter a name for this template:",
    "confirm_delete_template": "Are you sure you want to delete this template?",
    "alert_no_canvas": "No canvas found.",
    "alert_no_template": "Template not found.",
    "alert_failed_github": "Error synchronizing with GitHub Gist: ",
    "alert_saved_local_fallback": "\n\nYour templates have been saved locally in your browser instead.",
    "alert_enter_pat": "Please enter your GitHub PAT (Personal Access Token) first.",
    "alert_gist_created": "Successfully created a private Gist on GitHub!\nNow click 'Save & Connect' to finish.",
    "alert_gist_creation_failed": "Error creating Gist: ",
    "alert_existing_gist_found": "Existing templates file found on GitHub and automatically linked!",
    "btn_creating": "Creating...",
    "btn_create_gist": "Create Gist",
    "status_sync_loading": "Loading...",
    "status_sync_success": "Synced with GitHub Gist",
    "status_sync_empty": "Gist empty, no templates yet",
    "status_sync_failed_local": "GitHub Sync failed, loaded local backup",
    "status_sync_offline": "Offline (no GitHub linked)",
    "status_sync_saving": "Saving to GitHub...",
    "status_sync_saved": "Saved to GitHub Gist",
    "status_sync_saved_local_warn": "Saved locally, GitHub sync failed",
    "status_sync_saved_local": "Saved locally",
    "status_bt_connecting": "Connecting...",
    "status_bt_retrieving": "Retrieving information...",
    "status_bt_failed": "Could not connect to printer.",
    "status_bt_err_func_not_found": "Error: connectPrinter function not found.",
    "status_bt_connected": "Connected to printer",
    "status_bt_disconnected": "Printer disconnected",
    "status_bt_error": "Connection error: ",
    "alert_load_fonts_failed": "Failed to load system fonts. Please check console for details.",
    "alert_no_font_access_api": "Your browser does not support the Local Font Access API.",
    "date_added_log": "Date added and scaled to fit current label."
  }
};

// Application Language state
let currentLanguage = 'nl';

/**
 * Switch the application language and translate the entire DOM.
 * @param {string} lang - The target language ('nl' or 'en')
 */
window.setLanguage = function(lang) {
  if (lang !== 'nl' && lang !== 'en') lang = 'nl';
  currentLanguage = lang;
  localStorage.setItem('blewebler_language', lang);

  // 1. Translate all text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // 2. Translate placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // 3. Translate tooltips with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (translations[lang][key]) {
      el.setAttribute('title', translations[lang][key]);
    }
  });
  
  // 4. Update the language button visual state
  const langBtn = document.getElementById('languageBtn');
  if (langBtn) {
    langBtn.setAttribute('title', translations[lang]["tooltip_language"]);
    langBtn.textContent = lang === 'nl' ? 'EN' : 'NL';
  }

  // 5. Dynamic updates in other files (like empty templates messages)
  if (window.renderTemplatesLists) {
    window.renderTemplatesLists();
  }

  // 6. Translate advanced panel toggle button based on visibility
  const advSection = document.getElementById("advancedSection");
  const advBtn = document.getElementById("advancedToggleBtn");
  if (advSection && advBtn) {
    const isHidden = advSection.style.display === "none" || advSection.style.display === "";
    const toggleText = advBtn.querySelector(".toggle-text");
    if (toggleText) {
      toggleText.textContent = isHidden ? translations[lang]["show_advanced"] : translations[lang]["hide_advanced"];
    }
  }

  // 7. Force keyboard shortcuts list re-rendering
  if (window.renderShortcutsList) {
    window.renderShortcutsList();
  }
};

/**
 * Get a translation by key in the current language.
 * @param {string} key - The dictionary key
 * @returns {string} - Translated string or key if not found
 */
window._t = function(key) {
  if (translations[currentLanguage] && translations[currentLanguage][key]) {
    return translations[currentLanguage][key];
  }
  return key;
};

/**
 * Toggle the language between NL and EN.
 */
window.toggleLanguage = function() {
  const nextLang = currentLanguage === 'nl' ? 'en' : 'nl';
  window.setLanguage(nextLang);
};

// Initialize Language on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  // Check localStorage, fallback to browser locale
  let savedLang = localStorage.getItem('blewebler_language');
  if (!savedLang) {
    savedLang = navigator.language && navigator.language.startsWith('nl') ? 'nl' : 'en';
  }
  window.setLanguage(savedLang);
});
