const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const driveDir = path.join(rootDir, 'drive-download-20261111T221937Z-1-001');
const assetsDir = path.join(rootDir, 'assets', 'projects');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function copyImage(srcPath, destSubdir, destName) {
  const destDir = path.join(assetsDir, destSubdir);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const target = path.join(destDir, destName);
  fs.copyFileSync(srcPath, target);
  return `assets/projects/${destSubdir}/${destName}`;
}

// 1. PROJECT 1: Bexley Detached New Build (DSLR Photos)
const p1Dir = 'project-1-new-build';
const p1Files = [
  { f: 'DSC_3462.jpg', desc: 'Front elevation with block-paved driveway & timber boundary fencing' },
  { f: 'DSC_3465.jpg', desc: 'Street perspective showing the new 2-storey detached residence' },
  { f: 'DSC_3440.jpg', desc: 'Rear elevation with porcelain patio & Samsung air-source heat pump' },
  { f: 'DSC_3426.jpg', desc: 'Landscaped garden terrace with outdoor porcelain slabs & lawn' },
  { f: 'DSC_3360.jpg', desc: 'Bespoke anthracite contemporary kitchen with marble quartz worktops' },
  { f: 'DSC_3369.jpg', desc: 'Symmetrical fitted kitchen cabinetry & integrated cooking suite' },
  { f: 'DSC_3372-Edit.jpg', desc: 'Open-plan ground floor living area with recessed LED downlights' },
  { f: 'DSC_3375-Edit.jpg', desc: 'Ground floor reception room with natural light and dual sash windows' },
  { f: 'DSC_3378.jpg', desc: 'First floor bedroom with warm timber flooring and modern radiator' },
  { f: 'DSC_3399.jpg', desc: 'Contemporary finished bedroom suite' },
  { f: 'DSC_3402.jpg', desc: 'Guest bedroom with smooth plaster finish and acoustic flooring' },
  { f: 'DSC_3405.jpg', desc: 'Master bedroom with double glazed timber-style sash windows' },
  { f: 'DSC_3408.jpg', desc: 'Master bedroom interior detailing' },
  { f: 'DSC_3414.jpg', desc: 'First-floor landing featuring solid vertical grooved oak door' },
  { f: 'DSC_3417.jpg', desc: 'Bright hallway corridor with flush skirting and contemporary switches' },
  { f: 'DSC_3420.jpg', desc: 'Interior perspective showing architectural room proportions' },
  { f: 'DSC_3435.jpg', desc: 'Patio garden boundary detailing and brickwork joints' }
];

const p1Images = [];
p1Files.forEach((item, idx) => {
  const fullSrc = path.join(driveDir, item.f);
  if (fs.existsSync(fullSrc)) {
    const destName = `img-${String(idx + 1).padStart(2, '0')}.jpg`;
    const relPath = copyImage(fullSrc, p1Dir, destName);
    p1Images.push({ path: relPath, caption: item.desc });
  }
});

// Also add close-up heat pump & garden images
['WhatsApp Image 2026-11-07 at 13.01.06.jpeg', 'WhatsApp Image 2026-11-07 at 13.01.06 (1).jpeg', 'WhatsApp Image 2026-11-07 at 13.01.07.jpeg', 'WhatsApp Image 2026-11-07 at 13.01.07 (1).jpeg'].forEach((fname) => {
  const fullSrc = path.join(rootDir, fname);
  if (fs.existsSync(fullSrc)) {
    const destName = `img-${String(p1Images.length + 1).padStart(2, '0')}.jpg`;
    const relPath = copyImage(fullSrc, p1Dir, destName);
    p1Images.push({ path: relPath, caption: 'Samsung eco air-source heat pump, drainage & masonry details' });
  }
});

function gatherImages(regex, destSubdir, defaultDesc, extraMap = {}) {
  const destDir = path.join(assetsDir, destSubdir);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  const allFiles = fs.readdirSync(rootDir).filter(f => regex.test(f)).sort();
  const results = [];
  
  allFiles.forEach((f, idx) => {
    const fullSrc = path.join(rootDir, f);
    const destName = `img-${String(idx + 1).padStart(2, '0')}.jpg`;
    const relPath = copyImage(fullSrc, destSubdir, destName);
    const caption = extraMap[f] || `${defaultDesc} (View ${idx + 1})`;
    results.push({ path: relPath, caption });
  });
  return results;
}

