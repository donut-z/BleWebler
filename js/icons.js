/**
 * BleWebler - Icon Library & Picker Module
 * Provides curated vector icons optimized for 1-bit thermal label printing.
 */

const ICON_CATEGORIES = [
  { id: 'all', nameKey: 'icon_cat_all', name: 'Alles' },
  { id: 'packaging', nameKey: 'icon_cat_packaging', name: 'Verpakking & Verzending' },
  { id: 'food', nameKey: 'icon_cat_food', name: 'Keuken & Voeding' },
  { id: 'office', nameKey: 'icon_cat_office', name: 'Kantoor & Opslag' },
  { id: 'safety', nameKey: 'icon_cat_safety', name: 'Veiligheid & Gevaar' },
  { id: 'arrows', nameKey: 'icon_cat_arrows', name: 'Pijlen & Symbolen' },
  { id: 'care', nameKey: 'icon_cat_care', name: 'Wasvoorschriften & Zorg' }
];

const ICON_LIBRARY = [
  // --- VERPAKKING & VERZENDING ---
  {
    id: 'package',
    name: 'Pakket',
    nameEn: 'Package',
    category: 'packaging',
    keywords: ['doos', 'pakket', 'box', 'package', 'post', 'verzending', 'shipping', 'delivery', 'karton'],
    svg: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'
  },
  {
    id: 'fragile',
    name: 'Breekbaar (Glas)',
    nameEn: 'Fragile Glass',
    category: 'packaging',
    keywords: ['breekbaar', 'glas', 'fragile', 'glass', 'wine', 'voorzichtig', 'care', 'handvat'],
    svg: '<path d="M8 22h8"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5V3H7v7a5 5 0 0 0 5 5Z"/><path d="M7 6h10"/>'
  },
  {
    id: 'umbrella',
    name: 'Droog Houden',
    nameEn: 'Keep Dry',
    category: 'packaging',
    keywords: ['droog', 'paraplu', 'umbrella', 'keep dry', 'regen', 'water', 'beschermen'],
    svg: '<path d="M22 12a10.06 10.06 0 0 0-20 0Z"/><path d="M12 12v8a2 2 0 0 0 4 0"/><path d="M12 2v1"/>'
  },
  {
    id: 'this-way-up',
    name: 'Deze Zijde Boven',
    nameEn: 'This Way Up',
    category: 'packaging',
    keywords: ['boven', 'omhoog', 'this way up', 'this side up', 'pijlen', 'arrows', 'richting', 'oriëntatie'],
    svg: '<path d="M7 16V4"/><path d="M3 8l4-4 4 4"/><path d="M17 16V4"/><path d="M13 8l4-4 4 4"/><path d="M3 20h18"/>'
  },
  {
    id: 'recycle',
    name: 'Recycle',
    nameEn: 'Recycle',
    category: 'packaging',
    keywords: ['recycle', 'hergebruik', 'milieu', 'eco', 'groen', 'afval', 'duurzaam'],
    svg: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16 3 3-3 3"/><path d="M8.293 13.596 5.5 9.5l4.135-7.162a1.83 1.83 0 0 1 1.57-.881 1.784 1.784 0 0 1 1.57.881l3.196 5.536"/><path d="m15.5 5.5-3-3 3-3"/><path d="m2 16 3 3 3-3"/>'
  },
  {
    id: 'truck',
    name: 'Vrachtwagen',
    nameEn: 'Delivery Truck',
    category: 'packaging',
    keywords: ['vrachtwagen', 'truck', 'bezorging', 'transport', 'levering', 'post', 'shipping'],
    svg: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'
  },
  {
    id: 'shopping-cart',
    name: 'Winkelwagen',
    nameEn: 'Shopping Cart',
    category: 'packaging',
    keywords: ['winkelwagen', 'cart', 'kopen', 'shop', 'bestelling', 'order', 'winkel'],
    svg: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>'
  },
  {
    id: 'tag',
    name: 'Label / Prijs',
    nameEn: 'Price Tag',
    category: 'packaging',
    keywords: ['label', 'tag', 'prijs', 'prijskaartje', 'korting', 'sale', 'naam'],
    svg: '<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>'
  },
  {
    id: 'barcode',
    name: 'Barcode',
    nameEn: 'Barcode',
    category: 'packaging',
    keywords: ['barcode', 'streepjescode', 'code', 'scan', 'product', 'sku', 'ean'],
    svg: '<path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/>'
  },
  {
    id: 'mail',
    name: 'Brief / Mail',
    nameEn: 'Envelope / Mail',
    category: 'packaging',
    keywords: ['mail', 'brief', 'enveloppe', 'envelope', 'post', 'bericht', 'contact'],
    svg: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'
  },
  {
    id: 'gift',
    name: 'Cadeau',
    nameEn: 'Gift',
    category: 'packaging',
    keywords: ['cadeau', 'gift', 'presentje', 'verjaardag', 'feest', 'pakje', 'strik'],
    svg: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>'
  },
  {
    id: 'shield-check',
    name: 'Gecontroleerd',
    nameEn: 'Shield Check',
    category: 'packaging',
    keywords: ['schild', 'shield', 'check', 'veilig', 'kwaliteit', 'gekeurd', 'beveiligd'],
    svg: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'
  },

  // --- KEUKEN & VOEDING ---
  {
    id: 'coffee',
    name: 'Koffie',
    nameEn: 'Coffee Cup',
    category: 'food',
    keywords: ['koffie', 'coffee', 'thee', 'tea', 'beker', 'cup', 'cafeïne', 'warm', 'drank'],
    svg: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/><path d="M6 8h12v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"/><path d="M6 22h12"/>'
  },
  {
    id: 'utensils',
    name: 'Bestek (Vork & Mes)',
    nameEn: 'Cutlery',
    category: 'food',
    keywords: ['bestek', 'vork', 'mes', 'eten', 'food', 'restaurant', 'lunch', 'diner', 'maaltijd'],
    svg: '<path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 2v18"/><path d="M6 2v18"/><path d="M6 2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3"/>'
  },
  {
    id: 'apple',
    name: 'Appel / Fruit',
    nameEn: 'Apple / Fruit',
    category: 'food',
    keywords: ['appel', 'apple', 'fruit', 'gezond', 'vers', 'eten', 'snack', 'bio'],
    svg: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>'
  },
  {
    id: 'flame',
    name: 'Heet / Koken',
    nameEn: 'Hot / Cook',
    category: 'food',
    keywords: ['vlam', 'flame', 'heet', 'hot', 'koken', 'bakken', 'vuur', 'warmte'],
    svg: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'
  },
  {
    id: 'snowflake',
    name: 'Diepvries / Koud',
    nameEn: 'Freeze / Cold',
    category: 'food',
    keywords: ['vriezer', 'diepvries', 'koud', 'freeze', 'snowflake', 'sneeuw', 'ijs', 'koeling'],
    svg: '<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>'
  },
  {
    id: 'droplet',
    name: 'Water / Vloeistof',
    nameEn: 'Water Drop',
    category: 'food',
    keywords: ['water', 'druppel', 'drop', 'droplet', 'vloeistof', 'drinken', 'olie'],
    svg: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>'
  },
  {
    id: 'wine',
    name: 'Wijn / Alcohol',
    nameEn: 'Wine Glass',
    category: 'food',
    keywords: ['wijn', 'wine', 'alcohol', 'drank', 'borrel', 'glas', 'proost'],
    svg: '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>'
  },
  {
    id: 'cake',
    name: 'Gebak / Taart',
    nameEn: 'Cake / Pastry',
    category: 'food',
    keywords: ['taart', 'cake', 'gebak', 'verjaardag', 'zoet', 'feest', 'bakkerij'],
    svg: '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>'
  },
  {
    id: 'leaf',
    name: 'Bio / Vegan',
    nameEn: 'Leaf / Organic',
    category: 'food',
    keywords: ['bio', 'blad', 'leaf', 'vegan', 'organisch', 'vegetarisch', 'natuur', 'vers', 'plantaardig'],
    svg: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'
  },
  {
    id: 'trash-2',
    name: 'Afval',
    nameEn: 'Trash Can',
    category: 'food',
    keywords: ['afval', 'prullenbak', 'trash', 'weggooien', 'container', 'vuil'],
    svg: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>'
  },

  // --- KANTOOR & OPSLAG ---
  {
    id: 'folder',
    name: 'Map / Dossier',
    nameEn: 'Folder',
    category: 'office',
    keywords: ['map', 'folder', 'dossier', 'documenten', 'opslag', 'administratie', 'archief'],
    svg: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'
  },
  {
    id: 'file-text',
    name: 'Document / Tekst',
    nameEn: 'Document',
    category: 'office',
    keywords: ['document', 'file', 'tekst', 'factuur', 'papier', 'nota', 'bestand'],
    svg: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'
  },
  {
    id: 'archive',
    name: 'Archiefdoos',
    nameEn: 'Archive',
    category: 'office',
    keywords: ['archief', 'archive', 'opslag', 'bewaren', 'opbergen', 'kast', 'doos'],
    svg: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>'
  },
  {
    id: 'cable',
    name: 'Kabel / USB',
    nameEn: 'Cable',
    category: 'office',
    keywords: ['kabel', 'cable', 'usb', 'snoer', 'draad', 'elektronica', 'aansluiting', 'oplader'],
    svg: '<path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"/><path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"/><path d="M21 21v1"/><path d="M3 5h4V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"/>'
  },
  {
    id: 'battery',
    name: 'Batterij',
    nameEn: 'Battery',
    category: 'office',
    keywords: ['batterij', 'battery', 'accu', 'stroom', 'voeding', 'energie'],
    svg: '<rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/>'
  },
  {
    id: 'battery-charging',
    name: 'Batterij Opladen',
    nameEn: 'Battery Charging',
    category: 'office',
    keywords: ['laden', 'opladen', 'charge', 'batterij', 'stroom', 'accu'],
    svg: '<path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/><path d="m11 7-3 5h4l-3 5"/><line x1="22" x2="22" y1="11" y2="13"/>'
  },
  {
    id: 'plug',
    name: 'Stekker (230V)',
    nameEn: 'Plug',
    category: 'office',
    keywords: ['stekker', 'plug', 'stroom', 'stopcontact', 'elektriciteit', 'spanning', '230v'],
    svg: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>'
  },
  {
    id: 'wrench',
    name: 'Gereedschap',
    nameEn: 'Wrench',
    category: 'office',
    keywords: ['gereedschap', 'sleutel', 'wrench', 'moersleutel', 'reparatie', 'fix', 'klus'],
    svg: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
  },
  {
    id: 'scissors',
    name: 'Schaar',
    nameEn: 'Scissors',
    category: 'office',
    keywords: ['schaar', 'scissors', 'knippen', 'snijden', 'knip', 'kantoor'],
    svg: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>'
  },
  {
    id: 'pin',
    name: 'Punaise / Locatie',
    nameEn: 'Pin',
    category: 'office',
    keywords: ['punaise', 'pin', 'prikker', 'locatie', 'vastzetten', 'kantoor', 'bord'],
    svg: '<line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>'
  },
  {
    id: 'calendar',
    name: 'Kalender',
    nameEn: 'Calendar',
    category: 'office',
    keywords: ['kalender', 'calendar', 'datum', 'date', 'agenda', 'dag', 'maand', 'jaar'],
    svg: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>'
  },
  {
    id: 'clock',
    name: 'Klok / Tijd',
    nameEn: 'Clock',
    category: 'office',
    keywords: ['klok', 'clock', 'tijd', 'time', 'uur', 'uurwerk', 'wekker'],
    svg: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
  },
  {
    id: 'book',
    name: 'Boek',
    nameEn: 'Book',
    category: 'office',
    keywords: ['boek', 'book', 'handleiding', 'gids', 'lezen', 'kennis', 'documentatie'],
    svg: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 2v20"/>'
  },
  {
    id: 'lock',
    name: 'Slot / Beveiligd',
    nameEn: 'Lock',
    category: 'office',
    keywords: ['slot', 'lock', 'dicht', 'gesloten', 'veilig', 'beveiliging', 'wachtwoord'],
    svg: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  },
  {
    id: 'key',
    name: 'Sleutel',
    nameEn: 'Key',
    category: 'office',
    keywords: ['sleutel', 'key', 'toegang', 'open', 'slot', 'deur'],
    svg: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>'
  },
  {
    id: 'star',
    name: 'Ster',
    nameEn: 'Star',
    category: 'office',
    keywords: ['ster', 'star', 'favoriet', 'top', 'rating', 'belangrijk', 'beoordeling'],
    svg: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
  },
  {
    id: 'heart',
    name: 'Hartje',
    nameEn: 'Heart',
    category: 'office',
    keywords: ['hart', 'heart', 'liefde', 'favoriet', 'like', 'zorg'],
    svg: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'
  },

  // --- VEILIGHEID & GEVAAR ---
  {
    id: 'alert-triangle',
    name: 'Waarschuwing',
    nameEn: 'Warning Triangle',
    category: 'safety',
    keywords: ['waarschuwing', 'warning', 'gevaar', 'danger', 'attentie', 'let op', 'alert'],
    svg: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>'
  },
  {
    id: 'alert-circle',
    name: 'Attentie',
    nameEn: 'Alert Circle',
    category: 'safety',
    keywords: ['attentie', 'alert', 'let op', 'uitroepteken', 'belangrijk'],
    svg: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'
  },
  {
    id: 'alert-octagon',
    name: 'Stop / Verboden',
    nameEn: 'Stop Sign',
    category: 'safety',
    keywords: ['stop', 'verbod', 'niet', 'gevaar', 'halt', 'octagon'],
    svg: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'
  },
  {
    id: 'skull',
    name: 'Vergif / Dodelijk',
    nameEn: 'Poison / Skull',
    category: 'safety',
    keywords: ['vergif', 'skull', 'doodshoofd', 'toxisch', 'poison', 'dodelijk', 'chemisch'],
    svg: '<path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>'
  },
  {
    id: 'radiation',
    name: 'Straling',
    nameEn: 'Radiation',
    category: 'safety',
    keywords: ['straling', 'radioactief', 'radiation', 'nucleair', 'gevaar'],
    svg: '<circle cx="12" cy="12" r="2"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>'
  },
  {
    id: 'biohazard',
    name: 'Biologisch Gevaar',
    nameEn: 'Biohazard',
    category: 'safety',
    keywords: ['biohazard', 'biologisch', 'besmetting', 'virus', 'gevaar'],
    svg: '<circle cx="12" cy="11.9" r="2"/><path d="M6.7 3.4a6.5 6.5 0 0 1 10.6 0"/><path d="M3.4 17.3a6.5 6.5 0 0 1 5.3-9.2"/><path d="M20.6 17.3a6.5 6.5 0 0 0-5.3-9.2"/><circle cx="12" cy="7" r="4"/><circle cx="7.7" cy="14.5" r="4"/><circle cx="16.3" cy="14.5" r="4"/>'
  },
  {
    id: 'zap',
    name: 'Hoogspanning',
    nameEn: 'High Voltage',
    category: 'safety',
    keywords: ['bliksem', 'zap', 'spanning', 'stroom', 'elektrisch', 'gevaar', 'voltage', 'schok'],
    svg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
  },
  {
    id: 'cross',
    name: 'EHBO / Medisch',
    nameEn: 'First Aid',
    category: 'safety',
    keywords: ['ehbo', 'kruis', 'eerste hulp', 'medisch', 'apotheek', 'hospitaal', 'dokter', 'cross'],
    svg: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>'
  },
  {
    id: 'pill',
    name: 'Medicijn / Pil',
    nameEn: 'Pill / Medicine',
    category: 'safety',
    keywords: ['pil', 'pill', 'medicijn', 'apotheek', 'kuur', 'capsule', 'gezondheid'],
    svg: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>'
  },
  {
    id: 'thermometer',
    name: 'Temperatuur',
    nameEn: 'Thermometer',
    category: 'safety',
    keywords: ['temperatuur', 'thermometer', 'graden', 'warmte', 'koorts', 'meting'],
    svg: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>'
  },
  {
    id: 'eye',
    name: 'Oogbescherming',
    nameEn: 'Eye Protection',
    category: 'safety',
    keywords: ['oog', 'eye', 'zicht', 'bril', 'kijken', 'veiligheidsbril'],
    svg: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
  },
  {
    id: 'ban',
    name: 'Verboden',
    nameEn: 'Prohibited / Ban',
    category: 'safety',
    keywords: ['verboden', 'ban', 'niet toegestaan', 'verbod', 'kruis', 'nee'],
    svg: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>'
  },

  // --- PIJLEN & SYMBOLEN ---
  {
    id: 'arrow-up',
    name: 'Pijl Boven',
    nameEn: 'Arrow Up',
    category: 'arrows',
    keywords: ['pijl', 'arrow', 'boven', 'omhoog', 'up', 'noord'],
    svg: '<line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/>'
  },
  {
    id: 'arrow-down',
    name: 'Pijl Beneden',
    nameEn: 'Arrow Down',
    category: 'arrows',
    keywords: ['pijl', 'arrow', 'beneden', 'omlaag', 'down', 'zuid'],
    svg: '<line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/>'
  },
  {
    id: 'arrow-left',
    name: 'Pijl Links',
    nameEn: 'Arrow Left',
    category: 'arrows',
    keywords: ['pijl', 'arrow', 'links', 'left', 'terug'],
    svg: '<line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/>'
  },
  {
    id: 'arrow-right',
    name: 'Pijl Rechts',
    nameEn: 'Arrow Right',
    category: 'arrows',
    keywords: ['pijl', 'arrow', 'rechts', 'right', 'volgende', 'verder'],
    svg: '<line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/>'
  },
  {
    id: 'arrow-up-right',
    name: 'Pijl Schuin Rechts',
    nameEn: 'Arrow Up-Right',
    category: 'arrows',
    keywords: ['pijl', 'arrow', 'schuin', 'link', 'extern', 'omhoog rechts'],
    svg: '<line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/>'
  },
  {
    id: 'move',
    name: 'Kruispijl (Verplaatsen)',
    nameEn: 'Move / 4 Directions',
    category: 'arrows',
    keywords: ['kruispijl', 'move', 'verplaatsen', 'richtingen', 'kruis', 'navigatie'],
    svg: '<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>'
  },
  {
    id: 'refresh-cw',
    name: 'Herladen / Sync',
    nameEn: 'Refresh / Sync',
    category: 'arrows',
    keywords: ['refresh', 'herladen', 'sync', 'draaien', 'vernieuwen', 'rondje'],
    svg: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'
  },
  {
    id: 'check',
    name: 'Vinkje',
    nameEn: 'Checkmark',
    category: 'arrows',
    keywords: ['vinkje', 'check', 'akkoord', 'goed', 'yes', 'klaar', 'correct'],
    svg: '<polyline points="20 6 9 17 4 12"/>'
  },
  {
    id: 'check-circle',
    name: 'Akkoord (Cirkel)',
    nameEn: 'Check Circle',
    category: 'arrows',
    keywords: ['vinkje', 'check', 'ok', 'goedgekeurd', 'rond', 'klaar'],
    svg: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
  },
  {
    id: 'x',
    name: 'Kruisje',
    nameEn: 'Cross (X)',
    category: 'arrows',
    keywords: ['kruis', 'x', 'fout', 'annuleren', 'stop', 'verkeerd', 'nee'],
    svg: '<line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>'
  },
  {
    id: 'x-circle',
    name: 'Fout (Cirkel)',
    nameEn: 'Error Circle',
    category: 'arrows',
    keywords: ['fout', 'kruis', 'rond', 'error', 'afgekeurd'],
    svg: '<circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/>'
  },
  {
    id: 'help-circle',
    name: 'Vraagteken',
    nameEn: 'Help / Question',
    category: 'arrows',
    keywords: ['vraagteken', 'help', 'info', 'vraag', 'question', 'hulp'],
    svg: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>'
  },
  {
    id: 'info',
    name: 'Informatie',
    nameEn: 'Info',
    category: 'arrows',
    keywords: ['info', 'informatie', 'uitleg', 'details', 'bericht'],
    svg: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/>'
  },
  {
    id: 'smile',
    name: 'Smiley / Blij',
    nameEn: 'Smiley',
    category: 'arrows',
    keywords: ['smile', 'blij', 'vrolijk', 'tevreden', 'gezicht', 'smiley'],
    svg: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>'
  },
  {
    id: 'sun',
    name: 'Zon / Dag',
    nameEn: 'Sun',
    category: 'arrows',
    keywords: ['zon', 'sun', 'dag', 'licht', 'warmte', 'zomer'],
    svg: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'
  },
  {
    id: 'moon',
    name: 'Maan / Nacht',
    nameEn: 'Moon',
    category: 'arrows',
    keywords: ['maan', 'moon', 'nacht', 'donker', 'slapen'],
    svg: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'
  },
  {
    id: 'wifi',
    name: 'Wifi / Netwerk',
    nameEn: 'WiFi',
    category: 'arrows',
    keywords: ['wifi', 'internet', 'draadloos', 'netwerk', 'signaal', 'wireless'],
    svg: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/>'
  },
  {
    id: 'printer',
    name: 'Printer',
    nameEn: 'Printer',
    category: 'arrows',
    keywords: ['printer', 'afdrukken', 'print', 'label', 'papier', 'apparaat'],
    svg: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>'
  },

  // --- WASVOORSCHRIFTEN & ZORG ---
  {
    id: 'shirt',
    name: 'Kleding / Textiel',
    nameEn: 'Shirt / Clothing',
    category: 'care',
    keywords: ['kleding', 'shirt', 'textiel', 'mode', 'stof', 'maat'],
    svg: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>'
  },
  {
    id: 'wash-tub',
    name: 'Wassen (Tobbe)',
    nameEn: 'Wash Tub',
    category: 'care',
    keywords: ['wassen', 'was', 'tobbe', 'water', 'wasmachine', 'laundry', 'wasvoorschrift'],
    svg: '<path d="M3 6h18l-2 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 6Z"/><path d="M3 11c3 1.5 6-1.5 9 0s6 1.5 9 0"/>'
  },
  {
    id: 'iron',
    name: 'Strijken',
    nameEn: 'Ironing',
    category: 'care',
    keywords: ['strijken', 'strijkijzer', 'iron', 'wasvoorschrift', 'strijkbout', 'kleding'],
    svg: '<path d="M4 18h16a2 2 0 0 0 2-2C22 10 18 7 13 7H4v11Z"/><path d="M4 11h9"/><circle cx="9" cy="14" r="1"/>'
  },
  {
    id: 'do-not-bleach',
    name: 'Niet Bleken',
    nameEn: 'Do Not Bleach',
    category: 'care',
    keywords: ['bleken', 'niet bleken', 'driehoek', 'kruis', 'wasvoorschrift', 'bleach'],
    svg: '<polygon points="12 3 22 21 2 21 12 3"/><line x1="5" x2="19" y1="19" y2="9"/><line x1="19" x2="5" y1="19" y2="9"/>'
  },
  {
    id: 'tumble-dry',
    name: 'Droogtrommel',
    nameEn: 'Tumble Dry',
    category: 'care',
    keywords: ['droger', 'droogtrommel', 'tumble dry', 'drogen', 'wasvoorschrift'],
    svg: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="6"/>'
  },
  {
    id: 'dry-clean',
    name: 'Stomerij',
    nameEn: 'Dry Clean',
    category: 'care',
    keywords: ['stomerij', 'dry clean', 'chemisch reinigen', 'cirkel', 'wasvoorschrift'],
    svg: '<circle cx="12" cy="12" r="8"/>'
  }
];

