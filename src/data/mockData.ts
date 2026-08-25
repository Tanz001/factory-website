import { Product, MetricItem, Certificate, Testimonial } from '../types';

export const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1644065172790-1dd8212bd47f?auto=format&fit=crop&w=2400&q=85',
    title: 'CORRUGATED ROOFING SHEETS',
    sub: 'LINE-01 // UPVC & PROFILE SHEET PRODUCTION',
    code: 'PLANT-ALPHA-01'
  },
  {
    url: 'https://images.unsplash.com/photo-1637035640168-ff7dad2852f8?auto=format&fit=crop&w=2400&q=85',
    title: 'INDUSTRIAL ROOF INSTALLATIONS',
    sub: 'FIELD-02 // LARGE-SPAN UPVC ROOF SYSTEMS',
    code: 'SITE-ROOF-02'
  },
  {
    url: 'https://images.unsplash.com/photo-1727670404457-9c5497d58fad?auto=format&fit=crop&w=2400&q=85',
    title: 'UPVC CLADDING & SHADE SHEETS',
    sub: 'FACILITY-03 // WALL PROFILES & INDUSTRIAL SHADES',
    code: 'CLAD-BAY-03'
  }
];

export const METRICS_DATA: MetricItem[] = [
  {
    id: 'exp',
    value: 18,
    suffix: '+',
    label: 'Years Industrial Mastery',
    sublabel: 'Continuous heavy engineering since 2008',
    code: 'MET-01'
  },
  {
    id: 'facility',
    value: 650000,
    suffix: ' SQ.FT.',
    label: 'Automated Facility Area',
    sublabel: 'Dual 500m continuous extrusion lines',
    code: 'MET-02'
  },
  {
    id: 'projects',
    value: 2400,
    suffix: '+',
    label: 'Industrial Mega-Projects',
    sublabel: 'Delivered across 38 global economic zones',
    code: 'MET-03'
  },
  {
    id: 'tolerance',
    value: 0.02,
    suffix: ' mm',
    label: 'CNC Edge Milled Precision',
    sublabel: 'Zero-tolerance tongue & groove jointing',
    code: 'MET-04'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'upvc-corrugated-roof',
    code: 'UPVC-RF-01',
    name: 'Tri-Shield™ 3-Layer Corrugated UPVC Roof Panel',
    category: 'upvc',
    tagline: 'Heavy-duty acid, alkali, and marine corrosion resistant roofing with ASA UV armor.',
    description: 'Engineered specifically for harsh chemical environments, electroplating plants, fertilizer factories, and coastal warehouses. Features an outer co-extruded Geloy ASA shield that deflects 99.4% of ultraviolet radiation and resists thermal degradation.',
    image: 'https://images.unsplash.com/photo-1644065172790-1dd8212bd47f?auto=format&fit=crop&w=1400&q=80',
    thickness: '2.0mm / 2.5mm / 3.0mm',
    standardWidth: '1070mm (Effective 1000mm)',
    thermalRating: 'R-Value 0.48 m²·K/W',
    fireRating: 'Class B1 (GB8624-2012 / ASTM E84 Class A)',
    spanCapacity: '1200mm Purlin Spacing @ 150 kg/m² load',
    density: '1.85 g/cm³',
    features: [
      'Chemical & Acid/Alkali corrosion immunity (100% rust-free)',
      'Acoustic insulation: dampens rainfall noise by up to 32 dB',
      'High impact resistance: resists 1kg steel ball drop from 3m at -20°C',
      '30-Year structural integrity warranty'
    ],
    applications: [
      'Chemical Processing Plants',
      'Smelting & Foundry Facilities',
      'Fertilizer & Pesticide Warehouses',
      'Coastal Marine Logistics Hubs'
    ],
    colorOptions: ['Graphite Grey', 'Industrial Terracotta', 'Safety Blue', 'Cleanroom Bone'],
    featured: true
  },
  {
    id: 'pu-cold-storage-wall',
    code: 'PIR-CS-02',
    name: 'CryoCore™ PIR Sub-Zero Cold Storage Panel',
    category: 'cold-storage',
    tagline: 'Ultra-low thermal conductivity Polyisocyanurate (PIR) core with airtight cam-lock system.',
    description: 'High-density polyisocyanurate (PIR) continuous sandwich panel designed for controlled atmosphere cold rooms, pharmaceutical vaccine depots, and blast freezers operating down to -45°C. Features automated tongue-and-groove jointing with pre-installed elastomeric thermal gaskets.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80',
    thickness: '50mm / 75mm / 100mm / 150mm / 200mm',
    standardWidth: '1000mm / 1150mm',
    thermalRating: 'λ = 0.020 W/m·K (Superior R-8.2 per inch)',
    fireRating: 'FM 4880 Class 1 / ASTM E84 Flame Spread < 25',
    spanCapacity: 'Up to 6000mm unsupported vertical span',
    density: '42 - 45 kg/m³ rigid closed-cell foam',
    features: [
      'Zero thermal bridging with concealed eccentric cam-lock anchors',
      'Closed-cell content > 95% preventing moisture accumulation',
      'Antibacterial food-safe Plastisol or SUS304 Stainless Steel skin',
      'Designed for operating range -50°C to +90°C'
    ],
    applications: [
      'Deep Freeze Logistics Distribution Hubs (-25°C to -35°C)',
      'Pharmaceutical Vaccine Storage (-40°C)',
      'Controlled Atmosphere (CA) Fruit/Vegetable Vaults',
      'Meat & Seafood Blast Freezing Tunnels'
    ],
    colorOptions: ['Cleanroom White (RAL 9002)', 'Stainless Steel 304 2B', 'Anthracite', 'Silver Metallic'],
    featured: true
  },
  {
    id: 'upvc-hollow-wall',
    code: 'UPVC-WL-03',
    name: 'CelluMax™ Twin-Wall UPVC Anti-Corrosion Cladding',
    category: 'upvc',
    tagline: 'Multi-chamber acoustic & thermal hollow wall panel for aggressive industrial atmospheres.',
    description: 'Continuous extruded multi-cell hollow panel profile providing structural rigidity with minimized deadweight. Ideal for internal partitions, ceiling panels, and exterior cladding in wash-down sanitary zones and chemical testing facilities.',
    image: 'https://images.unsplash.com/photo-1727670404457-9c5497d58fad?auto=format&fit=crop&w=1400&q=80',
    thickness: '10mm / 15mm / 18mm / 20mm',
    standardWidth: '500mm / 600mm',
    thermalRating: 'K-Value 2.8 W/m²·K',
    fireRating: 'Self-extinguishing (UL94 V-0)',
    spanCapacity: '1000mm fastening centers',
    density: 'Lightweight 4.2 kg/m²',
    features: [
      '100% Washdown compliant with high-pressure steam cleaning (80 bar)',
      'Smooth non-porous antimicrobial surface prevents fungal growth',
      'Modular interlocking male/female hidden fastener system',
      'Zero maintenance — never requires painting or anti-rust coatings'
    ],
    applications: [
      'Food & Dairy Processing Cleanrooms',
      'Commercial Car Wash Enclosures',
      'Agricultural Livestock & Swine Barns',
      'Textile Dyeing & Wet Mills'
    ],
    colorOptions: ['Pure White', 'Sky Blue', 'Light Grey'],
    featured: false
  },
  {
    id: 'heavy-cold-door',
    code: 'DR-CS-04',
    name: 'DuraSeal™ Electric Heavy Sliding Cold Room Door',
    category: 'cold-storage',
    tagline: 'Heated perimeter gasket sliding portal with automatic infrared safety sensor.',
    description: 'Industrial heavy-duty sliding and hinged doors built with 120mm continuous PIR injection and 304 grade stainless steel frame. Integrated 230V frost-prevention heating cables ensure gasket elasticity even during non-stop blast freezing.',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=1400&q=80',
    thickness: '100mm / 120mm / 150mm',
    standardWidth: 'Custom openings up to 4000mm x 4500mm',
    thermalRating: 'U-Value 0.22 W/m²·K',
    fireRating: 'Class B1 Flame Retardant',
    spanCapacity: 'High-cycle industrial guide rails (500k cycles)',
    features: [
      'Heavy-duty overhead track with drop-down sealing ramp',
      'Dual-circuit heated perimeter and threshold elements',
      'Emergency luminous inside safety release push knob',
      'Optional remote radar / magnetic loop / pull-cord automation'
    ],
    applications: [
      'High-traffic cold warehouse dock loading doors',
      'Forklift accessible cold storage chambers',
      'Bio-containment cold facilities'
    ],
    colorOptions: ['Embossed Aluminum', 'Mirror Stainless Steel', 'Traffic Safety Yellow Striped'],
    featured: false
  },
  {
    id: 'translucent-skylight',
    code: 'PC-SKY-05',
    name: 'LuxGuard™ Multiwall Polycarbonate Daylighting Panel',
    category: 'polycarbonate',
    tagline: 'Co-extruded UV-blocking daylighting profile engineered to interlock seamlessly with UPVC sheets.',
    description: 'Custom corrugated and trapezoidal profile matching SN Star UPVC roofing for zero-leakage natural lighting integration. Delivers 82% natural light transmission while blocking 99.9% of harmful solar radiation.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373aac70315?auto=format&fit=crop&w=1400&q=80',
    thickness: '1.2mm / 1.5mm / 2.0mm / 2.5mm',
    standardWidth: '1070mm',
    thermalRating: 'UV400 Surface Protection',
    fireRating: 'Class B1 (DIN 4102)',
    spanCapacity: '1200mm Purlin Span',
    features: [
      'Profile-matched to SN Star UPVC corrugated patterns',
      'Exceptional impact resistance: 250x stronger than annealed glass',
      'Anti-drip internal coating prevents condensation drop damage',
      'Light diffusion reduces interior factory glare and cooling loads'
    ],
    applications: [
      'Industrial Factory Daylighting Strips',
      'Commercial Greenhouses & Botanical Centers',
      'Logistics Canopy Sky-stripes'
    ],
    colorOptions: ['Clear Crystal', 'Opal Diffused', 'Ocean Blue', 'Solar Bronze'],
    featured: false
  }
];