// 2. PROJECT 2: The Hollingworth Grand Marble Living Extension (BR5)
const p2Extra = {
  'WhatsApp Image 2026-11-07 at 12.57.38.jpeg': 'Expansive open-plan living and kitchen extension with large-format Carrara marble floor',
  'WhatsApp Image 2026-11-07 at 12.58.08.jpeg': 'Illuminated evening exterior view through slimline black aluminium sliding doors',
  'WhatsApp Image 2026-11-07 at 13.00.35.jpeg': 'Twin architectural roof lanterns flooding the living zone with natural daylight',
  'WhatsApp Image 2026-11-07 at 13.00.39.jpeg': 'Seamless entrance foyer opening into the open-plan entertaining pavilion',
  'WhatsApp Image 2026-11-07 at 12.57.38 (1).jpeg': 'Custom dark graphite kitchen island with breakfast bar and brass sphere pendants',
  'WhatsApp Image 2026-11-07 at 12.57.38 (2).jpeg': 'Seamless marble floor transition into adjoining rooms and Crittall-style doors',
  'WhatsApp Image 2026-11-07 at 12.57.39 (1).jpeg': 'High-spec mood lighting, spotlights and shadow gaps',
  'WhatsApp Image 2026-11-07 at 12.58.09.jpeg': 'Full-width garden view and exterior downlights',
  'WhatsApp Image 2026-11-07 at 13.00.35 (1).jpeg': 'Interior dining area perspective under roof lantern',
  'WhatsApp Image 2026-11-07 at 13.00.35 (2).jpeg': 'Designer vertical radiator and crittall internal partition'
};
const p2Images = gatherImages(/at (12\.57\.38|12\.57\.39|12\.57\.40|12\.58\.08|12\.58\.09|13\.00\.35|13\.00\.36|13\.00\.38|13\.00\.39|13\.00\.40|13\.00\.41|13\.00\.42)/, 'project-2-orpington-marble-extension', 'Hollingworth Road open-plan extension detailing', p2Extra);

// 3. PROJECT 3: Bromley Wraparound Rear Extension & Master Dormer Loft
const p3Extra = {
  'WhatsApp Image 2026-11-07 at 12.57.14.jpeg': 'Chef kitchen island with integrated dual-zone wine cooler & glass roof lantern',
  'WhatsApp Image 2026-11-07 at 12.57.16.jpeg': 'Rear elevation showing finished single-storey extension and anthracite dormer loft',
  'WhatsApp Image 2026-11-07 at 12.57.15 (3).jpeg': 'Front elevation with new pitched roof, Velux rooflights and silicone render',
  'WhatsApp Image 2026-11-07 at 12.57.14 (2).jpeg': 'Contemporary ground floor bathroom with wall-hung vanity and marble porcelain tiles',
  'WhatsApp Image 2026-11-07 at 12.57.14 (1).jpeg': 'Bifold aluminium patio doors leading seamlessly onto garden terrace',
  'WhatsApp Image 2026-11-07 at 12.57.14 (3).jpeg': 'Dining area and open-plan kitchen flow',
  'WhatsApp Image 2026-11-07 at 12.57.14 (4).jpeg': 'Integrated tall larder units and twin built-in Bosch ovens',
  'WhatsApp Image 2026-11-07 at 12.57.15.jpeg': 'Pendant triple lights over quartz breakfast bar'
};
const p3Images = gatherImages(/at (12\.57\.14|12\.57\.15|12\.57\.16)/, 'project-3-bromley-extension-loft', 'Bromley extension & dormer loft transformation', p3Extra);

// 4. PROJECT 4: Chislehurst Heavy Structural Steel & Portal Frame (Wimborne Ave, BR7)
const p4Extra = {
  'WhatsApp Image 2026-11-07 at 13.00.53.jpeg': 'Structural steel portal frame installation at Wimborne Avenue, Chislehurst',
  'WhatsApp Image 2026-11-07 at 13.00.56.jpeg': 'Red universal RSJ steel ridge beam and structural timber roof rafters',
  'wajdwad.jpeg': 'Precision structural pitch roof framing and hipped rafters under construction',
  'WhatsApp Image 2026-11-07 at 13.00.57.jpeg': 'Floor joist layout and steel beam connections',
  'WhatsApp Image 2026-11-07 at 13.00.58.jpeg': 'Structural engineering sign-off stage with load-bearing masonry piers',
  'WhatsApp Image 2026-11-07 at 13.00.59.jpeg': 'Ridge beam and collar ties structural carpentry'
};
const p4Images = gatherImages(/(at (13\.00\.53|13\.00\.54|13\.00\.56|13\.00\.57|13\.00\.58|13\.00\.59|13\.01\.01)|wajdwad\.jpeg)/, 'project-4-chislehurst-structural-steel', 'Structural engineering & steelwork', p4Extra);

