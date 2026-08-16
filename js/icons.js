/**
 * BleWebler - Icon Library & Picker Module
 * Combines curated label/ISO symbols with the full Lucide vector library (>2,000 icons).
 * All 2,000+ icons are intelligently classified into specific functional categories
 * with live bilingual search (NL/EN), category filtering, and infinite scroll.
 */

const ICON_CATEGORIES = [
  { id: 'all', nameKey: 'icon_cat_all', name: 'Alles (>2000)' },
  { id: 'food', nameKey: 'icon_cat_food', name: 'Keuken & Voeding' },
  { id: 'packaging', nameKey: 'icon_cat_packaging', name: 'Verpakking & Verzending' },
  { id: 'office', nameKey: 'icon_cat_office', name: 'Kantoor & Opslag' },
  { id: 'tools', nameKey: 'icon_cat_tools', name: 'Gereedschap & DIY' },
  { id: 'safety', nameKey: 'icon_cat_safety', name: 'Veiligheid & Gevaar' },
  { id: 'transport', nameKey: 'icon_cat_transport', name: 'Vervoer & Reizen' },
  { id: 'nature', nameKey: 'icon_cat_nature', name: 'Natuur & Dieren' },
  { id: 'tech', nameKey: 'icon_cat_tech', name: 'Elektronica & IT' },
  { id: 'health', nameKey: 'icon_cat_health', name: 'Gezondheid & Medisch' },
  { id: 'care', nameKey: 'icon_cat_care', name: 'Wasvoorschriften & Textiel' },
  { id: 'arrows', nameKey: 'icon_cat_arrows', name: 'Pijlen & Symbolen' }
];