let activeIconCategory = 'all';
let iconSearchQuery = '';

/**
 * Open Icon Picker modal
 */
window.openIconPicker = function() {
  const modal = document.getElementById('iconModal');
  if (!modal) return;

  renderCategoryTabs();
  renderIconGrid();
  modal.classList.add('show');

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
    if (typeof t === 'function') {
      label = t(cat.nameKey) || cat.name;
    } else if (currentLang === 'en') {
      label = cat.id === 'all' ? 'All' :
              cat.id === 'packaging' ? 'Packaging & Shipping' :
              cat.id === 'food' ? 'Kitchen & Food' :
              cat.id === 'office' ? 'Office & Storage' :
              cat.id === 'safety' ? 'Safety & Hazard' :
              cat.id === 'arrows' ? 'Arrows & Symbols' : 'Care & Laundry';
    }
    const isActive = cat.id === activeIconCategory;
    return `<button type="button" class="icon-category-chip ${isActive ? 'active' : ''}" data-cat="${cat.id}">${label}</button>`;
  }).join('');

  tabsContainer.querySelectorAll('.icon-category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeIconCategory = chip.getAttribute('data-cat');
      renderCategoryTabs();
      renderIconGrid();
    });
  });
}

/**
 * Render icon grid based on active category & search query
 */