// 5. PROJECT 5: Designer Bathrooms & Wetrooms
const p5Extra = {
  'WhatsApp Image 2026-11-07 at 12.57.36.jpeg': 'Brushed brass shower fixtures, terrazzo marble tiles & recessed illuminated shampoo niche',
  'WhatsApp Image 2026-11-07 at 13.00.46.jpeg': 'Freestanding modern corner soaking bath, stone grey tiles & heated chrome ladder',
  'WhatsApp Image 2026-11-07 at 13.00.34.jpeg': 'Frameless glass walk-in wetroom shower enclosure with chrome square deluge head',
  'WhatsApp Image 2026-11-07 at 12.57.36 (1).jpeg': 'Brushed brass thermostatic bar shower and designer hand shower',
  'WhatsApp Image 2026-11-07 at 12.57.36 (2).jpeg': 'Floating vanity with brushed gold pull handle and backlit LED sensor mirror'
};
const p5Images = gatherImages(/at (12\.57\.35|12\.57\.36|12\.57\.37|13\.00\.34|13\.00\.46)/, 'project-5-designer-bathrooms', 'Bespoke luxury bathroom suite', p5Extra);

// 6. PROJECT 6: Front Gable Porch, Automated Garage & Herringbone Driveway
const p6Extra = {
  'WhatsApp Image 2026-11-07 at 13.01.03.jpeg': 'Gable front porch extension with dark anthracite roller garage and herringbone driveway',
  'WhatsApp Image 2026-11-07 at 13.01.03 (1).jpeg': 'Bespoke red facing brickwork with pitched tiled roof and coach lanterns',
  'WhatsApp Image 2026-11-07 at 13.01.03 (2).jpeg': 'Charcoal block paving forecourt with light grey kerb edging'
};
const p6Images = gatherImages(/at (13\.01\.03)/, 'project-6-porch-garage-driveway', 'Front porch, garage & driveway paving', p6Extra);

// 7. PROJECT 7: Bexleyheath Contemporary Side Extension (1 Longleigh Lane, DA7)
const p7Extra = {
  'WhatsApp Image 2026-11-07 at 13.01.05.jpeg': 'Single-storey side extension with slate tiled roof, anthracite casement & white render',
  'WhatsApp Image 2026-11-07 at 13.01.05 (1).jpeg': 'Front driveway integration and boundary brick wall craftsmanship',
  'WhatsApp Image 2026-11-07 at 13.01.04 (1).jpeg': 'Contemporary double glazed window frames and black rainwater system',
  'WhatsApp Image 2026-11-07 at 13.01.04 (2).jpeg': 'Arched main entrance with contemporary steel bar pull handle door'
};
const p7Images = gatherImages(/at (13\.01\.04|13\.01\.05)/, 'project-7-bexleyheath-side-extension', 'Bexleyheath side extension', p7Extra);

// 8. PROJECT 8: Orpington Loft Conversion & Staircase (29 Lodge Close, BR6)
const p8Extra = {
  'WhatsApp Image 2026-11-07 at 13.00.50.jpeg': 'Bespoke timber staircase leading to loft suite with roof lantern skylight shaft',
  'WhatsApp Image 2026-11-07 at 13.00.50 (1).jpeg': 'Glazed balustrade and hardwood handrail with recessed LED spotlights',
  'WhatsApp Image 2026-11-07 at 13.00.50 (2).jpeg': 'Warm oak timber flooring and crisp architectural architraves'
};
const p8Images = gatherImages(/at (13\.00\.50|13\.00\.51|13\.00\.52)/, 'project-8-lodgeclose-loft-conversion', 'Lodge Close loft conversion & staircase', p8Extra);