// Keyword matchers for automatically categorizing Lucide icons into functional categories
const CATEGORY_MATCHERS = {
  food: [
    'coffee', 'tea', 'cup', 'glass', 'utensil', 'fork', 'knife', 'spoon', 'apple', 'banana',
    'cherry', 'carrot', 'soup', 'pizza', 'sandwich', 'cake', 'cookie', 'croissant', 'donut',
    'egg', 'fish', 'beef', 'drumstick', 'salad', 'ice-cream', 'popcorn', 'milk', 'beer',
    'wine', 'goblet', 'bottle', 'chef', 'wheat', 'candy', 'refrigerator', 'microwave',
    'flame', 'cooking', 'citrus', 'grape', 'bean', 'ham', 'lollipop', 'martini', 'dessert'
  ],
  packaging: [
    'package', 'box', 'archive', 'container', 'truck', 'van', 'cart', 'shopping', 'bag',
    'tag', 'barcode', 'qr', 'gift', 'store', 'shop', 'parcel', 'crate', 'recycle', 'pallet',
    'shipping', 'delivery', 'receipt', 'badge-percent', 'shield-check'
  ],
  office: [
    'folder', 'file', 'document', 'paper', 'clip', 'pin', 'calendar', 'clock', 'time',
    'timer', 'watch', 'book', 'bookmark', 'notebook', 'pen', 'pencil', 'edit', 'lock',
    'key', 'briefcase', 'building', 'stamp', 'sticky', 'desk', 'presentation', 'calculator',
    'clipboard', 'newspaper', 'mail', 'inbox', 'printer', 'archive'
  ],
  tools: [
    'wrench', 'hammer', 'screwdriver', 'drill', 'saw', 'axe', 'scissors', 'ruler', 'bolt',
    'screw', 'anvil', 'pliers', 'paint-brush', 'paint-roller', 'hard-hat', 'tool', 'construct',
    'gauge', 'measur', 'shovel', 'pickaxe'
  ],
  safety: [
    'alert', 'warn', 'triangle', 'skull', 'hazard', 'radiation', 'biohazard', 'flame',
    'fire', 'zap', 'voltage', 'shock', 'shield', 'siren', 'ban', 'prohibit', 'barrier',
    'extinguish', 'cctv', 'siren', 'lock', 'eye', 'life-buoy'
  ],
  transport: [
    'car', 'truck', 'bus', 'train', 'tram', 'plane', 'flight', 'rocket', 'ship', 'boat',
    'anchor', 'bike', 'bicycle', 'motorcycle', 'scooter', 'traffic', 'fuel', 'gas',
    'navigation', 'map', 'compass', 'globe', 'luggage', 'suitcase', 'ticket', 'ferry', 'sailboat'
  ],
  nature: [
    'tree', 'flower', 'leaf', 'sprout', 'plant', 'sun', 'moon', 'cloud', 'rain', 'snow',
    'wind', 'storm', 'tornado', 'water', 'droplet', 'mountain', 'dog', 'cat', 'bird',
    'fish', 'bug', 'rabbit', 'snail', 'squirrel', 'footprint', 'paw', 'feather', 'rainbow',
    'earth', 'sunset', 'sunrise', 'volcano', 'tent'
  ],
  tech: [
    'laptop', 'computer', 'monitor', 'screen', 'phone', 'smartphone', 'tablet', 'battery',
    'plug', 'cable', 'wire', 'socket', 'cpu', 'chip', 'hard-drive', 'disc', 'server',
    'database', 'wifi', 'bluetooth', 'network', 'router', 'printer', 'camera', 'webcam',
    'headphone', 'speaker', 'mic', 'radio', 'tv', 'usb', 'robot', 'gamepad', 'joystick',
    'mouse', 'keyboard'
  ],
  health: [
    'heart', 'pulse', 'activity', 'cross', 'pill', 'tablet', 'capsule', 'syringe',
    'stethoscope', 'hospital', 'ambulance', 'thermometer', 'bandage', 'first-aid', 'dna',
    'microscope', 'test-tube', 'beaker', 'flask', 'tooth', 'brain', 'eye', 'hearing',
    'accessibility', 'virus', 'bacteria', 'bone'
  ],
  care: [
    'shirt', 'cloth', 'coat', 'dress', 'hanger', 'footwear', 'scissors', 'tag', 'wash',
    'iron', 'bleach', 'dry', 'sparkle', 'glasses', 'watch'
  ],
  arrows: [
    'arrow', 'chevron', 'corner', 'move', 'rotate', 'repeat', 'refresh', 'undo', 'redo',
    'check', 'x', 'cross', 'plus', 'minus', 'equal', 'divide', 'percent', 'star', 'smile',
    'frown', 'meh', 'info', 'help', 'question', 'thumbs'
  ]
};

