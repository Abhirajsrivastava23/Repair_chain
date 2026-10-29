// Initial seed data for RepairChain Platform

export const INITIAL_TECHNICIANS = [
  {
    id: 'TECH-01',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    specialty: 'Micro-soldering & Logic Boards',
    activeRepairs: 3,
    maxCapacity: 5,
    rating: 4.9,
    experience: '7 years',
    status: 'Active'
  },
  {
    id: 'TECH-02',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specialty: 'Display & Glass Lamination',
    activeRepairs: 2,
    maxCapacity: 5,
    rating: 4.8,
    experience: '5 years',
    status: 'Active'
  },
  {
    id: 'TECH-03',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    specialty: 'Battery, Thermal & Power Systems',
    activeRepairs: 1,
    maxCapacity: 4,
    rating: 4.95,
    experience: '8 years',
    status: 'Active'
  },
  {
    id: 'TECH-04',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    specialty: 'Audio, Drone & Sensor Hardware',
    activeRepairs: 2,
    maxCapacity: 4,
    rating: 4.75,
    experience: '4 years',
    status: 'Active'
  }
];

export const INITIAL_INVENTORY = [
  {
    id: 'PART-101',
    sku: 'DISP-IP15PM-OLED',
    name: 'Super Retina XDR OLED Display (120Hz ProMotion)',
    category: 'Displays',
    compatible: 'iPhone 15 Pro Max',
    inStock: 14,
    reserved: 2,
    minThreshold: 5,
    unitCost: 145.0,
    retailPrice: 220.0,
    binLocation: 'A-12-3'
  },
  {
    id: 'PART-102',
    sku: 'BATT-MBP16-M3',
    name: '99.6Wh Lithium Polymer Battery Pack',
    category: 'Batteries',
    compatible: 'MacBook Pro 16" (M2/M3)',
    inStock: 7,
    reserved: 1,
    minThreshold: 4,
    unitCost: 85.0,
    retailPrice: 140.0,
    binLocation: 'B-04-1'
  },
  {
    id: 'PART-103',
    sku: 'FAN-MBP16-DUAL',
    name: 'Dual High-Efficiency MagLev Cooling Fans',
    category: 'Thermal',
    compatible: 'MacBook Pro 14" & 16"',
    inStock: 18,
    reserved: 1,
    minThreshold: 6,
    unitCost: 32.0,
    retailPrice: 65.0,
    binLocation: 'C-08-2'
  },
  {
    id: 'PART-104',
    sku: 'HNG-XM5-L',
    name: 'Reinforced Carbon Polymer Hinge Arm Assembly (Left)',
    category: 'Hinges & Housing',
    compatible: 'Sony WH-1000XM5',
    inStock: 3,
    reserved: 1,
    minThreshold: 5,
    unitCost: 18.0,
    retailPrice: 42.0,
    binLocation: 'D-02-4'
  },
  {
    id: 'PART-105',
    sku: 'CAM-S24U-200M',
    name: '200MP Main OIS Sensor Module & Sapphire Lens',
    category: 'Cameras',
    compatible: 'Samsung Galaxy S24 Ultra',
    inStock: 9,
    reserved: 0,
    minThreshold: 4,
    unitCost: 110.0,
    retailPrice: 180.0,
    binLocation: 'A-05-2'
  },
  {
    id: 'PART-106',
    sku: 'LASER-PS5-UHD',
    name: 'KEM-497AAA Ultra HD Blu-Ray Optical Pickup Laser',
    category: 'Optical & Drives',
    compatible: 'Sony PlayStation 5 / PS5 Pro',
    inStock: 12,
    reserved: 1,
    minThreshold: 4,
    unitCost: 28.0,
    retailPrice: 58.0,
    binLocation: 'E-11-1'
  },
  {
    id: 'PART-107',
    sku: 'MOT-MAVIC3-GIMBAL',
    name: '3-Axis Brushless Gimbal Stabilization Motor',
    category: 'Drone & Robotics',
    compatible: 'DJI Mavic 3 / 3 Pro',
    inStock: 4,
    reserved: 0,
    minThreshold: 3,
    unitCost: 75.0,
    retailPrice: 130.0,
    binLocation: 'F-03-3'
  },
  {
    id: 'PART-108',
    sku: 'CHG-USB4-MOD',
    name: 'Thunderbolt 4 / USB-C Modular Power Delivery Port',
    category: 'Connectors',
    compatible: 'Dell XPS, ThinkPad, MacBook',
    inStock: 25,
    reserved: 0,
    minThreshold: 8,
    unitCost: 12.0,
    retailPrice: 35.0,
    binLocation: 'C-01-5'
  }
];