// 9. PROJECT 9: Penthouse Studio Loft Conversion & Fitted Kitchenette
const p9Extra = {
  'WhatsApp Image 2026-11-07 at 13.01.10.jpeg': 'Self-contained loft studio with sloped ceiling fitted kitchenette and breakfast area',
  'WhatsApp Image 2026-11-07 at 13.01.12.jpeg': 'Modern gloss grey kitchen with walnut butcher-block worktops & integrated appliances',
  'WhatsApp Image 2026-11-07 at 13.01.10 (1).jpeg': 'Stainless steel cooker hood, induction hob and marble splashback tiles',
  'WhatsApp Image 2026-11-07 at 13.01.11.jpeg': 'Grey driftwood oak laminate flooring and flush perimeter skirting'
};
const p9Images = gatherImages(/at (13\.01\.10|13\.01\.11|13\.01\.12|13\.01\.13|13\.01\.14|13\.01\.15)/, 'project-9-loft-studio-kitchen', 'Loft studio apartment & kitchen conversion', p9Extra);

// 10. PROJECT 10: Greenwich & Chislehurst Turnkey Refurbishment (SE9 & BR7)
const p10Extra = {
  'WhatsApp Image 2026-11-07 at 13.00.43.jpeg': 'Classic shaker kitchen cabinetry with brass cup handles & quartz splashback (Colepits Wood Rd)',
  'WhatsApp Image 2026-11-07 at 13.00.47.jpeg': 'Solid oak grooved internal fire doors and plush carpeted upper landing',
  'WhatsApp Image 2026-11-07 at 13.01.17 (1).jpeg': 'Arched hallway with deep charcoal runner staircase (Lower Camden, Chislehurst)',
  'WhatsApp Image 2026-11-07 at 13.01.16 (4).jpeg': 'High-spec electrical finishing with brushed steel sockets and switches'
};
const p10Images = gatherImages(/at (13\.00\.43|13\.00\.44|13\.00\.47|13\.00\.48|13\.00\.49|13\.01\.16|13\.01\.17)/, 'project-10-interior-refurbishment', 'Internal refurbishment & architectural joinery', p10Extra);

