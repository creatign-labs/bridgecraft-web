// ============================================================
// SEED DATA — static content for demo / initial build.
// When Sanity is connected, replace these imports with GROQ
// queries from @/lib/queries fetched via the Sanity client.
// ============================================================

/* ---------- Services ---------- */
export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Lucide icon name
  keyCapabilities: string[];
}

export const services: Service[] = [
  {
    _id: 's1',
    title: 'Structural Engineering',
    slug: 'structural-engineering',
    shortDescription:
      'Comprehensive structural analysis, design, and assessment for buildings, bridges, and industrial facilities using the latest codes and computational tools.',
    fullDescription:
      'Our structural engineering division delivers robust, efficient, and safe designs across a wide range of project types. From reinforced concrete and pre-stressed structures to steel and composite systems, we apply advanced finite-element analysis and performance-based design to ensure every structure meets its intended service life. Our team has deep expertise in seismic design, retrofit assessments, and value-engineering solutions that balance safety with cost-efficiency.',
    icon: 'Building2',
    keyCapabilities: [
      'Reinforced Concrete & Pre-stressed Design',
      'Structural Steel Design',
      'Seismic Analysis & Retrofit',
      'Finite Element Modelling',
      'Foundation Engineering',
      'Structural Health Monitoring',
    ],
  },
  {
    _id: 's2',
    title: 'Bridge Engineering',
    slug: 'bridge-engineering',
    shortDescription:
      'End-to-end bridge design, inspection, rehabilitation, and load-rating services for highway, railway, and pedestrian bridges.',
    fullDescription:
      'BridgeCraft Engineers has a proud heritage in bridge engineering. We provide full lifecycle services — from feasibility studies and conceptual design through detailed engineering, construction support, and asset management. Our portfolio includes precast segmental, cable-stayed, arch, and girder bridges for national highway and railway authorities. We combine analytical rigour with practical construction knowledge to deliver bridges that are safe, durable, and economically viable.',
    icon: 'Landmark',
    keyCapabilities: [
      'Highway & Railway Bridge Design',
      'Bridge Inspection & Load Rating',
      'Rehabilitation & Strengthening',
      'Segmental & Pre-stressed Bridges',
      'Temporary Works Design',
      'Bridge Management Systems',
    ],
  },
  {
    _id: 's3',
    title: 'Transportation Engineering',
    slug: 'transportation-engineering',
    shortDescription:
      'Planning, geometric design, and traffic engineering for highways, interchanges, urban roads, and mass transit corridors.',
    fullDescription:
      'Our transportation team delivers integrated mobility solutions covering highway geometric design, intersection and interchange design, traffic impact studies, and multimodal corridor planning. We work closely with government authorities and concessionaires to develop safe, efficient, and sustainable road networks. Our capabilities extend to intelligent transportation systems (ITS), toll plaza design, and pavement engineering for both flexible and rigid pavements.',
    icon: 'Route',
    keyCapabilities: [
      'Highway Geometric Design',
      'Interchange & Junction Design',
      'Traffic Impact Assessment',
      'Pavement Design & Analysis',
      'Toll Plaza & ITS Design',
      'Road Safety Audits',
    ],
  },
  {
    _id: 's4',
    title: 'Project Management Consultancy',
    slug: 'project-management-consultancy',
    shortDescription:
      'Independent PMC services covering planning, scheduling, cost control, quality assurance, and contract administration.',
    fullDescription:
      'BridgeCraft provides end-to-end Project Management Consultancy to ensure projects are delivered on time, within budget, and to the highest quality standards. Our PMC professionals bring decades of field experience across infrastructure mega-projects. We offer detailed project planning and scheduling (Primavera / MS Project), cost estimation and budgeting, quality management systems, contract administration, and claims management. Our independent oversight safeguards the interests of project owners while maintaining collaborative relationships with contractors.',
    icon: 'ClipboardList',
    keyCapabilities: [
      'Project Planning & Scheduling',
      'Cost Estimation & Budgeting',
      'Quality Assurance & Control',
      'Contract Administration',
      'Risk Management',
      'Construction Supervision',
    ],
  },
];

/* ---------- Projects ---------- */
export interface Project {
  _id: string;
  title: string;
  slug: string;
  client: string;
  authority: string;
  location: string;
  scope: string;
  description: string;
  keyHighlights: string[];
  featured: boolean;
  sector: string;
}