export const INITIAL_WARRANTY_REGISTRY = [
  {
    serialNumber: 'SN-APL-882193',
    imei: '354892109823412',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max 256GB',
    purchaseDate: '2025-11-14',
    expiryDate: '2026-11-13',
    warrantyType: 'AppleCare+ Comprehensive',
    coverageStatus: 'ACTIVE',
    customerName: 'Marcus Sterling',
    customerEmail: 'marcus.sterling@example.com',
    customerPhone: '+1 (555) 234-8901',
    deductible: 29.0,
    coveredParts: ['Accidental Damage', 'Screen Repair', 'Battery (<80%)', 'Logic Board']
  },
  {
    serialNumber: 'SN-APL-774921',
    imei: 'N/A',
    brand: 'Apple',
    model: 'MacBook Pro 16" (M3 Max, 64GB)',
    purchaseDate: '2025-06-20',
    expiryDate: '2026-06-19',
    warrantyType: 'Limited Manufacturer Warranty',
    coverageStatus: 'ACTIVE',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 872-4321',
    deductible: 0.0,
    coveredParts: ['Manufacturer Defects', 'Thermal Architecture', 'Motherboard Hardware']
  },
  {
    serialNumber: 'SN-SNY-993104',
    imei: 'N/A',
    brand: 'Sony',
    model: 'Sony WH-1000XM5 Wireless Headphones',
    purchaseDate: '2024-03-10',
    expiryDate: '2025-03-09',
    warrantyType: 'Standard 1-Year Limited',
    coverageStatus: 'EXPIRED',
    customerName: 'Liam O\'Connor',
    customerEmail: 'liam.oc@example.com',
    customerPhone: '+1 (555) 441-9082',
    deductible: 0.0,
    coveredParts: []
  },
  {
    serialNumber: 'SN-SAM-554219',
    imei: '359901458821432',
    brand: 'Samsung',
    model: 'Samsung Galaxy S24 Ultra 512GB',
    purchaseDate: '2026-02-18',
    expiryDate: '2027-02-17',
    warrantyType: 'Samsung Care+ Tier 1',
    coverageStatus: 'ACTIVE',
    customerName: 'Devon Patel',
    customerEmail: 'devon.patel@example.com',
    customerPhone: '+1 (555) 762-1199',
    deductible: 19.0,
    coveredParts: ['Display Replacement', 'Liquid Damage', 'Mechanical Breakdown']
  },
  {
    serialNumber: 'SN-DEL-338190',
    imei: 'N/A',
    brand: 'Dell',
    model: 'Dell XPS 15 9530 OLED',
    purchaseDate: '2024-08-05',
    expiryDate: '2025-08-04',
    warrantyType: 'Dell ProSupport Plus',
    coverageStatus: 'EXPIRED',
    customerName: 'Chloe Henderson',
    customerEmail: 'chloe.h@example.com',
    customerPhone: '+1 (555) 321-6548',
    deductible: 49.0,
    coveredParts: []
  }
];