// Dutch to English search synonym dictionary for quick discovery of Lucide icons
const DUTCH_SYNONYMS = {
  'hond': 'dog',
  'kat': 'cat',
  'auto': 'car vehicle',
  'wagen': 'car vehicle truck',
  'fiets': 'bike bicycle',
  'trein': 'train',
  'vliegtuig': 'plane airplane flight',
  'boot': 'boat ship anchor',
  'schip': 'ship boat anchor',
  'huis': 'house home building',
  'boom': 'tree',
  'bloem': 'flower',
  'plant': 'sprout plant leaf',
  'water': 'droplet water waves',
  'zon': 'sun sunny daylight',
  'maan': 'moon night',
  'wolk': 'cloud weather',
  'regen': 'rain cloud droplet',
  'sneeuw': 'snow snowflake freeze winter',
  'lamp': 'light lamp bulb idea',
  'licht': 'sun light bulb lamp',
  'telefoon': 'phone smartphone call',
  'muziek': 'music volume audio headphone mic sound',
  'film': 'film movie video video-recorder play',
  'camera': 'camera photo aperture video',
  'foto': 'camera image photo picture',
  'afbeelding': 'image photo picture gallery',
  'slot': 'lock unlock key security',
  'sleutel': 'key lock door',
  'ster': 'star favorite bookmark rating',
  'hart': 'heart love favorite like health',
  'hartje': 'heart love favorite like health',
  'bier': 'beer beverage drink glass',
  'koffie': 'coffee cup mug cafe tea',
  'thee': 'coffee tea cup mug',
  'eten': 'utensils fork knife spoon apple food pizza cake soup sandwich',
  'drinken': 'cup glass coffee wine beer goblet bottle',
  'wijn': 'wine glass bottle alcohol',
  'schaar': 'scissors cut',
  'knippen': 'scissors cut crop',
  'klok': 'clock watch timer time alarm hour',
  'tijd': 'time clock timer watch hour minute',
  'wekker': 'alarm-clock clock bell timer',
  'kalender': 'calendar date agenda day month year',
  'datum': 'calendar date day',
  'brief': 'mail envelope message post letter send',
  'bericht': 'message chat mail comment message-square',
  'geld': 'dollar euro coin banknote credit-card wallet bank',
  'euro': 'euro dollar coin banknote wallet bank',
  'portemonnee': 'wallet credit-card bank',
  'winkel': 'shopping cart bag store shop buy',
  'kopen': 'shopping cart bag store shop buy tag price',
  'tas': 'shopping-bag bag brief-case',
  'doos': 'package box archive cube',
  'pakket': 'package box parcel delivery shipping truck',
  'post': 'mail envelope package box truck delivery',
  'gereedschap': 'wrench hammer tool screwdriver axe drill',
  'reparatie': 'wrench hammer tool screwdriver construction',
  'veilig': 'shield check lock safe security protect',
  'beveiliging': 'shield lock key camera eye cctv',
  'gevaar': 'alert warning triangle skull radiation biohazard flame',
  'waarschuwing': 'alert warning triangle alert-circle siren',
  'brand': 'flame fire hot ignite',
  'vuur': 'flame fire hot ignite',
  'bliksem': 'zap lightning flash power',
  'elektriciteit': 'zap battery plug power voltage lightning socket',
  'stroom': 'zap battery plug power voltage lightning socket',
  'batterij': 'battery charging power',
  'accu': 'battery charging power',
  'stekker': 'plug socket power wire cord',
  'kabel': 'cable usb wire cord link',
  'afval': 'trash bin delete remove',
  'prullenbak': 'trash bin delete remove',
  'verwijderen': 'trash delete remove x cross ban',
  'zoeken': 'search magnifying-glass find lookup',
  'kaart': 'map pin navigation compass route locate',
  'locatie': 'pin map navigation compass landmark flag',
  'persoon': 'user person users contact user-check',
  'gebruiker': 'user person account profile',
  'mens': 'user person accessibility',
  'instellingen': 'settings gear sliders sliders-horizontal tool',
  'opties': 'settings gear sliders sliders-horizontal menu',
  'wifi': 'wifi wireless network signal broadcast',
  'internet': 'globe wifi network browser link',
  'netwerk': 'network wifi server database router',
  'laptop': 'laptop computer monitor screen pc',
  'computer': 'laptop computer monitor screen pc cpu hard-drive',
  'scherm': 'monitor screen display tv tablet',
  'printer': 'printer print paper document',
  'geluid': 'volume speaker audio sound bell mic',
  'stil': 'volume-x mute quiet bell-off',
  'cadeau': 'gift package present box birthday',
  'feest': 'gift cake party sparkles confetti wine',
  'kleding': 'shirt dress scissors tag coat',
  'kleren': 'shirt dress scissors tag coat hanger',
  'reizen': 'plane luggage suitcase car compass map globe ticket hotel',
  'koffer': 'luggage suitcase briefcase bag package',
  'sport': 'trophy medal dumbbell activity bike flag target',
  'gezondheid': 'heart activity cross pill stethoscope hospital medical',
  'dokter': 'stethoscope cross pill hospital user-check',
  'ziekenhuis': 'hospital cross pill ambulance syringe',
  'medicijn': 'pill cross bottle syringe test-tube beaker',
  'apotheek': 'cross pill test-tube beaker bottle',
  'kantoor': 'folder file-text paperclip pin archive building brief-case',
  'document': 'file-text file folder book archive sheet',
  'map': 'folder archive directory folder-open',
  'folder': 'folder archive directory',
  'bestand': 'file file-text document image',
  'pen': 'pen pencil edit feather stylus',
  'potlood': 'pencil pen edit',
  'schrijven': 'pen pencil edit file-text book',
  'boeken': 'book bookmark library graduation-cap book-open',
  'lezen': 'book book-open bookmark glasses eye',
  'bril': 'glasses eye glasses-round',
  'oog': 'eye view watch look scan',
  'check': 'check check-circle check-square verified badge-check',
  'goed': 'check check-circle thumbs-up smile verified',
  'fout': 'x x-circle ban alert-triangle thumbs-down',
  'annuleren': 'x x-circle ban rotate-ccw',
  'terug': 'arrow-left undo rotate-ccw chevron-left',
  'verder': 'arrow-right redo chevron-right next',
  'omhoog': 'arrow-up chevron-up top upload',
  'omlaag': 'arrow-down chevron-down download bottom',
  'draaien': 'refresh-cw rotate-cw rotate-ccw repeat',
  'herhalen': 'repeat refresh-cw rotate-cw cycle',
  'vernieuwen': 'refresh-cw rotate-cw update sync',
  'synchroniseren': 'refresh-cw rotate-cw update sync database',
  'vlag': 'flag landmark bookmark banner',
  'taal': 'globe languages message-square flag'
};