export const projects: Project[] = [
  {
    _id: 'p1',
    title: 'Six-Lane Expressway Bridge over River Yamuna',
    slug: 'six-lane-expressway-bridge-yamuna',
    client: 'National Highways Authority',
    authority: 'Ministry of Road Transport & Highways',
    location: 'Uttar Pradesh, India',
    scope: 'Detailed Design & Construction Supervision',
    description:
      'Design of a 1.2 km long, six-lane extradosed bridge over the Yamuna River as part of a greenfield expressway corridor. The project included navigation clearance analysis, seismic zone-IV design, and deep pile foundations in alluvial strata.',
    keyHighlights: [
      'Extradosed Bridge Design',
      '1.2 km Span',
      'Seismic Zone IV',
      'Deep Pile Foundations',
      'Navigation Clearance',
    ],
    featured: true,
    sector: 'Infrastructure',
  },
  {
    _id: 'p2',
    title: 'Metro Viaduct — Phase 3 Extension',
    slug: 'metro-viaduct-phase-3',
    client: 'Metro Rail Corporation',
    authority: 'Urban Development Authority',
    location: 'Hyderabad, India',
    scope: 'Structural Design & Proof Checking',
    description:
      'Structural design and independent proof checking for a 14 km elevated metro viaduct including 12 stations. The design addressed launching-girder erection methodology, seismic isolation bearings, and urban-context aesthetic requirements.',
    keyHighlights: [
      '14 km Viaduct',
      '12 Elevated Stations',
      'Seismic Isolation Bearings',
      'Launching Girder Method',
      'Urban Aesthetics',
    ],
    featured: true,
    sector: 'Railways',
  },
  {
    _id: 'p3',
    title: 'Industrial Warehouse Complex',
    slug: 'industrial-warehouse-complex',
    client: 'Tata Steel Processing',
    authority: 'State Industrial Development Corp.',
    location: 'Jamshedpur, India',
    scope: 'Structural Design & PMC',
    description:
      'Design and project management for a 50,000 sq m pre-engineered steel warehouse complex with heavy crane loading. The facility includes a 40-tonne EOT crane bay, mezzanine offices, and blast-resistant control rooms.',
    keyHighlights: [
      '50,000 sq m Facility',
      '40T EOT Crane Bay',
      'Blast-Resistant Rooms',
      'Pre-Engineered Steel',
      'Fast-Track Delivery',
    ],
    featured: true,
    sector: 'Industrial',
  },
  {
    _id: 'p4',
    title: 'Coastal Highway Rehabilitation',
    slug: 'coastal-highway-rehabilitation',
    client: 'Public Works Department',
    authority: 'Ministry of Road Transport & Highways',
    location: 'Kerala, India',
    scope: 'Detailed Project Report & Supervision',
    description:
      'Preparation of the Detailed Project Report and construction supervision for rehabilitation & widening of 86 km of coastal highway including 12 bridge rehabilitations, slope stabilisation, and flexible pavement overlay design.',
    keyHighlights: [
      '86 km Highway',
      '12 Bridge Rehabs',
      'Slope Stabilisation',
      'Pavement Overlay',
      'Coastal Environment',
    ],
    featured: true,
    sector: 'Infrastructure',
  },
  {
    _id: 'p5',
    title: 'Solar Park Substation & Transmission Line',
    slug: 'solar-park-substation',
    client: 'Renewable Energy Corp.',
    authority: 'State Electricity Board',
    location: 'Rajasthan, India',
    scope: 'Structural Design for Substation & Transmission Towers',
    description:
      'Structural design of a 220 kV GIS substation and 45 km of transmission-line towers for a 500 MW solar park. The design addressed high wind speeds, desert foundation conditions, and equipment vibration isolation.',
    keyHighlights: [
      '500 MW Solar Park',
      '220 kV Substation',
      '45 km Transmission Line',
      'Desert Foundations',
      'High Wind Design',
    ],
    featured: false,
    sector: 'Renewable Energy',
  },
  {
    _id: 'p6',
    title: 'University Campus Master Plan & Structures',
    slug: 'university-campus-masterplan',
    client: 'State University',
    authority: 'Higher Education Department',
    location: 'Maharashtra, India',
    scope: 'Master Planning & Structural Design',
    description:
      'Master planning and structural design for a new 120-acre university campus including academic blocks, hostels, an auditorium, and sports facilities. The design targeted GRIHA 4-star sustainability rating.',
    keyHighlights: [
      '120-Acre Campus',
      'GRIHA 4-Star Target',
      'Academic & Hostel Blocks',
      '2,000-Seat Auditorium',
      'Sports Complex',
    ],
    featured: false,
    sector: 'Institutional',
  },
  {
    _id: 'p7',
    title: 'Flyover & Grade Separator at NH Junction',
    slug: 'flyover-grade-separator-nh',
    client: 'National Highways Authority',
    authority: 'Ministry of Road Transport & Highways',
    location: 'Tamil Nadu, India',
    scope: 'Feasibility Study, DPR & Design',
    description:
      'Feasibility study, DPR preparation, and detailed design of a 2.4 km flyover and grade separator at a critical national highway junction. The solution included a cloverleaf interchange, service roads, and pedestrian underpasses.',
    keyHighlights: [
      '2.4 km Flyover',
      'Cloverleaf Interchange',
      'Pedestrian Underpasses',
      'Service Roads',
      'Traffic Modelling',
    ],
    featured: false,
    sector: 'Infrastructure',
  },
  {
    _id: 'p8',
    title: 'Government Administrative Complex',
    slug: 'govt-admin-complex',
    client: 'Central Public Works Dept.',
    authority: 'Government of India',
    location: 'New Delhi, India',
    scope: 'Structural Design & Quality Audit',
    description:
      'Structural design and third-party quality audit for a 12-storey government administrative complex with basement parking, conference halls, and a central atrium. Design complied with National Building Code 2016 and IS 1893 seismic provisions.',
    keyHighlights: [
      '12-Storey Building',
      'Basement Parking',
      'Central Atrium',
      'NBC 2016 Compliance',
      'Third-Party Audit',
    ],
    featured: false,
    sector: 'Government',
  },
  {
    _id: 'p9',
    title: 'Railway Over Bridge — Doubling Project',
    slug: 'railway-over-bridge-doubling',
    client: 'Indian Railways',
    authority: 'Ministry of Railways',
    location: 'Gujarat, India',
    scope: 'Design & Construction Supervision',
    description:
      'Design of 8 Railway Over Bridges as part of a 120 km rail-doubling project. Designs addressed existing rail traffic management during construction, limited right-of-way, and high embankment approaches.',
    keyHighlights: [
      '8 Rail Over Bridges',
      '120 km Doubling Project',
      'Traffic Management',
      'Limited ROW',
      'High Embankments',
    ],
    featured: false,
    sector: 'Railways',
  },
  {
    _id: 'p10',
    title: 'Commercial Mixed-Use Tower',
    slug: 'commercial-mixed-use-tower',
    client: 'Prestige Developers',
    authority: 'Municipal Corporation',
    location: 'Bangalore, India',
    scope: 'Structural Design & Wind Tunnel Study Coordination',
    description:
      'Structural design of a 35-storey mixed-use tower comprising retail podium, office floors, and a sky lounge. The design utilised an outrigger-belt truss system and coordinated boundary-layer wind tunnel studies for cladding pressures.',
    keyHighlights: [
      '35-Storey Tower',
      'Outrigger System',
      'Wind Tunnel Study',
      'Mixed-Use Podium',
      'Sky Lounge',
    ],
    featured: false,
    sector: 'Commercial',
  },
];