export const INITIAL_REPAIRS = [
  {
    id: 'RC-80412',
    trackingCode: 'RC-80412',
    customer: {
      name: 'Marcus Sterling',
      email: 'marcus.sterling@example.com',
      phone: '+1 (555) 234-8901',
      address: '742 Evergreen Terrace, Seattle, WA'
    },
    device: {
      category: 'Smartphone',
      brand: 'Apple',
      model: 'iPhone 15 Pro Max 256GB',
      serialNumber: 'SN-APL-882193',
      imei: '354892109823412',
      color: 'Titanium Blue',
      passcodeProvided: true
    },
    warranty: {
      status: 'UNDER_WARRANTY',
      type: 'AppleCare+ Comprehensive',
      expires: '2026-11-13',
      claimApproved: true,
      deductible: 29.0
    },
    reportedIssue: 'Dropped on pavement during commute. Front OLED glass shattered, display shows green vertical artifact lines. Touch responsiveness intermittent in upper right quadrant.',
    issueCategory: 'Display & Glass',
    urgency: 'HIGH',
    stage: 'Awaiting Customer Approval',
    stageProgress: 45,
    assignedTechId: 'TECH-02',
    assignedTechName: 'David Kim',
    createdAt: '2026-10-27T09:15:00Z',
    updatedAt: '2026-10-28T14:30:00Z',
    estimatedCompletion: '2026-10-30T17:00:00Z',
    diagnosis: {
      inspector: 'David Kim',
      findings: 'Inner OLED matrix punctured at coordinate X:42 Y:118. Frame integrity intact with minor cosmetic nick at bottom bezel. FaceID sensor array operational.',
      estimatedLaborHours: 1.5,
      laborRate: 40.0,
      notes: 'Requires OEM screen swap + TrueTone serialization programmer tool.'
    },
    partsUsed: [
      {
        partId: 'PART-101',
        sku: 'DISP-IP15PM-OLED',
        name: 'Super Retina XDR OLED Display (120Hz ProMotion)',
        qty: 1,
        unitPrice: 220.0,
        coveredByWarranty: true
      }
    ],
    billing: {
      partsTotal: 220.0,
      laborTotal: 60.0,
      warrantyDiscount: 251.0, // Customer pays only deductible
      totalDue: 29.0,
      approvalStatus: 'PENDING_APPROVAL' // PENDING_APPROVAL, APPROVED, DECLINED
    },
    timeline: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-27T09:15:00Z',
        actor: 'Marcus Sterling (Customer)',
        note: 'Repair request submitted online with photos attached.'
      },
      {
        stage: 'Under Diagnosis',
        timestamp: '2026-10-27T13:40:00Z',
        actor: 'Elena Rostova (Manager)',
        note: 'Triaged and assigned to David Kim (Display Specialist).'
      },
      {
        stage: 'Awaiting Customer Approval',
        timestamp: '2026-10-28T14:30:00Z',
        actor: 'David Kim (Technician)',
        note: 'Diagnosis complete. Estimate generated ($29 AppleCare+ deductible). Awaiting customer sign-off.'
      }
    ],
    qaChecklist: [
      { label: 'Display Panel TrueTone & 120Hz Functionality', passed: false },
      { label: 'Multi-Touch 10-Point Capacitive Test', passed: false },
      { label: 'FaceID Biometric Authentication', passed: false },
      { label: 'Proximity & Ambient Light Sensor', passed: false },
      { label: 'Water Seal Gasket Replacement', passed: false }
    ]
  },
  {
    id: 'RC-80415',
    trackingCode: 'RC-80415',
    customer: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 872-4321',
      address: '104 Market Street, San Francisco, CA'
    },
    device: {
      category: 'Laptop',
      brand: 'Apple',
      model: 'MacBook Pro 16" (M3 Max, 64GB)',
      serialNumber: 'SN-APL-774921',
      imei: 'N/A',
      color: 'Space Black',
      passcodeProvided: false
    },
    warranty: {
      status: 'UNDER_WARRANTY',
      type: 'Limited Manufacturer Warranty',
      expires: '2026-06-19',
      claimApproved: true,
      deductible: 0.0
    },
    reportedIssue: 'Loud buzzing noise from right fan under moderate compilation load. Device throttles severely and casing reaches 89°C.',
    issueCategory: 'Thermal & Cooling',
    urgency: 'CRITICAL',
    stage: 'In Repair',
    stageProgress: 65,
    assignedTechId: 'TECH-01',
    assignedTechName: 'Alex Rivera',
    createdAt: '2026-10-26T11:00:00Z',
    updatedAt: '2026-10-29T08:15:00Z',
    estimatedCompletion: '2026-10-29T18:00:00Z',
    diagnosis: {
      inspector: 'Alex Rivera',
      findings: 'Right MagLev fan bearing failure due to foreign fiber ingress. Left fan operational but heat-pipe thermal paste degraded.',
      estimatedLaborHours: 2.0,
      laborRate: 50.0,
      notes: 'Clean thermal chamber, repaste M3 Max die with Phase-Change thermal interface, install dual fan kit.'
    },
    partsUsed: [
      {
        partId: 'PART-103',
        sku: 'FAN-MBP16-DUAL',
        name: 'Dual High-Efficiency MagLev Cooling Fans',
        qty: 1,
        unitPrice: 65.0,
        coveredByWarranty: true
      }
    ],
    billing: {
      partsTotal: 65.0,
      laborTotal: 100.0,
      warrantyDiscount: 165.0,
      totalDue: 0.0,
      approvalStatus: 'APPROVED'
    },
    timeline: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-26T11:00:00Z',
        actor: 'Sarah Jenkins',
        note: 'Customer dropped off at San Francisco Flagship Service Hub.'
      },
      {
        stage: 'Under Diagnosis',
        timestamp: '2026-10-26T14:20:00Z',
        actor: 'Alex Rivera',
        note: 'Thermal imaging scan confirmed 94°C localized hotspot.'
      },
      {
        stage: 'Awaiting Customer Approval',
        timestamp: '2026-10-27T10:00:00Z',
        actor: 'System',
        note: 'Quote $0 (100% manufacturer warranty defect). Auto-approved.'
      },
      {
        stage: 'In Repair',
        timestamp: '2026-10-29T08:15:00Z',
        actor: 'Alex Rivera',
        note: 'Spare part reserved from Bin C-08-2. Disassembly and repasting active.'
      }
    ],
    qaChecklist: [
      { label: 'Thermal Sensor Readings < 45°C Idle', passed: false },
      { label: 'Geekbench Multicore Stress Run (15 min)', passed: false },
      { label: 'Fan RPM Curve Calibration (0 - 6200 RPM)', passed: false },
      { label: 'All 3 Thunderbolt 4 Ports Tested', passed: false },
      { label: 'Liquid Submersion Indicators White/Clean', passed: true }
    ]
  },
  {
    id: 'RC-80409',
    trackingCode: 'RC-80409',
    customer: {
      name: 'Liam O\'Connor',
      email: 'liam.oc@example.com',
      phone: '+1 (555) 441-9082',
      address: '22 Elm Street, Boston, MA'
    },
    device: {
      category: 'Audio',
      brand: 'Sony',
      model: 'Sony WH-1000XM5 Wireless Headphones',
      serialNumber: 'SN-SNY-993104',
      imei: 'N/A',
      color: 'Silver',
      passcodeProvided: false
    },
    warranty: {
      status: 'EXPIRED',
      type: 'Standard 1-Year (Expired Mar 2025)',
      expires: '2025-03-09',
      claimApproved: false,
      deductible: 0.0
    },
    reportedIssue: 'Left hinge swivel snapped when putting them into the travel case. Sound still works on both sides but headband hangs loose.',
    issueCategory: 'Hinges & Housing',
    urgency: 'NORMAL',
    stage: 'Under Diagnosis',
    stageProgress: 25,
    assignedTechId: 'TECH-04',
    assignedTechName: 'Marcus Vance',
    createdAt: '2026-10-28T16:00:00Z',
    updatedAt: '2026-10-29T09:00:00Z',
    estimatedCompletion: '2026-10-31T15:00:00Z',
    diagnosis: {
      inspector: 'Marcus Vance',
      findings: 'Left pivot bracket sheared. Internal flex cable ribbon slightly kinked but conducting 100% signal.',
      estimatedLaborHours: 1.0,
      laborRate: 45.0,
      notes: 'Replace left hinge assembly with reinforced titanium-core version.'
    },
    partsUsed: [],
    billing: {
      partsTotal: 42.0,
      laborTotal: 45.0,
      warrantyDiscount: 0.0,
      totalDue: 87.0,
      approvalStatus: 'PENDING_APPROVAL'
    },
    timeline: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-28T16:00:00Z',
        actor: 'Liam O\'Connor',
        note: 'Mail-in repair package received at central depot.'
      },
      {
        stage: 'Under Diagnosis',
        timestamp: '2026-10-29T09:00:00Z',
        actor: 'Marcus Vance',
        note: 'Awaiting structural assessment on internal ribbon cable.'
      }
    ],
    qaChecklist: [
      { label: 'Hinge Rotation & Detent Clicks', passed: false },
      { label: 'Active Noise Cancellation Balanced', passed: false },
      { label: 'Bluetooth 5.2 Multi-Point Connect', passed: false },
      { label: 'Touch Gestures on Right Earcup', passed: false }
    ]
  },
  {
    id: 'RC-80398',
    trackingCode: 'RC-80398',
    customer: {
      name: 'Chloe Henderson',
      email: 'chloe.h@example.com',
      phone: '+1 (555) 321-6548',
      address: '88 Austin Blvd, Austin, TX'
    },
    device: {
      category: 'Laptop',
      brand: 'Dell',
      model: 'Dell XPS 15 9530 OLED',
      serialNumber: 'SN-DEL-338190',
      imei: 'N/A',
      color: 'Platinum Silver',
      passcodeProvided: true
    },
    warranty: {
      status: 'EXPIRED',
      type: 'Out of Warranty (Standard Expired)',
      expires: '2025-08-04',
      claimApproved: false,
      deductible: 0.0
    },
    reportedIssue: 'Trackpad popped up slightly above palm-rest. Suspected swollen lithium pouch battery.',
    issueCategory: 'Batteries & Power',
    urgency: 'HIGH',
    stage: 'Quality Testing',
    stageProgress: 85,
    assignedTechId: 'TECH-03',
    assignedTechName: 'Elena Rostova',
    createdAt: '2026-10-25T14:10:00Z',
    updatedAt: '2026-10-29T07:45:00Z',
    estimatedCompletion: '2026-10-29T16:00:00Z',
    diagnosis: {
      inspector: 'Elena Rostova',
      findings: 'Cell 3 of 6-cell pack expanded by 4.2mm. Removed safely under ESD hood. Trackpad mechanics undamaged.',
      estimatedLaborHours: 1.5,
      laborRate: 45.0,
      notes: 'New 86Wh Dell OEM battery installed. BIOS battery gauge reset.'
    },
    partsUsed: [
      {
        partId: 'PART-102',
        sku: 'BATT-MBP16-M3', // Compatible high capacity pack
        name: 'High Capacity 86Wh Replacement Battery Pack',
        qty: 1,
        unitPrice: 130.0,
        coveredByWarranty: false
      }
    ],
    billing: {
      partsTotal: 130.0,
      laborTotal: 67.5,
      warrantyDiscount: 0.0,
      totalDue: 197.5,
      approvalStatus: 'APPROVED'
    },
    timeline: [
      { stage: 'Submitted', timestamp: '2026-10-25T14:10:00Z', actor: 'Chloe Henderson', note: 'Customer reported battery swelling.' },
      { stage: 'Under Diagnosis', timestamp: '2026-10-26T09:00:00Z', actor: 'Elena Rostova', note: 'High risk hazard confirmed. Isolated cell.' },
      { stage: 'Awaiting Customer Approval', timestamp: '2026-10-26T11:30:00Z', actor: 'System', note: 'Customer approved estimate ($197.50).' },
      { stage: 'In Repair', timestamp: '2026-10-27T10:00:00Z', actor: 'Elena Rostova', note: 'Battery replaced, thermal pads refreshed.' },
      { stage: 'Quality Testing', timestamp: '2026-10-29T07:45:00Z', actor: 'Elena Rostova', note: 'Charge/discharge cycle testing in progress (Currently at 82%).' }
    ],
    qaChecklist: [
      { label: 'Battery Health 100% (Design Capacity 86,000mWh)', passed: true },
      { label: 'Trackpad Level Alignment & Click Action', passed: true },
      { label: 'AC Adapter 130W Handshake Verification', passed: true },
      { label: 'Full 100% Discharge & Recharge Cycle', passed: false },
      { label: 'Chassis Screw Torque & Antistatic Seal', passed: true }
    ]
  },
  {
    id: 'RC-80385',
    trackingCode: 'RC-80385',
    customer: {
      name: 'Anthony Rossi',
      email: 'anthony.r@example.com',
      phone: '+1 (555) 609-8812',
      address: '500 Grand Ave, Chicago, IL'
    },
    device: {
      category: 'Tablet',
      brand: 'Apple',
      model: 'iPad Air 11" (M2, 128GB)',
      serialNumber: 'SN-APL-619283',
      imei: 'N/A',
      color: 'Starlight',
      passcodeProvided: true
    },
    warranty: {
      status: 'PENDING_VERIFICATION',
      type: 'Customer claims manufacturer defect, liquid detected',
      expires: '2026-07-20',
      claimApproved: false,
      deductible: 0.0
    },
    reportedIssue: 'Coffee spilled across charging port and lower speaker grill. Tablet won’t turn on and screen stays black.',
    issueCategory: 'Liquid Damage',
    urgency: 'HIGH',
    stage: 'Submitted',
    stageProgress: 10,
    assignedTechId: null,
    assignedTechName: 'Unassigned',
    createdAt: '2026-10-29T06:30:00Z',
    updatedAt: '2026-10-29T06:30:00Z',
    estimatedCompletion: '2026-11-02T18:00:00Z',
    diagnosis: null,
    partsUsed: [],
    billing: {
      partsTotal: 0.0,
      laborTotal: 0.0,
      warrantyDiscount: 0.0,
      totalDue: 0.0,
      approvalStatus: 'NOT_ESTIMATED'
    },
    timeline: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-29T06:30:00Z',
        actor: 'Anthony Rossi',
        note: 'Priority ticket submitted online. Awaiting triage from Service Manager.'
      }
    ],
    qaChecklist: [
      { label: 'Ultrasonic Board Cleaning & Corrosion Removal', passed: false },
      { label: 'Power Rail Short-Circuit Inspection', passed: false },
      { label: 'Digitizer & Apple Pencil Recognition', passed: false },
      { label: 'Stereo Speaker Output Balance', passed: false }
    ]
  },
  {
    id: 'RC-80371',
    trackingCode: 'RC-80371',
    customer: {
      name: 'Devon Patel',
      email: 'devon.patel@example.com',
      phone: '+1 (555) 762-1199',
      address: '320 Pine Street, Denver, CO'
    },
    device: {
      category: 'Gaming Console',
      brand: 'Sony',
      model: 'PlayStation 5 Pro 2TB',
      serialNumber: 'SN-SNY-448190',
      imei: 'N/A',
      color: 'White/Black',
      passcodeProvided: false
    },
    warranty: {
      status: 'UNDER_WARRANTY',
      type: 'Sony 1-Year Manufacturer Warranty',
      expires: '2027-01-10',
      claimApproved: true,
      deductible: 0.0
    },
    reportedIssue: 'Console rejects game discs with "Unrecognized Disc (CE-100005-6)". Digital games launch normally.',
    issueCategory: 'Optical Drive',
    urgency: 'NORMAL',
    stage: 'Ready for Pickup',
    stageProgress: 95,
    assignedTechId: 'TECH-04',
    assignedTechName: 'Marcus Vance',
    createdAt: '2026-10-24T10:15:00Z',
    updatedAt: '2026-10-29T08:30:00Z',
    estimatedCompletion: '2026-10-29T12:00:00Z',
    diagnosis: {
      inspector: 'Marcus Vance',
      findings: 'Optical pickup laser sled alignment gear slipped and laser diode degraded.',
      estimatedLaborHours: 1.0,
      laborRate: 40.0,
      notes: 'Installed replacement KEM-497AAA optical pickup drive. Firmware synced.'
    },
    partsUsed: [
      {
        partId: 'PART-106',
        sku: 'LASER-PS5-UHD',
        name: 'KEM-497AAA Ultra HD Blu-Ray Optical Pickup Laser',
        qty: 1,
        unitPrice: 58.0,
        coveredByWarranty: true
      }
    ],
    billing: {
      partsTotal: 58.0,
      laborTotal: 40.0,
      warrantyDiscount: 98.0,
      totalDue: 0.0,
      approvalStatus: 'APPROVED'
    },
    timeline: [
      { stage: 'Submitted', timestamp: '2026-10-24T10:15:00Z', actor: 'Devon Patel', note: 'Submitted at Service Center desk.' },
      { stage: 'Under Diagnosis', timestamp: '2026-10-24T15:00:00Z', actor: 'Marcus Vance', note: 'Error confirmed with 4K UHD Blu-Ray disc.' },
      { stage: 'In Repair', timestamp: '2026-10-26T11:00:00Z', actor: 'Marcus Vance', note: 'Laser swapped and lubricated.' },
      { stage: 'Quality Testing', timestamp: '2026-10-28T16:00:00Z', actor: 'Marcus Vance', note: 'Tested 5 disc formats, 4 hours continuous playback.' },
      { stage: 'Ready for Pickup', timestamp: '2026-10-29T08:30:00Z', actor: 'Elena Rostova (Manager)', note: 'Customer notified via SMS & Email with pickup barcode.' }
    ],
    qaChecklist: [
      { label: 'Disc Eject & Feed Mechanism Smooth', passed: true },
      { label: '4K Ultra HD Blu-Ray Movie Playback', passed: true },
      { label: 'PS5 Game Disc 100GB Data Read Speed', passed: true },
      { label: 'Fan Acoustics & Liquid Metal Compound Checked', passed: true }
    ]
  },
  {
    id: 'RC-80350',
    trackingCode: 'RC-80350',
    customer: {
      name: 'Jessica Ramos',
      email: 'jess.ramos@example.com',
      phone: '+1 (555) 912-3841',
      address: '15 Ocean Blvd, Miami, FL'
    },
    device: {
      category: 'Smartphone',
      brand: 'Samsung',
      model: 'Samsung Galaxy S24 Ultra 512GB',
      serialNumber: 'SN-SAM-554219',
      imei: '359901458821432',
      color: 'Titanium Gray',
      passcodeProvided: true
    },
    warranty: {
      status: 'UNDER_WARRANTY',
      type: 'Samsung Care+ Tier 1',
      expires: '2027-02-17',
      claimApproved: true,
      deductible: 19.0
    },
    reportedIssue: 'Rear camera cover glass cracked with micro-shards touching primary 200MP lens, causing lens blur and autofocus hunting.',
    issueCategory: 'Camera Hardware',
    urgency: 'HIGH',
    stage: 'Completed',
    stageProgress: 100,
    assignedTechId: 'TECH-02',
    assignedTechName: 'David Kim',
    createdAt: '2026-10-22T08:00:00Z',
    updatedAt: '2026-10-25T17:00:00Z',
    estimatedCompletion: '2026-10-25T16:30:00Z',
    diagnosis: {
      inspector: 'David Kim',
      findings: 'Sapphire glass cracked and OIS gimbal mechanism restricted by glass dust. Sensor swap required.',
      estimatedLaborHours: 1.5,
      laborRate: 40.0,
      notes: 'Full module replaced, recalibrated with Samsung Service Tool.'
    },
    partsUsed: [
      {
        partId: 'PART-105',
        sku: 'CAM-S24U-200M',
        name: '200MP Main OIS Sensor Module & Sapphire Lens',
        qty: 1,
        unitPrice: 180.0,
        coveredByWarranty: true
      }
    ],
    billing: {
      partsTotal: 180.0,
      laborTotal: 60.0,
      warrantyDiscount: 221.0,
      totalDue: 19.0,
      approvalStatus: 'APPROVED'
    },
    serviceCertificate: {
      certificateNumber: 'CERT-RC-2026-80350',
      issuedOn: '2026-10-25',
      repairWarrantyValidUntil: '2027-01-23', // 90-day repair warranty
      authorizedSigner: 'David Kim (Lead Mobile Engineer)',
      qcInspector: 'Elena Rostova (Quality Assurance Director)'
    },
    timeline: [
      { stage: 'Submitted', timestamp: '2026-10-22T08:00:00Z', actor: 'Jessica Ramos', note: 'Booked via RepairChain customer portal.' },
      { stage: 'Under Diagnosis', timestamp: '2026-10-22T11:00:00Z', actor: 'David Kim', note: 'Camera module optical bench test failed.' },
      { stage: 'Awaiting Customer Approval', timestamp: '2026-10-22T14:00:00Z', actor: 'System', note: 'Customer approved $19 deductible.' },
      { stage: 'In Repair', timestamp: '2026-10-23T09:30:00Z', actor: 'David Kim', note: 'Camera module replaced in cleanroom booth.' },
      { stage: 'Quality Testing', timestamp: '2026-10-24T14:00:00Z', actor: 'David Kim', note: '100x Space Zoom and OIS stabilization verified.' },
      { stage: 'Ready for Pickup', timestamp: '2026-10-25T10:00:00Z', actor: 'System', note: 'Customer received ready notification.' },
      { stage: 'Completed', timestamp: '2026-10-25T17:00:00Z', actor: 'Marcus Sterling (Front Desk)', note: 'Device collected by customer. Service Passport stamped.' }
    ],
    qaChecklist: [
      { label: '200MP RAW Capture & Optical Clarity', passed: true },
      { label: 'Optical Image Stabilization (OIS) Gyro Test', passed: true },
      { label: 'Laser Autofocus Distance Measurement', passed: true },
      { label: 'IP68 Water Resistance Pressure Chamber Test', passed: true }
    ]
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-991',
    timestamp: '2026-10-29T09:00:00Z',
    actor: 'Marcus Vance',
    role: 'Technician',
    action: 'Diagnosed Ticket',
    ticketId: 'RC-80409',
    details: 'Completed structural integrity test for Sony XM5 headband.'
  },
  {
    id: 'LOG-990',
    timestamp: '2026-10-29T08:30:00Z',
    actor: 'Elena Rostova',
    role: 'Manager',
    action: 'Advanced Stage',
    ticketId: 'RC-80371',
    details: 'Moved PS5 Pro repair to Ready for Pickup and triggered SMS gateway.'
  },
  {
    id: 'LOG-989',
    timestamp: '2026-10-29T08:15:00Z',
    actor: 'Alex Rivera',
    role: 'Technician',
    action: 'Consumed Spare Part',
    ticketId: 'RC-80415',
    details: 'Deducted 1x FAN-MBP16-DUAL from Bin C-08-2.'
  },
  {
    id: 'LOG-988',
    timestamp: '2026-10-29T06:30:00Z',
    actor: 'Anthony Rossi',
    role: 'Customer',
    action: 'Submitted Request',
    ticketId: 'RC-80385',
    details: 'New liquid spill repair request submitted for iPad Air M2.'
  },
  {
    id: 'LOG-987',
    timestamp: '2026-10-28T14:30:00Z',
    actor: 'David Kim',
    role: 'Technician',
    action: 'Generated Quote',
    ticketId: 'RC-80412',
    details: 'Prepared quote $29 with AppleCare+ subsidy for iPhone 15 Pro Max.'
  }
];