// Curated set of high-contrast label & symbol icons with multi-category mapping
const CURATED_ICONS = [
  // --- VERPAKKING & VERZENDING ---
  {
    id: 'package',
    name: 'Pakket / Doos',
    nameEn: 'Package / Box',
    categories: ['packaging', 'office'],
    keywords: ['doos', 'pakket', 'box', 'package', 'post', 'verzending', 'shipping', 'delivery', 'karton'],
    svg: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'
  },
  {
    id: 'fragile',
    name: 'Breekbaar (Glas)',
    nameEn: 'Fragile Glass',
    categories: ['packaging', 'safety', 'food'],
    keywords: ['breekbaar', 'glas', 'fragile', 'glass', 'wine', 'voorzichtig', 'care', 'handvat', 'breekbaar glas'],
    svg: '<path d="M8 22h8"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5V3H7v7a5 5 0 0 0 5 5Z"/><path d="M7 6h10"/>'
  },
  {
    id: 'umbrella',
    name: 'Droog Houden (Paraplu)',
    nameEn: 'Keep Dry (Umbrella)',
    categories: ['packaging', 'nature'],
    keywords: ['droog', 'paraplu', 'umbrella', 'keep dry', 'regen', 'water', 'beschermen'],
    svg: '<path d="M22 12a10.06 10.06 0 0 0-20 0Z"/><path d="M12 12v8a2 2 0 0 0 4 0"/><path d="M12 2v1"/>'
  },
  {
    id: 'this-way-up',
    name: 'Deze Zijde Boven',
    nameEn: 'This Way Up',
    categories: ['packaging', 'arrows'],
    keywords: ['boven', 'omhoog', 'this way up', 'this side up', 'pijlen', 'arrows', 'richting', 'oriëntatie'],
    svg: '<path d="M7 16V4"/><path d="M3 8l4-4 4 4"/><path d="M17 16V4"/><path d="M13 8l4-4 4 4"/><path d="M3 20h18"/>'
  },
  {
    id: 'recycle',
    name: 'Recycle',
    nameEn: 'Recycle',
    categories: ['packaging', 'nature'],
    keywords: ['recycle', 'hergebruik', 'milieu', 'eco', 'groen', 'afval', 'duurzaam'],
    svg: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16 3 3-3 3"/><path d="M8.293 13.596 5.5 9.5l4.135-7.162a1.83 1.83 0 0 1 1.57-.881 1.784 1.784 0 0 1 1.57.881l3.196 5.536"/><path d="m15.5 5.5-3-3 3-3"/><path d="m2 16 3 3 3-3"/>'
  },
  {
    id: 'truck',
    name: 'Vrachtwagen',
    nameEn: 'Delivery Truck',
    categories: ['packaging', 'transport'],
    keywords: ['vrachtwagen', 'truck', 'bezorging', 'transport', 'levering', 'post', 'shipping'],
    svg: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'
  },
  {
    id: 'shopping-cart',
    name: 'Winkelwagen',
    nameEn: 'Shopping Cart',
    categories: ['packaging', 'food'],
    keywords: ['winkelwagen', 'cart', 'kopen', 'shop', 'bestelling', 'order', 'winkel'],
    svg: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>'
  },
  {
    id: 'tag',
    name: 'Label / Prijs',
    nameEn: 'Price Tag',
    categories: ['packaging', 'care', 'office'],
    keywords: ['label', 'tag', 'prijs', 'prijskaartje', 'korting', 'sale', 'naam'],
    svg: '<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>'
  },
  {
    id: 'barcode',
    name: 'Barcode',
    nameEn: 'Barcode',
    categories: ['packaging', 'tech', 'office'],
    keywords: ['barcode', 'streepjescode', 'code', 'scan', 'product', 'sku', 'ean'],
    svg: '<path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/>'
  },
  {
    id: 'mail',
    name: 'Brief / Mail',
    nameEn: 'Envelope / Mail',
    categories: ['packaging', 'office'],
    keywords: ['mail', 'brief', 'enveloppe', 'envelope', 'post', 'bericht', 'contact'],
    svg: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'
  },
  {
    id: 'gift',
    name: 'Cadeau',
    nameEn: 'Gift',
    categories: ['packaging', 'food'],
    keywords: ['cadeau', 'gift', 'presentje', 'verjaardag', 'feest', 'pakje', 'strik'],
    svg: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>'
  },
  {
    id: 'shield-check',
    name: 'Gecontroleerd',
    nameEn: 'Shield Check',
    categories: ['packaging', 'safety'],
    keywords: ['schild', 'shield', 'check', 'veilig', 'kwaliteit', 'gekeurd', 'beveiligd'],
    svg: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'
  },

  // --- WASVOORSCHRIFTEN & ZORG (Speciale ISO symbolen) ---
  {
    id: 'shirt',
    name: 'Kleding / Textiel',
    nameEn: 'Shirt / Clothing',
    categories: ['care'],
    keywords: ['kleding', 'shirt', 'textiel', 'mode', 'stof', 'maat'],
    svg: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>'
  },
  {
    id: 'wash-tub',
    name: 'Wassen (Tobbe)',
    nameEn: 'Wash Tub',
    categories: ['care'],
    keywords: ['wassen', 'was', 'tobbe', 'water', 'wasmachine', 'laundry', 'wasvoorschrift'],
    svg: '<path d="M3 6h18l-2 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 6Z"/><path d="M3 11c3 1.5 6-1.5 9 0s6 1.5 9 0"/>'
  },
  {
    id: 'iron',
    name: 'Strijken',
    nameEn: 'Ironing',
    categories: ['care'],
    keywords: ['strijken', 'strijkijzer', 'iron', 'wasvoorschrift', 'strijkbout', 'kleding'],
    svg: '<path d="M4 18h16a2 2 0 0 0 2-2C22 10 18 7 13 7H4v11Z"/><path d="M4 11h9"/><circle cx="9" cy="14" r="1"/>'
  },
  {
    id: 'do-not-bleach',
    name: 'Niet Bleken',
    nameEn: 'Do Not Bleach',
    categories: ['care', 'safety'],
    keywords: ['bleken', 'niet bleken', 'driehoek', 'kruis', 'wasvoorschrift', 'bleach'],
    svg: '<polygon points="12 3 22 21 2 21 12 3"/><line x1="5" x2="19" y1="19" y2="9"/><line x1="19" x2="5" y1="19" y2="9"/>'
  },
  {
    id: 'tumble-dry',
    name: 'Droogtrommel',
    nameEn: 'Tumble Dry',
    categories: ['care'],
    keywords: ['droger', 'droogtrommel', 'tumble dry', 'drogen', 'wasvoorschrift'],
    svg: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="6"/>'
  },
  {
    id: 'dry-clean',
    name: 'Stomerij',
    nameEn: 'Dry Clean',
    categories: ['care'],
    keywords: ['stomerij', 'dry clean', 'chemisch reinigen', 'cirkel', 'wasvoorschrift'],
    svg: '<circle cx="12" cy="12" r="8"/>'
  }
];