/* ---------- Team Members ---------- */
export interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    _id: 't1',
    name: 'Rajesh Kumar Sharma',
    designation: 'Managing Director & Chief Engineer',
    bio: 'Over 30 years of experience in structural and bridge engineering. Former Chief Engineer with the National Highways Authority. Fellow of the Institution of Engineers and a chartered structural engineer.',
    order: 1,
  },
  {
    _id: 't2',
    name: 'Dr. Priya Venkatesh',
    designation: 'Director — Structural Engineering',
    bio: 'Ph.D. in Earthquake Engineering from IIT Bombay. Specialises in performance-based seismic design, nonlinear analysis, and structural health monitoring with 18 years of consulting experience.',
    order: 2,
  },
  {
    _id: 't3',
    name: 'Amit Desai',
    designation: 'Director — Bridge Engineering',
    bio: '22 years in bridge design and construction supervision. Expert in segmental construction, cable-stayed bridges, and bridge rehabilitation. Has delivered over 80 bridge projects across India.',
    order: 3,
  },
  {
    _id: 't4',
    name: 'Sunita Patel',
    designation: 'Head — Transportation Engineering',
    bio: 'M.Tech in Transportation Planning. 15 years of experience in highway geometric design, traffic engineering, and road safety audits for national and state highway projects.',
    order: 4,
  },
  {
    _id: 't5',
    name: 'Mohammed Farooq',
    designation: 'Head — Project Management',
    bio: 'PMP-certified project management professional with 20 years of experience managing infrastructure mega-projects. Expert in earned value management, risk analysis, and contract administration.',
    order: 5,
  },
  {
    _id: 't6',
    name: 'Kavitha Rajan',
    designation: 'Senior Structural Engineer',
    bio: 'M.Tech in Structural Engineering. 12 years of experience in reinforced concrete and steel design for commercial, institutional, and industrial buildings.',
    order: 6,
  },
];