function renderIconGrid() {
  const gridContainer = document.getElementById('iconGrid');
  if (!gridContainer) return;

  const currentLang = window.currentLanguage || 'nl';
  const query = iconSearchQuery.trim().toLowerCase();

  const filteredIcons = ICON_LIBRARY.filter(icon => {
    // 1. Category check
    if (activeIconCategory !== 'all' && icon.category !== activeIconCategory) {
      return false;
    }
    // 2. Search query check
    if (query) {
      const matchName = icon.name.toLowerCase().includes(query) || (icon.nameEn && icon.nameEn.toLowerCase().includes(query));
      const matchKeyword = icon.keywords.some(k => k.toLowerCase().includes(query));
      return matchName || matchKeyword;
    }
    return true;
  });

  if (filteredIcons.length === 0) {
    const emptyMsg = (typeof t === 'function') ? t('icon_no_results') : 'Geen iconen gevonden.';
    gridContainer.innerHTML = `<div class="icon-empty-state">${emptyMsg}</div>`;
    return;
  }

  gridContainer.innerHTML = filteredIcons.map(icon => {
    const displayName = currentLang === 'en' ? (icon.nameEn || icon.name) : icon.name;
    return `
      <div class="icon-grid-item" data-icon-id="${icon.id}" title="${displayName}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${icon.svg}
        </svg>
        <span class="icon-label">${displayName}</span>
      </div>
    `;
  }).join('');

  gridContainer.querySelectorAll('.icon-grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const iconId = item.getAttribute('data-icon-id');
      const iconData = ICON_LIBRARY.find(i => i.id === iconId);
      if (iconData) {
        insertIconIntoCanvas(iconData);
      }
    });
  });
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
      renderIconGrid();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      iconSearchQuery = '';
      clearBtn.style.display = 'none';
      renderIconGrid();
      searchInput.focus();
    });
  }
});

window.renderIconPickerLanguage = function() {
  renderCategoryTabs();
  renderIconGrid();
};