// Unified memory store for all icons
let fullIconLibrary = [];
let activeIconCategory = 'all';
let iconSearchQuery = '';

// Pagination/Lazy rendering state
let renderedCount = 0;
const BATCH_SIZE = 80;
let currentFilteredList = [];

/**
 * Convert Lucide node tree to SVG inner string
 */
function lucideNodesToSvg(nodes) {
  if (!nodes || !Array.isArray(nodes)) return '';
  return nodes.map(([tag, attrs]) => {
    const attrPairs = Object.entries(attrs || {})
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    return `<${tag} ${attrPairs}/>`;
  }).join('');
}

/**
 * Build the unified icon database combining curated symbols + all Lucide icons with categories
 */
function buildFullIconLibrary() {
  const curatedIds = new Set(CURATED_ICONS.map(i => i.id.toLowerCase()));
  fullIconLibrary = [...CURATED_ICONS];

  if (window.lucide && window.lucide.icons) {
    for (const [key, nodes] of Object.entries(window.lucide.icons)) {
      const kebabName = key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
      
      // Skip if already in curated set
      if (curatedIds.has(kebabName) || curatedIds.has(key.toLowerCase())) continue;

      const readableName = key.replace(/([a-z])([A-Z0-9])/g, '$1 $2');
      const keywords = [
        key.toLowerCase(),
        kebabName,
        readableName.toLowerCase()
      ];

      // Assign categories based on keywords
      const matchedCategories = [];
      for (const [catId, matchWords] of Object.entries(CATEGORY_MATCHERS)) {
        if (matchWords.some(w => kebabName.includes(w))) {
          matchedCategories.push(catId);
        }
      }

      // If no specific category matched, assign to office or arrows depending on name
      if (matchedCategories.length === 0) {
        matchedCategories.push('office');
      }

      fullIconLibrary.push({
        id: `lucide-${kebabName}`,
        name: readableName,
        nameEn: readableName,
        categories: matchedCategories,
        keywords: keywords,
        svg: lucideNodesToSvg(nodes)
      });
    }
  }
}