/* ---------- Clients ---------- */
export interface Client {
  _id: string;
  name: string;
  websiteUrl?: string;
  order: number;
}

export const clients: Client[] = [
  { _id: 'c1', name: 'National Highways Authority of India', order: 1 },
  { _id: 'c2', name: 'Indian Railways', order: 2 },
  { _id: 'c3', name: 'Ministry of Road Transport & Highways', order: 3 },
  { _id: 'c4', name: 'Central Public Works Department', order: 4 },
  { _id: 'c5', name: 'Metro Rail Corporation', order: 5 },
  { _id: 'c6', name: 'Tata Projects Ltd.', order: 6 },
  { _id: 'c7', name: 'Larsen & Toubro', order: 7 },
  { _id: 'c8', name: 'Afcons Infrastructure', order: 8 },
  { _id: 'c9', name: 'State Public Works Departments', order: 9 },
  { _id: 'c10', name: 'Renewable Energy Corp.', order: 10 },
  { _id: 'c11', name: 'Prestige Group', order: 11 },
  { _id: 'c12', name: 'Municipal Corporations', order: 12 },
];

/* ---------- Sectors ---------- */
export interface Sector {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const sectors: Sector[] = [
  {
    _id: 'sec1',
    name: 'Infrastructure',
    slug: 'infrastructure',
    description: 'Highways, expressways, flyovers, interchanges, and urban road infrastructure.',
    icon: 'Route',
  },
  {
    _id: 'sec2',
    name: 'Government',
    slug: 'government',
    description: 'Public buildings, administrative complexes, and civic infrastructure for government bodies.',
    icon: 'Landmark',
  },
  {
    _id: 'sec3',
    name: 'Renewable Energy',
    slug: 'renewable-energy',
    description: 'Structural design for solar parks, wind farms, substations, and transmission infrastructure.',
    icon: 'Zap',
  },
  {
    _id: 'sec4',
    name: 'Railways',
    slug: 'railways',
    description: 'Railway bridges, viaducts, station structures, and metro rail elevated corridors.',
    icon: 'Train',
  },
  {
    _id: 'sec5',
    name: 'Institutional',
    slug: 'institutional',
    description: 'Educational campuses, hospitals, research facilities, and public institutions.',
    icon: 'GraduationCap',
  },
  {
    _id: 'sec6',
    name: 'Commercial',
    slug: 'commercial',
    description: 'Office towers, retail complexes, mixed-use developments, and commercial parks.',
    icon: 'Building2',
  },
  {
    _id: 'sec7',
    name: 'Industrial',
    slug: 'industrial',
    description: 'Warehouses, factory buildings, process plants, and heavy industrial facilities.',
    icon: 'Factory',
  },
];

/* ---------- Stats ---------- */
export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const stats: Stat[] = [
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'Years of Experience', value: 10, suffix: '+' },
  { label: 'Core Disciplines', value: 4, suffix: '' },
  { label: 'Clients Served', value: 100, suffix: '+' },
];