export const CERTIFICATIONS: Certificate[] = [
  {
    id: 'iso-9001',
    code: 'CERT // ISO-9001-2015',
    title: 'ISO 9001:2015 Quality Management System',
    issuer: 'Bureau Veritas Quality International',
    standard: 'Quality Assurance & Precision Manufacturing Protocols',
    issueDate: '2018-04-12',
    validThrough: '2027-04-11',
    description: 'Full lifecycle quality oversight covering raw polymer spectroscopy, continuous infrared foam monitoring, and robotic CNC dimension tolerances.',
    sealColor: '#148A80',
    badge: 'QUALITY RECOGNIZED',
    testedParameters: [
      { label: 'Raw Resin Purity Check', result: '99.98% Monomer Integrity' },
      { label: 'CNC Dimensional Variance', result: '±0.02 mm' },
      { label: 'Batch Traceability Rating', result: '100% RFID Coded' }
    ]
  },
  {
    id: 'astm-e84',
    code: 'CERT // ASTM-E84-CLASS-A',
    title: 'ASTM E84 Surface Burning Fire Rating',
    issuer: 'Underwriters Laboratories (UL Tested)',
    standard: 'Standard Test Method for Surface Burning Characteristics',
    issueDate: '2020-09-15',
    validThrough: '2028-09-14',
    description: 'Steiner Tunnel fire propagation inspection verifying flame spread index < 25 and smoke development rating < 50 for PIR cores and UPVC sheets.',
    sealColor: '#B8956C',
    badge: 'CLASS A FIRE RATED',
    testedParameters: [
      { label: 'Flame Spread Index (FSI)', result: '18 (Class A ≤ 25)' },
      { label: 'Smoke Developed Index (SDI)', result: '35 (Class A ≤ 50)' },
      { label: 'Self-Extinguish Duration', result: '< 3.2 Seconds' }
    ]
  },
  {
    id: 'ce-en14509',
    code: 'CERT // CE-EN-14509',
    title: 'CE Marking EN 14509 Conformity',
    issuer: 'TÜV Rheinland Structural Testing',
    standard: 'Self-Supporting Double Skin Metal/Polymer Faced Insulating Panels',
    issueDate: '2019-11-20',
    validThrough: '2027-11-19',
    description: 'European structural compliance certification confirming load-bearing capacities, shear strength, and long-term creep durability.',
    sealColor: '#4A6B7C',
    badge: 'EU STRUCTURAL CERT',
    testedParameters: [
      { label: 'Bending Strength Capacity', result: '0.14 MPa' },
      { label: 'Cross-Panel Tensile Strength', result: '0.12 MPa' },
      { label: 'Thermal Resistance (U-Value)', result: '0.20 W/m²·K' }
    ]
  },
  {
    id: 'fm-4880',
    code: 'CERT // FM-4880-CLASS-1',
    title: 'FM Approvals 4880 Cold Storage Standard',
    issuer: 'FM Global Risk Solutions',
    standard: 'American National Standard for Evaluating Insulated Wall/Roof Panels',
    issueDate: '2021-02-18',
    validThrough: '2029-02-17',
    description: 'Rigorous full-scale corner test verification for unlimited height installations without sprinkler suppression in cold warehouse rooms.',
    sealColor: '#148A80',
    badge: 'FM APPROVED',
    testedParameters: [
      { label: '16-Foot Corner Test', result: 'Passed — Zero Flashover' },
      { label: '50-Foot Full Scale Test', result: 'Certified Unlimited Height' },
      { label: 'Thermal Degradation Limit', result: '> 480°C' }
    ]
  },
  {
    id: 'iso-14001',
    code: 'CERT // ISO-14001-2015',
    title: 'ISO 14001 Environmental Management',
    issuer: 'SGS International Inspection',
    standard: 'Zero-Discharge Green Manufacturing Protocols',
    issueDate: '2019-06-10',
    validThrough: '2028-06-09',
    description: 'Verification of closed-loop water recovery, zero CFC/HCFC blowing agents (100% Cyclopentane foam blowing), and 100% recyclable UPVC offcut recycling.',
    sealColor: '#10B981',
    badge: 'ZERO-CFC ECO SEAL',
    testedParameters: [
      { label: 'Ozone Depletion Potential (ODP)', result: '0.000 (Zero)' },
      { label: 'Global Warming Potential (GWP)', result: '< 1.0' },
      { label: 'Factory Offcut Recycling', result: '100% Reprocessed' }
    ]
  },
  {
    id: 'rohs-reach',
    code: 'CERT // ROHS-REACH-EU',
    title: 'RoHS & REACH Directives Compliance',
    issuer: 'Intertek Testing Services',
    standard: 'Restriction of Hazardous Substances (2011/65/EU)',
    issueDate: '2022-01-14',
    validThrough: '2028-01-13',
    description: 'Heavy metal free certification validating complete absence of lead, cadmium, mercury, and halogenated flame retardants across all panel lines.',
    sealColor: '#38BDF8',
    badge: 'HEAVY METAL FREE',
    testedParameters: [
      { label: 'Lead (Pb) Content', result: '< 10 ppm (Target < 1000)' },
      { label: 'Cadmium (Cd) Content', result: 'Not Detected' },
      { label: 'Phthalate Plasticizers', result: 'Zero (Non-Toxic)' }
    ]
  },
  {
    id: 'gbc-green-seal',
    code: 'CERT // GBC-LEED-V4',
    title: 'Green Building Council LEED v4 Platinum Contributor',
    issuer: 'World Green Building Council',
    standard: 'Thermal Envelope Energy Conservation & Low VOC Rating',
    issueDate: '2021-08-30',
    validThrough: '2029-08-29',
    description: 'Earns up to 14 points on industrial LEED v4 projects through superior thermal resistance, Solar Reflectance Index (SRI > 82), and non-emitting materials.',
    sealColor: '#B8956C',
    badge: 'LEED V4 QUALIFIED',
    testedParameters: [
      { label: 'Solar Reflectance Index (SRI)', result: '86.4 (High Albedo)' },
      { label: 'VOC Emission Rate', result: '< 0.05 mg/m³' },
      { label: 'HVAC Energy Reduction', result: 'Up to 34% annually' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    quote: "We installed 140,000 square feet of SN Star Tri-Shield UPVC panels across our sulfuric acid processing bay. Four years later in a 90% humidity corrosive zone, there is literally zero rust, zero chalking, and our internal ambient temperature dropped by 7.5°C.",
    author: "Eng. Marcus Vance",
    role: "Chief Facilities Director",
    company: "Apex Chemical & Petrochemical Ltd.",
    project: "Sulfur Refining Plant Unit-04",
    projectScale: "140,000 sq. ft. Roof & Cladding",
    location: "Rotterdam Port Industrial Zone",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    id: 'test-02',
    quote: "For our -32°C automated ice cream and pharmaceutical cold hub, thermal integrity is non-negotiable. SN Star's 150mm CryoCore PIR panels with cam-lock tongue and groove gave us air tightness benchmarks that exceeded our FM Global Tier-1 inspection with zero thermal bridge losses.",
    author: "Elena Rostova",
    role: "VP of Cold Chain Logistics",
    company: "Nordic Frost Logistics Global",
    project: "Mega Cold Vault Alpha",
    projectScale: "220,000 sq. ft. Deep Freeze Enclosure",
    location: "Stockholm Logistics Corridor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    id: 'test-03',
    quote: "When we replaced traditional metal deck roofing with SN Star 3-layer UPVC in our coastal fertilizer warehouse, our replacement and paint maintenance budget dropped to zero. The acoustic reduction during torrential monsoon rains also dramatically improved plant floor safety.",
    author: "David Chen",
    role: "Head of Plant Engineering",
    company: "Pacific Agro Chemicals Group",
    project: "Coastal Bulk Storage Facility",
    projectScale: "95,000 sq. ft. Chemical Depot",
    location: "Singapore Jurong Island",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    id: 'test-04',
    quote: "The precision of their CNC interlocking jointing made our install speed 35% faster than standard corrugated steel. Their engineering team provided custom shop drawings and load span tables that cleared municipal structural approvals in record time.",
    author: "Sarah Lindqvist",
    role: "Lead Structural Contractor",
    company: "Vanguard Industrial EPC",
    project: "Automotive Stamping Plant",
    projectScale: "310,000 sq. ft. Integrated Envelope",
    location: "Gothenburg Industrial Park",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    rating: 5
  }
];

export const CAPABILITIES = [
  {
    id: 'cap-01',
    title: 'Dual 500m Continuous Extrusion',
    spec: '18,000 m² / Day Throughput',
    description: 'High-speed automated German tooling lines delivering seamless multi-layer UPVC profiles with automated inline thickness laser gauging.',
    iconName: 'Cpu'
  },
  {
    id: 'cap-02',
    title: 'High-Pressure 6-Component PIR Foaming',
    spec: 'Zero Thermal Voids (42 kg/m³)',
    description: 'Robotic high-pressure cyclopentane injection with continuous heated double-belt press ensuring 100% uniform cellular density.',
    iconName: 'Flame'
  },
  {
    id: 'cap-03',
    title: 'Custom CNC Joint Milling',
    spec: '0.02 mm Joint Tolerance',
    description: 'Automated 5-axis edge profiling creating airtight eccentric cam-lock and labyrinth tongue-and-groove joint seals.',
    iconName: 'Sliders'
  },
  {
    id: 'cap-04',
    title: 'Extreme Climate Lab Testing',
    spec: '-50°C to +120°C Thermal Cycles',
    description: 'In-house environmental test chambers verifying wind-uplift (up to 240 km/h), saltwater fog (3,000 hrs), and UV aging.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'cap-05',
    title: 'Rapid Global Logistics Staging',
    spec: '48-Hour Dispatch Guarantee',
    description: 'Dedicated heavy container loading cranes with custom corner-protected steel palletizing for zero transit deformation.',
    iconName: 'Truck'
  },
  {
    id: 'cap-06',
    title: 'BIM & Structural Engineering Support',
    spec: 'AutoCAD / Revit / Tekla Files',
    description: 'Complete engineering calculation packets, wind load tables, and thermal bridge simulation modeling for licensed EPC contractors.',
    iconName: 'DraftingCompass'
  }
];

export const CONVEYOR_STAGES = [
  {
    step: '01',
    title: 'Resin Spectroscopy',
    detail: 'Virgin PVC + ASA resin spectrographic purity assay & UV-stabilizer dry blending.',
    metric: '99.98% Virgin Purity'
  },
  {
    step: '02',
    title: 'Co-Extrusion Core',
    detail: 'Triple-screw synchronized extrusion at 195°C forming multi-layer weather resistance.',
    metric: '3-Layer Composite'
  },
  {
    step: '03',
    title: 'PIR High-Pressure Injection',
    detail: 'Automated 6-stream Polyol/MDI mixing injected under 180 bar pressure into heated belt press.',
    metric: 'λ = 0.020 W/m·K'
  },
  {
    step: '04',
    title: 'Robotic CNC Trimming',
    detail: 'Continuous laser flying saw and 5-axis edge milling for zero-leakage cam-lock joints.',
    metric: '±0.02mm Tolerance'
  },
  {
    step: '05',
    title: '100% Quality Assurance',
    detail: 'Ultrasonic core void detection, laser deflection load test, and RFID serial tracking.',
    metric: 'Zero-Defect Pass'
  }
];