/**
 * Open Icon Picker modal
 */
window.openIconPicker = function() {
  const modal = document.getElementById('iconModal');
  if (!modal) return;

  if (fullIconLibrary.length === 0) {
    buildFullIconLibrary();
  }

  renderCategoryTabs();
  resetAndRenderIconGrid();
  modal.classList.add('show');
  document.body.classList.add('modal-open');

  const searchInput = document.getElementById('iconSearchInput');
  if (searchInput) {
    searchInput.value = '';
    iconSearchQuery = '';
    setTimeout(() => searchInput.focus(), 50);
  }
};

/**
 * Close Icon Picker modal
 */
window.closeIconPicker = function() {
  const modal = document.getElementById('iconModal');
  if (modal) {
    modal.classList.remove('show');
  }
  if (!document.querySelector('.modal.show')) {
    document.body.classList.remove('modal-open');
  }
};

/**
 * Render category filter tabs
 */
function renderCategoryTabs() {
  const tabsContainer = document.getElementById('iconCategoryTabs');
  if (!tabsContainer) return;

  const currentLang = window.currentLanguage || 'nl';

  tabsContainer.innerHTML = ICON_CATEGORIES.map(cat => {
    let label = cat.name;
    if (typeof _t === 'function' && cat.nameKey) {
      label = _t(cat.nameKey) || cat.name;
    } else if (currentLang === 'en') {
      label = cat.id === 'all' ? 'All (>2000)' :
              cat.id === 'food' ? 'Kitchen & Food' :
              cat.id === 'packaging' ? 'Packaging & Shipping' :
              cat.id === 'office' ? 'Office & Storage' :
              cat.id === 'tools' ? 'Tools & DIY' :
              cat.id === 'safety' ? 'Safety & Hazard' :
              cat.id === 'transport' ? 'Transport & Travel' :
              cat.id === 'nature' ? 'Nature & Animals' :
              cat.id === 'tech' ? 'Electronics & IT' :
              cat.id === 'health' ? 'Health & Medical' :
              cat.id === 'care' ? 'Care & Laundry' : 'Arrows & Symbols';
    }
    const isActive = cat.id === activeIconCategory;
    return `<button type="button" class="icon-category-chip ${isActive ? 'active' : ''}" data-cat="${cat.id}">${label}</button>`;
  }).join('');

  tabsContainer.querySelectorAll('.icon-category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeIconCategory = chip.getAttribute('data-cat');
      renderCategoryTabs();
      resetAndRenderIconGrid();
    });
  });
}