/* ---------- Careers / Job Openings ---------- */
export interface JobOpening {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export const jobOpenings: JobOpening[] = [
  {
    _id: 'j1',
    title: 'Senior Structural Engineer',
    department: 'Structural Engineering',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'We are looking for a Senior Structural Engineer with 8+ years of experience in RCC and steel design for buildings and industrial structures.',
    requirements: [
      'M.Tech in Structural Engineering',
      '8+ years of relevant experience',
      'Proficiency in ETABS, STAAD.Pro, SAFE',
      'Experience with IS codes and NBC',
      'Strong communication skills',
    ],
  },
  {
    _id: 'j2',
    title: 'Bridge Design Engineer',
    department: 'Bridge Engineering',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Join our bridge engineering team to work on major highway and railway bridge projects across India.',
    requirements: [
      'B.Tech/M.Tech in Civil/Structural Engineering',
      '5+ years in bridge design',
      'Experience with IRC/IRS codes',
      'Proficiency in MIDAS Civil or similar',
      'Experience in PSC/steel bridge design',
    ],
  },
  {
    _id: 'j3',
    title: 'Transportation Planner',
    department: 'Transportation Engineering',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Seeking a transportation planner to support highway geometric design, traffic studies, and DPR preparation.',
    requirements: [
      'M.Tech in Transportation Engineering',
      '3+ years of relevant experience',
      'Proficiency in AutoCAD Civil 3D',
      'Knowledge of IRC SP and MoRTH specifications',
      'Experience in DPR preparation',
    ],
  },
  {
    _id: 'j4',
    title: 'Graduate Engineer Trainee',
    department: 'Multiple Departments',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Fresh graduates with a passion for structural and civil engineering are welcome to apply for our 12-month training programme.',
    requirements: [
      'B.Tech in Civil Engineering (2025/2026 batch)',
      'Strong academic record',
      'Basic knowledge of structural analysis software',
      'Eagerness to learn and grow',
      'Good communication skills',
    ],
  },
];

/* ---------- Company Info ---------- */
export const companyInfo = {
  name: 'BridgeCraft Engineers & Consultants',
  tagline: 'Engineering Structures with Responsibility',
  introText:
    'BridgeCraft Engineers & Consultants is a multidisciplinary civil and structural engineering consultancy dedicated to delivering safe, sustainable, and innovative infrastructure solutions. With a team of experienced professionals and a portfolio spanning bridges, highways, buildings, and industrial facilities, we partner with public and private sector clients to build the foundations of a better tomorrow.',
  aboutText:
    'Founded with a vision to bring international-quality engineering practices to India\'s growing infrastructure landscape, BridgeCraft Engineers has grown into a trusted name in structural and civil engineering consultancy. Our multidisciplinary team combines deep technical expertise with practical construction knowledge to deliver projects that stand the test of time.\n\nWe believe that every structure tells a story — of the community it serves, the challenges it overcomes, and the aspirations it enables. Our engineers approach each project with rigour, creativity, and an unwavering commitment to safety and sustainability.\n\nOver the past decade, we have delivered more than 50 projects across India, working with premier government agencies, leading construction firms, and forward-thinking developers. Our work spans the full spectrum of civil engineering — from iconic bridges and expressways to institutional campuses and industrial facilities.',
  missionStatement:
    'To provide world-class civil and structural engineering solutions that are safe, sustainable, and value-driven — empowering communities and shaping the built environment for generations to come.',
  visionStatement:
    'To be a leading engineering consultancy recognised for technical excellence, innovation, and a steadfast commitment to building resilient infrastructure that serves society.',
  address: '4th Floor, Meridian Tower, HITEC City, Hyderabad 500081, Telangana, India',
  phone: '+91 40 2312 3456',
  email: 'info@bridgecraft.in',
  mapUrl: 'https://maps.google.com/?q=HITEC+City+Hyderabad',
};

/* ---------- Corporate Strategy Pillars ---------- */
export interface StrategyPillar {
  title: string;
  summary: string;
  details: string;
}

export const strategyPillars: StrategyPillar[] = [
  {
    title: 'Technical Excellence',
    summary: 'Invest in cutting-edge tools, continuous learning, and rigorous quality processes.',
    details:
      'We maintain technical leadership through investment in advanced analysis software, regular training programmes, peer-review culture, and adherence to international best practices. Every design passes through a multi-tier checking process before it leaves our office.',
  },
  {
    title: 'Client-Centric Approach',
    summary: 'Build long-term partnerships by understanding and exceeding client expectations.',
    details:
      'Our clients are at the centre of everything we do. We invest time in understanding project context, constraints, and aspirations. Transparent communication, proactive problem-solving, and a collaborative working style ensure that our clients view us as trusted partners rather than just service providers.',
  },
  {
    title: 'Sustainable Growth',
    summary: 'Grow responsibly by expanding capabilities while nurturing our people and values.',
    details:
      'We pursue measured growth that allows us to maintain quality and culture. This means investing in our people through mentorship programmes, fostering a healthy work-life balance, and expanding into adjacent disciplines only when we have the depth of expertise to deliver with confidence.',
  },
  {
    title: 'Innovation & Technology',
    summary: 'Embrace digital tools and innovative methods to deliver smarter solutions.',
    details:
      'From Building Information Modelling (BIM) and parametric design to drone surveys and digital twins, we continuously adopt technologies that improve accuracy, efficiency, and collaboration. Our R&D initiatives explore emerging materials, construction techniques, and sustainability metrics.',
  },
];