const projects = [
  {
    id: 'bexley-new-build',
    title: 'The Bexley Contemporary Detached Residence',
    subtitle: 'Ground-up turnkey new build home with bespoke anthracite kitchen & eco heat pump',
    category: 'new-build',
    categoryName: 'New Build Development',
    location: 'Bexley / Greater London',
    year: '2025 - 2026',
    duration: '22 Weeks',
    warranty: '10-Year Insurance-Backed Structural Guarantee',
    coverImage: p1Images[0]?.path || '',
    stats: [
      { label: 'Total Area', value: '145 m²' },
      { label: 'Energy Rating', value: 'EPC A (Heat Pump)' },
      { label: 'Structure', value: 'Cavity Brick & Slate' },
      { label: 'Timeline', value: 'On Schedule' }
    ],
    overview: 'A full turnkey ground-up construction of a luxury two-storey detached family home. Built from bare ground through to full interior completion, including foundations, yellow stock facing brickwork, modern slate hipped roof, Samsung eco air-source heat pump, anthracite bespoke kitchen suite, luxury oak internal doors, block paved driveway, and porcelain garden patio.',
    scope: [
      'Site excavation, deep strip foundations and reinforced concrete slab',
      'Structural cavity brickwork with premium yellow stock facing bricks',
      'High-performance natural slate hipped roof with lead flashing and gutters',
      'Eco-friendly Samsung air-source heat pump installation with underfloor heating',
      'Designer anthracite matt kitchen with quartz marble worktops & Bosch ovens',
      'Solid oak interior doors with brushed stainless steel architectural handles',
      'Marshalls charcoal block paving driveway with light grey perimeter kerbs',
      'Full exterior porcelain patio terrace with timber panel acoustic privacy fencing'
    ],
    testimonial: {
      quote: 'Angel Construction Services Ltd delivered our new build ahead of programme and exactly to the agreed price. Their craftsmanship in the brickwork, roofing, and kitchen finish was exceptional.',
      client: 'David & Sarah M.',
      location: 'Bexley Site'
    },
    images: p1Images
  },
  {
    id: 'orpington-marble-extension',
    title: 'The Hollingworth Grand Living & Kitchen Extension',
    subtitle: 'Expansive open-plan architectural extension with Carrara marble porcelain & twin lanterns',
    category: 'extensions',
    categoryName: 'House Extension',
    location: 'Hollingworth Road, Orpington BR5',
    year: '2026',
    duration: '14 Weeks',
    warranty: '10-Year Structural Warranty',
    coverImage: p2Images[0]?.path || '',
    stats: [
      { label: 'Extension Area', value: '62 m²' },
      { label: 'Glazing', value: 'Full Width Sliding' },
      { label: 'Flooring', value: 'Polished Carrara' },
      { label: 'Roof Glazing', value: 'Twin Roof Lanterns' }
    ],
    overview: 'An expansive architectural rear ground floor extension transforming a traditional family home into a high-end, light-flooded entertaining pavilion. Features oversized polished Carrara marble floor tiles throughout, a custom monolithic kitchen island with breakfast bar, twin architectural lantern skylights, full-width minimalist black aluminium sliding glass doors, and evening ambient terrace lighting.',
    scope: [
      'Excavation, structural steel frame installation, and floor screed',
      'Twin thermally-broken aluminium architectural roof lanterns with self-cleaning glass',
      'Full-width slim-profile black aluminium sliding glass doors to garden terrace',
      'Large-format 1200x600mm polished Carrara marble porcelain floor tiles',
      'Custom graphite kitchen island with waterfall marble worktop & amber glass drop pendants',
      'Zoned smart ambient LED downlighting, shadow gap cornicing, and architectural vertical radiator',
      'Crittall-inspired glazed interior doors connecting the entrance foyer to the living area'
    ],
    testimonial: {
      quote: 'The transformation of our home is astonishing. The marble flooring, lanterns, and sliding doors make our ground floor look like a luxury boutique hotel. The team was respectful, tidy, and punctual throughout.',
      client: 'Kiran & Preeti S.',
      location: 'Hollingworth Road, Orpington'
    },
    images: p2Images
  },
  {
    id: 'bromley-extension-loft',
    title: 'The Bromley Wraparound Extension & Dormer Loft',
    subtitle: 'Complete home transformation with rear kitchen extension & zinc-clad dormer conversion',
    category: 'extensions',
    categoryName: 'Extension & Loft Conversion',
    location: 'Bromley / Greater London',
    year: '2025 - 2026',
    duration: '18 Weeks',
    warranty: '10-Year Insurance-Backed Warranty',
    coverImage: p3Images[0]?.path || '',
    stats: [
      { label: 'Added Space', value: '78 m²' },
      { label: 'Bedrooms', value: '+1 Master Suite' },
      { label: 'Bathrooms', value: '+1 Luxury En-Suite' },
      { label: 'Exterior', value: 'Silicone K-Rend' }
    ],
    overview: 'A complete architectural transformation of a residential property comprising a ground-floor rear kitchen extension and a large rear dormer loft conversion. Includes a bespoke chef kitchen with large island, integrated wine cooler, roof lantern, bifold doors, master bedroom with en-suite walk-in wetroom, and crisp white silicone render with contrasting dark anthracite windows.',
    scope: [
      'Full rear wraparound extension with structural RSJ steel beam knock-through',
      'Rear dormer loft conversion with anthracite clad exterior and Velux front rooflights',
      'Bespoke kitchen island with built-in dual-zone wine cooler and quartz breakfast bar',
      'Thermally broken aluminium bi-fold doors creating a flush threshold to garden',
      'Luxury ground-floor bathroom with wall-hung vanity, concealed cistern & marble tiles',
      'Full exterior silicone K-Rend application in pure white with contrasting anthracite flashings'
    ],
    testimonial: {
      quote: 'Angel Construction handled our planning permission, structural calculations, and both the extension and loft simultaneously. Having one reliable team for everything gave us complete peace of mind.',
      client: 'James & Claire H.',
      location: 'Bromley, Kent'
    },
    images: p3Images
  },
  {
    id: 'chislehurst-structural-steel',
    title: 'Chislehurst Steel Portal Frame & Roof Engineering',
    subtitle: 'Heavy structural engineering, red universal RSJ ridge beam & timber roof fabrication',
    category: 'structural',
    categoryName: 'Structural Alterations & Steelwork',
    location: 'Wimborne Avenue, Chislehurst BR7',
    year: '2025 - 2026',
    duration: '6 Weeks (Phase 1)',
    warranty: 'Structural Engineering Building Control Sign-Off',
    coverImage: p4Images[0]?.path || '',
    stats: [
      { label: 'Steel Weight', value: '4.8 Tonnes' },
      { label: 'Beam Type', value: 'Universal RSJ & Portal' },
      { label: 'Compliance', value: 'Eurocode 3 & Regs' },
      { label: 'Span', value: '8.4 Metres Clear' }
    ],
    overview: 'Precision structural engineering and heavy fabrication on a multi-storey Chislehurst residence. Our in-house structural engineers and steel erectors installed a heavy-gauge red universal steel portal frame and primary RSJ ridge beam to enable a huge open-plan layout below and support a new roof structure above.',
    scope: [
      'Site structural survey, temporary Acrow propping and needle beam shoring',
      'Fabrication and crane delivery of heavy structural steel universal columns and beams',
      'Precision erection of structural portal frame with high-tensile connection plates',
      'Installation of red RSJ ridge beam for roof load redistribution and loft floor creation',
      'Precision pitch timber rafters, hipped carpentry, and building control inspection sign-off'
    ],
    testimonial: {
      quote: 'Structural work can be daunting, but Angel Construction handled our 8-metre steel portal frame with military precision. Building Control signed it off on first inspection without a single query.',
      client: 'Robert T., Property Developer',
      location: 'Chislehurst, BR7'
    },
    images: p4Images
  },
  {
    id: 'designer-bathrooms',
    title: 'Bespoke Luxury Bathrooms & Walk-In Wetrooms',
    subtitle: 'Brushed brass brassware, freestanding curved soaking tubs & Italian porcelain marble',
    category: 'bathrooms',
    categoryName: 'Designer Bathrooms',
    location: 'Colepits Wood Rd (SE9) & Orpington (BR5)',
    year: '2026',
    duration: '3 - 4 Weeks per Suite',
    warranty: 'Full Waterproofing & Installation Warranty',
    coverImage: p5Images[0]?.path || '',
    stats: [
      { label: 'Finish', value: 'Brushed Brass & Chrome' },
      { label: 'Tiling', value: 'Full-Height Porcelain' },
      { label: 'Shower', value: 'Thermostatic Rainfall' },
      { label: 'Tanking', value: '100% Watertight Membrane' }
    ],
    overview: 'A showcase of ultra-luxury bathroom renovations designed and installed across client properties. Featuring brushed brass thermostatic mixer suites, terrazzo and natural stone marble tiling, integrated recessed toiletry niches with downlights, curved modern acrylic freestanding bathtubs, wall-hung vanities, and frameless glass walk-in wetrooms.',
    scope: [
      'Full strip-out, pipework reconfiguration, and complete Schluter tanking membrane waterproofing',
      'Brushed brass thermostatic rainfall shower systems with handheld spray',
      'Freestanding modern curved acrylic soaking bathtubs with deck-mounted mixer taps',
      'Precision mitred corners on recessed shower niches and cosmetic shelves',
      'Floating wall-hung vanities with soft-close drawers and integrated basins',
      'Smart LED sensor mirrors with anti-fog heating elements and ambient backlight'
    ],
    testimonial: {
      quote: 'The tiling and brushed brass detailing in our master bathroom is pure luxury. The finish is flawless, and the walk-in rainfall shower feels like a 5-star spa every morning.',
      client: 'Anita & Raj Patel',
      location: 'Colepits Wood Road, London SE9'
    },
    images: p5Images
  },
  {
    id: 'porch-garage-driveway',
    title: 'Gable Porch Extension, Garage & Herringbone Driveway',
    subtitle: 'Matching facing brickwork gable entrance, automated roller shutter & block paving',
    category: 'exterior',
    categoryName: 'Driveways & Exterior Remodeling',
    location: 'Greater London / Surrey',
    year: '2025',
    duration: '5 Weeks',
    warranty: '10-Year Paving & Structural Guarantee',
    coverImage: p6Images[0]?.path || '',
    stats: [
      { label: 'Driveway Area', value: '85 m²' },
      { label: 'Paving Type', value: 'Marshalls Charcoal' },
      { label: 'Garage Door', value: 'Insulated Electric Roller' },
      { label: 'Porch', value: 'Pitched Gable Brick' }
    ],
    overview: 'An extensive front elevation enhancement featuring a brand-new pitched gable entrance porch in matching facing brickwork, a high-security composite door, an integrated garage conversion fitted with an automated dark anthracite roller shutter door, and an expansive charcoal block paving driveway laid in 45-degree herringbone with recessed drainage.',
    scope: [
      'Trench foundations and cavity brickwork for front gable porch extension',
      'Pitched timber roof with matching interlocking concrete roof tiles and lead flashings',
      'Automated remote-controlled insulated anthracite aluminium roller shutter garage door',
      'Excavation of driveway to 250mm, compacted Type 1 sub-base, and weed suppression geotextile',
      'Precision laying of Marshalls charcoal block pavers in 45-degree herringbone pattern',
      'Installation of Aco hex-drainage channels connected directly to compliant soakaway'
    ],
    testimonial: {
      quote: 'The curb appeal of our home has increased dramatically. The porch matches our original house bricks seamlessly, the electric roller garage works like a dream, and the driveway paving is pristine.',
      client: 'Marcus & Elena V.',
      location: 'Greater London'
    },
    images: p6Images
  },
  {
    id: 'bexleyheath-side-extension',
    title: 'The Bexleyheath Contemporary Side Extension',
    subtitle: 'Single-storey side extension with slate roof, anthracite glazing & driveway integration',
    category: 'extensions',
    categoryName: 'House Extension',
    location: '1 Longleigh Lane, Bexleyheath DA7',
    year: '2025',
    duration: '10 Weeks',
    warranty: '10-Year Structural Warranty',
    coverImage: p7Images[0]?.path || '',
    stats: [
      { label: 'Footprint', value: '28 m²' },
      { label: 'Glazing', value: 'Anthracite Casement' },
      { label: 'Roofing', value: 'Natural Slate Lean-To' },
      { label: 'Finish', value: 'Weatherproof Silicone' }
    ],
    overview: 'A bespoke single-storey side extension at Longleigh Lane, Bexleyheath. Designed to create additional ground floor living space while retaining side access. Completed with a low-pitch natural slate roof, black rainwater goods, anthracite casement windows, pristine white silicone render, and integrated brick boundary walls matching the forecourt paving.',
    scope: [
      'Site preparation, strip footings, and damp-proof membrane installation',
      'Lightweight thermal blockwork with exterior weatherproof silicone render',
      'Low-pitch timber rafter roof with natural slate tiles and Velux flashing kits',
      'Anthracite grey UPVC high-energy-efficiency casement windows',
      'Electrical installation including exterior security floodlights and ambient downlights',
      'Rebuilding of brick boundary wall and driveway tie-in'
    ],
    testimonial: {
      quote: 'Angel Construction built our side extension with exceptional speed and cleanliness. They respected our neighbours, kept the site tidy every evening, and the final finish exceeded our expectations.',
      client: 'Simon & Hannah K.',
      location: 'Longleigh Lane, Bexleyheath'
    },
    images: p7Images
  },
  {
    id: 'lodgeclose-loft-conversion',
    title: 'The Orpington Loft Conversion & Staircase',
    subtitle: 'Attic conversion with lantern skylight shaft, custom oak & glass balustrade staircase',
    category: 'lofts',
    categoryName: 'Loft Conversion',
    location: '29 Lodge Close, Orpington BR6',
    year: '2025 - 2026',
    duration: '8 Weeks',
    warranty: '10-Year Insurance-Backed Warranty',
    coverImage: p8Images[0]?.path || '',
    stats: [
      { label: 'Floors Added', value: '+1 Attic Suite' },
      { label: 'Staircase', value: 'Oak & Glass Infill' },
      { label: 'Daylight', value: 'Skylight Well' },
      { label: 'Insulation', value: 'Celotex PIR 120mm' }
    ],
    overview: 'A light-filled attic loft conversion at Lodge Close, Orpington. A central architectural feature is the new bespoke hardwood staircase positioned beneath an overhead skylight lantern well, illuminating the stairwell down to the ground floor. Finished with tempered glass balustrade infill panels, light oak flooring, and low-energy LED spotlights.',
    scope: [
      'Structural steel support beams and floor joist strengthening',
      'Construction of light shaft under architectural flat-roof glass lantern',
      'Bespoke winder staircase manufacture and installation with hardwood handrails',
      'Toughened clear glass balustrade panels for seamless sightlines and light flow',
      '120mm Celotex high-performance PIR thermal insulation ensuring year-round warmth',
      'Plaster skim finish, oak architraves, and premium laminate acoustic flooring'
    ],
    testimonial: {
      quote: 'The staircase and skylight well turned what could have been a dark hallway into the most stunning part of our home. Beautiful carpentry and spotless finishing.',
      client: 'Trevor & Lynne B.',
      location: 'Lodge Close, Orpington'
    },
    images: p8Images
  },
  {
    id: 'loft-studio-kitchen',
    title: 'Penthouse Loft Studio & Fitted Kitchenette',
    subtitle: 'Attic apartment conversion with sloped-ceiling kitchen, induction hob & dormer lighting',
    category: 'lofts',
    categoryName: 'Loft Studio Conversion',
    location: 'Greater London',
    year: '2025',
    duration: '7 Weeks',
    warranty: '10-Year Structural Guarantee',
    coverImage: p9Images[0]?.path || '',
    stats: [
      { label: 'Unit Type', value: 'Self-Contained Studio' },
      { label: 'Kitchen', value: 'Custom Sloped Fitted' },
      { label: 'Appliances', value: 'Integrated Hob & Oven' },
      { label: 'Flooring', value: 'Grey Driftwood Oak' }
    ],
    overview: 'A self-contained penthouse studio conversion designed within the pitch of a high-roof attic. Maximizing every square centimetre of space, our team designed custom sloped-ceiling kitchen units, integrated cooker hood chimney, marble splashback tiles, integrated appliances, and durable grey driftwood oak laminate flooring.',
    scope: [
      'Conversion of cold loft space into habitable compliant self-contained studio',
      'Custom cabinetry fabrication scribed to the precise pitch of the ceiling rafters',
      'Integrated electric fan-assisted oven, 4-zone induction hob, and stainless chimney hood',
      'Marble vein splashback tiling with silicone seal and moisture-resistant worktops',
      'Dedicated plumbing, waste, and electrical ring main sub-board installation',
      'Acoustic soundproof sub-flooring reducing impact noise to the floors below'
    ],
    testimonial: {
      quote: 'Angel Construction turned our dead roof space into a fully functional, beautiful rental studio that generates great income. Their clever kitchen layout made the most of every slope.',
      client: 'Gary W., Property Investor',
      location: 'South London'
    },
    images: p9Images
  },
  {
    id: 'interior-refurbishment',
    title: 'Greenwich & Chislehurst Turnkey Refurbishments',
    subtitle: 'Classic shaker kitchens, solid grooved oak joinery, architectural arches & stair runners',
    category: 'renovations',
    categoryName: 'Full House Renovation',
    location: 'Colepits Wood Rd (SE9) & Lower Camden (BR7)',
    year: '2025 - 2026',
    duration: '12 Weeks',
    warranty: '10-Year Guarantee',
    coverImage: p10Images[0]?.path || '',
    stats: [
      { label: 'Type', value: 'Full Internal Overhaul' },
      { label: 'Doors', value: 'Solid Grooved Oak' },
      { label: 'Kitchen', value: 'Shaker with Brass Cup' },
      { label: 'Joinery', value: 'Custom Archways' }
    ],
    overview: 'Turnkey interior modernization across period and modern homes in Greenwich and Chislehurst. Encompassing classic shaker-style kitchen cabinetry with brushed brass cup handles, solid oak grooved interior fire doors, bespoke curved hallway archways, deep charcoal stair runners, full rewiring, and plastering.',
    scope: [
      'Complete strip back to brick, re-plastering, and skim coating throughout',
      'Bespoke shaker kitchen cabinetry with quartz stone splashbacks and integrated extraction',
      'Solid oak grooved internal doors with contemporary brushed satin lever handles',
      'Restoration and formation of traditional curved hallway archway openings',
      'Fitting of deep charcoal luxury carpet runners with gold-tone threshold bars',
      'Full electrical rewiring, USB fast-charge sockets, and architectural LED lighting'
    ],
    testimonial: {
      quote: 'We gave Angel Construction the keys and went away on holiday. We returned to a home that felt brand new. Their attention to detail on the doors, archways, and kitchen was remarkable.',
      client: 'Jonathan & Rachel D.',
      location: 'Colepits Wood Road, Greenwich'
    },
    images: p10Images
  }
];

fs.writeFileSync(path.join(rootDir, 'assets', 'projects-data.json'), JSON.stringify(projects, null, 2));

const jsContent = `// Angel Construction Services Ltd - Verified Real Projects Data
window.ANGEL_PROJECTS = ${JSON.stringify(projects, null, 2)};
`;
fs.writeFileSync(path.join(rootDir, 'assets', 'projects-data.js'), jsContent);

console.log('Finished full image processing across 10 projects:');
projects.forEach(p => console.log(`- ${p.title}: ${p.images.length} images`));