/**
 * Reset grid scroll and render first batch of filtered icons
 */
function resetAndRenderIconGrid() {
  if (fullIconLibrary.length === 0) {
    buildFullIconLibrary();
  }

  const query = iconSearchQuery.trim().toLowerCase();
  
  // Expand search query with Dutch synonyms
  let searchTokens = query ? [query] : [];
  if (query) {
    for (const [nlTerm, enExpanded] of Object.entries(DUTCH_SYNONYMS)) {
      if (query.includes(nlTerm) || nlTerm.includes(query)) {
        enExpanded.split(' ').forEach(tok => {
          if (tok && !searchTokens.includes(tok)) {
            searchTokens.push(tok);
          }
        });
      }
    }
  }

  currentFilteredList = fullIconLibrary.filter(icon => {
    // 1. Category check
    if (activeIconCategory !== 'all') {
      const cats = icon.categories || (icon.category ? [icon.category] : []);
      if (!cats.includes(activeIconCategory)) {
        return false;
      }
    }

    // 2. Search query check
    if (searchTokens.length > 0) {
      const matchName = searchTokens.some(tok => icon.name.toLowerCase().includes(tok));
      const matchNameEn = icon.nameEn && searchTokens.some(tok => icon.nameEn.toLowerCase().includes(tok));
      const matchKeywords = icon.keywords && icon.keywords.some(k => searchTokens.some(tok => k.includes(tok)));
      return matchName || matchNameEn || matchKeywords;
    }
    return true;
  });

  const gridContainer = document.getElementById('iconGrid');
  if (!gridContainer) return;

  gridContainer.scrollTop = 0;
  gridContainer.innerHTML = '';
  renderedCount = 0;

  if (currentFilteredList.length === 0) {
    const emptyMsg = (typeof _t === 'function') ? _t('icon_no_results') : 'Geen iconen gevonden voor deze zoekopdracht.';
    gridContainer.innerHTML = `<div class="icon-empty-state">${emptyMsg}</div>`;
    return;
  }

  renderNextBatch();
}

/**
 * Append next batch of items (infinite scroll)
 */
function renderNextBatch() {
  const gridContainer = document.getElementById('iconGrid');
  if (!gridContainer) return;

  const currentLang = window.currentLanguage || 'nl';
  const batch = currentFilteredList.slice(renderedCount, renderedCount + BATCH_SIZE);
  if (batch.length === 0) return;

  const htmlChunk = batch.map(icon => {
    const displayName = currentLang === 'en' ? (icon.nameEn || icon.name) : icon.name;
    return `
      <div class="icon-grid-item" data-icon-id="${icon.id}" title="${displayName}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; min-width: 28px; min-height: 28px; max-width: 28px; max-height: 28px; display: block; margin: 0 auto 4px auto; flex-shrink: 0;">
          ${icon.svg}
        </svg>
        <span class="icon-label">${displayName}</span>
      </div>
    `;
  }).join('');

  const tempWrapper = document.createElement('div');
  tempWrapper.innerHTML = htmlChunk;

  while (tempWrapper.firstChild) {
    const itemEl = tempWrapper.firstChild;
    itemEl.addEventListener('click', () => {
      const iconId = itemEl.getAttribute('data-icon-id');
      const iconData = fullIconLibrary.find(i => i.id === iconId);
      if (iconData) {
        insertIconIntoCanvas(iconData);
      }
    });
    gridContainer.appendChild(itemEl);
  }

  renderedCount += batch.length;
}

/**
 * Insert chosen vector icon into the Fabric canvas
 */
function insertIconIntoCanvas(iconData) {
  const canvas = window.getFabricCanvas();
  if (!canvas) {
    console.error("Canvas not found for icon insertion");
    return;
  }

  // Construct standard SVG string
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${iconData.svg}
    </svg>
  `.trim();

  fabric.loadSVGFromString(svgString, (objects, options) => {
    if (!objects || objects.length === 0) return;

    // Group SVG elements
    const iconObj = fabric.util.groupSVGElements(objects, options);

    // Get padding bounds
    const bounds = (window.fabricEditor && window.fabricEditor.getPaddingBounds) 
      ? window.fabricEditor.getPaddingBounds() 
      : { left: 0, top: 0, right: canvas.getWidth(), bottom: canvas.getHeight() };

    const contentWidth = bounds.right - bounds.left;
    const contentHeight = bounds.bottom - bounds.top;

    // Target size proportional to label height (e.g. 75% of content height, capped at reasonable size)
    const targetSize = Math.max(20, Math.min(contentHeight * 0.75, 70));
    const originalDim = Math.max(iconObj.width, iconObj.height) || 24;
    const scale = targetSize / originalDim;

    iconObj.set({
      left: bounds.left + Math.max(0, (contentWidth - originalDim * scale) / 2),
      top: bounds.top + Math.max(0, (contentHeight - originalDim * scale) / 2),
      scaleX: scale,
      scaleY: scale,
      lockUniScaling: true,
      alignment: 'center',
      verticalAlignment: 'middle'
    });

    // Disable middle resize handles (keep corners + rotation)
    iconObj.setControlsVisibility({
      mt: false, mb: false, ml: false, mr: false, mtr: true
    });

    canvas.add(iconObj);
    canvas.setActiveObject(iconObj);
    canvas.renderAll();

    if (window.fabricEditor && window.fabricEditor.updateTextControls) {
      window.fabricEditor.updateTextControls();
    }

    closeIconPicker();
  });
}

// Event Listeners initialization on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('closeIconModal');
  const modal = document.getElementById('iconModal');
  const searchInput = document.getElementById('iconSearchInput');
  const clearBtn = document.getElementById('iconSearchClearBtn');
  const gridContainer = document.getElementById('iconGrid');

  buildFullIconLibrary();

  if (closeBtn) {
    closeBtn.addEventListener('click', closeIconPicker);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeIconPicker();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      iconSearchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = iconSearchQuery ? 'flex' : 'none';
      }
      resetAndRenderIconGrid();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      iconSearchQuery = '';
      clearBtn.style.display = 'none';
      resetAndRenderIconGrid();
      searchInput.focus();
    });
  }

  // Infinite scroll listener for smooth rendering of thousands of icons
  if (gridContainer) {
    gridContainer.addEventListener('scroll', () => {
      if (renderedCount < currentFilteredList.length) {
        if (gridContainer.scrollTop + gridContainer.clientHeight >= gridContainer.scrollHeight - 100) {
          renderNextBatch();
        }
      }
    });
  }
});

window.renderIconPickerLanguage = function() {
  renderCategoryTabs();
  resetAndRenderIconGrid();
};
